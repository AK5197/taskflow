const mongoose = require("mongoose");

/**
 * @schema  ToDo-Element für Checklisten
 * @field   text        - Beschreibung des ToDo
 * @field   completed   - Status (true = erledigt)
 */
const todoSchema = new mongoose.Schema({
  text: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

/**
 * @schema  Task
 * @field   title         - Titel des Tasks (Pflichtfeld)
 * @field   description   - Beschreibung (optional)
 * @field   priority      - Priorität (Low | Medium | High)
 * @field   status        - Status (Pending | In Progress | Completed)
 * @field   dueDate       - Fälligkeitsdatum (Pflichtfeld)
 * @field   assignedTo    - Zugewiesene Benutzer (Array von User-IDs)
 * @field   createdBy     - Ersteller des Tasks (User-ID)
 * @field   attachments   - Liste von Dateipfaden (z. B. Bilder, Dokumente)
 * @field   todoChecklist - Liste von ToDo-Elementen
 * @field   progress      - Fortschritt in Prozent (0–100)
 * @option  timestamps    - Erstellt- und Aktualisiert-Datum automatisch
 */
const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: "" },

    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },

    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed"],
      default: "Pending",
    },

    dueDate: { type: Date, required: true },

    // Mehrere Benutzer möglich
    assignedTo: [
      { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    ],

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    attachments: [{ type: String }],

    todoChecklist: [todoSchema],

    progress: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
