import React from 'react'
import DashboardStats from './DashboardStats'

const RemainingToday = () => {
  return (
    <>
      <DashboardStats
      value={"20:00"} 
      iconPath="/assets/icons/workedweek_icon.svg" 
      label="Remaining Today"
       />
    </>
  )
}

export default RemainingToday
