"use client";
import React, { useEffect, useState } from "react";
import Timer from "./components/Timer";
import WeeklyActivity from "./components/WeeklyActivity";
import WorkedToday from "./components/WorkedToday";
import RemainingWeek from "./components/RemainingToday";
import CalenderStat from "./components/CalenderStat";
import TodoStat from "./components/TodoStat";


const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState<Date | null>(null);

  useEffect(() => {
    setCurrentTime(new Date());
    const timerInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timerInterval);
  }, []);

  const formatDateTime = (date: Date) => {
    const day = date.toLocaleDateString("de-DE", { weekday: "short" });
    const dayNumber = date.getDate().toString().padStart(2, "0");
    const year = date.getFullYear();
    const time = date.toLocaleTimeString("de-DE", {
      hour: "2-digit",
      minute: "2-digit",
    });

    return `${day} ${dayNumber}, ${year} | ${time}`;
  };

  return (
    <>
      <div className="mb-10 flex justify-between">
        <div className="flex flex-col">
          <div className="text-3xl font-bold">Today</div>
          <div className="mt-2 text-sm">
            {currentTime ? formatDateTime(currentTime) : "Loading..."}
          </div>
        </div>
        <Timer />
      </div>

      <div className=" flex justify-between mb-10">
        <WorkedToday />
        <WeeklyActivity />
        <RemainingWeek />
      </div>

      <div className="flex justify-between space-x-4">
        <CalenderStat />
        <TodoStat />
      </div>

    </>
  );
};

export default Dashboard;
