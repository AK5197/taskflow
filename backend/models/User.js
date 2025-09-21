const mongoose = require("mongoose");

/**
 * @schema  User
 * @field   name             - Vollständiger Name des Benutzers (Pflichtfeld)
 * @field   email            - E-Mail-Adresse (eindeutig, Pflichtfeld)
 * @field   password         - Passwort-Hash (Pflichtfeld)
 * @field   profileImageUrl  - URL zum Profilbild (optional)
 * @field   role             - Rolle des Benutzers (admin | member)
 * @option  timestamps       - Erstellt- und Aktualisiert-Datum automatisch
 */
const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profileImageUrl: { type: String, default: null },
    role: { type: String, enum: ["admin", "member"], default: "member" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
