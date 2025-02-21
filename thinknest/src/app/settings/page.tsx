"use client";

import React, { useState, useEffect } from "react";
import Settings from "@/app/settings/settings";

const SettingsPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <div className="min-h-screen bg-gray-50/60 dark:bg-gray-800 transition-colors duration-300">
      <Settings isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
    </div>
  );
};

export default SettingsPage;
