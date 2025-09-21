import React, { useEffect, useState } from "react";
import { API_PATHS } from "../../utils/apiPaths";
import axiosInstance from "../../utils/axiosInstance";
import { LuUsers } from "react-icons/lu";
import Modal from "../../components/Modal";
import AvatarGroup from "../../components/AvatarGroup";

/**
 * @component SelectUsers
 * @desc      Komponente zur Auswahl mehrerer Benutzer über ein Modal.
 *
 * @prop {Array<string>} selectedUsers    - IDs der aktuell ausgewählten Benutzer
 * @prop {Function} setSelectedUsers      - Setter zum Aktualisieren der Auswahl
 */
const SelectUsers = ({ selectedUsers, setSelectedUsers }) => {
  const [allUsers, setAllUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempSelectedUsers, setTempSelectedUsers] = useState([]);

  /**
   * @desc  Lädt alle Benutzer vom Backend
   */
  const getAllUsers = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.USERS.GET_ALL_USERS);

      if (response.data?.length > 0) {
        setAllUsers(response.data);
      } else if (response.data?.users?.length > 0) {
        // Falls API die Benutzer in { users: [...] } zurückgibt
        setAllUsers(response.data.users);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  /**
   * @desc  Schaltet Benutzer in der temporären Auswahl ein/aus
   * @param {string} userId - ID des Benutzers
   */
  const toggleUserSelection = (userId) => {
    setTempSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  /**
   * @desc  Bestätigt die Auswahl und schließt das Modal
   */
  const handleAssign = () => {
    setSelectedUsers(tempSelectedUsers);
    setIsModalOpen(false);
  };

  // Avatare für aktuell ausgewählte Benutzer
  const selectedUserAvatars = allUsers
    .filter((user) => selectedUsers.includes(user._id))
    .map((user) => user.profileImageUrl || "/default-avatar.png");

  // Benutzer laden beim ersten Render
  useEffect(() => {
    getAllUsers();
  }, []);

  // Temporäre Auswahl synchronisieren
  useEffect(() => {
    setTempSelectedUsers(selectedUsers);
  }, [selectedUsers]);

  return (
    <div className="space-y-2 mt-2">
      {/* Button zum Öffnen des Modals */}
      <button className="card-btn" onClick={() => setIsModalOpen(true)}>
        <LuUsers className="text-sm" /> Teammitglied auswählen
      </button>

      {/* Anzeige ausgewählter Benutzer als Avatar-Gruppe */}
      {selectedUsers.length > 0 && (
        <div className="cursor-pointer" onClick={() => setIsModalOpen(true)}>
          <AvatarGroup avatars={selectedUserAvatars} maxVisible={3} />
        </div>
      )}

      {/* Modal für Benutzer-Auswahl */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Teammitglied auswählen"
      >
        <div className="space-y-4 h-[60vh] overflow-y-auto">
          {allUsers.map((user) => (
            <div
              key={user._id}
              className="flex items-center gap-4 p-3 border-b border-gray-200 cursor-pointer hover:bg-gray-50"
              onClick={() => toggleUserSelection(user._id)}
            >
              <img
                src={user.profileImageUrl || "/default-avatar.png"}
                alt={user.name}
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1">
                <p className="font-medium text-gray-800">{user.name}</p>
                <p className="text-[13px] text-gray-500">{user.email}</p>
              </div>
              <input
                type="checkbox"
                checked={tempSelectedUsers.includes(user._id)}
                onChange={() => toggleUserSelection(user._id)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
            </div>
          ))}
        </div>

        {/* Modal Footer */}
        <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-gray-200">
          <button
            onClick={() => setIsModalOpen(false)}
            className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Abbrechen
          </button>
          <button
            onClick={handleAssign}
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Zuweisen
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default SelectUsers;
