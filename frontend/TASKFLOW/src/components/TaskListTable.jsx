import React, { useEffect } from "react";
import moment from "moment";
import "moment/locale/de";

/**
 * @component TaskListTable
 * @desc      Tabellarische Übersicht aller Aufgaben.
 *            - Zeigt Titel, Status, Priorität und Erstellungsdatum
 *            - Status- und Prioritätswerte werden ins Deutsche übersetzt
 *            - Badges mit Farben zur besseren Visualisierung
 *
 * @prop {Array} tableData - Array mit Task-Objekten
 */
const TaskListTable = ({ tableData }) => {
  // Sprache für Moment.js auf Deutsch setzen
  useEffect(() => {
    moment.locale("de");
  }, []);

  /**
   * @desc  Bestimmt Badge-Farbe basierend auf Task-Status
   * @param {string} status
   * @returns {string} Tailwind-Klassen für Badge
   */
  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-600 border border-green-200";
      case "Pending":
        return "bg-purple-100 text-purple-600 border border-purple-200";
      case "In Progress":
        return "bg-cyan-100 text-cyan-600 border border-cyan-200";
      default:
        return "bg-gray-100 text-gray-600 border border-gray-200";
    }
  };

  /**
   * @desc  Bestimmt Badge-Farbe basierend auf Task-Priorität
   * @param {string} priority
   * @returns {string} Tailwind-Klassen für Badge
   */
  const getPriorityBadgeColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-600 border border-red-200";
      case "Medium":
        return "bg-orange-100 text-orange-600 border border-orange-200";
      case "Low":
        return "bg-green-100 text-green-600 border border-green-200";
      default:
        return "bg-gray-100 text-gray-600 border border-gray-200";
    }
  };

  /** Übersetzung für Status */
  const translateStatus = (status) => {
    switch (status) {
      case "Completed":
        return "Abgeschlossen";
      case "Pending":
        return "Offen";
      case "In Progress":
        return "In Bearbeitung";
      default:
        return status;
    }
  };

  /** Übersetzung für Priorität */
  const translatePriority = (priority) => {
    switch (priority) {
      case "High":
        return "Hoch";
      case "Medium":
        return "Mittel";
      case "Low":
        return "Niedrig";
      default:
        return priority;
    }
  };

  return (
    <div className="overflow-x-auto p-0 rounded-lg mt-3">
      <table className="min-w-full border-collapse">
        {/* Tabellenkopf */}
        <thead className="bg-gray-100 text-gray-700 text-sm uppercase tracking-wide">
          <tr>
            <th className="py-3 px-4 text-left font-semibold w-1/3">Name</th>
            <th className="py-3 px-4 text-left font-semibold w-1/6">Status</th>
            <th className="py-3 px-4 text-left font-semibold w-1/6">Priorität</th>
            <th className="py-3 px-4 text-left font-semibold hidden md:table-cell w-1/6">
              Erstellt am
            </th>
          </tr>
        </thead>

        {/* Tabellenkörper */}
        <tbody className="text-sm">
          {tableData && tableData.length > 0 ? (
            tableData.map((task, index) => (
              <tr
                key={task._id}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-gray-100 transition`}
              >
                {/* Titel */}
                <td className="px-4 py-3 font-medium text-gray-800 truncate">
                  {task.title}
                </td>

                {/* Status */}
                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 text-xs rounded-full font-medium ${getStatusBadgeColor(
                      task.status
                    )}`}
                  >
                    {translateStatus(task.status)}
                  </span>
                </td>

                {/* Priorität */}
                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 text-xs rounded-full font-medium ${getPriorityBadgeColor(
                      task.priority
                    )}`}
                  >
                    {translatePriority(task.priority)}
                  </span>
                </td>

                {/* Erstellungsdatum */}
                <td className="px-4 py-3 text-gray-600 hidden md:table-cell">
                  {task.createdAt
                    ? moment(task.createdAt).format("D. MMMM YYYY")
                    : "N/A"}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="4"
                className="px-4 py-6 text-center text-gray-400 italic"
              >
                Keine Aufgaben verfügbar
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TaskListTable;
