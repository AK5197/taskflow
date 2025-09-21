import React, { useRef, useState } from "react";
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";

/**
 * @component ProfilePhotoSelector
 * @desc      Komponente zum Hochladen, Anzeigen und Entfernen eines Profilbildes.
 *
 * @prop {File|null} image        - Aktuell gewähltes Bild (oder null)
 * @prop {Function} setImage      - Setter-Funktion zum Aktualisieren des Bildes
 */
const ProfilePhotoSelector = ({ image, setImage }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  /**
   * @desc  Verarbeitet die Auswahl einer Bilddatei und erzeugt eine Vorschau
   * @param {Event} event - File-Input Change Event
   */
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
    }
  };

  /**
   * @desc  Entfernt das aktuell gewählte Bild
   */
  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);
  };

  /**
   * @desc  Öffnet den Dateiauswahldialog
   */
  const onChooseFile = () => {
    inputRef.current.click();
  };

  return (
    <div className="flex justify-center mb-6">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      {/* Kein Bild ausgewählt → Standard-Avatar mit Upload-Button */}
      {!image ? (
        <div className="w-20 h-20 flex items-center justify-center bg-blue-100/50 rounded-full relative cursor-pointer">
          <LuUser className="text-4xl text-primary" />
          <button
            type="button"
            className="w-8 h-8 flex items-center justify-center bg-white rounded-full absolute -bottom-1 -right-1 cursor-pointer border border-primary"
            onClick={onChooseFile}
          >
            <LuUpload className="text-primary w-4 h-4" />
          </button>
        </div>
      ) : (
        /* Bild ausgewählt → Vorschau mit Entfernen-Button */
        <div className="relative">
          <img
            src={previewUrl}
            alt="profile"
            className="w-20 h-20 rounded-full object-cover"
          />
          <button
            type="button"
            className="w-8 h-8 flex items-center justify-center bg-red-500 rounded-full absolute -bottom-1 -right-1"
            onClick={handleRemoveImage}
          >
            <LuTrash className="text-white w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePhotoSelector;
