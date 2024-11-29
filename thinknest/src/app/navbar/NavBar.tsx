import React from "react";
import Link from "next/link";

const NavBar = () => {
  return (
    <div className="flex justify-center mt-5 text-[0.7rem]">
      <div className="flex flex-col items-start space-y-4">
        <div className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded">
          <img src="../../assets/icons/dashboard_icon.svg" alt="Dashboard" className="w-3 h-3" />
          <Link href="/dashboard">Dashboard</Link>
        </div>

        <div className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded">
          <img src="/assets/icons/calender_icon.svg" alt="Calendar" className="w-3 h-3" />
          <Link href="/calender">Calendar</Link>
        </div>

        <div className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded">
          <img src="/assets/icons/todo_icon.svg" alt="Todo" className="w-3 h-3" />
          <Link href="/todo">Todo</Link>
        </div>

        <div className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded">
          <img src="/assets/icons/notes_icon.svg" alt="Notes" className="w-3 h-3" />
          <Link href="/notes">Notes</Link>
        </div>

        <div className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded">
          <img src="/assets/icons/project_icon.svg" alt="Projects" className="w-3 h-3" />
          <Link href="/projects">Projects</Link>
        </div>

        <div className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded">
          <img src="/assets/icons/settings_icon.svg" alt="Settings" className="w-3 h-3" />
          <Link href="/settings">Settings</Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
