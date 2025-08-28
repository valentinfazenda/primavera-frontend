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
import { usePathname } from "next/navigation";
import { FC } from "react";

const mainMenuItems = [
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
];

const profileItem = {
  name: "Profile",
  icon: <FontAwesomeIcon icon={faUser} className="icons" />,
  link: "/profile",
};

const Sidebar: FC = () => {
  const pathname = usePathname();

  return (
    <div className="p-2 rounded-md sidebar flex flex-col h-full">
      <div className="flex items-center justify-between mb-3 w-full">
        <Image src={logo} alt="Logo" className="w-[160px] m-auto" />
      </div>

      {/* Main navigation */}
      <nav>
        <ul className="space-y-2">
          {mainMenuItems.map((item, index) => {
            const isActive = pathname === item.link;
            return (
              <li key={index}>
                <Link
                  href={item.link}
                  className={`flex items-center justify-between space-x-2 ${
                    isActive ? "bg-primary text-white" : "text-title"
                  } rounded-md p-2 hover:bg-secondary hover:text-white transition duration-300 ease-in-out`}
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

      {/* Profile section at the bottom */}
      <div className="mt-auto">
        <Link
          href={profileItem.link}
          className={`flex items-center space-x-2 ${
            pathname === profileItem.link ? "bg-primary text-white" : "text-title"
          } rounded-md p-2 hover:bg-secondary hover:text-white transition duration-300 ease-in-out`}
        >
          {profileItem.icon}
          <span className="font-semibold">{profileItem.name}</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;