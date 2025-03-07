"use client";

import HeaderTitle from "@/components/HeaderTitle";
import React, { useState, useEffect } from "react";
import 'bootstrap-icons/font/bootstrap-icons.css';

interface SettingsProps {
  isDarkMode: boolean;
  setIsDarkMode: (value: boolean) => void;
}

const Settings: React.FC<SettingsProps> = ({ isDarkMode, setIsDarkMode }) => {
  const profileImages = [
    "/assets/profile_img/green.png",
    "/assets/profile_img/Banana.jpg",
    "/assets/profile_img/Duck.jpg",
    "/assets/profile_img/Goose.png",
    "/assets/profile_img/Monkey.png",
    "/assets/profile_img/maus.jpg"
  ];

  const storedImage = localStorage.getItem("profileImage") || profileImages[0];

  const [selectedImage, setSelectedImage] = useState<string>(storedImage);
  const [tempImage, setTempImage] = useState<string>(storedImage);
  const [userName, setUserName] = useState<string>(localStorage.getItem("userName") || "John Doe");
  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    localStorage.setItem("profileImage", selectedImage);
  }, [selectedImage]);

  const handleImageSelection = (image: string) => {
    setTempImage(image);
  };

  const handleConfirmImage = () => {
    setSelectedImage(tempImage);
    window.location.reload(); // Seite neu laden
  };

  const handleResetProfilePicture = () => {
    setSelectedImage(profileImages[0]); // Standardbild setzen
    setTempImage(profileImages[0]);
    window.location.reload(); // Seite neu laden
  };

  const handleUserNameChange = () => {
    if (inputValue.trim() !== "") {
      localStorage.setItem("userName", inputValue);
      setUserName(inputValue);
      setInputValue(""); // Input-Feld leeren
      window.location.reload(); // Seite neu laden
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="settings-container bg-gray-50/60 dark:bg-gray-800 p-5 rounded-lg">
      <HeaderTitle title="Settings" />

      {/* Theme Toggle */}
      <h1 className="text-xl">Themes</h1>
      <div className="mt-2 p-5 border-black dark:border-gray-900 border-4 rounded-2xl transition-colors duration-300 flex justify-between items-center">
        <p>Change Background Theme</p>
        <button
          onClick={toggleTheme}
          className="px-4 py-2 text-ml text-white bg-black dark:bg-white rounded hover:bg-green-950 dark:hover:bg-green-800 transition-colors duration-300"
          dangerouslySetInnerHTML={{
            __html: isDarkMode
              ? '<i class="bi bi-brightness-high-fill text-black"></i>'
              : '<i class="bi bi-moon-stars"></i>',
          }}
        ></button>
      </div>

      {/* Personal Information */}
      <h1 className="text-xl mt-11">Personal Information</h1>
      <div className="mt-2 p-5 border-black dark:border-gray-900 border-4 rounded-2xl transition-colors duration-300">
        
        {/* Profilbild Auswahl */}
        <p className="text-lg">Profile Picture</p>
        <div className="mb-8 justify-between items-center flex">
          <div className="flex gap-4 mt-3">
            {profileImages.map((image) => (
              <img
                key={image}
                src={image}
                alt="Profile"
                className={`w-16 h-16 rounded-full cursor-pointer border-4 transition-all ${
                  tempImage === image ? "border-blue-500" : "border-transparent"
                }`}
                onClick={() => handleImageSelection(image)}
              />
            ))}
          </div>
          <div className="">
          <button
            onClick={handleConfirmImage}
            className="mt-2 px-3 py-1 text-sm text-white bg-green-600 rounded hover:bg-green-800"
          >
            Confirm Profile Picture
          </button>
          <button
            onClick={handleResetProfilePicture}
            className="mt-2 ml-3 px-3 py-1 text-sm text-white bg-red-600 rounded hover:bg-red-800"
          >
            Reset
          </button>
          </div>
        </div>

        <hr />

        {/* Username ändern */}
        <div className="mt-6 justify-between items-center flex">
          <div className="">
          <p className="text-lg">Username</p>
          <p className="mt-3">Change Username:</p>
          <p className="font-medium">
            Current Username: <span className="text-lg font-bold">{userName}</span>
          </p>
          </div>
          <div className="">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="mt-3 p-2 border border-gray-300 rounded w-full dark:bg-sky-950 transition-colors duration-300"
            placeholder="Enter new username"
          />
          <button
            onClick={handleUserNameChange}
            className="mt-2 px-3 py-1 text-sm text-white bg-blue-600 rounded hover:bg-blue-800"
          >
            Confirm
          </button>
          </div>
        </div>
      </div>

      {/* Feedback Section */}
      <div className="mt-14">
        <p className="text-2xl mb-3 mt-14">Give us your feedback!</p>
        <a
          href="https://forms.office.com/e/fKEW4rxy1z?origin=lprLink"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 text-ml text-white bg-black rounded hover:bg-green-700"
        >
          Give us your feedback
        </a>
      </div>
    </div>
  );
};

export default Settings;
