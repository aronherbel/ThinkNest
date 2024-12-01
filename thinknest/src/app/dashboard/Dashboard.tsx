"use client";

import React, { useEffect, useState } from "react";

const Dashboard: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<Date | null>(null);

  useEffect(() => {
    setCurrentTime(new Date());
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
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
      <div className="pl-10 pt-10">
        <div className="text-3xl font-bold">Today</div>
        <div className="mt-2 text-sm">{currentTime ? formatDateTime(currentTime) : "Loading..."}</div>
      </div>
    </>
  );
};

export default Dashboard;
