import React, { createContext, useState, useEffect, useContext } from "react";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";

export const UserContext = createContext();

/**
 * @component UserProvider
 * @desc      Kontext-Provider für Benutzerdaten und Authentifizierung.
 *            - Lädt Benutzerdaten aus API oder LocalStorage
 *            - Enthält Funktionen zum Aktualisieren und Löschen des Users
 *
 * @prop {React.ReactNode} children - App-Komponenten, die Zugriff auf UserContext benötigen
 */
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);     // Aktueller Benutzer
  const [loading, setLoading] = useState(true); // Ladezustand (z. B. beim Initialisieren)

  useEffect(() => {
    if (user) return;

    const accessToken = localStorage.getItem("token");
    if (!accessToken) {
      setLoading(false);
      return;
    }

    /**
     * @desc Holt Benutzerdaten vom Backend
     */
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE);
        setUser(response.data);
      } catch (error) {
        console.error("User not authenticated", error);
        clearUser();
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [user]);

  /**
   * @desc Aktualisiert Benutzer und speichert Token im LocalStorage
   * @param {Object} userData - Neue Benutzerdaten inkl. Token
   */
  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem("token", userData.token);
    setLoading(false);
  };

  /**
   * @desc Setzt User zurück und entfernt Token
   */
  const clearUser = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <UserContext.Provider value={{ user, loading, updateUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

/**
 * @hook useUserContext
 * @desc  Vereinfachter Zugriff auf UserContext
 * @returns {{user: Object|null, loading: boolean, updateUser: Function, clearUser: Function}}
 */
export const useUserContext = () => useContext(UserContext);
