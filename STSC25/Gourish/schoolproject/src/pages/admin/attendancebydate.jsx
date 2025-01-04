
import React, { useState } from "react";

const ThreeFramesLayout = () => {
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [attendanceDate, setAttendanceDate] = useState("");

  const handleFilterChange = () => {
    console.log("Selected Class:", selectedClass);
    console.log("Selected Section:", selectedSection);
    console.log("Attendance Date:", attendanceDate);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100 dark:bg-gray-800">
      <div className="bg-white dark:bg-gray-700 p-6 border border-gray-300 dark:border-gray-600 rounded shadow-lg">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">Select Criteria</h2>

        <div className="flex space-x-4">
          {/* Left Frame: Class Dropdown */}
          <div className="w-1/3">
            <label htmlFor="classSelect" className="block text-gray-600 dark:text-gray-200 mb-2">
              Class *
            </label>
            <select
              id="classSelect"
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 rounded px-4 py-2 bg-white dark:bg-gray-600 text-gray-800 dark:text-white"
            >
              <option value="">Select</option>
              <option value="Class 1">Class 1</option>
              <option value="Class 2">Class 2</option>
              <option value="Class 3">Class 3</option>
            </select>
          </div>

          {/* Middle Frame: Section Dropdown */}
          <div className="w-1/3">
            <label htmlFor="sectionSelect" className="block text-gray-600 dark:text-gray-200 mb-2">
              Section *
            </label>
            <select
              id="sectionSelect"
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 rounded px-4 py-2 bg-white dark:bg-gray-600 text-gray-800 dark:text-white"
            >
              <option value="">Select</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
            </select>
          </div>

          {/* Right Frame: Attendance Date Picker */}
          <div className="w-1/3">
            <label htmlFor="attendanceDate" className="block text-gray-600 dark:text-gray-200 mb-2">
              Attendance Date *
            </label>
            <input
              type="date"
              id="attendanceDate"
              value={attendanceDate}
              onChange={(e) => setAttendanceDate(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 rounded px-4 py-2 bg-white dark:bg-gray-600 text-gray-800 dark:text-white"
            />
          </div>
        </div>

        {/* Apply Filters Button */}
        <div className="mt-4 text-end">
          <button
            onClick={handleFilterChange}
            className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-800 dark:bg-gray-600 dark:hover:bg-gray-500"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThreeFramesLayout;




