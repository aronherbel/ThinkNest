{/* Importiere Hier Deine Komponente (Clalender, ToDo's, Notes, etc.)*/}
import React from 'react'
import Calender from '@/components/Calender/Calender'
import ToDo from '@/components/ToDo/ToDo' 
import Notes from '@/components/Notes/Notes'

const Home = () => {
  return (
    <>
      <Calender />
      <ToDo />
      <Notes />
    </>
  )
}

export default Home