import React, { useState } from "react";
import { FaSearch, FaEdit, FaTrash, FaPlus, FaSave, FaTimes, FaFilePdf, FaFileWord, FaFileExcel, FaPrint, FaCopy, FaColumns } from "react-icons/fa";

const IncomeHeadList = () => {
  const [incomeHeads, setIncomeHeads] = useState([
    { id: 1, incomeHead: "Income 1", description: "Description 1" },
    { id: 2, incomeHead: "Income 2", description: "Description 2" },
    { id: 3, incomeHead: "Income 3", description: "Description 3" },
    { id: 4, incomeHead: "Income 4", description: "Description 4" },
    { id: 5, incomeHead: "Income 5", description: "Description 5" },
    { id: 6, incomeHead: "Income 6", description: "Description 6" },
    { id: 7, incomeHead: "Income 7", description: "Description 7" },
    { id: 8, incomeHead: "Income 8", description: "Description 8" },
    { id: 9, incomeHead: "Income 9", description: "Description 9" },
    { id: 10, incomeHead: "Income 10", description: "Description 10" },
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [newIncomeHead, setNewIncomeHead] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [message, setMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Add new income head to the list
  const addIncomeHead = () => {
    if (newIncomeHead && newDescription) {
      const newEntry = {
        id: incomeHeads.length + 1,
        incomeHead: newIncomeHead,
        description: newDescription,
      };
      setIncomeHeads([...incomeHeads, newEntry]);
      setMessage("Record added successfully!");
      setNewIncomeHead("");
      setNewDescription("");
    } else {
      setMessage("Please fill in both fields.");
    }
  };

  // Filter income heads based on search query
  const filteredIncomeHeads = incomeHeads.filter((entry) =>
    entry.incomeHead.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentIncomeHeads = filteredIncomeHeads.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredIncomeHeads.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-800 dark:text-white min-h-screen">
      <div className="flex gap-6">
        {/* Left Section: Add Income Head */}
        <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 dark:bg-gray-800 dark:text-white">
          <h2 className="text-xl font-bold mb-4">Add Income Head</h2>
          <div className="mb-4">
            <label htmlFor="incomeHead" className="block mb-2">Income Head *</label>
            <input
              type="text"
              id="incomeHead"
              value={newIncomeHead}
              onChange={(e) => setNewIncomeHead(e.target.value)}
              placeholder="Enter Income Head"
              className="p-2 border border-gray-300 rounded w-full dark:bg-gray-600 dark:text-white"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block mb-2">Description</label>
            <input
              type="text"
              id="description"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="Enter Description"
              className="p-2 border border-gray-300 rounded w-full dark:bg-gray-600 dark:text-white"
            />
          </div>
          <button
            onClick={addIncomeHead}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Save
          </button>
          {message && <p className="text-green-500 mt-4">{message}</p>}
        </div>

        {/* Right Section: Income Head List */}
        <div className="bg-white p-6 rounded-lg shadow-lg w-2/3 dark:bg-gray-800 dark:text-white relative">
          {/* Icons at the top-right corner */}
          <div className="absolute top-4 right-4 flex gap-2">
            <FaFilePdf className="cursor-pointer text-red-500" title="Export as PDF" />
            <FaFileWord className="cursor-pointer text-blue-500" title="Export as Docs" />
            <FaFileExcel className="cursor-pointer text-green-500" title="Export as Excel" />
            <FaPrint className="cursor-pointer text-gray-500" title="Print" />
            <FaCopy className="cursor-pointer text-gray-500" title="Copy" />
            <FaColumns className="cursor-pointer text-gray-500" title="Column Visibility" />
          </div>

          {/* Heading and Search Input */}
          <h2 className="text-xl font-bold mb-4">Income Head List</h2>

          {/* Search Query Below Heading */}
          <div className="flex mb-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="p-2 border border-gray-300 rounded dark:bg-gray-600 dark:text-white"
            />
            <button className="bg-blue-500 text-white p-2 rounded">
              <FaSearch />
            </button>
          </div>

          <table className="w-full border-collapse border border-gray-300 dark:border-gray-600">
            <thead className="bg-gray-200 dark:bg-gray-700">
              <tr>
                <th className="border border-gray-300 dark:border-gray-600 p-2">Income Head</th>
                <th className="border border-gray-300 dark:border-gray-600 p-2">Description</th>
                <th className="border border-gray-300 dark:border-gray-600 p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentIncomeHeads.length > 0 ? (
                currentIncomeHeads.map((item) => (
                  <tr key={item.id} className="odd:bg-gray-100 even:bg-white dark:odd:bg-gray-700 dark:even:bg-gray-800">
                    <td className="border border-gray-300 dark:border-gray-600 p-2">{item.incomeHead}</td>
                    <td className="border border-gray-300 dark:border-gray-600 p-2">{item.description}</td>
                    <td className="border border-gray-300 dark:border-gray-600 p-2">
                      <div className="flex gap-2">
                        <FaEdit className="text-blue-500 cursor-pointer" title="Edit" />
                        <FaTrash className="text-red-500 cursor-pointer" title="Delete" />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center p-4">
                    No data available in table. Add new record or search with different criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => paginate(currentPage - 1)}
              className="px-3 py-1 bg-gray-200 rounded dark:bg-gray-700 dark:text-white"
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => paginate(currentPage + 1)}
              className="px-3 py-1 bg-gray-200 rounded dark:bg-gray-700 dark:text-white"
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncomeHeadList;
