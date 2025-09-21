import React, { useState } from "react";
import { LuChevronDown } from "react-icons/lu";

/**
 * @component SelectDropdown
 * @desc      Wiederverwendbares Dropdown für Auswahlmöglichkeiten.
 *
 * @prop {Array<{ value: string, label: string }>} options - Liste der verfügbaren Optionen
 * @prop {string|null} value      - Aktuell ausgewählter Wert
 * @prop {Function} onChange      - Callback, der den neuen Wert zurückgibt
 * @prop {string} placeholder     - Platzhaltertext, wenn kein Wert gewählt ist
 */
const SelectDropdown = ({ options, value, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);

  /**
   * @desc  Wählt eine Option aus und schließt das Dropdown
   * @param {string} optionValue - Wert der gewählten Option
   */
  const handleSelect = (optionValue) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full">
      {/* Dropdown-Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-sm text-black outline-none bg-white border border-slate-100 px-2.5 py-3 rounded-md mt-2 flex justify-between items-center"
      >
        {value ? options.find((opt) => opt.value === value)?.label : placeholder}
        <span className="ml-2">
          {isOpen ? <LuChevronDown className="rotate-180" /> : <LuChevronDown />}
        </span>
      </button>

      {/* Dropdown-Menü */}
      {isOpen && (
        <div className="absolute w-full bg-white border border-slate-100 rounded-md mt-1 shadow-md z-10">
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className="px-3 py-2 text-sm cursor-pointer hover:bg-gray-100"
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectDropdown;
