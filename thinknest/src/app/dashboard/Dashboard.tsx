"use client";
import CalendarStat from "./components/CalendarStat";
import TodoStat from "./components/TodoStat";
import HeaderTitle from "@/components/HeaderTitle";
import NotesStat from "./components/NotesStat";
import ProjectStat from "./components/ProjectStat";

const Dashboard = () => {
  return (
    <>
      <div className="flex justify-between ">
        <HeaderTitle title="Today" />
      </div>
      <div className=" flex justify-center mb-10 ">
      </div>

      <div>
        <div className="flex justify-between space-x-4 mb-10">
          <CalendarStat />
          <TodoStat />
        </div>
        <div className="flex justify-between space-x-4">
          <NotesStat />
          <ProjectStat />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
