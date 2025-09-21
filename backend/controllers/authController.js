const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/**
 * Erzeugt ein JWT-Token für den angegebenen Benutzer.
 * @param {string} userId - Die ID des Benutzers
 * @returns {string} JWT-Token
 */
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

/**
 * @desc    Registriert einen neuen Benutzer
 * @route   POST /api/auth/register
 * @access  Public
 */
const registerUser = async (req, res) => {
  try {
    let { name, email, password, profileImageUrl, adminInviteToken } = req.body;

    // E-Mail in Kleinbuchstaben speichern
    email = email.toLowerCase();

    // Prüfen, ob Benutzer bereits existiert
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Rolle bestimmen: Admin, wenn Invite-Token korrekt, sonst Member
    let role = "member";
    if (adminInviteToken && adminInviteToken === process.env.ADMIN_INVITE_TOKEN) {
      role = "admin";
    }

    // Passwort hashen
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Benutzer erstellen
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      profileImageUrl,
      role,
    });

    // Antwort mit Benutzerdaten und JWT zurückgeben
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      profileImageUrl: user.profileImageUrl,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * @desc    Benutzer einloggen
 * @route   POST /api/auth/login
 * @access  Public
 */
const loginUser = async (req, res) => {
  try {
    let { email, password } = req.body;

    // E-Mail normalisieren
    email = email.toLowerCase();

    // Benutzer anhand der E-Mail suchen
    const user = await User.findOne({ email });
    if (!user) {
      console.log("Login fehlgeschlagen: User nicht gefunden", email);
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Passwort prüfen
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Login fehlgeschlagen: Falsches Passwort", email);
      return res.status(401).json({ message: "Invalid email or password" });
    }

    console.log("Login erfolgreich:", email);

    // Antwort mit Benutzerdaten und JWT zurückgeben
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      profileImageUrl: user.profileImageUrl,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * @desc    Benutzerprofil abrufen
 * @route   GET /api/auth/profile
 * @access  Private (JWT erforderlich)
 */
const getUserProfile = async (req, res) => {
  try {
    // Benutzer anhand der ID aus JWT suchen, Passwort ausblenden
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * @desc    Benutzerprofil aktualisieren
 * @route   PUT /api/auth/profile
 * @access  Private
 */
const updateUserProfile = async (req, res) => {
  try {
    // Benutzer anhand der ID aus JWT suchen
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Felder aktualisieren, falls angegeben
    user.name = req.body.name || user.name;
    user.email = (req.body.email && req.body.email.toLowerCase()) || user.email;

    // Neues Passwort speichern, falls angegeben
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(req.body.password, salt);
    }

    // Aktualisierten Benutzer speichern
    const updatedUser = await user.save();

    // Antwort mit aktualisierten Daten zurückgeben
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      token: generateToken(updatedUser._id),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { registerUser, loginUser, getUserProfile, updateUserProfile };
