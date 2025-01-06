
import React, { useState } from "react";
import { FaFilePdf, FaFileWord, FaFileExcel, FaFileCsv, FaPrint, FaCopy } from "react-icons/fa";

const FeesTypePage = () => {
  const [name, setName] = useState("");
  const [feesCode, setFeesCode] = useState("");
  const [description, setDescription] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [feesTypes, setFeesTypes] = useState([]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Add Fees Type
  const handleAddFeesType = () => {
    if (!name || !feesCode) {
      alert("Please enter Name and Fees Code!");
      return;
    }
    const newFeesType = {
      id: feesTypes.length + 1,
      name,
      feesCode,
      description,
    };
    setFeesTypes([...feesTypes, newFeesType]);
    clearForm();
  };

  // Clear Form
  const clearForm = () => {
    setName("");
    setFeesCode("");
    setDescription("");
  };

  // Delete Fees Type
  const handleDeleteFeesType = (id) => {
    setFeesTypes(feesTypes.filter((type) => type.id !== id));
  };

  // Search filter
  const filteredTypes = feesTypes.filter((type) =>
    type.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredTypes.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredTypes.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const recordsStart = filteredTypes.length > 0 ? indexOfFirstItem + 1 : 0;
  const recordsEnd = Math.min(indexOfLastItem, filteredTypes.length);

  return (
    <div className="container mx-auto p-6 dark:bg-gray-900 dark:text-white">
      <h1 className="text-2xl font-bold mb-6 text-gray-700 dark:text-white">Fees Type Management</h1>

      <div className="grid grid-cols-3 gap-6">
        {/* Left Section: Add Fees Type */}
        <div className="col-span-1 bg-white p-6 rounded-lg shadow-md dark:bg-gray-800">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">Add Fees Type</h2>

          <div className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-gray-700 font-medium dark:text-white">Name *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>

            {/* Fees Code */}
            <div>
              <label className="block text-gray-700 font-medium dark:text-white">Fees Code *</label>
              <input
                type="text"
                value={feesCode}
                onChange={(e) => setFeesCode(e.target.value)}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-gray-700 font-medium dark:text-white">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              ></textarea>
            </div>

            {/* Add Button */}
            <div className="flex justify-end">
              <button
                onClick={handleAddFeesType}
                className="py-2 px-4 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>

        {/* Right Section: Fees Type List */}
        <div className="col-span-2 bg-white p-6 rounded-lg shadow-md dark:bg-gray-800">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">Fees Type List</h2>

          {/* Search */}
          <div className="flex items-center mb-4 justify-between">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-2 w-1/2 rounded-md border focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
            <div className="flex space-x-3">
              <FaFilePdf className="cursor-pointer text-red-600" size={24} />
              <FaFileWord className="cursor-pointer text-blue-600" size={24} />
              <FaFileExcel className="cursor-pointer text-green-600" size={24} />
              <FaCopy className="cursor-pointer text-gray-600" size={24} />
              <FaPrint className="cursor-pointer text-black" size={24} />
              <FaFileCsv className="cursor-pointer text-yellow-600" size={24} />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full border dark:bg-gray-800">
              <thead>
                <tr className="bg-gray-200 dark:bg-gray-700 dark:text-white">
                  <th className="p-2 text-left border">Name</th>
                  <th className="p-2 text-left border">Fees Code</th>
                  <th className="p-2 text-left border">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.length > 0 ? (
                  currentItems.map((type) => (
                    <tr key={type.id} className="hover:bg-gray-100 dark:hover:bg-gray-600">
                      <td className="p-2 border">{type.name}</td>
                      <td className="p-2 border">{type.feesCode}</td>
                      <td className="p-2 border">
                        <button
                          onClick={() => handleDeleteFeesType(type.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="p-4 text-center text-gray-500 dark:text-white">
                      No data available in table
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-4">
            <div>
              Records: {recordsStart} to {recordsEnd} of {filteredTypes.length}
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
                className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 dark:bg-gray-700 dark:text-white"
              >
                {"<"}
              </button>
              <button
                onClick={() => paginate(currentPage < totalPages ? currentPage + 1 : totalPages)}
                className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 dark:bg-gray-700 dark:text-white"
              >
                {">"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeesTypePage;


