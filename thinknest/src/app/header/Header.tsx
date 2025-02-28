"use client";

import { useEffect, useState } from "react";

interface HeaderProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ isDarkMode, toggleTheme }) => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>("John Doe");

  useEffect(() => {
    setProfileImage(localStorage.getItem("profileImage") || null);
    setUserName(localStorage.getItem("userName") || "John Doe");
  }, []);

  return (
    <div className="flex items-center justify-between p-4 pt-6">
      <div className="font-bold ml-5 text-2xl">
        <div className="cursor-pointer" onClick={() => window.location.reload()}>
          Think<span className="text-[#28AD5E]">Nest</span>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <button
          onClick={toggleTheme}
          className="px-3 py-2 text-white bg-black dark:bg-white rounded hover:bg-gray-800 dark:hover:bg-gray-300 transition-colors duration-300"
          dangerouslySetInnerHTML={{
            __html: isDarkMode
              ? '<i class="bi bi-brightness-high-fill text-black dark:text-white"></i>'
              : '<i class="bi bi-moon-stars dark:text-black text-white"></i>',
          }}
        ></button>
        <p className="font-medium text-md">{userName}</p>
        {profileImage ? (
          <img src={profileImage} alt="Profile" className="w-7 h-7 rounded-full object-cover" />
        ) : (
          <div className="w-7 h-7 rounded-full bg-[#28AD5E]" />
        )}
      </div>
    </div>
  );
};

export default Header;
