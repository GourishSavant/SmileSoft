import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const SearchIncome = () => {
  const [incomes, setIncomes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("");  // For filter like 1 month, 2 months
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [filteredIncomes, setFilteredIncomes] = useState([]);

  // Example Income Data
  useEffect(() => {
    setIncomes([
      { id: 1, name: "Income 1", incomeHead: "Head 1", invoiceNumber: "INV001", date: "2024-11-01", amount: 100 },
      { id: 2, name: "Income 2", incomeHead: "Head 2", invoiceNumber: "INV002", date: "2024-11-05", amount: 200 },
      { id: 3, name: "Income 3", incomeHead: "Head 3", invoiceNumber: "INV003", date: "2024-10-01", amount: 300 },
      { id: 4, name: "Income 4", incomeHead: "Head 1", invoiceNumber: "INV004", date: "2024-09-15", amount: 400 },
      { id: 5, name: "Income 5", incomeHead: "Head 2", invoiceNumber: "INV005", date: "2024-12-01", amount: 500 },
      { id: 6, name: "Income 6", incomeHead: "Head 1", invoiceNumber: "INV006", date: "2024-12-10", amount: 600 },
      { id: 7, name: "Income 7", incomeHead: "Head 3", invoiceNumber: "INV007", date: "2024-12-15", amount: 700 },
      { id: 8, name: "Income 8", incomeHead: "Head 2", invoiceNumber: "INV008", date: "2024-12-20", amount: 800 },
      { id: 9, name: "Income 9", incomeHead: "Head 1", invoiceNumber: "INV009", date: "2024-12-22", amount: 900 },
      { id: 10, name: "Income 10", incomeHead: "Head 2", invoiceNumber: "INV010", date: "2024-12-23", amount: 1000 },
    ]);
  }, []);

  // Filter based on search query and search type
  useEffect(() => {
    let filtered = incomes;

    if (searchQuery) {
      filtered = filtered.filter(
        (income) =>
          income.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          income.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
          income.incomeHead.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (searchType) {
      // Filter by search type, for example "1 month", "3 months"
      const currentDate = new Date();
      const dateFilterMap = {
        "1 month": 1,
        "2 months": 2,
        "6 months": 6,
      };
      const monthsToSubtract = dateFilterMap[searchType] || 0;

      if (monthsToSubtract) {
        const targetDate = new Date();
        targetDate.setMonth(currentDate.getMonth() - monthsToSubtract);
        filtered = filtered.filter((income) => new Date(income.date) >= targetDate);
      }
    }

    setFilteredIncomes(filtered);
  }, [incomes, searchQuery, searchType]);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentIncomes = filteredIncomes.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredIncomes.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-800 dark:text-white min-h-screen">
      {/* Search Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg dark:bg-gray-800 dark:text-white mb-6">
        <h2 className="text-xl font-bold mb-4">Search by Income</h2>
        <div className="flex gap-4 mb-4">
          {/* Left Section: Filter Dropdown */}
          <div className="flex-grow">
            <label htmlFor="searchType" className="block mb-2">
              Search Type *
            </label>
            <div className="flex items-center gap-2">
              <select
                id="searchType"
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
                className="p-2 border border-gray-300 rounded w-full dark:bg-gray-600 dark:text-white"
              >
                <option value="">Select</option>
                <option value="1 month">1 Month</option>
                <option value="2 months">2 Months</option>
                <option value="6 months">6 Months</option>
              </select>
              <button
                onClick={() => {}}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Search
              </button>
            </div>
          </div>

          {/* Right Section: Search Input */}
          <div className="flex-grow">
            <label htmlFor="search" className="block mb-2">
              Search *
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                id="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by Income (Name, Invoice, Income Head)"
                className="p-2 border border-gray-300 rounded w-full dark:bg-gray-600 dark:text-white"
              />
              <button
                onClick={() => {}}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Income List Table */}
      <div className="bg-white p-6 rounded-lg shadow-lg dark:bg-gray-800 dark:text-white">
        <h2 className="text-xl font-bold mb-4">Income List</h2>

        <table className="w-full border-collapse border border-gray-300 dark:border-gray-600">
          <thead className="bg-gray-200 dark:bg-gray-700">
            <tr>
              <th className="border border-gray-300 dark:border-gray-600 p-2">Name</th>
              <th className="border border-gray-300 dark:border-gray-600 p-2">Invoice Number</th>
              <th className="border border-gray-300 dark:border-gray-600 p-2">Income Head</th>
              <th className="border border-gray-300 dark:border-gray-600 p-2">Date</th>
              <th className="border border-gray-300 dark:border-gray-600 p-2">Amount ($)</th>
            </tr>
          </thead>
          <tbody>
            {currentIncomes.length > 0 ? (
              currentIncomes.map((income) => (
                <tr key={income.id} className="odd:bg-gray-100 even:bg-white dark:odd:bg-gray-700 dark:even:bg-gray-800">
                  <td className="border border-gray-300 dark:border-gray-600 p-2">{income.name}</td>
                  <td className="border border-gray-300 dark:border-gray-600 p-2">{income.invoiceNumber}</td>
                  <td className="border border-gray-300 dark:border-gray-600 p-2">{income.incomeHead}</td>
                  <td className="border border-gray-300 dark:border-gray-600 p-2">{income.date}</td>
                  <td className="border border-gray-300 dark:border-gray-600 p-2">{income.amount}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-4">
                  No data available in table
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
  );
};

export default SearchIncome;
