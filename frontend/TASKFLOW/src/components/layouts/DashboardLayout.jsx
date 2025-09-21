import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import Navbar from "../layouts/Navbar";
import SideMenu from "../layouts/SideMenu";

/**
 * @component DashboardLayout
 * @desc      Layout-Komponente für das Dashboard.
 *            - Zeigt Navbar oben
 *            - Seitenmenü links (nur Desktop)
 *            - Hauptinhalt rechts
 *
 * @prop {React.ReactNode} children  - Hauptinhalt der Seite
 * @prop {string} activeMenu         - Name des aktiven Menüpunkts im SideMenu
 */
const DashboardLayout = ({ children, activeMenu }) => {
  const { user } = useContext(UserContext);

  if (!user) {
    return <div className="text-center p-4">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Obere Navigationsleiste */}
      <Navbar activeMenu={activeMenu} />

      <div className="flex flex-1">
        {/* Linkes Menü (nur auf großen Bildschirmen sichtbar) */}
        <div className="hidden lg:block">
          <SideMenu activeMenu={activeMenu} />
        </div>

        {/* Hauptinhalt */}
        <div className="flex-1 p-5">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
