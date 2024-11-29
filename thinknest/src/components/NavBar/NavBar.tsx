import React from "react";

const NavBar = () => {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-start space-y-4">
        <div className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded">
          <img src="../../assets/icons/dashboard_icon.svg" alt="Dashboard" className="w-4 h-4" />
          <span>Dashboard</span>
        </div>

        <div className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded">
          <img src="/assets/icons/calender_icon.svg" alt="Calendar" className="w-4 h-4" />
          <span>Calendar</span>
        </div>

        <div className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded">
          <img src="/assets/icons/todo_icon.svg" alt="Todo" className="w-4 h-4" />
          <span>Todo</span>
        </div>

        <div className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded">
          <img src="/assets/icons/notes_icon.svg" alt="Notes" className="w-4 h-4" />
          <span>Notes</span>
        </div>

        <div className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded">
          <img src="/assets/icons/project_icon.svg" alt="Projects" className="w-4 h-4" />
          <span>Projects</span>
        </div>

        <div className="flex items-center space-x-3 hover:bg-gray-700 p-2 rounded">
          <img src="/assets/icons/settings_icon.svg" alt="Settings" className="w-4 h-4" />
          <span>Settings</span>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
