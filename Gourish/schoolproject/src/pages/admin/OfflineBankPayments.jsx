

import React, { useState } from "react";
import { FaFilePdf, FaFileWord, FaFileExcel, FaCopy, FaPrint } from "react-icons/fa";

const OfflineBankPayments = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]); // Initially empty
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);

  // Sample placeholder data
  const paymentData = Array.from({ length: 50 }, (_, i) => ({
    requestId: `R${i + 1}`,
    admissionNo: `A${i + 1}`,
    name: `Student ${i + 1}`,
    class: `Class ${((i % 5) + 1)}`,
    paymentDate: "2024-06-01",
    submitDate: "2024-06-05",
    amount: (i + 1) * 10,
    status: i % 2 === 0 ? "Completed" : "Pending",
    statusDate: "2024-06-07",
    paymentId: `P${i + 1}`,
  }));

  // Handle Search
  const handleSearch = () => {
    const filtered = paymentData.filter(
      (record) =>
        record.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.admissionNo.includes(searchTerm)
    );
    setFilteredData(filtered);
    setCurrentPage(1); // Reset to first page
  };

  // Pagination Logic
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentData = filteredData.length > 0 ? filteredData : paymentData;
  const visibleData = currentData.slice(indexOfFirstRecord, indexOfLastRecord);

  // Handle Records per Page Change
  const handleRecordsPerPageChange = (e) => {
    setRecordsPerPage(parseInt(e.target.value));
    setCurrentPage(1); // Reset to first page
  };

  // Functionality for Icons
  const handleExportPDF = () => alert("PDF export functionality goes here.");
  const handleExportExcel = () => alert("Excel export functionality goes here.");
  const handleExportWord = () => alert("Word export functionality goes here.");
  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(currentData, null, 2));
    alert("Data copied to clipboard!");
  };
  const handlePrint = () => window.print();

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-md rounded-md p-4 relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Offline Bank Payments</h2>

          {/* Icons at Top-Right */}
            {/* Records per Page Dropdown */}
            <div className="ml-auto">
            <select
              value={recordsPerPage}
              onChange={handleRecordsPerPageChange}
              className="p-2 border rounded-md"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </div>
          <div className="flex space-x-4 text-gray-600">
            <button onClick={handleExportPDF} className="hover:text-red-500">
              <FaFilePdf size={20} title="Export as PDF" />
            </button>
            <button onClick={handleExportWord} className="hover:text-blue-500">
              <FaFileWord size={20} title="Export as Word" />
            </button>
            <button onClick={handleExportExcel} className="hover:text-green-500">
              <FaFileExcel size={20} title="Export as Excel" />
            </button>
            <button onClick={handleCopy} className="hover:text-gray-700">
              <FaCopy size={20} title="Copy Data" />
            </button>
            <button onClick={handlePrint} className="hover:text-gray-700">
              <FaPrint size={20} title="Print Page" />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex mb-4 items-center space-x-2">
          <input
            type="text"
            placeholder="Search by Name or Admission No."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Search
          </button>

        
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2 text-left">Request ID</th>
                <th className="border p-2 text-left">Admission No</th>
                <th className="border p-2 text-left">Name</th>
                <th className="border p-2 text-left">Class</th>
                <th className="border p-2 text-left">Payment Date</th>
                <th className="border p-2 text-left">Submit Date</th>
                <th className="border p-2 text-left">Amount ($)</th>
                <th className="border p-2 text-left">Status</th>
                <th className="border p-2 text-left">Status Date</th>
                <th className="border p-2 text-left">Payment ID</th>
              </tr>
            </thead>
            <tbody>
              {visibleData.length > 0 ? (
                visibleData.map((record, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="border p-2">{record.requestId}</td>
                    <td className="border p-2">{record.admissionNo}</td>
                    <td className="border p-2">{record.name}</td>
                    <td className="border p-2">{record.class}</td>
                    <td className="border p-2">{record.paymentDate}</td>
                    <td className="border p-2">{record.submitDate}</td>
                    <td className="border p-2">${record.amount}</td>
                    <td className="border p-2">{record.status}</td>
                    <td className="border p-2">{record.statusDate}</td>
                    <td className="border p-2">{record.paymentId}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="10"
                    className="text-center p-4 text-gray-500 italic"
                  >
                    No data available in table
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4">
          <span className="text-sm text-gray-600">
            Showing {indexOfFirstRecord + 1} to{" "}
            {Math.min(indexOfLastRecord, currentData.length)} of{" "}
            {currentData.length} entries
          </span>
          <div className="flex space-x-1">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              className="px-3 py-1 border rounded-md hover:bg-gray-200"
            >
              Prev
            </button>
            <button
              onClick={() =>
                setCurrentPage(
                  Math.min(
                    Math.ceil(currentData.length / recordsPerPage),
                    currentPage + 1
                  )
                )
              }
              className="px-3 py-1 border rounded-md hover:bg-gray-200"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfflineBankPayments;



