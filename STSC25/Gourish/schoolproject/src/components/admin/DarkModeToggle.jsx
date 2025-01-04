import React, { useState } from 'react';
import Navbar from './AdminNavbar'; // Import the Navbar
import Sidebar from './AdminSidebar'; // Import the Sidebar

const AppLayout = ({ handleLogout, children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar visibility
  const [isDarkMode, setIsDarkMode] = useState(false); // Dark mode state

  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark'); // Enable dark mode
    } else {
      document.documentElement.classList.remove('dark'); // Disable dark mode
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      {/* Render Sidebar */}
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} isDarkMode={isDarkMode} />

      {/* Main Content */}
      <div className="flex flex-col min-h-screen">
        <Navbar toggleSidebar={toggleSidebar} handleLogout={handleLogout} toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />

        {/* Dashboard Content */}
        <main className="flex-1 p-4">
          {children} {/* The dynamic content passed as children */}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
