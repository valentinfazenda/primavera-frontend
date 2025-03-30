import logo from "@/assets/svg/logo.svg";
import {
  faComments,
  faFolder,
  faGears,
  faHome,
  faUser,
} from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Import usePathname
import { FC } from "react";

const menuItems = [
  {
    name: "Home",
    icon: <FontAwesomeIcon icon={faHome} className="icons" />,
    link: "/home",
  },
  {
    name: "Workspaces",
    icon: <FontAwesomeIcon icon={faFolder} className="icons" />,
    link: "/workspaces",
  },
  {
    name: "Chats",
    icon: <FontAwesomeIcon icon={faComments} className="icons" />,
    link: "/chats",
  },
  {
    name: "Parameters",
    icon: <FontAwesomeIcon icon={faGears} className="icons" />,
    link: "/parameters",
  },
  {
    name: "Profile",
    icon: <FontAwesomeIcon icon={faUser} className="icons" />,
    link: "/profile",
  },
];

const Sidebar: FC = () => {
  const pathname = usePathname(); // Get the current pathname

  return (
    <div className="p-2 rounded-md sidebar">
      <div className="flex items-center justify-between mb-3 w-full">
        <Image src={logo} alt="Logo" className="w-[160px] m-auto" />
      </div>
      <nav>
        <ul className="space-y-2">
          {menuItems.map((item, index) => {
            const isActive =
              pathname === item.link

            return (
              <li key={index}>
                <Link
                  href={item.link}
                  className={`flex items-center justify-between space-x-2 ${
                    isActive ? "bg-primary text-white" : "text-title"
                  } text-title rounded-md p-2 hover:bg-secondary hover:text-white transition duration-300 ease-in-out`}
                >
                  <div className="flex gap-2 items-center">
                    {item.icon}
                    <span className="font-semibold">{item.name}</span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;