"use client";

import HeaderTitle from "@/components/HeaderTitle";
import React, { useState, useContext } from "react";
import { Compact } from "@uiw/react-color";
import { ThemeContext } from "@/lib/ThemeContext";
import { useName } from "@/lib/NameContext";

const Settings = () => {
  const { setBackgroundColor } = useContext(ThemeContext)!;
  const { name, setName, profileImage, setProfileImage } = useName();
  const [color, setColor] = useState("#83aee6");
  const [inputName, setInputName] = useState("");
  const [inputImage, setInputImage] = useState("");

  const handleChangeComplete = (color) => {
    setColor(color.hex);
  };

  const handleChangeBackground = () => {
    setBackgroundColor(color);
  };

  const handleResetBackground = () => {
    setBackgroundColor("#F9F9F9"); // Standardfarbe
  };

  const handleInputChange = (event) => {
    setInputName(event.target.value);
  };

  const handleChangeName = () => {
    setName(inputName);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImage(reader.result as string);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <HeaderTitle title="Settings" />
      <div className="mt-5">
        <a
          href="https://forms.office.com/e/fKEW4rxy1z?origin=lprLink"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 mb-10 py-2 text-ml text-white bg-black rounded hover:bg-green-700"
        >
          Give us your feedback
        </a>
        <h2 className="mt-10 mb-2">Change your profile picture</h2>
        <Compact className="" color={color} onChange={handleChangeComplete} />
        <button
          onClick={handleChangeBackground}
          className="px-4 py-2 text-ml text-white bg-black rounded hover:bg-green-700 mr-4"
        >
          Change Background
        </button>
        <button
          onClick={handleResetBackground}
          className="px-4 mt-1 py-2 text-ml text-white bg-red-500 rounded hover:bg-red-700"
        >
          Reset Background
        </button>
        <div className="float-bottom mt-10">
          <h2>Change your name</h2>
          <input
            placeholder="schreibe herein"
            onChange={handleInputChange}
            className="px-4 py-2 border rounded"
          />
          <button
            onClick={handleChangeName}
            className="px-4 py-2 text-ml text-white bg-blue-500 rounded hover:bg-blue-700 ml-2"
          >
            Change Name
          </button>
        </div>
        <div className="float-bottom mt-10">
          <h2>Change your profile picture</h2>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="px-4 py-2 border rounded"
          />
        </div>
      </div>
    </div>
  );
};

export default Settings;