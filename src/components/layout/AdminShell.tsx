"use client";

import Navbar from "@/components/layout/navbar.component";
import Sidebar from "@/components/layout/sidebar.component";
import { Layout } from "antd";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/pro-light-svg-icons";

const { Content, Sider } = Layout;

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 1200);
      if (window.innerWidth < 1200) setIsSidebarOpen(false);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Layout className="h-screen">
      <Sider
        className={`bg-bgverticalimage transition-all duration-300 fixed h-screen flex-grow ${
          isSidebarOpen ? "w-[250px]" : "w-0"
        } ${isMobileView ? "hidden" : ""}`}
        width={250}
        collapsedWidth={0}
        collapsible
        collapsed={!isSidebarOpen}
        trigger={null}
      >
        <Sidebar />
      </Sider>

      <Layout className={`transition-all duration-300 ${isSidebarOpen && !isMobileView ? "ml-[250px]" : "ml-0"}`}>
        <Content className="bg-body flex flex-col p-2">
          <div className="relative">
            <button
              onClick={() => setIsSidebarOpen(v => !v)}
              className="w-[40px] h-[40px] bg-body rounded-full flex items-center justify-center absolute top-2 left-[-30px] z-[999]"
            >
              <FontAwesomeIcon icon={isSidebarOpen ? faArrowLeft : faArrowRight} className="icons" />
            </button>
            <Navbar />
          </div>
          <div className="mt-3 flex-grow flex-col flex">{children}</div>
        </Content>
      </Layout>
    </Layout>
  );
}
