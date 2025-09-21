import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import SelectDropdown from "../../components/inputs/SelectDropdown";
import SelectUsers from "../../components/inputs/SelectUsers";
import TodoListInput from "../../components/inputs/TodoListInput";
import AddAttachmentsInput from "../../components/inputs/AddAttachmentsInput";

import { PRIORITY_DATA } from "../../utils/data";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

import toast from "react-hot-toast";
import moment from "moment";
import { LuTrash2 } from "react-icons/lu";

/**
 * @page CreateTask
 * @desc  Seite zum Erstellen und Bearbeiten von Aufgaben
 *        - Enthält Formular für Titel, Beschreibung, Fälligkeitsdatum, Status, Priorität, ToDo-Liste und Anhänge
 *        - Admins können Aufgaben auch löschen
 */
const CreateTask = () => {
  const location = useLocation();
  const { id } = useParams();
  const taskId = id || location.state?.id;
  const navigate = useNavigate();

  // Lokale States
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    priority: "Low",
    dueDate: null,
    status: "Pending",
    assignedTo: [],
    todoChecklist: [],
    attachments: [],
  });
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);

  // Initiales Laden
  useEffect(() => {
    if (taskId) {
      getTaskDetailsByID();
    } else {
      resetForm();
    }
    getAllUsers();
  }, [taskId]);

  /** Hilfsfunktionen */
  const handleValueChange = (key, value) =>
    setTaskData((prev) => ({ ...prev, [key]: value }));

  const resetForm = () =>
    setTaskData({
      title: "",
      description: "",
      priority: "Low",
      dueDate: null,
      status: "Pending",
      assignedTo: [],
      todoChecklist: [],
      attachments: [],
    });

  /** API Calls */
  const getAllUsers = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.USERS.GET_ALL_USERS);
      setUsers(response.data?.users || response.data || []);
    } catch (error) {
      console.error("Fehler beim Laden der Benutzer:", error);
      toast.error("Fehler beim Laden der Benutzer");
    }
  };

  const getTaskDetailsByID = async () => {
    try {
      const { data: task } = await axiosInstance.get(API_PATHS.TASKS.GET_TASK_BY_ID(taskId));
      setTaskData({
        title: task.title || "",
        description: task.description || "",
        priority: task.priority || "Low",
        dueDate: task.dueDate ? moment(task.dueDate).format("YYYY-MM-DD") : null,
        status: task.status || "Pending",
        assignedTo: task.assignedTo?.map((u) => u._id) || [],
        todoChecklist: task.todoChecklist?.map((t) => t.text) || [],
        attachments: task.attachments || [],
      });
    } catch (error) {
      console.error("Fehler beim Laden der Aufgabendetails:", error);
      toast.error("Fehler beim Laden der Aufgabendetails");
    }
  };

  const createTask = async () => {
    setLoading(true);
    try {
      const todolist = taskData.todoChecklist.map((t) => ({ text: t, completed: false }));
      const requestData = {
        ...taskData,
        dueDate: taskData.dueDate ? new Date(taskData.dueDate).toISOString() : null,
        assignedTo: taskData.assignedTo.map((u) => (typeof u === "string" ? u : u._id)),
        todoChecklist: todolist,
      };

      await axiosInstance.post(API_PATHS.TASKS.CREATE_TASK, requestData);
      toast.success("Aufgabe erfolgreich erstellt");
      resetForm();
      navigate("/admin/tasks");
    } catch (error) {
      console.error("Fehler beim Erstellen der Aufgabe:", error);
      toast.error(error.response?.data?.message || "Fehler beim Erstellen der Aufgabe");
    } finally {
      setLoading(false);
    }
  };

  const updateTask = async () => {
    setLoading(true);
    try {
      const todolist = taskData.todoChecklist.map((t) => ({ text: t, completed: false }));
      const requestData = {
        ...taskData,
        dueDate: taskData.dueDate ? new Date(taskData.dueDate).toISOString() : null,
        assignedTo: taskData.assignedTo.map((u) => (typeof u === "string" ? u : u._id)),
        todoChecklist: todolist,
      };

      await axiosInstance.put(API_PATHS.TASKS.UPDATE_TASK(taskId), requestData);
      toast.success("Aufgabe erfolgreich aktualisiert");
      navigate("/admin/tasks");
    } catch (error) {
      console.error("Fehler beim Aktualisieren:", error);
      toast.error(error.response?.data?.message || "Fehler beim Aktualisieren");
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async () => {
    try {
      await axiosInstance.delete(API_PATHS.TASKS.DELETE_TASK(taskId));
      toast.success("Aufgabe erfolgreich gelöscht");
      setOpenDeleteAlert(false);
      navigate("/admin/tasks");
    } catch (error) {
      console.error("Fehler beim Löschen:", error);
      toast.error("Fehler beim Löschen der Aufgabe");
    }
  };

  /** Formular-Submit */
  const handleSubmit = async () => {
    setError("");

    if (!taskData.title.trim()) return setError("Titel ist erforderlich.");
    if (!taskData.description.trim()) return setError("Beschreibung ist erforderlich.");
    if (!taskData.dueDate) return setError("Fälligkeitsdatum ist erforderlich.");
    if (taskData.assignedTo.length === 0)
      return setError("Mindestens ein Mitglied zuweisen.");
    if (taskData.todoChecklist.length === 0)
      return setError("Mindestens eine Teilaufgabe hinzufügen.");

    taskId ? await updateTask() : await createTask();
  };

  return (
    <DashboardLayout activeMenu="Aufgabe erstellen">
      <div className="mt-5">
        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-4 mt-4">
          <div className="form-card col-span-3 flex items-center justify-between">
            <h2 className="text-xl font-medium">
              {taskId ? "Aufgabe bearbeiten" : "Neue Aufgabe erstellen"}
            </h2>
            {taskId && (
              <button
                className="flex items-center gap-1.5 text-sm font-medium text-red-500 bg-rose-50 rounded px-2 py-1 border border-rose-100 hover:border-rose-300"
                onClick={() => setOpenDeleteAlert(true)}
              >
                <LuTrash2 className="text-base" /> Löschen
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Formularfelder */}
      <div className="mt-4 space-y-3">
        {/* Titel */}
        <div>
          <label className="text-xs font-medium text-slate-600">Titel</label>
          <input
            placeholder="Titel"
            className="form-input"
            value={taskData.title}
            onChange={({ target }) => handleValueChange("title", target.value)}
          />
        </div>

        {/* Beschreibung */}
        <div>
          <label className="text-xs font-medium text-slate-600">Beschreibung</label>
          <textarea
            placeholder="Aufgabe beschreiben"
            className="form-input"
            rows={4}
            value={taskData.description}
            onChange={({ target }) => handleValueChange("description", target.value)}
          />
        </div>

        {/* Grid Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          {/* Priorität */}
          <div>
            <label className="text-xs font-medium text-slate-600">Priorität</label>
            <SelectDropdown
              options={PRIORITY_DATA}
              value={taskData.priority}
              onChange={(v) => handleValueChange("priority", v)}
              placeholder="Priorität wählen"
            />
          </div>

          {/* Fälligkeitsdatum */}
          <div>
            <label className="text-xs font-medium text-slate-600">Fällig am</label>
            <input
              type="date"
              className="form-input h-[42px]"
              value={taskData.dueDate || ""}
              onChange={({ target }) => handleValueChange("dueDate", target.value)}
            />
          </div>

          {/* Status */}
          <div>
            <label className="text-xs font-medium text-slate-600">Status</label>
            <SelectDropdown
              options={[
                { label: "Offen", value: "Pending" },
                { label: "In Bearbeitung", value: "In Progress" },
                { label: "Abgeschlossen", value: "Completed" },
              ]}
              value={taskData.status}
              onChange={(v) => handleValueChange("status", v)}
              placeholder="Status wählen"
            />
          </div>

          {/* Zuweisung */}
          <div>
            <label className="text-xs font-medium text-slate-600">Zuweisen an</label>
            <SelectUsers
              users={users}
              selectedUsers={taskData.assignedTo}
              setSelectedUsers={(v) => handleValueChange("assignedTo", v)}
            />
          </div>
        </div>

        {/* ToDo-Liste */}
        <div>
          <label className="text-xs font-medium text-slate-600">ToDo-Liste</label>
          <TodoListInput
            todoList={taskData.todoChecklist}
            setTodoList={(v) => handleValueChange("todoChecklist", v)}
          />
        </div>

        {/* Anhänge */}
        <div>
          <label className="text-xs font-medium text-slate-600">Dateilinks</label>
          <AddAttachmentsInput
            attachments={taskData.attachments}
            setAttachments={(v) => handleValueChange("attachments", v)}
          />
        </div>

        {/* Fehler */}
        {error && <p className="text-xs font-medium text-red-500 mt-2">{error}</p>}

        {/* Buttons */}
        <div className="flex justify-end mt-5">
          <button className="add-btn" onClick={handleSubmit} disabled={loading}>
            {loading
              ? "WIRD VERARBEITET..."
              : taskId
              ? "AUFGABE AKTUALISIEREN"
              : "AUFGABE ERSTELLEN"}
          </button>
        </div>
      </div>

      {/* Lösch-Dialog */}
      {openDeleteAlert && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-5 rounded-lg w-96">
            <h3 className="text-lg font-medium">Aufgabe löschen</h3>
            <p className="text-sm text-slate-600 mt-2">
              Bist du sicher, dass du diese Aufgabe löschen möchtest? Diese Aktion kann nicht rückgängig gemacht werden.
            </p>
            <div className="flex justify-end gap-3 mt-5">
              <button
                className="px-4 py-2 text-sm border border-slate-200 rounded hover:bg-slate-50"
                onClick={() => setOpenDeleteAlert(false)}
              >
                Abbrechen
              </button>
              <button
                className="px-4 py-2 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                onClick={deleteTask}
              >
                Löschen
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default CreateTask;
