import React from "react";

/**
 * @component AvatarGroup
 * @desc      Zeigt eine Gruppe von Benutzer-Avataren nebeneinander an.
 *            - Begrenzt die Anzahl sichtbarer Avatare durch `maxVisible`
 *            - Falls mehr vorhanden sind, wird ein Zähler angezeigt (+X)
 *
 * @prop {string[]} avatars   - Array mit Avatar-Image-URLs
 * @prop {number}   maxVisible - Maximale Anzahl gleichzeitig sichtbarer Avatare
 */
const AvatarGroup = ({ avatars, maxVisible }) => {
  return (
    <div className="flex items-center">
      {/* Sichtbare Avatare */}
      {avatars.slice(0, maxVisible).map((avatar, index) => (
        <img
          key={index}
          src={avatar}
          alt={`Avatar ${index}`}
          className="w-9 h-9 rounded-full border-2 border-white -ml-3 first:ml-0"
        />
      ))}

      {/* Restliche Avatare als +X Badge */}
      {avatars.length > maxVisible && (
        <div className="w-9 h-9 flex items-center justify-center bg-blue-50 text-sm font-medium rounded-full border-2 border-white -ml-3">
          +{avatars.length - maxVisible}
        </div>
      )}
    </div>
  );
};

export default AvatarGroup;
