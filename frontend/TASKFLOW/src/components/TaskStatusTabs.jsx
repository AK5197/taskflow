import React from "react";

/**
 * @component TaskStatusTabs
 * @desc      Tabs für die Filterung von Aufgaben nach Status.
 *            - Zeigt Label + Zähler (Count)
 *            - Markiert den aktiven Tab farblich und mit Unterstreichung
 *
 * @prop {Array}  tabs        - Array von Tab-Objekten { label: string, count: number }
 * @prop {string} activeTab   - Aktuell ausgewählter Tab
 * @prop {Function} setActiveTab - Callback zum Setzen des aktiven Tabs
 */
const TaskStatusTabs = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className="flex my-2">
      {tabs.map((tab) => (
        <button
          key={tab.label}
          className={`relative px-3 md:px-4 py-2 text-sm font-medium ${
            activeTab === tab.label
              ? "text-primary"
              : "text-gray-500 hover:text-gray-700"
          } cursor-pointer`}
          onClick={() => setActiveTab(tab.label)}
        >
          {/* Label + Counter */}
          <div className="flex items-center">
            <span className="text-xs">{tab.label}</span>
            <span
              className={`text-xs ml-2 px-2 py-0.5 rounded-full ${
                activeTab === tab.label
                  ? "bg-primary text-white"
                  : "bg-gray-200/70 text-gray-600"
              }`}
            >
              {tab.count}
            </span>
          </div>

          {/* Aktiver Tab Unterstreichung */}
          {activeTab === tab.label && (
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></div>
          )}
        </button>
      ))}
    </div>
  );
};

export default TaskStatusTabs;
