// import React, { useState } from "react";
// import { FaBars, FaUserCircle, FaClipboardCheck,FaCaretDown,FaSun,FaMoon, FaCalendarAlt, FaWhatsapp, FaSearch } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import logo from "../../assets/admin/logo.png";
// import chetan from "../../assets/admin/chetan.jpg";

// const Navbar = ({ toggleSidebar, isSidebarOpen, isHovered }) => {
//   const [isProfileOpen, setIsProfileOpen] = useState(false);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isDarkMode, setIsDarkMode] = useState(false);
//   const [searchQuery, setSearchQuery] = useState(""); // State for the search query

//   const navigate = useNavigate(); // Initialize useNavigate

//   const toggleProfile = () => {
//     setIsProfileOpen(!isProfileOpen);
//   };

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   const toggleDarkMode = () => {
//     setIsDarkMode(!isDarkMode);
//     if (!isDarkMode) {
//       document.documentElement.classList.add("dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//     }
//   };

//   // Handle Calendar Navigation
//   const handleCalendarClick = () => {
//     navigate("/admin/calendar"); // Navigate to the calendar page
//   };

//   // Handle WhatsApp Click (You can update the link to your WhatsApp contact if needed)
//   const handleWhatsAppClick = () => {
//     window.open("https://wa.me/1234567890", "_blank"); // Replace with your WhatsApp number or link
//   };

//   // Handle Search Input Change
//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value); // Update the search query state
//   };

//   return (
//     <div className="transition-all duration-300">
//       {/* Navbar */}
//       <div
//         className={`fixed top-0 left-0 right-0 z-20 shadow-md p-4 flex items-center justify-between bg-white dark:bg-[#192137] transition-all duration-300`}
//         style={{
//           width: isSidebarOpen ? "calc(100% - 240px)" : "calc(100% - 64px)",
//           marginLeft: isSidebarOpen ? "240px" : "64px",
//         }}
//       >
//         {/* Left Side: Sidebar Toggle and Menu */}
//         <div className="flex items-center space-x-4">
//           <FaBars
//             className="text-2xl cursor-pointer dark:text-white"
//             onClick={toggleSidebar}
//           />
//           <div className="relative">
//             <div
//               className="flex items-center cursor-pointer space-x-2 dark:text-white"
//               onClick={toggleMenu}
//             >
//               <span className="font-semibold">Menu</span>
//               <FaCaretDown className="text-xl" />
//             </div>
//             {isMenuOpen && (
//               <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-lg dark:text-white dark:bg-gray-700 z-20">
//                 <ul className="py-2">
//                   <li className="px-4 py-2 text-gray-700 cursor-pointer dark:text-gray-200">Option 1</li>
//                   <li className="px-4 py-2 text-gray-700 cursor-pointer dark:text-gray-200">Option 2</li>
//                   <li className="px-4 py-2 text-gray-700 cursor-pointer dark:text-gray-200">Option 3</li>
//                 </ul>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* "ST. TERESA'S" Heading */}
//         <div
//           className={`text-green-500 font-bold text-lg ${isSidebarOpen ? "ml-[-180px]" : "ml-[-350px]"} transition-all duration-300`}
//         >
//           ST. TERESA'S
//         </div>

//         {/* Right Side: Search Bar, Calendar, WhatsApp Icon, Dark Mode Toggle, Profile Dropdown */}
//         <div className="flex items-center space-x-4">
//           {/* Search Bar */}
//           <div className="relative hidden md:block">
//             <FaSearch className="absolute left-3 top-3 text-gray-500 dark:text-gray-300" />
//             <input
//               type="text"
//               placeholder="Search by Student Name"
//               value={searchQuery}
//               onChange={handleSearchChange}
//               className="pl-10 pr-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-black"
//             />
//           </div>

//           {/* USD Text */}
//           <span className="text-sm text-gray-800 dark:text-gray-300 font-bold">USD</span>

//           {/* US Flag Icon (SVG) */}
//           <span className="inline-block w-8 h-5 cursor-pointer dark:text-white" title="English Language">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 640 480"
//               className="w-full h-full"
//             >
//               <g fillRule="evenodd">
//                 <path fill="#bd3d44" d="M0 0h640v480H0z" />
//                 <path fill="#fff" d="M0 0h640v34H0zM0 68h640v34H0zM0 136h640v34H0zM0 204h640v34H0zM0 272h640v34H0zM0 340h640v34H0zM0 408h640v34H0z" />
//                 <path fill="#0033a0" d="M0 0h256v238H0z" />
//                 <path fill="#fff" d="M0 0l13.8 18.3H6.6L0 0zm19.9 6.5l4.6 6.3H23.2l-4.6-6.3zm8.5 12.6l4.6 6.3h-5.2l-4.6-6.3zm7.3-6.3L39.7 7.1l6.3 4.6h-5.4z" />
//               </g>
//             </svg>
//           </span>

//           {/* Task Icon (Updated with FaClipboardCheck) */}
//           <FaClipboardCheck className="text-2xl cursor-pointer dark:text-white" title="Tasks" />

//           {/* Calendar Icon */}
//           <FaCalendarAlt
//             className="text-2xl cursor-pointer dark:text-white"
//             onClick={handleCalendarClick} // Handle navigation
//             title="Calendar"
//           />
//           {/* WhatsApp Icon */}
//           <FaWhatsapp
//             className="text-2xl cursor-pointer dark:text-white"
//             onClick={handleWhatsAppClick} // Handle WhatsApp navigation
//             title="Contact us on WhatsApp"
//           />
//           {/* Dark Mode Toggle */}
//           <button
//             onClick={toggleDarkMode}
//             className={`p-2 rounded-full ${isDarkMode ? "bg-yellow-300 text-gray-800" : "bg-gray-800 text-yellow-300"} shadow-lg`}
//           >
//             {isDarkMode ? <FaSun /> : <FaMoon />}
//           </button>
//           {/* Profile */}
//           <div className="relative">
//             <FaUserCircle
//               className="text-2xl cursor-pointer dark:text-white"
//               onClick={toggleProfile}
//             />
//             {isProfileOpen && (
//               <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg dark:bg-gray-700 ">
//                 <div className="flex items-center space-x-3 p-3">
//                   <img
//                     src={chetan}
//                     alt="Admin Profile"
//                     className="w-12 h-12 rounded-full object-cover"
//                   />
//                   <div>
//                     <p className="font-semibold dark:text-white">Chetan</p>
//                     <p className="text-sm text-gray-500 dark:text-gray-300">
//                       Administrator
//                     </p>
//                   </div>
//                 </div>
//                 <ul className="py-2">
//                   <li className="px-4 py-2 text-gray-700 cursor-pointer dark:text-gray-200">
//                     My Profile
//                   </li>
//                   <li className="px-4 py-2 text-gray-700 cursor-pointer dark:text-gray-200">
//                     Settings
//                   </li>
//                   <li className="px-4 py-2 text-gray-700 cursor-pointer dark:text-gray-200">
//                     Log out
//                   </li>
//                 </ul>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Sub-navbar */}
//       <div className="bg-gray-300 text-center py-2 shadow-sm dark:bg-gray-700 mt-16">
//         <p className="text-gray-800 font-medium dark:text-gray-300">
//           School of Computing
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Navbar;
import React, { useState, useEffect } from "react";
import axios from "../../api/axiosApi.jsx";
import { FaBars, FaUserCircle, FaClipboardCheck, FaCaretDown, FaSun, FaMoon, FaCalendarAlt, FaWhatsapp, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/admin/logo.png";
import chetan from "../../assets/admin/chetan.jpg";

const Navbar = ({ toggleSidebar, isSidebarOpen, user }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const handleLogout = async () => {
    try {
      await axios.get("/auth/logout");
      navigate("/admin/login");
      console.log("logout successfull")
      
      // localStorage.remove("accessToken", accessToken);
      // // Optionally store the refreshToken as well (for token refresh)
      // localStorage.clear("refreshToken", refreshToken);

      // // Store staff info if needed
      // sessionStorage.clear("staff", JSON.stringify(staff));

    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div className="transition-all duration-300">
      {/* Navbar */}
      <div
        className={`fixed top-0 left-0 right-0 z-20 shadow-md p-4 flex items-center justify-between bg-white dark:bg-[#192137] transition-all duration-300`}
        style={{
          width: isSidebarOpen ? "calc(100% - 240px)" : "calc(100% - 64px)",
          marginLeft: isSidebarOpen ? "240px" : "64px",
        }}
      >
        {/* Left Side: Sidebar Toggle and Menu */}
        <div className="flex items-center space-x-4">
          <FaBars
            className="text-2xl cursor-pointer dark:text-white"
            onClick={toggleSidebar}
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
              <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-lg dark:bg-gray-700 z-20">
                <ul className="py-2">
                  <li className="px-4 py-2 cursor-pointer">Option 1</li>
                  <li className="px-4 py-2 cursor-pointer">Option 2</li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Dynamic Heading */}
        <div  className={`text-green-500 font-bold text-lg ${isSidebarOpen ? "ml-[-180px]" : "ml-[-350px]"} transition-all duration-300`}>
          ST. TERESA'S
        </div>

        {/* Right Side: User Info, Logout, Dark Mode */}
        <div className="flex items-center space-x-4">
          {/* Search Bar */}
          <div className="relative hidden md:block">
            <FaSearch className="absolute left-3 top-3 text-gray-500 dark:text-gray-300" />
            <input
              type="text"
              placeholder="Search by Student Name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-full bg-gray-200 dark:bg-gray-600"
            />
          </div>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full ${isDarkMode ? "bg-yellow-300 text-gray-800" : "bg-gray-800 text-yellow-300"}`}
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
                    alt="Admin Profile"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold dark:text-white">{user?.name || "FirstName"}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-300">
                      {user?.role || "Role"}
                    </p>
                  </div>
                </div>
                <ul className="py-2">
                  <li className="px-4 py-2 cursor-pointer">My Profile</li>
                  <li className="px-4 py-2 cursor-pointer">Settings</li>
                  <li
                    className="px-4 py-2 cursor-pointer"
                    onClick={handleLogout}
                  >
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

export default Navbar;
