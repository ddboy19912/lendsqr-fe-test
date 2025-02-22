import { useCallback, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";

export const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const closeSidebar = useCallback(() => {
    setIsSidebarOpen(false);
  }, []);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen(!isSidebarOpen);
  }, [isSidebarOpen]);

  return (
    <div className="flex min-h-screen">
      <Navbar isSidebarOpen={isSidebarOpen} onMenuClick={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
      <main className="bg-tertiary-bg chromebook:pl-[283px] h-full min-h-screen w-full pt-[100px] pl-0">
        <div className="chromebook:p-[60px] h-full px-6 py-9 xl:max-w-[1180px]">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
