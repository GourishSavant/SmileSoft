

import React, { useState } from "react";
import StudentNavbar from "./studentnavbar"; // Import Navbar component
import StudentSidebar from "./studentsidebar"; // Import Sidebar component
import { Outlet } from "react-router-dom"; // Import Outlet

const StudentLayout = () => {
  const [isStudentSidebarOpen, setIsStudentSidebarOpen] = useState(false); // Track sidebar state

  const toggleStudentSidebar = () => {
    setIsStudentSidebarOpen(!isStudentSidebarOpen); // Toggle sidebar visibility
  };

  return (
    <div className={`flex min-h-screen ${isStudentSidebarOpen ? "ml-60" : "ml-16"} transition-all duration-300`}>
      {/* Sidebar */}
      <StudentSidebar isOpen={isStudentSidebarOpen}toggleStudentSidebar={toggleStudentSidebar} /> {/* Pass isOpen prop to Sidebar */}
      <div className="flex-1 flex flex-col">
      <StudentNavbar togglestudentSidebar={toggleStudentSidebar}isStudentSidebarOpen={isStudentSidebarOpen} /> {/* Pass toggleSidebar function to Navbar */}
      <div className=" flex-1 bg-gray-100 dark:bg-gray-800">
          <Outlet /> {/* Render nested routes */}
        </div>
      </div>
    </div>
  );
};

export default StudentLayout;
