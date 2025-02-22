import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";

export const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen">
      <Navbar />
      <Sidebar />
      <main className="h-full min-h-screen w-full pt-[100px] pl-[283px]">
        <div className="bg-tertiary-bg h-full p-[60px]">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
