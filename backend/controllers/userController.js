const Task = require("../models/Task");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

/**
 * @desc    Alle Benutzer abrufen (nur Members, ohne Admins)
 *          - Enthält zusätzlich eine Übersicht der Task-Statistiken je Benutzer
 * @route   GET /api/users
 * @access  Private (Admin)
 */
const getUsers = async (req, res) => {
  try {
    // Benutzer mit Rolle "member" laden, Passwort ausblenden
    const users = await User.find({ role: "member" }).select("-password");

    // Task-Statistiken je Benutzer berechnen
    const usersWithTaskStats = await Promise.all(
      users.map(async (user) => {
        const pending = await Task.countDocuments({
          assignedTo: user._id,
          status: "Pending",
        });

        const inProgress = await Task.countDocuments({
          assignedTo: user._id,
          status: "In Progress",
        });

        const completed = await Task.countDocuments({
          assignedTo: user._id,
          status: "Completed",
        });

        return {
          ...user._doc,
          taskStats: {
            pending,
            inProgress,
            completed,
          },
        };
      })
    );

    res.json(usersWithTaskStats);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * @desc    Einzelnen Benutzer anhand der ID abrufen
 * @route   GET /api/users/:id
 * @access  Private
 */
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { getUsers, getUserById };
