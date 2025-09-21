import React, { useContext, useState, useEffect } from "react";
import { useUserAuth } from "../../hooks/useUserAuth.jsx";
import { UserContext } from "../../context/userContext";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import moment from "moment";
import "moment/locale/de";
import TaskListTable from "../../components/TaskListTable";
import {
  ArrowRight,
  ClipboardList,
  Clock,
  CheckCircle2,
  Layers,
} from "lucide-react";
import CustomPieChart from "../../components/Charts/CustomPieChart";
import CustomBarChart from "../../components/Charts/CustomBarChart";

const UserDashboard = () => {
  useUserAuth();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [pieChartData, setPieChartData] = useState([]);
  const [barChartData, setBarChartData] = useState([]);

  // Farben für Charts
  const PIE_COLORS = ["#22C55E", "#06B6D4", "#7C3AED"];
  const BAR_COLORS = ["#22C55E", "#F59E0B", "#EF4444"];

  const prepareChartData = (data) => {
    const taskDistribution = data?.taskDistribution || {};
    const taskPriorityLevels = data?.taskPriorityLevels || {};

    setPieChartData([
      { status: "Abgeschlossen", count: taskDistribution?.Completed || 0 },
      { status: "In Bearbeitung", count: taskDistribution?.InProgress || 0 },
      { status: "Offen", count: taskDistribution?.Pending || 0 },
    ]);

    setBarChartData([
      { priority: "Low", label: "Niedrig", count: taskPriorityLevels?.Low || 0 },
      { priority: "Medium", label: "Mittel", count: taskPriorityLevels?.Medium || 0 },
      { priority: "High", label: "Hoch", count: taskPriorityLevels?.High || 0 },
    ]);
  };

  const addThousandsSeparator = (num) =>
    num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  const getDashboardData = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.TASKS.GET_DASHBOARD_DATA);
      if (response.data) {
        setDashboardData(response.data);
        prepareChartData(response.data?.charts || null);
      }
    } catch (error) {
      console.error("Fehler beim Laden der Dashboard-Daten:", error);
    }
  };

  const onSeeMore = () => {
    navigate("/user/my-tasks");
  };

  useEffect(() => {
    moment.locale("de");
    getDashboardData();
  }, []);

  return (
    <DashboardLayout activeMenu="Dashboard">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-50 via-white to-indigo-50 p-6 rounded-xl shadow-sm mb-8 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            Hallo, {user?.name} 👋
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            {moment().format("D. MMMM YYYY")}
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Gesamtaufgaben</p>
          <p className="text-2xl font-semibold text-indigo-600">
            {addThousandsSeparator(
              dashboardData?.charts?.taskDistribution?.All || 0
            )}
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <KpiCard
          icon={<ClipboardList className="text-blue-500" />}
          label="Gesamt"
          value={dashboardData?.charts?.taskDistribution?.All || 0}
          color="border-blue-500"
        />
        <KpiCard
          icon={<Clock className="text-violet-500" />}
          label="Offen"
          value={dashboardData?.charts?.taskDistribution?.Pending || 0}
          color="border-violet-500"
        />
        <KpiCard
          icon={<Layers className="text-cyan-500" />}
          label="In Bearbeitung"
          value={dashboardData?.charts?.taskDistribution?.InProgress || 0}
          color="border-cyan-500"
        />
        <KpiCard
          icon={<CheckCircle2 className="text-lime-500" />}
          label="Abgeschlossen"
          value={dashboardData?.charts?.taskDistribution?.Completed || 0}
          color="border-lime-500"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="card shadow-sm p-5">
          <h5 className="font-medium mb-4 flex items-center gap-2">
            📊 Aufgabenverteilung
          </h5>
          <CustomPieChart data={pieChartData} colors={PIE_COLORS} />
        </div>
        <div className="card shadow-sm p-5">
          <h5 className="font-medium mb-4 flex items-center gap-2">
            📈 Prioritätsstufen
          </h5>
          <CustomBarChart data={barChartData} />
        </div>
      </div>

      {/* Letzte Aufgaben */}
      <div className="card shadow-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <h5 className="text-lg font-semibold flex items-center gap-2">
            📝 Letzte Aufgaben
          </h5>
          <button
            className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800 text-sm font-medium"
            onClick={onSeeMore}
          >
            Alle ansehen <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <TaskListTable tableData={dashboardData?.recentTasks || []} />
      </div>
    </DashboardLayout>
  );
};

const KpiCard = ({ icon, label, value, color }) => (
  <div className={`bg-white p-5 rounded-xl border-l-4 ${color} shadow-sm`}>
    <div className="flex items-center gap-3">
      <div className="text-2xl">{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-xl font-semibold text-gray-800">{value}</p>
      </div>
    </div>
  </div>
);

export default UserDashboard;
