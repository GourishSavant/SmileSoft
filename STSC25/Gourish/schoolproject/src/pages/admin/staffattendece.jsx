import React, { useState, useEffect } from "react";
import { FaFilePdf, FaFileExcel, FaPrint, FaFileWord } from "react-icons/fa"; // Import icons

const AttendanceFilter = () => {
  const [role, setRole] = useState(""); // selected role
  const [attendanceDate, setAttendanceDate] = useState(""); // selected attendance date
  const [data, setData] = useState({}); // fetched data for all roles
  const [filteredData, setFilteredData] = useState([]); // filtered attendance data

  // Fetch data for all roles from the JSON file
  useEffect(() => {
    fetch("/admin/staffattendence.json")
      .then((response) => response.json())
      .then((data) => setData(data)) // Save entire data
      .catch((error) => console.error("Error loading admissions data:", error));
  }, []); // Empty dependency array, runs only once when the component mounts

  // Handle changes in the role filter
  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  // Handle changes in the attendance date filter
  const handleDateChange = (e) => {
    setAttendanceDate(e.target.value);
  };

  // Filter data based on selected role and date
  const filterData = () => {
    let filtered = [];
    if (role && data[role]) {
      filtered = data[role].map((item) => {
        const attendanceRecord = item.attendance.find(
          (att) => att.date === attendanceDate
        );
        return {
          ...item,
          status: attendanceRecord ? attendanceRecord.status : "No Record"
        };
      });
    }
    setFilteredData(filtered);
  };

  // Example functions for PDF, Excel, Word, and Print (These can be modified based on your needs)
  const handleExportPDF = () => {
    // Code to export as PDF (can use libraries like `react-pdf` or `jsPDF`)
    alert("Exporting as PDF...");
  };

  const handleExportExcel = () => {
    // Code to export as Excel (can use libraries like `xlsx`)
    alert("Exporting as Excel...");
  };

  const handleExportWord = () => {
    // Code to export as Word (can use libraries like `docxtemplater`)
    alert("Exporting as Word...");
  };

  const handlePrint = () => {
    // Code to trigger print
    window.print();
  };

  return (
    <div className="bg-white dark:bg-gray-800 text-black dark:text-white p-6">
      <h2 className="text-2xl font-bold mb-4">Attendance Management</h2>

      {/* Icons at the top right */}
      <div className="absolute top-6 right-6 flex space-x-6">
        <FaFilePdf
          onClick={handleExportPDF}
          className="cursor-pointer text-red-600 hover:text-red-800"
          size={24}
        />
        <FaFileExcel
          onClick={handleExportExcel}
          className="cursor-pointer text-green-600 hover:text-green-800"
          size={24}
        />
        <FaFileWord
          onClick={handleExportWord}
          className="cursor-pointer text-blue-600 hover:text-blue-800"
          size={24}
        />
        <FaPrint
          onClick={handlePrint}
          className="cursor-pointer text-gray-600 hover:text-gray-800"
          size={24}
        />
      </div>

      {/* Filter Form */}
      <div className="flex gap-6 mb-4 dark:bg-gray-800 dark;text-white">
        <div className="w-1/3">
          <label className="block mb-2">Select Role</label>
          <select
            className="w-full p-2 mb-4 border rounded dark:bg-gray-600 dark;text-white"
            value={role}
            onChange={handleRoleChange}
          >
            <option value="">Select Role</option>
            <option value="students">Student</option>
            <option value="teachers">Teacher</option>
            <option value="accountants">Accountant</option>
            <option value="librarians">Librarian</option>
            <option value="receptionists">Receptionist</option>
            <option value="superadmins">Super Admin</option>
          </select>
        </div>

        <div className="w-1/3">
          <label className="block mb-2">Attendance Date</label>
          <input
            type="date"
            className="w-full p-2 mb-4 border rounded dark:bg-gray-600 dark;text-white"
            value={attendanceDate}
            onChange={handleDateChange}
          />
        </div>

        <button
          className="bg-blue-500  w-24 h-10 text-white px-6 py-2 rounded "
          onClick={filterData}
        >
          Search
        </button>
      </div>

      {/* Conditional Rendering of Tables */}
      {role && filteredData.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mt-6">
            {role.charAt(0).toUpperCase() + role.slice(1)} Attendance
          </h3>
          <table className="min-w-full mt-4 border-collapse text-center">
            <thead className="bg-gray-700 text-white">
              {role === "students" && (
                <tr>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Class</th>
                  <th className="px-4 py-2">Section</th>
                  <th className="px-4 py-2">Roll Number</th>
                  <th className="px-4 py-2">Attendance Status</th>
                </tr>
              )}
              {role === "teachers" && (
                <tr>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Subject</th>
                  <th className="px-4 py-2">Attendance Status</th>
                </tr>
              )}
              {role === "accountants" && (
                <tr>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Department</th>
                  <th className="px-4 py-2">Attendance Status</th>
                </tr>
              )}
            </thead>
            <tbody>
              {filteredData.map((item) => (
                <tr key={item.id}>
                  <td className="px-4 py-2">{item.name}</td>
                  {role === "students" && (
                    <>
                      <td className="px-4 py-2">{item.class}</td>
                      <td className="px-4 py-2">{item.section}</td>
                      <td className="px-4 py-2">{item.rollNumber}</td>
                    </>
                  )}
                  {role === "teachers" && (
                    <td className="px-4 py-2">{item.subject}</td>
                  )}
                  {role === "accountants" && (
                    <td className="px-4 py-2">{item.department}</td>
                  )}
                  <td className="px-4 py-2">{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {filteredData.length === 0 && (
        <div className="text-red-500 text-center py-4">
          No data available for the selected criteria.
        </div>
      )}
    </div>
  );
};

export default AttendanceFilter;
