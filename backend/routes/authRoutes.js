const express = require("express");
const bcrypt = require("bcryptjs");
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
} = require("../controllers/authController");
const { protect } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");
const User = require("../models/User");

const router = express.Router();

/**
 * @route   POST /api/auth/register
 * @desc    Neuen Benutzer registrieren
 * @access  Public
 */
router.post("/register", registerUser);

/**
 * @route   POST /api/auth/login
 * @desc    Benutzer einloggen
 * @access  Public
 */
router.post("/login", loginUser);

/**
 * @route   GET /api/auth/profile
 * @desc    Eigenes Profil abrufen
 * @access  Private
 */
router.get("/profile", protect, getUserProfile);

/**
 * @route   PUT /api/auth/profile
 * @desc    Eigenes Profil aktualisieren
 * @access  Private
 */
router.put("/profile", protect, updateUserProfile);

/**
 * @route   PUT /api/auth/reset-password/:id
 * @desc    Passwort für Benutzer zurücksetzen
 * @access  Private (Admin oder später auch User)
 */
router.put("/reset-password/:id", async (req, res) => {
  try {
    const { newPassword } = req.body;

    if (!newPassword || newPassword.length < 6) {
      return res
        .status(400)
        .json({ message: "Das Passwort muss mindestens 6 Zeichen lang sein." });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { password: hashedPassword },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "Benutzer nicht gefunden." });
    }

    res.json({ message: "Passwort erfolgreich geändert!" });
  } catch (error) {
    console.error("Fehler beim Passwort-Reset:", error);
    res.status(500).json({ message: "Serverfehler beim Passwort ändern." });
  }
});

/**
 * @route   POST /api/auth/upload-image
 * @desc    Profilbild hochladen
 * @access  Private
 */
router.post("/upload-image", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "Keine Datei hochgeladen." });
  }

  const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
  res.status(200).json({ imageUrl });
});

module.exports = router;
