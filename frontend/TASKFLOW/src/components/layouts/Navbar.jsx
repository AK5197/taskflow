import React, { useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import SideMenu from "./SideMenu";

/**
 * @component Navbar
 * @desc      Navigationsleiste oben im Dashboard.
 *            - Zeigt den Titel/Logo
 *            - Hamburger-Menü für mobile Ansicht
 *            - Bindet das SideMenu auf mobilen Geräten ein
 *
 * @prop {string} activeMenu - Name des aktuell aktiven Menüpunktes
 */
const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);

  return (
    <div className="sticky top-0 z-30 flex gap-5 bg-white border border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-7">
      {/* Mobile-Menü Button */}
      <button
        className="block lg:hidden text-black"
        onClick={() => setOpenSideMenu(!openSideMenu)}
      >
        {openSideMenu ? (
          <HiOutlineX className="text-2xl" />
        ) : (
          <HiOutlineMenu className="text-2xl" />
        )}
      </button>

      {/* Logo / Titel */}
      <h1 className="text-2xl font-bold text-black tracking-tight">
        Task Flow
      </h1>

      {/* Mobiles SideMenu */}
      {openSideMenu && (
        <div className="fixed top-[61px] ml-4 bg-white">
          <SideMenu activeMenu={activeMenu} />
        </div>
      )}
    </div>
  );
};

export default Navbar;
