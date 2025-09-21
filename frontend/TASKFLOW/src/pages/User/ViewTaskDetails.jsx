import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import moment from "moment";

const ViewTaskDetails = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);

  // Farben für Status
  const getStatusTagColor = (status) => {
    switch (status) {
      case "In Progress":
        return "text-cyan-500 bg-cyan-50 border border-cyan-500/10";
      case "Completed":
        return "text-lime-500 bg-lime-50 border border-lime-500/20";
      default:
        return "text-violet-500 bg-violet-50 border border-violet-500/10";
    }
  };

  // Übersetzungen für Status
  const translateStatus = (status) => {
    switch (status) {
      case "Pending":
        return "Offen";
      case "In Progress":
        return "In Bearbeitung";
      case "Completed":
        return "Abgeschlossen";
      default:
        return status;
    }
  };

  // Übersetzungen für Priorität
  const translatePriority = (priority) => {
    switch (priority) {
      case "Low":
        return "Niedrig";
      case "Medium":
        return "Mittel";
      case "High":
        return "Hoch";
      default:
        return priority;
    }
  };

  // API Call
  const getTaskDetailsByID = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.TASKS.GET_TASK_BY_ID(id)
      );
      if (response.data) {
        setTask(response.data);
      }
    } catch (error) {
      console.error("❌ Fehler beim Laden der Task:", error);
    }
  };

  // Update ToDo + Status
  const updateTodoChecklist = async (index) => {
    try {
      const updatedChecklist = [...task.todoChecklist];
      updatedChecklist[index].completed = !updatedChecklist[index].completed;

      // Neuen Status bestimmen
      let newStatus = "Pending";
      const completedCount = updatedChecklist.filter((t) => t.completed).length;
      if (completedCount === 0) {
        newStatus = "Pending";
      } else if (completedCount === updatedChecklist.length) {
        newStatus = "Completed";
      } else {
        newStatus = "In Progress";
      }

      // API Call senden
      await axiosInstance.put(API_PATHS.TASKS.UPDATE_TODO_CHECKLIST(id), {
        todoChecklist: updatedChecklist,
        status: newStatus,
      });

      setTask((prev) => ({
        ...prev,
        todoChecklist: updatedChecklist,
        status: newStatus,
      }));
    } catch (error) {
      console.error("❌ Fehler beim Aktualisieren der ToDo-Liste:", error);
    }
  };

  // Klick auf Anhänge-Links
  const handleLinkClick = (link) => {
    window.open(link, "_blank");
  };

  useEffect(() => {
    if (id) {
      getTaskDetailsByID();
    }
  }, [id]);

  return (
    <DashboardLayout activeMenu="Meine Aufgaben">
      <div className="mt-5">
        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-4 mt-4">
          <div className="form-card col-span-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xl md:text-xl font-medium">{task?.title}</h2>
              <div
                className={`text-[13px] font-medium px-4 py-0.5 rounded ${getStatusTagColor(
                  task?.status
                )}`}
              >
                {translateStatus(task?.status)}
              </div>
            </div>
          </div>
        </div>

        {/* Beschreibung */}
        <div className="mt-4">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-medium text-slate-500">
              Beschreibung
            </span>
            <span className="text-sm text-slate-800">
              {task?.description || "-"}
            </span>
          </div>
        </div>

        {/* Priority + Due Date */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-medium text-slate-500">
              Priorität
            </span>
            <span className="text-sm font-semibold text-slate-800">
              {translatePriority(task?.priority) || "-"}
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-xs font-medium text-slate-500">
              Fällig am
            </span>
            <span className="text-sm font-semibold text-slate-800">
              {task?.dueDate
                ? moment(task.dueDate).format("D. MMM YYYY")
                : "N/A"}
            </span>
          </div>
        </div>

        {/* Assigned To */}
        <div className="mt-4">
          <span className="text-xs font-medium text-slate-500">
            Zugewiesen an
          </span>
          <div className="flex gap-2 mt-2">
            {task?.assignedTo?.length > 0 ? (
              task.assignedTo.map((user) => (
                <div
                  key={user._id}
                  className="flex items-center gap-2 bg-slate-100 px-3 py-1 rounded-full text-xs"
                >
                  <img
                    src={user.profileImageUrl || "/default-avatar.png"}
                    alt={user.name}
                    className="w-6 h-6 rounded-full"
                  />
                  <span>{user.name}</span>
                </div>
              ))
            ) : (
              <span className="text-sm text-slate-600">
                Kein Benutzer zugewiesen
              </span>
            )}
          </div>
        </div>

        {/* Todo-Liste mit Checkboxen */}
        <div className="mt-6">
          <span className="text-xs font-medium text-slate-500">ToDo-Liste</span>
          <ul className="mt-2 space-y-2">
            {task?.todoChecklist?.length > 0 ? (
              task.todoChecklist.map((item, index) => (
                <li key={index} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={() => updateTodoChecklist(index)}
                  />
                  <span className={item.completed ? "line-through" : ""}>
                    {item.text}
                  </span>
                </li>
              ))
            ) : (
              <li className="text-sm text-slate-600">Keine ToDos vorhanden</li>
            )}
          </ul>
        </div>

        {/* Attachments */}
        <div className="mt-6">
          <span className="text-xs font-medium text-slate-500">Anhänge</span>
          <ul className="mt-2 space-y-2">
            {task?.attachments?.length > 0 ? (
              task.attachments.map((link, index) => (
                <li
                  key={index}
                  className="text-sm text-indigo-600 hover:underline cursor-pointer"
                  onClick={() => handleLinkClick(link)}
                >
                  {link}
                </li>
              ))
            ) : (
              <li className="text-sm text-slate-600">Keine Anhänge</li>
            )}
          </ul>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ViewTaskDetails;
