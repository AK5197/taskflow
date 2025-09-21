import React, { useState } from 'react';
import { HiMiniPlus, HiOutlineTrash } from "react-icons/hi2";

/**
 * @component TodoListInput
 * @desc      Eingabefeld zur Verwaltung einer ToDo-Liste (Hinzufügen und Entfernen von Items).
 *
 * @prop {Array<string>} todoList   - Aktuelle Liste von ToDo-Items
 * @prop {Function} setTodoList     - Setter zum Aktualisieren der ToDo-Liste
 */
const TodoListInput = ({ todoList, setTodoList }) => {
  const [option, setOption] = useState("");

  /**
   * @desc  Fügt ein neues ToDo-Item hinzu
   */
  const handleAddOption = () => {
    if (option.trim()) {
      setTodoList([...todoList, option.trim()]);
      setOption("");
    }
  };

  /**
   * @desc  Entfernt ein ToDo-Item anhand des Index
   * @param {number} index - Position des zu löschenden Items
   */
  const handleDeleteOption = (index) => {
    const updatedArr = todoList.filter((_, idx) => idx !== index);
    setTodoList(updatedArr);
  };

  return (
    <div>
      {/* Liste der ToDo-Items */}
      {todoList.map((item, index) => (
        <div
          key={item}
          className="flex justify-between bg-gray-50 border border-gray-100 px-3 py-2 rounded-md mb-3 mt-2"
        >
          <p className="text-xs text-black">
            <span className="text-xs text-gray-400 font-semibold mr-2">
              {index < 9 ? `0${index + 1}` : index + 1}
            </span>
            {item}
          </p>
          <button
            className="cursor-pointer"
            onClick={() => handleDeleteOption(index)}
          >
            <HiOutlineTrash className="text-lg text-red-500" />
          </button>
        </div>
      ))}

      {/* Eingabe für neues ToDo */}
      <div className="flex items-center gap-5 mt-4">
        <input
          type="text"
          placeholder="Todo hinzufügen"
          value={option}
          onChange={({ target }) => setOption(target.value)}
          className="w-full text-[13px] text-black outline-none bg-white border border-gray-100 px-3 py-2 rounded-md"
        />
        <button
          className="card-btn text-nowrap"
          onClick={handleAddOption}
        >
          <HiMiniPlus className="text-lg" /> 
        </button>
      </div>
    </div>
  );
};

export default TodoListInput;
