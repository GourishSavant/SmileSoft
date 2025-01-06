

import React, { useState } from "react";
import { FaFilePdf, FaFileWord, FaFileExcel, FaCopy, FaPrint, FaColumns } from "react-icons/fa";

const ClassPage = () => {
  const [sections, setSections] = useState("");
  const [sectionList, setSectionList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  const handleAddOrEditSection = () => {
    if (!sections.trim()) {
      alert("Please enter the section name.");
      return;
    }

    const newSection = { name: sections.trim() };

    if (isEditing) {
      // Update the existing section
      const updatedSectionList = [...sectionList];
      updatedSectionList[editIndex] = newSection;
      setSectionList(updatedSectionList);
      setIsEditing(false);
      setEditIndex(null);
    } else {
      // Add a new section
      setSectionList([...sectionList, newSection]);
    }

    // Clear the input field
    setSections("");
  };

  const handleEdit = (index) => {
    const sectionToEdit = sectionList[index];
    setSections(sectionToEdit.name);
    setIsEditing(true);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedSectionList = sectionList.filter((_, i) => i !== index);
    setSectionList(updatedSectionList);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to the first page on search
  };

  const filteredSections = sectionList.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalRecords = filteredSections.length;
  const totalPages = Math.ceil(totalRecords / recordsPerPage);
  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = Math.min(startIndex + recordsPerPage, totalRecords);
  const currentRecords = filteredSections.slice(startIndex, endIndex);

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="flex space-x-6">
        {/* Left Frame: Add or Edit Section Form */}
        <div className="w-1/3 p-6 bg-white border border-gray-300 rounded shadow-lg">
          <h2 className="text-2xl font-semibold mb-6">
            {isEditing ? "Edit Section" : "Add Section"}
          </h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="sections" className="block text-gray-600">
                Section Name *
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
                onClick={handleAddOrEditSection}
                className="w-1/3 bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
              >
                {isEditing ? "Update" : "Save"}
              </button>
            </div>
          </div>
        </div>

        {/* Right Frame: Section List */}
        <div className="flex-1 p-6 bg-white border border-gray-300 rounded shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Section List</h2>
          </div>
          <div className="flex items-center justify-between space-x-4 mb-6">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search Section..."
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
                <th className="px-4 py-2 text-left">Section</th>
                <th className="px-4 py-2 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentRecords.length > 0 ? (
                currentRecords.map((item, index) => (
                  <tr key={index} className="border-t">
                    <td className="px-4 py-2">{item.name}</td>
                    <td className="px-4 py-2 text-right space-x-4">
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
                    colSpan="2"
                    className="px-4 py-2 text-center text-gray-500"
                  >
                    No sections found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-gray-600">
              Records {startIndex + 1} to {endIndex} of {totalRecords}
            </span>
            <div className="flex space-x-2">
              <button
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                className={`px-4 py-2 border rounded ${
                  currentPage === 1 ? "bg-gray-300" : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                {"<"}
              </button>
              <span className="px-4 py-2">{currentPage}</span>
              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 border rounded ${
                  currentPage === totalPages
                    ? "bg-gray-300"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
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

export default ClassPage;


