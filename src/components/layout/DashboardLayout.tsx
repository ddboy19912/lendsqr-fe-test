import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";

export const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-neutral-50 dark:bg-neutral-900">
      <Navbar />
      <Sidebar />
      <main className="min-h-screen pt-[100px] pl-[283px]">
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
