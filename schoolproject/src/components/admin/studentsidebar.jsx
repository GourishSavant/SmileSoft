import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaClipboardList,
  FaChevronDown,
  FaChevronUp,
  FaPen,
  FaGripVertical,
} from "react-icons/fa";

const StudentSidebar = ({ isOpen }) => {
  const [isHovered, setIsHovered] = useState(false); // Sidebar hover state
  const [frontOfficeDropdownOpen, setFrontOfficeDropdownOpen] = useState(false); // Dropdown toggle state
  const [isEditingSession, setIsEditingSession] = useState(false); // Session edit toggle
  const [currentSession, setCurrentSession] = useState("2023-24"); // Current session
  const sessionOptions = ["2018-19", "2019-20", "2020-21", "2021-22", "2022-23", "2023-24"]; // Session options

  const iconClasses = "text-lg";

  // Handlers
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  const handleSaveSession = (event) => {
    setCurrentSession(event.target.value);
    setIsEditingSession(false);
  };

  return (
    <div
      className={`bg-gray-600 text-white transition-all duration-300 h-screen dark:bg-slate-700 ${
        isOpen || isHovered ? "w-60" : "w-16"
      } fixed top-0 left-0 z-30 overflow-y-auto`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Sidebar Content */}
      <ul className="space-y-1 p-3">
        {/* Current Session */}
        <li className="flex items-center space-x-4 mb-4">
          {isEditingSession ? (
            <div className="flex items-center space-x-2 bg-gray-700 p-2 rounded-md">
              <select
                value={currentSession}
                onChange={handleSaveSession}
                className="text-sm text-gray-800 border border-gray-500 rounded p-1 bg-gray-600"
              >
                {sessionOptions.map((session) => (
                  <option key={session} value={session}>
                    {session}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <span className="text-sm text-white">
              {isOpen || isHovered ? `Current Session: ${currentSession}` : currentSession}
            </span>
          )}
          {(isOpen || isHovered) && (
            <FaPen
              onClick={() => setIsEditingSession(!isEditingSession)}
              className={`${iconClasses} text-yellow-400 cursor-pointer`}
            />
          )}
        </li>

        {/* Front Office Dropdown */}
        <li>
          <button
            onClick={() => setFrontOfficeDropdownOpen(!frontOfficeDropdownOpen)}
            className="flex items-center justify-between w-full p-2 rounded hover:bg-gray-700"
          >
            <div className="flex items-center space-x-2">
              <FaClipboardList className={`${iconClasses} text-blue-400`} />
              {(isOpen || isHovered) && (
                <span className="font-medium text-sm">Front Office</span>
              )}
            </div>
            {(isOpen || isHovered) &&
              (frontOfficeDropdownOpen ? <FaChevronUp /> : <FaChevronDown />)}
          </button>
          {frontOfficeDropdownOpen && (
            <ul className="ml-8 mt-1 space-y-1">
              {[
                { to: "/admin/admission-enquiry", label: "Admission Enquiry" },
                { to: "/admin/visitor-books", label: "Visitor Books" },
                { to: "/admin/phone-call", label: "Phone Call Log" },
                { to: "/admin/postal-dispatch", label: "Postal Dispatch" },
                { to: "/admin/postal-receive", label: "Postal Receive" },
                { to: "/admin/complaint", label: "Complaint" },
                { to: "/admin/setup-frontoffice", label: "Setup Front Office" },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="block p-2 text-sm rounded hover:bg-gray-700"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </li>
      </ul>
    </div>
  );
};

export default StudentSidebar;
