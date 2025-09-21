import React from 'react';

/**
 * @component InfoCard
 * @desc      Zeigt eine kleine Informationskarte mit Indikator, Label und Wert
 *
 * @prop {string} icon   - Optionales Icon (derzeit ungenutzt)
 * @prop {string} label  - Beschriftung des Werts
 * @prop {string|number} value - Anzuzeigender Wert
 * @prop {string} color  - Tailwind-Farbklasse für den Indikator
 */
const InfoCard = ({ icon, label, value, color }) => {
  return (
    <div className="flex items-center gap-3">
      <div className={`w-2 md:w-2 h-3 md:h-5 ${color} rounded-full`} />
      <p className="text-xs md:text-[14px] text-gray-500">
        {label}
        <span className="text-sm md:text-[15px] text-black font-semibold">
          {value}
        </span>
      </p>
    </div>
  );
};

export default InfoCard;
