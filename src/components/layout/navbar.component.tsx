import user from "@/assets/svg/logo.svg";
import { faHome } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dropdown, Space } from "antd";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Navbar() {
  const items = [
    {
      key: "1",
      label: <Link href="/profile">Profile</Link>,
    },
  ];

  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  // Capitalize each segment
  const capitalize = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  const capitalizedSegments = segments.map(capitalize);

  return (
    <div className="flex items-center justify-between w-full gap-3 bg-bgimage px-3 rounded-md sticky top-[15px] z-50 h-[60px]">
      <div className="flex items-center space-x-2">
        <FontAwesomeIcon icon={faHome} className="icons" aria-hidden="true" />
        <h3 className="text-title" aria-label={`Current Route: ${capitalizedSegments?.join(' / ')}`}>
          {capitalizedSegments?.join(' / ')}
        </h3>
      </div>
      <div className="relative">
        <Dropdown menu={{ items }}>
          <Link href="#" onClick={(e) => e.preventDefault()}>
            <Space className="header_dropdown">
              <Image
                src={user}
                alt="User Profile"
                width={40}
                height={40}
                className="rounded-full"
              />
            </Space>
          </Link>
        </Dropdown>
      </div>
    </div>
  );
}

export default Navbar;
