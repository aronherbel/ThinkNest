"use client";

import HeaderTitle from "@/components/HeaderTitle";
import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import 'bootstrap-icons/font/bootstrap-icons.css';

interface SettingsProps {
  isDarkMode: boolean;
  setIsDarkMode: (value: boolean) => void;
}

const Settings: React.FC<SettingsProps> = ({ isDarkMode, setIsDarkMode }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(
    localStorage.getItem("profileImage") || null
  );
  const [userName, setUserName] = useState<string>(localStorage.getItem("userName") || "John Doe");
  const [inputValue, setInputValue] = useState<string>("");
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [showCropper, setShowCropper] = useState(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result as string);
        setShowCropper(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    console.log(croppedArea, croppedAreaPixels);
  }, []);

  const handleSaveCroppedImage = async () => {
    if (imageSrc) {
      setCroppedImage(imageSrc);
      localStorage.setItem("profileImage", imageSrc);
      setSelectedImage(imageSrc);
      setShowCropper(false);
    }
  };

  const handleResetProfilePicture = () => {
    localStorage.removeItem("profileImage");
    setSelectedImage(null);
  };

  const handleUserNameChange = () => {
    if (inputValue.trim() !== "") {
      localStorage.setItem("userName", inputValue);
      setUserName(inputValue);
      setInputValue("");
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="settings-container bg-gray-50/60 dark:bg-gray-800 p-5 rounded-lg">
      <HeaderTitle title="Settings" />
      <h1 className="text-xl">Themes</h1>
      <div className="mt-2 p-5 border-black dark:border-gray-900 border-4 rounded-2xl flex justify-between items-center">
        <p>Change Background theme</p>
        <button onClick={toggleTheme} className="px-4 py-2 text-white bg-black dark:bg-white rounded">
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
      <h1 className="text-xl mt-11">Personal Information</h1>
      <div className="mt-2 p-5 border-black dark:border-gray-900 border-4 rounded-2xl">
        <div className="flex justify-between items-center mb-8">
          <p className="text-lg">Profile Picture</p>
          <div>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            {selectedImage && (
              <div className="flex flex-col items-start">
                <img src={selectedImage} alt="Selected" className="mt-2 w-16 h-16 rounded-full object-cover" />
                <button onClick={handleResetProfilePicture} className="mt-2 px-2 py-1 text-sm text-white bg-red-600 rounded">
                  Reset Profile Picture
                </button>
              </div>
            )}
          </div>
        </div>
        <hr />
        <div className="flex justify-between items-center">
          <div>
            <p className="text-lg mt-6">Username</p>
            <p className="mt-3">Change Username:</p>
            <p className="font-medium">Current Username: <span className="text-lg font-bold">{userName}</span></p>
          </div>
          <div>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="mt-11 p-2 border border-gray-300 rounded w-full dark:bg-sky-950"
              placeholder="Enter new username"
            />
            <button onClick={handleUserNameChange} className="mt-1 px-3 py-1 text-sm text-white bg-blue-600 rounded">
              Confirm
            </button>
          </div>
        </div>
      </div>
      {showCropper && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-5 rounded-lg">
            <h2 className="text-lg font-bold mb-3">Adjust your Profile Picture</h2>
            <div className="relative w-64 h-64">
              <Cropper
                image={imageSrc!}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>
            <button onClick={handleSaveCroppedImage} className="mt-3 px-3 py-1 text-sm text-white bg-blue-600 rounded">
              Save
            </button>
            <button onClick={() => setShowCropper(false)} className="ml-3 px-3 py-1 text-sm text-white bg-gray-600 rounded">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
