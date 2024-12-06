"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from 'next/image';

const NavBar = () => {
  const pathname = usePathname();

  const navItems = [
    { href: "/dashboard", icon: "dashboard_icon.svg", label: "Dashboard" },
    { href: "/calender", icon: "calender_icon.svg", label: "Calendar" },
    { href: "/todo", icon: "todo_icon.svg", label: "Todo" },
    { href: "/notes", icon: "notes_icon.svg", label: "Notes" },
    { href: "/projects", icon: "project_icon.svg", label: "Projects" },
    { href: "/settings", icon: "settings_icon.svg", label: "Settings" },
  ];

  return (
    <div className="flex justify-center mt-5 text-[0.7rem]">
      <div className="flex flex-col items-start space-y-4">
        {navItems.map(({ href, icon, label }) => {
          const isActive = pathname === href;
          const iconPath = isActive
            ? `/assets/icons/${icon.replace(".svg", "_active.svg")}`
            : `/assets/icons/${icon}`;
            return (
              <div
                key={href}
                className={`flex items-center space-x-3 p-2 rounded w-full m-1 ${
                  isActive ? "bg-black text-white" : "hover:bg-[#DAD9D9]"
                }`}
              >
                <Image src={iconPath} alt={label} width={10} height={10} />
                <Link href={href} className="flex-1 text-left">
                  {label}
                </Link>
              </div>
            );
        })}
      </div>
    </div>
  );
};

export default NavBar;
