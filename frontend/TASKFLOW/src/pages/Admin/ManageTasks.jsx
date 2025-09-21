import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { LuFileSpreadsheet } from "react-icons/lu";
import TaskStatusTabs from "../../components/TaskStatusTabs";
import moment from "moment";
import "moment/locale/de"; // 📌 Deutsche Datumsanzeige

moment.locale("de"); // Sprache setzen

const ManageTasks = () => {
  const [allTasks, setAllTasks] = useState([]);
  const [tabs, setTabs] = useState([]);
  const [filterStatus, setFilterStatus] = useState("Alle");

  const navigate = useNavigate();

  // Holt alle Aufgaben
  const getAllTasks = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.TASKS.GET_ALL_TASKS);
      const tasks = response.data?.tasks || [];
      setAllTasks(tasks);

      // Tabs zählen immer ALLE Aufgaben
      const tabData = [
        { label: "Alle", count: tasks.length },
        { label: "Offen", count: tasks.filter((t) => t.status === "Pending").length },
        { label: "In Bearbeitung", count: tasks.filter((t) => t.status === "In Progress").length },
        { label: "Abgeschlossen", count: tasks.filter((t) => t.status === "Completed").length },
      ];
      setTabs(tabData);
    } catch (error) {
      console.error("Fehler beim Laden der Aufgaben:", error);
    }
  };

  // Klick auf Aufgabe → Update Task öffnen
  const handleClick = (taskData) => {
    navigate(`/admin/create-task/${taskData._id}`);
  };

  const handleDownloadReport = async () => {
    console.log("Bericht herunterladen – noch nicht implementiert");
  };

  useEffect(() => {
    getAllTasks();
  }, []);

  const filteredTasks =
    filterStatus === "Alle"
      ? allTasks
      : allTasks.filter((task) => {
          if (filterStatus === "Offen") return task.status === "Pending";
          if (filterStatus === "In Bearbeitung") return task.status === "In Progress";
          if (filterStatus === "Abgeschlossen") return task.status === "Completed";
          return true;
        });

  // Badge Farben für Status
  const statusColors = {
    Pending: "bg-purple-100 text-purple-700",
    "In Progress": "bg-yellow-100 text-yellow-700",
    Completed: "bg-green-100 text-green-700",
  };

  // Badge Farben für Priorität
  const priorityColors = {
    Low: "bg-blue-100 text-blue-600",
    Medium: "bg-orange-100 text-orange-600",
    High: "bg-red-100 text-red-600",
  };

  // Übersetzung Status
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

  // Übersetzung Priorität
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

  return (
    <DashboardLayout activeMenu="Aufgaben verwalten">
      <div className="my-5">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          {/* Titel + Desktop Button */}
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-xl md:text-xl font-medium">Meine Aufgaben</h2>
            <button
              className="hidden lg:flex download-btn"
              onClick={handleDownloadReport}
            >
              <LuFileSpreadsheet className="text-lg" />
              Bericht herunterladen
            </button>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-3 mt-3 lg:mt-0">
            <TaskStatusTabs
              tabs={tabs}
              activeTab={filterStatus}
              setActiveTab={setFilterStatus}
            />
          </div>
        </div>

        {/* Aufgaben-Karten */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <div
                key={task._id}
                className="card cursor-pointer hover:shadow-lg transition border border-gray-200"
                onClick={() => handleClick(task)}
              >
                {/* Status + Priorität Badges */}
                <div className="flex gap-2 mb-2">
                  <span
                    className={`text-xs px-2 py-0.5 rounded ${statusColors[task.status] || "bg-gray-100 text-gray-600"}`}
                  >
                    {translateStatus(task.status)}
                  </span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded ${priorityColors[task.priority] || "bg-gray-100 text-gray-600"}`}
                  >
                    {translatePriority(task.priority)}
                  </span>
                </div>

                {/* Titel + Beschreibung */}
                <h3 className="font-semibold text-gray-800 truncate">{task.title}</h3>
                <p className="text-sm text-gray-500 line-clamp-2">{task.description}</p>

                {/* Fortschritt */}
                <p className="text-xs mt-2 text-gray-600">
                  Erledigt: {task.todoChecklist.filter((t) => t.completed).length} /{" "}
                  {task.todoChecklist.length}
                </p>
                <div className="w-full h-2 bg-gray-200 rounded mt-1">
                  <div
                    className="h-2 bg-primary rounded"
                    style={{
                      width: `${
                        task.todoChecklist.length > 0
                          ? (task.todoChecklist.filter((t) => t.completed).length /
                              task.todoChecklist.length) *
                            100
                          : 0
                      }%`,
                    }}
                  ></div>
                </div>

                {/* Daten */}
                <div className="flex justify-between text-xs text-gray-500 mt-3">
                  <span>
                    Startdatum:{" "}
                    {task.createdAt ? moment(task.createdAt).format("D. MMMM YYYY") : "-"}
                  </span>
                  <span>
                    Fällig am:{" "}
                    {task.dueDate ? moment(task.dueDate).format("D. MMMM YYYY") : "-"}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">Keine Aufgaben gefunden</p>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ManageTasks;
