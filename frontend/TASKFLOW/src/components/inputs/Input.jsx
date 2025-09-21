import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

/**
 * @component Input
 * @desc      Wiederverwendbares Eingabefeld mit optionaler Passwort-Anzeige.
 *
 * @prop {string} value        - Aktueller Wert des Eingabefeldes
 * @prop {Function} onChange   - Event-Handler für Änderungen
 * @prop {string} label        - Beschriftung über dem Eingabefeld
 * @prop {string} placeholder  - Platzhaltertext
 * @prop {string} type         - Eingabetyp (z. B. "text", "email", "password")
 */
const Input = ({ value, onChange, label, placeholder, type }) => {
  const [showPassword, setShowPassword] = useState(false);

  /**
   * @desc  Wechselt zwischen Passwort-Anzeige und -Verbergen
   */
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <label className="text-[13px] text-slate-800">{label}</label>

      <div className="input-box">
        <input
          type={type === "password" ? (showPassword ? "text" : "password") : type}
          placeholder={placeholder}
          className="w-full bg-transparent outline-none"
          value={value}
          onChange={(e) => onChange(e)}
        />

        {type === "password" &&
          (showPassword ? (
            <FaRegEye
              size={22}
              className="text-primary cursor-pointer"
              onClick={toggleShowPassword}
            />
          ) : (
            <FaRegEyeSlash
              size={22}
              className="text-slate-400 cursor-pointer"
              onClick={toggleShowPassword}
            />
          ))}
      </div>
    </div>
  );
};

export default Input;
