"use client";

import logo from "@/assets/svg/logo.svg";
import {
  faComments,
  faFolder,
  faGears,
  faHome,
  faUser,
  faAngleDoubleLeft,
  faAngleDoubleRight,
} from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, useState } from "react";

const mainMenuItems = [
  { name: "Home", icon: faHome, link: "/home" },
  { name: "Workspaces", icon: faFolder, link: "/workspaces" },
  { name: "Chats", icon: faComments, link: "/chats" },
  { name: "Parameters", icon: faGears, link: "/parameters" },
];

const profileItem = { name: "Profile", icon: faUser, link: "/profile" };

const Sidebar: FC<{ isCollapsed: boolean }> = ({ isCollapsed }) => {
  const pathname = usePathname();

  return (
    <div className="p-2 rounded-md sidebar flex flex-col h-full">
      <nav className="flex-1">
        <ul className="space-y-2">
          {mainMenuItems.map((item, index) => {
            const isActive = pathname === item.link;
            return (
              <li key={index}>
                <Link
                  href={item.link}
                  className={`flex items-center ${
                    isCollapsed ? "justify-center" : "space-x-2"
                  } ${
                    isActive ? "bg-primary text-white" : "text-title"
                  } rounded-md p-2 hover:bg-secondary hover:text-white transition duration-300 ease-in-out`}
                >
                  <FontAwesomeIcon icon={item.icon} className="icons" />
                  {!isCollapsed && (
                    <span className="font-semibold">{item.name}</span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="flex items-center justify-between mb-3 w-full">
        {!isCollapsed && (
          <Image src={logo} alt="Logo" className="w-[140px] m-auto" />
        )}
      </div>

      <div className="mt-auto">
        <Link
          href={profileItem.link}
          className={`flex items-center ${
            isCollapsed ? "justify-center" : "space-x-2"
          } ${
            pathname === profileItem.link ? "bg-primary text-white" : "text-title"
          } rounded-md p-2 hover:bg-secondary hover:text-white transition duration-300 ease-in-out`}
        >
          <FontAwesomeIcon icon={profileItem.icon} className="icons" />
          {!isCollapsed && (
            <span className="font-semibold">{profileItem.name}</span>
          )}
        </Link>
      </div>
    </div>
  );
};
export default Sidebar;