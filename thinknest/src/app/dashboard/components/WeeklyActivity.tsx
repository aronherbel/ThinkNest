import React from "react";
import DashboardStats from "./DashboardStats";

const WeeklyActivity = () => {
  return (
    <>
      <DashboardStats 
        value={"75%"} 
        iconPath="/assets/icons/twoway_icon.svg" 
        label="Weekly Activity" 
      />
    </>
  );
};

export default WeeklyActivity;
