import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

/**
 * @component CustomBarChart
 * @desc      Balkendiagramm mit benutzerdefinierten Farben und deutschem Tooltip.
 *
 * @prop {Array} data - Array mit Objekten im Format:
 *                      { label: string, count: number }
 */
const CustomBarChart = ({ data }) => {
  /**
   * @desc  Gibt die Farbe für einen Balken basierend auf dem Label zurück
   * @param {Object} entry - Datenobjekt mit `label`
   * @returns {string} Hex-Farbcode
   */
  const getBarColor = (entry) => {
    switch (entry?.label) {
      case 'Niedrig':
        return "#22C55E"; // Grün
      case 'Mittel':
        return "#F59E0B"; // Orange
      case 'Hoch':
        return "#EF4444"; // Rot
      default:
        return "#9CA3AF"; // Grau (Fallback)
    }
  };

  /**
   * @component CustomTooltip
   * @desc      Benutzerdefinierter Tooltip in deutscher Sprache
   */
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white shadow-md rounded-lg p-2 border border-gray-300">
          <p className="text-xs font-semibold text-gray-800 mb-1">
            {payload[0].payload.label}
          </p>
          <p className="text-sm text-gray-600">
            Anzahl:{" "}
            <span className="text-sm font-medium text-gray-900">
              {payload[0].payload.count}
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white mt-6">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid stroke="none" />
          <XAxis
            dataKey="label"
            tick={{ fontSize: 12, fill: "#555" }}
            stroke="none"
          />
          <YAxis tick={{ fontSize: 12, fill: "#555" }} stroke="none" />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "transparent" }} />
          <Bar dataKey="count" fill="#FF8042" radius={[10, 10, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={index} fill={getBarColor(entry)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;
