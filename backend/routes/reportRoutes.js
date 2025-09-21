const express = require("express");
const { protect, adminOnly } = require("../middlewares/authMiddleware");
const {
  exportTasksReport,
  exportUsersReport,
} = require("../controllers/reportController");

const router = express.Router();

/**
 * @route   GET /api/reports/export/tasks
 * @desc    Exportiert alle Tasks als Excel-Datei
 * @access  Private (Admin)
 */
router.get("/export/tasks", protect, adminOnly, exportTasksReport);

/**
 * @route   GET /api/reports/export/users
 * @desc    Exportiert Benutzer-Task-Report als Excel-Datei
 * @access  Private (Admin)
 */
router.get("/export/users", protect, adminOnly, exportUsersReport);

module.exports = router;
