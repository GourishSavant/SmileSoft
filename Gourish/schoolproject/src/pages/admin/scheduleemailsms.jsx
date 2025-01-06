import React, { useState } from "react";
import { FaFilePdf, FaFileWord, FaFileExcel, FaPrint, FaCopy, FaColumns } from "react-icons/fa";

const EmailSmsLog = () => {
  // Sample data for the table
  const data = [
    {
      id: 1,
      title: "Welcome Email",
      message: "Welcome to our platform!.",
      date: "2024-12-22",
      scheduleDate: "2024-12-23",
      email: "Yes",
      sms: "No",
      group: "Admin",
      individual: "John Doe",
      classType: "Class 1",
    },
    {
      id: 2,
      title: "SMS Reminder",
      message: "Don't forget about the event tomorrow.",
      date: "2024-12-21",
      scheduleDate: "2024-12-22",
      email: "No",
      sms: "Yes",
      group: "User",
      individual: "Jane Doe",
      classType: "Class 2",
    },
    // Add more rows here as needed
  ];

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 2;

  // Calculate total pages
  const totalPages = Math.ceil(data.length / rowsPerPage);

  // Get rows for the current page
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);

  // Function to change page
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-800 dark:text-white">
      <h1 className="text-2xl font-bold mb-4">Email / SMS Log</h1>

      {/* Header with Search and Icons */}
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search..."
          className="p-2 border border-gray-300 rounded w-1/3 dark:bg-gray-700 dark:text-white"
        />
        <div className="flex gap-4">
          <FaFilePdf className="text-red-500 cursor-pointer" title="Export to PDF" />
          <FaFileWord className="text-blue-500 cursor-pointer" title="Export to Word" />
          <FaFileExcel className="text-green-500 cursor-pointer" title="Export to Excel" />
          <FaPrint className="text-gray-700 cursor-pointer" title="Print" />
          <FaCopy className="text-gray-500 cursor-pointer" title="Copy" />
          <FaColumns className="text-gray-400 cursor-pointer" title="Column Options" />
        </div>
      </div>

      {/* Table */}
      <table className="table-auto w-full border-collapse border border-gray-300 dark:border-gray-600">
        <thead>
          <tr className="bg-gray-200 dark:bg-gray-700">
            <th className="border border-gray-300 p-2 dark:border-gray-600">Title</th>
            <th className="border border-gray-300 p-2 dark:border-gray-600">Message</th>
            <th className="border border-gray-300 p-2 dark:border-gray-600">Date</th>
            <th className="border border-gray-300 p-2 dark:border-gray-600">Schedule Date</th>
            <th className="border border-gray-300 p-2 dark:border-gray-600">Email</th>
            <th className="border border-gray-300 p-2 dark:border-gray-600">SMS</th>
            <th className="border border-gray-300 p-2 dark:border-gray-600">Group</th>
            <th className="border border-gray-300 p-2 dark:border-gray-600">Individual</th>
            <th className="border border-gray-300 p-2 dark:border-gray-600">Class</th>
          </tr>
        </thead>
        <tbody>
          {currentRows.map((row) => (
            <tr key={row.id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
              <td className="border border-gray-300 p-2 dark:border-gray-600">{row.title}</td>
              <td className="border border-gray-300 p-2 dark:border-gray-600">{row.message}</td>
              <td className="border border-gray-300 p-2 dark:border-gray-600">{row.date}</td>
              <td className="border border-gray-300 p-2 dark:border-gray-600">{row.scheduleDate}</td>
              <td className="border border-gray-300 p-2 dark:border-gray-600">{row.email}</td>
              <td className="border border-gray-300 p-2 dark:border-gray-600">{row.sms}</td>
              <td className="border border-gray-300 p-2 dark:border-gray-600">{row.group}</td>
              <td className="border border-gray-300 p-2 dark:border-gray-600">{row.individual}</td>
              <td className="border border-gray-300 p-2 dark:border-gray-600">{row.classType}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          className="px-3 py-1 bg-gray-200 rounded dark:bg-gray-700 dark:text-white"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="px-3 py-1 bg-gray-200 rounded dark:bg-gray-700 dark:text-white"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default EmailSmsLog;
