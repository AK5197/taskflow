import {
  LuLayoutDashboard,
  LuUsers,
  LuClipboardCheck,
  LuSquarePlus,
  LuLogOut,
} from "react-icons/lu";

// ===================== Admin Menü =====================
export const SIDE_MENU_DATA = [
  {
    id: "01",
    label: "Dashboard",
    icon: LuLayoutDashboard,
    path: "/admin/dashboard",
  },
  {
    id: "02",
    label: "Aufgaben verwalten",
    icon: LuClipboardCheck,
    path: "/admin/tasks",
  },
  {
    id: "03",
    label: "Aufgabe erstellen",
    icon: LuSquarePlus,
    path: "/admin/create-task",
  },
  {
    id: "04",
    label: "Teammitglieder",
    icon: LuUsers,
    path: "/admin/users",
  },
  {
    id: "05",
    label: "Abmelden",
    icon: LuLogOut,
    path: "logout",
  },
];

// ===================== Member Menü =====================
export const SIDE_MENU_USER_DATA = [
  {
    id: "01",
    label: "Dashboard",
    icon: LuLayoutDashboard,
    path: "/user/dashboard",
  },
  {
    id: "02",
    label: "Meine Aufgaben",
    icon: LuClipboardCheck,
    path: "/user/my-tasks", // ✅ korrigiert
  },
  {
    id: "03",
    label: "Abmelden",
    icon: LuLogOut,
    path: "logout",
  },
];

// ===================== Prioritäten =====================
export const PRIORITY_DATA = [
  { label: "Niedrig", value: "Low" },
  { label: "Mittel", value: "Medium" },
  { label: "Hoch", value: "High" },
];

// ===================== Status =====================
export const STATUS_DATA = [
  { label: "Offen", value: "Pending" },
  { label: "In Bearbeitung", value: "In Progress" },
  { label: "Abgeschlossen", value: "Completed" },
];
