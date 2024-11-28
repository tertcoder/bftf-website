import { Outlet } from "react-router-dom";
import Sidebar from "./DashboardSideBar";

function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <Outlet />
    </div>
  );
}

export default DashboardLayout;
