import React, { useState } from "react";
import {
  FaFilePdf,
  FaFileWord,
  FaFileExcel,
  FaPrint,
  FaCopy,
  FaColumns,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

const AddIncome = () => {
  const [incomes, setIncomes] = useState([]);
  const [newIncome, setNewIncome] = useState({
    id: null,
    name: "",
    incomeHead: "",
    invoiceNumber: "",
    date: "",
    amount: "",
    document: null,
    description: "",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [columnVisibility, setColumnVisibility] = useState({
    name: true,
    description: true,
    invoiceNumber: true,
    date: true,
    incomeHead: true,
    amount: true,
    actions: true,
  });

  const itemsPerPage = 5;

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewIncome((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle file upload
  const handleFileChange = (e) => {
    setNewIncome((prevState) => ({
      ...prevState,
      document: e.target.files[0],
    }));
  };

  // Add Income
  const handleAddIncome = () => {
    setIncomes((prevIncomes) => [
      ...prevIncomes,
      { ...newIncome, id: prevIncomes.length + 1 },
    ]);
    setNewIncome({
      id: null,
      name: "",
      incomeHead: "",
      invoiceNumber: "",
      date: "",
      amount: "",
      document: null,
      description: "",
    });
  };

  // Handle search query change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter incomes based on search query
  const filteredIncomes = incomes.filter(
    (income) =>
      income.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      income.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      income.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentIncomes = filteredIncomes.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredIncomes.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Toggle column visibility
  const toggleColumnVisibility = (column) => {
    setColumnVisibility((prevState) => ({
      ...prevState,
      [column]: !prevState[column],
    }));
  };

  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-800 dark:text-white min-h-screen grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* Left Section: Add Income Form */}
      <div className="bg-white p-6 rounded-lg shadow-lg dark:bg-gray-800 dark:text-white">
        <h2 className="text-xl font-bold mb-4">Add Income</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="incomeHead" className="block mb-2">
              Income Head *
            </label>
            <select
              id="incomeHead"
              name="incomeHead"
              value={newIncome.incomeHead}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded w-full dark:bg-gray-600 dark:text-white"
            >
              <option value="">Select</option>
              <option value="Head1">Head 1</option>
              <option value="Head2">Head 2</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2">
              Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={newIncome.name}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded w-full dark:bg-gray-600 dark:text-white"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="invoiceNumber" className="block mb-2">
              Invoice Number
            </label>
            <input
              type="text"
              id="invoiceNumber"
              name="invoiceNumber"
              value={newIncome.invoiceNumber}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded w-full dark:bg-gray-600 dark:text-white"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="date" className="block mb-2">
              Date *
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={newIncome.date}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded w-full dark:bg-gray-600 dark:text-white"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="amount" className="block mb-2">
              Amount ($) *
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={newIncome.amount}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded w-full dark:bg-gray-600 dark:text-white"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="document" className="block mb-2">
              Attach Document
            </label>
            <input
              type="file"
              id="document"
              onChange={handleFileChange}
              className="p-2 border border-gray-300 rounded w-full dark:bg-gray-600 dark:text-white"
            />
            {newIncome.document && (
              <p className="mt-2 text-sm">
                Selected file: {newIncome.document.name}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block mb-2">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={newIncome.description}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded w-full dark:bg-gray-600 dark:text-white"
            ></textarea>
          </div>
          <button
            type="button"
            onClick={handleAddIncome}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Add Income
          </button>
        </form>
      </div>

      {/* Right Section: Income List */}
      <div className="col-span-2 bg-white p-6 rounded-lg shadow-lg dark:bg-gray-800 dark:text-white">
        <h2 className="text-xl font-bold mb-4">Income List</h2>

        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="p-2 border border-gray-300 rounded w-full max-w-xs dark:bg-gray-600 dark:text-white"
          />

          {/* Filter Dropdown */}
          <div className="flex items-center">
            <label className="mr-2 text-sm font-medium">Filter</label>
            <select
              value="All"
              onChange={() => {}}
              className="border p-2 rounded text-sm dark:bg-gray-700 dark:text-white"
            >
              <option value="All">All</option>
              <option value="100">100</option>
            </select>
          </div>

          <div className="flex gap-2">
            <FaFilePdf className="text-red-500 cursor-pointer" title="Export to PDF" />
            <FaFileWord className="text-blue-500 cursor-pointer" title="Export to Word" />
            <FaFileExcel className="text-green-500 cursor-pointer" title="Export to Excel" />
            <FaPrint className="text-gray-700 cursor-pointer" title="Print" />
            <FaCopy className="text-gray-500 cursor-pointer" title="Copy" />
            <FaColumns
              className="text-gray-400 cursor-pointer"
              title="Column Options"
              onClick={() => toggleColumnVisibility('name')}
            />
          </div>
        </div>
        <table className="w-full border-collapse border border-gray-300 dark:border-gray-600">
          <thead className="bg-gray-200 dark:bg-gray-700">
            <tr>
              {columnVisibility.name && (
                <th className="border border-gray-300 dark:border-gray-600 p-2">Name</th>
              )}
              {columnVisibility.description && (
                <th className="border border-gray-300 dark:border-gray-600 p-2">Description</th>
              )}
              {columnVisibility.invoiceNumber && (
                <th className="border border-gray-300 dark:border-gray-600 p-2">Invoice Number</th>
              )}
              {columnVisibility.date && (
                <th className="border border-gray-300 dark:border-gray-600 p-2">Date</th>
              )}
              {columnVisibility.incomeHead && (
                <th className="border border-gray-300 dark:border-gray-600 p-2">Income Head</th>
              )}
              {columnVisibility.amount && (
                <th className="border border-gray-300 dark:border-gray-600 p-2">Amount ($)</th>
              )}
              {columnVisibility.actions && (
                <th className="border border-gray-300 dark:border-gray-600 p-2">Actions</th>
              )}
            </tr>
          </thead>
          <tbody>
            {currentIncomes.length > 0 ? (
              currentIncomes.map((income) => (
                <tr
                  key={income.id}
                  className="odd:bg-gray-100 even:bg-white dark:odd:bg-gray-700 dark:even:bg-gray-800"
                >
                  {columnVisibility.name && (
                    <td className="border border-gray-300 dark:border-gray-600 p-2">{income.name}</td>
                  )}
                  {columnVisibility.description && (
                    <td className="border border-gray-300 dark:border-gray-600 p-2">{income.description}</td>
                  )}
                  {columnVisibility.invoiceNumber && (
                    <td className="border border-gray-300 dark:border-gray-600 p-2">{income.invoiceNumber}</td>
                  )}
                  {columnVisibility.date && (
                    <td className="border border-gray-300 dark:border-gray-600 p-2">{income.date}</td>
                  )}
                  {columnVisibility.incomeHead && (
                    <td className="border border-gray-300 dark:border-gray-600 p-2">{income.incomeHead}</td>
                  )}
                  {columnVisibility.amount && (
                    <td className="border border-gray-300 dark:border-gray-600 p-2">{income.amount}</td>
                  )}
                  {columnVisibility.actions && (
                    <td className="border border-gray-300 dark:border-gray-600 p-2">
                      <div className="flex gap-2">
                        <FaEdit className="text-blue-500 cursor-pointer" title="Edit" />
                        <FaTrash className="text-red-500 cursor-pointer" title="Delete" />
                      </div>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center p-4">
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

export default AddIncome;
