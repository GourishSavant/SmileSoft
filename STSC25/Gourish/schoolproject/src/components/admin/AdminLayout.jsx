

import React, { useState } from "react";
import Navbar from "./AdminNavbar"; // Import Navbar component
import Sidebar from "./AdminSidebar"; // Import Sidebar component
import { Outlet } from "react-router-dom"; // Import Outlet

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Track sidebar state

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle sidebar visibility
  };

  return (
    <div className={`flex min-h-screen ${isSidebarOpen ? "ml-60" : "ml-16"} transition-all duration-300`}>
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen}toggleSidebar={toggleSidebar} /> {/* Pass isOpen prop to Sidebar */}
      <div className="flex-1 flex flex-col">
        <Navbar toggleSidebar={toggleSidebar}isSidebarOpen={isSidebarOpen} /> {/* Pass toggleSidebar function to Navbar */}
        <div className=" flex-1 bg-gray-100 dark:bg-gray-800">
          <Outlet /> {/* Render nested routes */}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
