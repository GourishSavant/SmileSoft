
import React, { useState } from "react";
import {
  FaFilePdf,
  FaFileWord,
  FaFileExcel,
  FaCopy,
  FaPrint,
  FaColumns,
} from "react-icons/fa";

const ClassPage = () => {
  const [className, setClassName] = useState("");
  const [sections, setSections] = useState("");
  const [classList, setClassList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  const handleAddOrEditClass = () => {
    if (!className || !sections) {
      alert("Please fill in all required fields.");
      return;
    }

    const newClass = { name: className, sections };

    if (isEditing) {
      // Update the existing class
      const updatedClassList = [...classList];
      updatedClassList[editIndex] = newClass;
      setClassList(updatedClassList);
      setIsEditing(false);
      setEditIndex(null);
    } else {
      // Add a new class
      setClassList([...classList, newClass]);
    }

    // Clear form fields
    setClassName("");
    setSections("");
  };

  const handleEdit = (index) => {
    const classToEdit = classList[index];
    setClassName(classToEdit.name);
    setSections(classToEdit.sections);
    setIsEditing(true);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedClassList = classList.filter((_, i) => i !== index);
    setClassList(updatedClassList);
  };

  const filteredClasses = classList.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to the first page after search
  };

  // Pagination logic
  const totalRecords = filteredClasses.length;
  const totalPages = Math.ceil(totalRecords / recordsPerPage);
  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = Math.min(startIndex + recordsPerPage, totalRecords);
  const currentRecords = filteredClasses.slice(startIndex, endIndex);

  const handlePageChange = (direction) => {
    if (direction === "next" && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    } else if (direction === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="flex space-x-6">
        {/* Left Frame: Add or Edit Class Form */}
        <div className="w-1/3 p-6 bg-white border border-gray-300 rounded shadow-lg">
          <h2 className="text-2xl font-semibold mb-6">
            {isEditing ? "Edit Class" : "Add Class"}
          </h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="className" className="block text-gray-600">
                Class *
              </label>
              <input
                id="className"
                type="text"
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                className="w-full border border-gray-300 rounded px-4 py-2"
              />
            </div>
            <div>
              <label htmlFor="sections" className="block text-gray-600">
                Sections *
              </label>
              <input
                id="sections"
                type="text"
                value={sections}
                onChange={(e) => setSections(e.target.value)}
                className="w-full border border-gray-300 rounded px-4 py-2"
              />
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleAddOrEditClass}
                className="w-1/3 bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
              >
                {isEditing ? "Update" : "Save"}
              </button>
            </div>
          </div>
        </div>

        {/* Right Frame: Class List */}
        <div className="flex-1 p-6 bg-white border border-gray-300 rounded shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Class List</h2>
          </div>
          <div className="flex items-center justify-between space-x-4 mb-6">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search Class..."
              className="p-2 border border-gray-300 rounded-lg w-1/3"
            />
            <div className="flex space-x-2">
              <FaFilePdf
                className="text-red-500 cursor-pointer hover:text-red-700"
                title="Download PDF"
                size={20}
              />
              <FaFileWord
                className="text-blue-500 cursor-pointer hover:text-blue-700"
                title="Download Word"
                size={20}
              />
              <FaFileExcel
                className="text-green-500 cursor-pointer hover:text-green-700"
                title="Download Excel"
                size={20}
              />
              <FaCopy
                className="text-gray-500 cursor-pointer hover:text-gray-700"
                title="Copy"
                size={20}
              />
              <FaPrint
                className="text-black cursor-pointer hover:text-gray-700"
                title="Print"
                size={20}
              />
              <FaColumns
                className="text-gray-500 cursor-pointer hover:text-gray-700"
                title="Columns View"
                size={20}
              />
            </div>
          </div>
          <table className="w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">Class</th>
                <th className="px-4 py-2 text-left">Sections</th>
                <th className="px-4 py-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentRecords.length > 0 ? (
                currentRecords.map((item, index) => (
                  <tr key={startIndex + index} className="border-t">
                    <td className="px-4 py-2">{item.name}</td>
                    <td className="px-4 py-2">{item.sections}</td>
                    <td className="px-4 py-2 space-x-4">
                      <button
                        onClick={() => handleEdit(startIndex + index)}
                        className="text-blue-500 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(startIndex + index)}
                        className="text-red-500 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="3"
                    className="px-4 py-2 text-center text-gray-500"
                  >
                    No classes found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="flex justify-between items-center mt-4">
            <span>
              Records {startIndex + 1} to {endIndex} of {totalRecords}
            </span>
            <div className="flex space-x-2">
              <button
                onClick={() => handlePageChange("prev")}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded ${
                  currentPage === 1 ? "bg-gray-300" : "bg-blue-500 text-white"
                }`}
              >
                &lt;
              </button>
              <span>{currentPage}</span>
              <button
                onClick={() => handlePageChange("next")}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded ${
                  currentPage === totalPages
                    ? "bg-gray-300"
                    : "bg-blue-500 text-white"
                }`}
              >
                &gt;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassPage;






