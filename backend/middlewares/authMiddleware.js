const jwt = require("jsonwebtoken");
const User = require("../models/User");

/**
 * @desc    Middleware zum Schutz privater Routen
 *          - Überprüft das JWT im Authorization-Header
 *          - Hängt den Benutzer (ohne Passwort) an das Request-Objekt an
 * @access  Private
 */
const protect = async (req, res, next) => {
  try {
    let token = req.headers.authorization;

    if (token && token.startsWith("Bearer")) {
      // Token aus dem Header extrahieren
      token = token.split(" ")[1];

      // Token validieren
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Benutzer anhand der ID laden und an Request-Objekt hängen
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } else {
      res.status(401).json({ message: "Not authorized, no token" });
    }
  } catch (error) {
    res.status(401).json({ message: "Token failed", error: error.message });
  }
};

/**
 * @desc    Middleware für Admin-geschützte Routen
 *          - Zugriff nur möglich, wenn Benutzer die Rolle "admin" hat
 * @access  Private (Admin)
 */
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Access denied, admin only" });
  }
};

module.exports = { protect, adminOnly };
