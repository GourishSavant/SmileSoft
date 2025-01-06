
import React, { useState } from "react";
import { FaFilePdf, FaFileWord, FaFileExcel, FaFileCsv, FaPrint, FaCopy } from "react-icons/fa";

const DisableReasonPage = () => {
  const [disableReason, setDisableReason] = useState("");
  const [editReason, setEditReason] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [disableReasons, setDisableReasons] = useState([]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  // Handle Add or Edit Disable Reason
  const handleAddOrUpdateDisableReason = () => {
    if (!disableReason) {
      alert("Please enter Disable Reason!");
      return;
    }
    if (editReason) {
      // Update reason
      const updatedReasons = disableReasons.map((reason) =>
        reason.id === editReason.id ? { ...reason, name: disableReason } : reason
      );
      setDisableReasons(updatedReasons);
      setEditReason(null); // Reset edit mode
    } else {
      // Add new reason
      const newReason = {
        id: disableReasons.length + 1,
        name: disableReason,
      };
      setDisableReasons([...disableReasons, newReason]);
    }
    setDisableReason(""); // Reset input field
  };

  // Handle Delete Disable Reason
  const handleDeleteDisableReason = (id) => {
    setDisableReasons(disableReasons.filter((reason) => reason.id !== id));
  };

  // Handle Edit Disable Reason
  const handleEditDisableReason = (reason) => {
    setDisableReason(reason.name);
    setEditReason(reason); // Set the reason being edited
  };

  // Search filter
  const filteredReasons = disableReasons.filter((reason) =>
    reason.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredReasons.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredReasons.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto p-6 dark:bg-gray-900 dark:text-white">
      <h1 className="text-2xl font-bold mb-6 text-gray-700 dark:text-white">Disable Reason Management</h1>

      <div className="grid grid-cols-3 gap-6">
        {/* Left Section: Add or Edit Disable Reason */}
        <div className="col-span-1 bg-white p-6 rounded-lg shadow-md dark:bg-gray-800">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">
            {editReason ? "Edit Disable Reason" : "Add Disable Reason"}
          </h2>

          <div className="space-y-4">
            {/* Disable Reason Name */}
            <div>
              <label className="block text-gray-700 font-medium dark:text-white">Disable Reason *</label>
              <input
                type="text"
                value={disableReason}
                onChange={(e) => setDisableReason(e.target.value)}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>

            {/* Add or Save Button */}
            <div className="flex justify-end">
              <button
                onClick={handleAddOrUpdateDisableReason}
                className="py-2 px-4 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600"
              >
                {editReason ? "Update" : "Save"}
              </button>
            </div>
          </div>
        </div>

        {/* Right Section: Disable Reason List */}
        <div className="col-span-2 bg-white p-6 rounded-lg shadow-md dark:bg-gray-800">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">Disable Reason List</h2>

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
                  <th className="p-2 text-left border">Disable Reason</th>
                  <th className="p-2 text-left border">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.length > 0 ? (
                  currentItems.map((reason) => (
                    <tr key={reason.id} className="hover:bg-gray-100 dark:hover:bg-gray-600">
                      <td className="p-2 border">{reason.name}</td>
                      <td className="p-2 border">
                        <button
                          onClick={() => handleEditDisableReason(reason)}
                          className="text-blue-500 hover:text-blue-700 mr-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteDisableReason(reason.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="2" className="p-4 text-center text-gray-500 dark:text-white">
                      No data available in table
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-between items-center mt-4">
              <span className="text-gray-600 dark:text-white">
                Records: {indexOfFirstItem + 1} to {indexOfLastItem} of {filteredReasons.length}
              </span>
              <div className="flex space-x-2">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300"
                >
                  &lt;
                </button>
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => paginate(index + 1)}
                    className={`px-4 py-2 rounded-md ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300"
                >
                  &gt;
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DisableReasonPage;






