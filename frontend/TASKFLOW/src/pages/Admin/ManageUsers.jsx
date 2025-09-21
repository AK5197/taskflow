// src/pages/Admin/ManageUsers.jsx
import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { API_PATHS } from "../../utils/apiPaths";
import axiosInstance from "../../utils/axiosInstance";
import UserCard from "../../components/Cards/UserCard";
import { LuFileSpreadsheet } from "react-icons/lu";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const ManageUsers = () => {
  const [allUsers, setAllUsers] = useState([]);

  const getAllUsers = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.USERS.GET_ALL_USERS);
      if (response.data?.length > 0) {
        setAllUsers(response.data);
      }
    } catch (error) {
      console.error("Fehler beim Laden der Benutzer:", error);
    }
  };

  // Excel Export
  const handleDownloadReport = () => {
    try {
      // Daten vorbereiten
      const exportData = allUsers.map((user) => ({
        Name: user.name,
        "E-Mail": user.email,
        Offen: user.taskStats?.pending || 0,
        "In Bearbeitung": user.taskStats?.inProgress || 0,
        Abgeschlossen: user.taskStats?.completed || 0,
      }));

      // Sheet erstellen
      const worksheet = XLSX.utils.json_to_sheet(exportData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Team Bericht");

      // Excel-Datei als Blob exportieren
      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      const data = new Blob([excelBuffer], {
        type: "application/octet-stream",
      });

      // Datei speichern
      saveAs(
        data,
        `Team_Bericht_${new Date().toISOString().slice(0, 10)}.xlsx`
      );
    } catch (error) {
      console.error("Fehler beim Exportieren des Berichts:", error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <DashboardLayout activeMenu="Team Mitglieder">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Team Mitglieder</h2>
        <button
          className="flex items-center gap-2 bg-lime-100 text-lime-700 px-4 py-2 rounded-lg hover:bg-lime-200"
          onClick={handleDownloadReport}
        >
          <LuFileSpreadsheet className="text-lg" />
          Bericht herunterladen
        </button>
      </div>

      {/* Grid für UserCards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {allUsers?.map((user) => (
          <UserCard key={user._id} userInfo={user} />
        ))}
      </div>
    </DashboardLayout>
  );
};

export default ManageUsers;
