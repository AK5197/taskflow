// src/components/cards/UserCard.jsx
import React from "react";

/**
 * @component UserCard
 * @desc      Zeigt eine Benutzerkarte mit Avatar, Name, E-Mail und Task-Statistiken.
 *
 * @prop {Object} userInfo                - Benutzerinformationen
 * @prop {string} userInfo.name           - Name des Benutzers
 * @prop {string} userInfo.email          - E-Mail-Adresse des Benutzers
 * @prop {string} [userInfo.profileImageUrl] - URL zum Profilbild (optional)
 * @prop {Object} [userInfo.taskStats]    - Statistiken der Tasks
 * @prop {number} [userInfo.taskStats.pending]    - Anzahl offener Tasks
 * @prop {number} [userInfo.taskStats.inProgress] - Anzahl laufender Tasks
 * @prop {number} [userInfo.taskStats.completed]  - Anzahl abgeschlossener Tasks
 */
const UserCard = ({ userInfo }) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-5 hover:shadow-lg transition-all duration-300">
      {/* Header mit Avatar und Benutzerinformationen */}
      <div className="flex items-center gap-4">
        <img
          src={userInfo.profileImageUrl || "/default-avatar.png"}
          alt={userInfo.name}
          className="w-12 h-12 rounded-full object-cover border"
        />
        <div>
          <h3 className="text-sm font-semibold text-gray-800">
            {userInfo.name}
          </h3>
          <p className="text-xs text-gray-500">{userInfo.email}</p>
        </div>
      </div>

      {/* Trennlinie */}
      <div className="border-t my-3" />

      {/* Task-Status-Statistiken */}
      <div className="grid grid-cols-3 text-center">
        <div>
          <p className="text-lg font-bold text-purple-600">
            {userInfo.taskStats?.pending || 0}
          </p>
          <p className="text-xs text-gray-500">Offen</p>
        </div>
        <div>
          <p className="text-lg font-bold text-teal-600">
            {userInfo.taskStats?.inProgress || 0}
          </p>
          <p className="text-xs text-gray-500">In Bearbeitung</p>
        </div>
        <div>
          <p className="text-lg font-bold text-green-600">
            {userInfo.taskStats?.completed || 0}
          </p>
          <p className="text-xs text-gray-500">Abgeschlossen</p>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
