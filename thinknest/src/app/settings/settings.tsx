"use client";

import HeaderTitle from "@/components/HeaderTitle";
import React, { useState } from "react";

const Settings = ({ isDarkMode, setIsDarkMode }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(
    localStorage.getItem("profileImage") || null
  );
  const [userName, setUserName] = useState<string>(localStorage.getItem("userName") || "John Doe");
  const [inputValue, setInputValue] = useState<string>("");

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result as string;
        localStorage.setItem("profileImage", imageUrl);
        window.location.reload(); // Seite aktualisieren
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetProfilePicture = () => {
    localStorage.removeItem("profileImage");
    window.location.reload(); // Seite aktualisieren
  };

  const handleUserNameChange = () => {
    if (inputValue.trim() !== "") {
      localStorage.setItem("userName", inputValue);
      setUserName(inputValue);
      setInputValue(""); // Input-Feld leeren
      window.location.reload(); // Seite aktualisieren
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`settings-container bg-gray-50/60 dark:bg-gray-800 p-5 rounded-lg`}>
      <HeaderTitle title="Settings" />

      <div className="mt-5">
        <a
          href="https://forms.office.com/e/fKEW4rxy1z?origin=lprLink"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 text-ml text-white bg-black rounded hover:bg-green-700"
        >
          Give us your feedback
        </a>
      </div>

      <div className="mt-5">
        <button
          onClick={toggleTheme}
          className="px-4 py-2 text-ml text-white bg-black rounded hover:bg-green-700"
        >
          {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        </button>
      </div>

      {/* Profilbild Upload */}
      <div className="mt-5">
        <p className="font-medium">Upload Profile Picture:</p>
        <input type="file" accept="image/*" onChange={handleImageUpload} className="mt-2 " />
        {selectedImage && (
          <div className="mt-3 flex flex-col items-start">
            <img src={selectedImage} alt="Selected" className="w-16 h-16 rounded-full object-cover ms-9" />
            <button
              onClick={handleResetProfilePicture}
              className="mt-2 px-2 py-1 text-sm text-white bg-red-600 rounded hover:bg-red-800"
            >
              Reset Profile Picture
            </button>
          </div>
        )}
      </div>

      {/* Benutzername ändern */}
      <div className="mt-5">
        <p className="font-medium">Change Username:</p>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="mt-2 p-2 border border-gray-300 rounded w-full  dark:bg-sky-950 transition-colors duration-300"
          placeholder="Enter new username"
        />
        <button
          onClick={handleUserNameChange}
          className="mt-2 px-3 py-1 text-sm text-white bg-blue-600 rounded hover:bg-blue-800"
        >
          Confirm
        </button>
      </div>

      <div className="mt-5">
        <p className="font-medium">Current Username: <span className="text-lg font-bold">{userName}</span></p>
      </div>
    </div>
  );
};

export default Settings;
