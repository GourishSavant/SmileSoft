import React, { useState } from "react";
import {
  FaBars,
  FaUserCircle,
  FaClipboardCheck,
  FaCaretDown,
  FaSun,
  FaMoon,
  FaCalendarAlt,
  FaWhatsapp,
  FaSearch,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import chetan from "../../assets/admin/chetan.jpg"; // Replace with your actual path

const StudentNavbar = ({ toggleStudentSidebar, isStudentSidebarOpen,  isHovered }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const handleCalendarClick = () => navigate("/admin/calendar");
  const handleWhatsAppClick = () => window.open("https://wa.me/1234567890", "_blank");
  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  return (
    <div className="transition-all duration-300">
      {/* Navbar */}
      <div
        className={`fixed top-0 left-0 right-0 z-20 shadow-md p-4 flex items-center justify-between bg-white dark:bg-[#192137] transition-all duration-300`}
        style={{
          width: isStudentSidebarOpen ? "calc(100% - 240px)" : "calc(100% - 64px)",
          marginLeft: isStudentSidebarOpen ? "240px" : "64px",
        }}
      >
        {/* Left Side */}
        <div className="flex items-center space-x-4">
          <FaBars
            className="text-2xl cursor-pointer dark:text-white"
            onClick={toggleStudentSidebar}
          />
          <div className="relative">
            <div
              className="flex items-center cursor-pointer space-x-2 dark:text-white"
              onClick={toggleMenu}
            >
              <span className="font-semibold">Menu</span>
              <FaCaretDown className="text-xl" />
            </div>
            {isMenuOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-lg dark:text-white dark:bg-gray-700 z-20">
                <ul className="py-2">
                  <li className="px-4 py-2 text-gray-700 cursor-pointer dark:text-gray-200">
                    Option 1
                  </li>
                  <li className="px-4 py-2 text-gray-700 cursor-pointer dark:text-gray-200">
                    Option 2
                  </li>
                  <li className="px-4 py-2 text-gray-700 cursor-pointer dark:text-gray-200">
                    Option 3
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Center */}
        <div
          className={`text-green-500 font-bold text-lg ${
            isStudentSidebarOpen ? "ml-[-180px]" : "ml-[-350px]"
          } transition-all duration-300`}
        >
          ST. TERESA'S
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative hidden md:block">
            <FaSearch className="absolute left-3 top-3 text-gray-500 dark:text-gray-300" />
            <input
              type="text"
              placeholder="Search by Student Name"
              value={searchQuery}
              onChange={handleSearchChange}
              className="pl-10 pr-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Other Icons */}
          <span className="text-sm text-gray-800 dark:text-gray-300 font-bold">USD</span>
          <FaClipboardCheck className="text-2xl cursor-pointer dark:text-white" />
          <FaCalendarAlt
            className="text-2xl cursor-pointer dark:text-white"
            onClick={handleCalendarClick}
          />
          <FaWhatsapp
            className="text-2xl cursor-pointer dark:text-white"
            onClick={handleWhatsAppClick}
          />
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full ${
              isDarkMode
                ? "bg-yellow-300 text-gray-800"
                : "bg-gray-800 text-yellow-300"
            } shadow-lg`}
          >
            {isDarkMode ? <FaSun /> : <FaMoon />}
          </button>

          {/* Profile */}
          <div className="relative">
            <FaUserCircle
              className="text-2xl cursor-pointer dark:text-white"
              onClick={toggleProfile}
            />
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg dark:bg-gray-700">
                <div className="flex items-center space-x-3 p-3">
                  <img
                    src={chetan}
                    alt="Student Profile"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold dark:text-white">Chetan</p>
                    <p className="text-sm text-gray-500 dark:text-gray-300">
                      Administrator
                    </p>
                  </div>
                </div>
                <ul className="py-2">
                  <li className="px-4 py-2 text-gray-700 cursor-pointer dark:text-gray-200">
                    My Profile
                  </li>
                  <li className="px-4 py-2 text-gray-700 cursor-pointer dark:text-gray-200">
                    Settings
                  </li>
                  <li className="px-4 py-2 text-gray-700 cursor-pointer dark:text-gray-200">
                    Log out
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentNavbar;
