import React, { useState } from "react";
import { FaFilePdf, FaFileWord, FaFileExcel, FaPrint, FaCopy, FaColumns } from "react-icons/fa";

const EmailSmsLog = () => {
  // Sample Data
  const data = [
    {
      id: 1,
      title: "Example Title 1",
      description: "Sample Description 1",
      date: "2024-12-22",
      email: "Yes",
      sms: "No",
      group: "Admin",
      individual: "John Doe",
      class: "Class 1",
    },
    {
      id: 2,
      title: "Example Title 2",
      description: "Sample Description 2",
      date: "2024-12-23",
      email: "No",
      sms: "Yes",
      group: "Teacher",
      individual: "Jane Smith",
      class: "Class 2",
    },
    // Add more rows here
  ];

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  // Calculate total pages
  const totalPages = Math.ceil(data.length / rowsPerPage);

  // Get current page rows
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);

  // Change page
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Custom Header with Icons
  const customHeader = () => (
    <div className="flex justify-between items-center mb-4 dark:bg-gray-800 dark:text-white">
      {/* Left-side Search bar */}
      <div>
        <input
          type="text"
          placeholder="Search..."
          className="p-2 border border-gray-300 rounded w-1/3 dark:bg-gray-600 dark:text-white"
        />
      </div>

      {/* Right-side Icons */}
      <div className="flex gap-4">
        <FaFilePdf className="text-red-500 cursor-pointer" title="Export to PDF" />
        <FaFileWord className="text-blue-500 cursor-pointer" title="Export to Word" />
        <FaFileExcel className="text-green-500 cursor-pointer" title="Export to Excel" />
        <FaPrint className="text-gray-700 cursor-pointer" title="Print" />
        <FaCopy className="text-gray-500 cursor-pointer" title="Copy" />
        <FaColumns className="text-gray-400 cursor-pointer" title="Column Options" />
      </div>
    </div>
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen dark:bg-gray-800 dark:text-white">
      <h1 className="text-2xl font-bold mb-6">Email / SMS Log</h1>

      {/* Custom Header with Search bar and Icons */}
      {customHeader()}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 dark:border-gray-600 dark:bg-gray-800">
          <thead className="bg-gray-200 dark:bg-gray-700">
            <tr>
              <th className="border border-gray-300 p-2 text-left dark:border-gray-600">Title</th>
              <th className="border border-gray-300 p-2 text-left dark:border-gray-600">Description</th>
              <th className="border border-gray-300 p-2 text-left dark:border-gray-600">Date</th>
              <th className="border border-gray-300 p-2 text-left dark:border-gray-600">Email</th>
              <th className="border border-gray-300 p-2 text-left dark:border-gray-600">SMS</th>
              <th className="border border-gray-300 p-2 text-left dark:border-gray-600">Group</th>
              <th className="border border-gray-300 p-2 text-left dark:border-gray-600">Individual</th>
              <th className="border border-gray-300 p-2 text-left dark:border-gray-600">Class</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                <td className="border border-gray-300 p-2 dark:border-gray-600">{row.title}</td>
                <td className="border border-gray-300 p-2 dark:border-gray-600">{row.description}</td>
                <td className="border border-gray-300 p-2 dark:border-gray-600">{row.date}</td>
                <td className="border border-gray-300 p-2 dark:border-gray-600">{row.email}</td>
                <td className="border border-gray-300 p-2 dark:border-gray-600">{row.sms}</td>
                <td className="border border-gray-300 p-2 dark:border-gray-600">{row.group}</td>
                <td className="border border-gray-300 p-2 dark:border-gray-600">{row.individual}</td>
                <td className="border border-gray-300 p-2 dark:border-gray-600">{row.class}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          className="px-3 py-1 bg-gray-200 rounded dark:bg-gray-700 dark:text-white"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </button>
        <span className="dark:text-white">
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
