import React from "react";
import UI_IMG from "../../assets/images/auth-img.png";

/**
 * @component AuthLayout
 * @desc      Layout-Komponente für Authentifizierungsseiten (Login/Signup).
 *            - Linke Seite: Logo & Formular
 *            - Rechte Seite: Illustration mit Hintergrund
 *
 * @prop {React.ReactNode} children - Inhalte der Seite (z. B. Login- oder Signup-Formular)
 */
const AuthLayout = ({ children }) => {
  return (
    <div className="flex">
      {/* Linke Seite mit Logo und Formular */}
      <div className="w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12">
        <h1 className="text-5xl font-extrabold text-black-600 tracking-tight">
          TaskFlow
        </h1>

        {children}
      </div>

      {/* Rechte Seite mit Hintergrundgrafik */}
      <div className="hidden md:flex w-[40vw] h-screen items-center justify-center bg-blue-50 bg-[url('/bg-img.png')] bg-cover bg-no-repeat bg-center overflow-hidden p-8">
        <img
          src={UI_IMG}
          alt="Illustration"
          className="w-144 lg:w-[90%] object-contain"
        />
      </div>
    </div>
  );
};

export default AuthLayout;
