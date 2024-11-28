import { FileText, ClipboardList } from "lucide-react";
import logo from "../assets/logo_2.png";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    // {
    //   icon: Home,
    //   label: 'Dashboard',
    //   path: '/admin/dashboard'
    // },
    {
      icon: ClipboardList,
      label: "Manage Activities",
      path: "/admin/activities",
    },
    {
      icon: FileText,
      label: "Manage Testimonies",
      path: "/admin/testimonies",
    },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen fixed left-0 top-0 bottom-0 flex flex-col">
      <div className="flex items-center justify-center py-6 border-b">
        <img src={logo} alt="Logo" className="w-28" />
      </div>
      <nav className="flex-1 py-4">
        {menuItems.map(item => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center px-6 py-3 transition-colors duration-200 ${
              location.pathname === item.path
                ? "bg-primary/10 text-primary"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <item.icon className="mr-3" size={20} />
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
