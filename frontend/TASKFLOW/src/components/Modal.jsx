import React from "react";
import ReactDOM from "react-dom";

/**
 * @component Modal
 * @desc      Wiederverwendbare Modal-Komponente mit Portal.
 *            - Blockiert den Hintergrund mit einem Overlay
 *            - Header mit Titel und Close-Button
 *            - Dynamischer Body für beliebige Inhalte
 *
 * @prop {React.ReactNode} children - Inhalt des Modals
 * @prop {boolean} isOpen           - Steuert die Sichtbarkeit des Modals
 * @prop {function} onClose         - Callback zum Schließen des Modals
 * @prop {string} title             - Titelzeile des Modals
 */
const Modal = ({ children, isOpen, onClose, title }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/20 bg-opacity-50">
      <div className="relative p-4 w-full max-w-2xl max-h-full">
        {/* Modal Container */}
        <div className="relative bg-white rounded-lg shadow-sm">
          {/* Header */}
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              {title}
            </h3>

            {/* Close-Button */}
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
              onClick={onClose}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1 6 6m0 0 6-6M7 6l6 6M7 6l-6 6"
                />
              </svg>
            </button>
          </div>

          {/* Body */}
          <div className="p-4 md:p-5 space-y-4">{children}</div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
