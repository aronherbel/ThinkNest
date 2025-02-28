"use client";

import HeaderTitle from "@/components/HeaderTitle";
import React, { useState } from "react";
import 'bootstrap-icons/font/bootstrap-icons.css';


interface SettingsProps {
  isDarkMode: boolean;
  setIsDarkMode: (value: boolean) => void;
}

const Settings: React.FC<SettingsProps> = ({ isDarkMode, setIsDarkMode }) => {
  const [imagePosition, setImagePosition] = useState<string>("center");
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
      <h1 className="text-xl">Themes</h1>
      <div className="mt-2 p-5 border-black dark:border-gray-900 border-4 rounded-2xl transition-colors duration-300 flex justify-between items-center">
        <p className="">Change Background theme</p>
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

      {/* Profilbild Upload */}
      <h1 className="text-xl mt-11">Personal Information</h1>
      <div className="mt-2 p-5 border-black dark:border-gray-900 border-4 rounded-2xl transition-colors duration-300">

        <div className=" flex justify-between items-center mb-8">
          <div className="">
            <div className="" style={{ marginBottom: "30%" }}>
              <p className="text-lg">Profile Picture</p>
            </div>
          </div>
          <div className="">
            <input type="file" accept="image/*" onChange={handleImageUpload} className="" />
            {selectedImage && (
              <div className="flex flex-col items-start">
                <img src={selectedImage} alt="Selected" className="mt-2 w-16 h-16 rounded-full object-cover ms-9" />
                <button
                  onClick={handleResetProfilePicture}
                  className="mt-2 px-2 py-1 text-sm text-white bg-red-600 rounded hover:bg-red-800"
                >
                  Reset Profile Picture
                </button>
              </div>
            )}
          </div>
        </div>
        <hr/>
        <div className=" flex justify-between items-center">
          <div className="">
            <p className="text-lg mt-6">Username</p>
            <p className="mt-3">Change Username:</p>
            <div className="">
              <p className="font-medium">Current Username: <span className="text-lg font-bold">{userName}</span></p>
            </div>
          </div>
          <div className="">

            <div className="mt-10">

              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="mt-11 p-2 border border-gray-300 rounded w-full  dark:bg-sky-950 transition-colors duration-300"
                placeholder="Enter new username"
              />
              <button
                onClick={handleUserNameChange}
                className="mt-1 px-3 py-1 text-sm text-white bg-blue-600 rounded hover:bg-blue-800"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>

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