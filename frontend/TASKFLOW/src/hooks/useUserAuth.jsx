import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

/**
 * @hook useUserAuth
 * @desc  Custom Hook zum Schutz von Routen.
 *        - Prüft, ob ein Benutzer eingeloggt ist
 *        - Leitet nicht authentifizierte Nutzer zur Login-Seite um
 *
 * @returns {void}
 */
export const useUserAuth = () => {
  const { user, loading, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;  // Warten, bis der Ladezustand abgeschlossen ist
    if (user) return;     // Wenn User vorhanden ist → nichts tun

    // Kein User → Clear + Redirect
    clearUser();
    navigate("/login");
  }, [user, loading, clearUser, navigate]);
};
