const express = require("express");
const { adminOnly, protect } = require("../middlewares/authMiddleware");
const { getUsers, getUserById, deleteUser } = require("../controllers/userController");

const router = express.Router();

/**
 * @route   GET /api/users
 * @desc    Alle Benutzer abrufen (nur Admins)
 * @access  Private (Admin)
 */
router.get("/", protect, adminOnly, getUsers);

/**
 * @route   GET /api/users/:id
 * @desc    Einzelnen Benutzer anhand der ID abrufen
 * @access  Private
 */
router.get("/:id", protect, getUserById);

module.exports = router;
