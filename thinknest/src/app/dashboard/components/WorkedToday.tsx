import React from 'react'
import DashboardStats from './DashboardStats'

const WorkedToday = () => {
  return (
    <>
      <DashboardStats 
        value={"40:00"} 
        iconPath="/assets/icons/workedweek_icon.svg" 
        label="Worked Today" 
      />
    </>
  )
}

export default WorkedToday
