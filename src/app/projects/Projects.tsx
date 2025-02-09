"use client";

import HeaderTitle from '@/components/HeaderTitle'
import React, { useState } from "react";
import { Compact } from "@uiw/react-color";
import { useContext } from "react";
import { ThemeContext } from "@/lib/ThemeContext";

const Projects = () => {
  const [boxColor, setBoxColor] = useState("#ffffff");


  return (
    <div >
      <HeaderTitle title="Projects" style={{ backgroundColor: boxColor}} />
    </div>
  )
}

export default Projects
