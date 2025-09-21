const express = require("express");
const { protect, adminOnly } = require("../middlewares/authMiddleware");
const {
  getDashboardData,
  getUserDashboardData,
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  updateTaskStatus,
  updateTaskChecklist,
} = require("../controllers/taskController");

const router = express.Router();

/**
 * @route   GET /api/tasks/dashboard-data
 * @desc    Admin-Dashboard-Daten abrufen
 * @access  Private (Admin)
 */
router.get("/dashboard-data", protect, getDashboardData);

/**
 * @route   GET /api/tasks/user-dashboard-data
 * @desc    Benutzer-Dashboard-Daten abrufen
 * @access  Private (Assigned User)
 */
router.get("/user-dashboard-data", protect, getUserDashboardData);

/**
 * @route   GET /api/tasks
 * @desc    Alle Tasks abrufen
 *          - Admin: alle Tasks
 *          - User: nur zugewiesene Tasks
 * @access  Private
 */
router.get("/", protect, getTasks);

/**
 * @route   GET /api/tasks/:id
 * @desc    Task anhand der ID abrufen
 * @access  Private
 */
router.get("/:id", protect, getTaskById);

/**
 * @route   POST /api/tasks
 * @desc    Neuen Task erstellen
 * @access  Private (Admin only)
 */
router.post("/", protect, adminOnly, createTask);

/**
 * @route   PUT /api/tasks/:id
 * @desc    Task aktualisieren
 * @access  Private
 */
router.put("/:id", protect, updateTask);

/**
 * @route   DELETE /api/tasks/:id
 * @desc    Task löschen
 * @access  Private (Admin only)
 */
router.delete("/:id", protect, adminOnly, deleteTask);

/**
 * @route   PUT /api/tasks/:id/status
 * @desc    Status eines Tasks aktualisieren
 * @access  Private (Assigned User oder Admin)
 */
router.put("/:id/status", protect, updateTaskStatus);

/**
 * @route   PUT /api/tasks/:id/todo
 * @desc    ToDo-Checkliste eines Tasks aktualisieren
 * @access  Private (Assigned User oder Admin)
 */
router.put("/:id/todo", protect, updateTaskChecklist);

module.exports = router;
