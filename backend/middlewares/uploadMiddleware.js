const multer = require("multer");

/**
 * @desc    Konfiguration für Multer-Speicherort
 *          - Speichert Dateien im Verzeichnis "uploads/"
 *          - Vergibt Dateinamen mit Zeitstempel-Präfix
 */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

/**
 * @desc    Dateifilter für Uploads
 *          - Erlaubt nur JPEG- und PNG-Bilder
 */
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only .jpeg, .jpg and .png formats are allowed"), false);
  }
};

// Multer-Instanz mit Storage und Filter
const upload = multer({ storage, fileFilter });

module.exports = upload;
