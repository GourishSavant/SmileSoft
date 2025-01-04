
import React, { useState } from "react";
import { FaFilePdf, FaFileWord, FaFileExcel, FaFileCsv, FaPrint, FaCopy } from "react-icons/fa";

const ExamGroupPage = () => {
  const [name, setName] = useState("");
  const [examType, setExamType] = useState("");
  const [description, setDescription] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [examGroups, setExamGroups] = useState([]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Handle adding Exam Group
  const handleAddExamGroup = () => {
    if (!name || !examType) {
      alert("Please enter Name and Exam Type!");
      return;
    }
    const newExamGroup = {
      id: examGroups.length + 1,
      name,
      examType,
      description,
      noOfExams: Math.floor(Math.random() * 5) + 1, // Random number for testing
    };
    setExamGroups([...examGroups, newExamGroup]);
    clearForm();
  };

  // Clear form fields
  const clearForm = () => {
    setName("");
    setExamType("");
    setDescription("");
  };

  // Delete Exam Group
  const handleDeleteExamGroup = (id) => {
    setExamGroups(examGroups.filter((group) => group.id !== id));
  };

  // Search filter
  const filteredGroups = examGroups.filter((group) =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredGroups.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredGroups.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto p-6 dark:bg-gray-900 dark:text-white">

      <div className="grid grid-cols-3 gap-6">
        {/* Left Section: Add Exam Group */}
        <div className="col-span-1 bg-white p-6 rounded-lg shadow-md dark:bg-gray-800">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">Add Exam Group</h2>

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

            {/* Exam Type */}
            <div>
              <label className="block text-gray-700 font-medium dark:text-white">Exam Type *</label>
              <select
                value={examType}
                onChange={(e) => setExamType(e.target.value)}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="">Select</option>
                <option value="Midterm">General Purpose(pass/fail)</option>
                <option value="Final">School Based Grading System</option>
                <option value="Quiz">College Based Grading System</option>
                <option value="Quiz">GPA Based Grading System</option>
                <option value="Quiz">Average Passing</option>

              </select>
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
                onClick={handleAddExamGroup}
                className="py-2 px-4 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>

        {/* Right Section: Exam Group List */}
        <div className="col-span-2 bg-white p-6 rounded-lg shadow-md dark:bg-gray-800">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">Exam Group List</h2>

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
                  <th className="p-2 text-left border">No Of Exams</th>
                  <th className="p-2 text-left border">Exam Type</th>
                  <th className="p-2 text-left border">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.length > 0 ? (
                  currentItems.map((group) => (
                    <tr key={group.id} className="hover:bg-gray-100 dark:hover:bg-gray-600">
                      <td className="p-2 border">{group.name}</td>
                      <td className="p-2 border">{group.noOfExams}</td>
                      <td className="p-2 border">{group.examType}</td>
                      <td className="p-2 border">
                        <button
                          onClick={() => handleDeleteExamGroup(group.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="p-4 text-center text-gray-500 dark:text-white">
                      No data available in table
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-4">
            <span className="text-gray-600 dark:text-white">
              Records: {indexOfFirstItem + 1} to {indexOfLastItem} of {filteredGroups.length}
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
        </div>
      </div>
    </div>
  );
};

export default ExamGroupPage;



