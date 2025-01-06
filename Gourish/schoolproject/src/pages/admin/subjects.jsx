
import React, { useState } from "react";
import { FaFilePdf, FaFileWord, FaFileExcel, FaCopy, FaPrint, FaColumns } from "react-icons/fa";

const SubjectPage = () => {
  const [subjectName, setSubjectName] = useState("");
  const [subjectCode, setSubjectCode] = useState("");
  const [subjectType, setSubjectType] = useState("Theory");
  const [subjectList, setSubjectList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  const handleAddSubject = () => {
    if (!subjectName || !subjectCode) {
      alert("Please fill in all required fields.");
      return;
    }

    const newSubject = {
      name: subjectName,
      code: subjectCode,
      type: subjectType,
    };

    if (isEditing) {
      const updatedSubjects = [...subjectList];
      updatedSubjects[editIndex] = newSubject;
      setSubjectList(updatedSubjects);
      setIsEditing(false);
      setEditIndex(null);
    } else {
      setSubjectList([...subjectList, newSubject]);
    }

    setSubjectName("");
    setSubjectCode("");
    setSubjectType("Theory");
  };

  const handleEdit = (index) => {
    const subjectToEdit = subjectList[index];
    setSubjectName(subjectToEdit.name);
    setSubjectCode(subjectToEdit.code);
    setSubjectType(subjectToEdit.type);
    setIsEditing(true);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedSubjects = subjectList.filter((_, i) => i !== index);
    setSubjectList(updatedSubjects);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to the first page after search
  };

  const filteredSubjects = subjectList.filter((subject) =>
    subject.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalRecords = filteredSubjects.length;
  const totalPages = Math.ceil(totalRecords / recordsPerPage);
  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = Math.min(startIndex + recordsPerPage, totalRecords);
  const currentRecords = filteredSubjects.slice(startIndex, endIndex);

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
        {/* Left Frame: Add/Edit Subject Form */}
        <div className="w-1/3 p-6 bg-white border border-gray-300 rounded shadow-lg">
          <h2 className="text-2xl font-semibold mb-6">{isEditing ? "Edit Subject" : "Add Subject"}</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="subjectName" className="block text-gray-600">
                Subject Name *
              </label>
              <input
                id="subjectName"
                type="text"
                value={subjectName}
                onChange={(e) => setSubjectName(e.target.value)}
                className="w-full border border-gray-300 rounded px-4 py-2"
              />
            </div>
            <div>
              <label className="block text-gray-600">Subject Type</label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="subjectType"
                    value="Theory"
                    checked={subjectType === "Theory"}
                    onChange={(e) => setSubjectType(e.target.value)}
                    className="mr-2"
                  />
                  Theory
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="subjectType"
                    value="Practical"
                    checked={subjectType === "Practical"}
                    onChange={(e) => setSubjectType(e.target.value)}
                    className="mr-2"
                  />
                  Practical
                </label>
              </div>
            </div>
            <div>
              <label htmlFor="subjectCode" className="block text-gray-600">
                Subject Code
              </label>
              <input
                id="subjectCode"
                type="text"
                value={subjectCode}
                onChange={(e) => setSubjectCode(e.target.value)}
                className="w-full border border-gray-300 rounded px-4 py-2"
              />
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleAddSubject}
                className="w-1/3 bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
              >
                {isEditing ? "Update" : "Save"}
              </button>
            </div>
          </div>
        </div>

        {/* Right Frame: Subject List */}
        <div className="flex-1 p-6 bg-white border border-gray-300 rounded shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Subject List</h2>
          </div>
          <div className="flex items-center justify-between space-x-4 mb-6">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search Subject..."
              className="p-2 border border-gray-300 rounded-lg w-1/3"
            />
            <div className="flex space-x-2">
              <FaFilePdf className="text-red-500 cursor-pointer hover:text-red-700" title="Download PDF" size={20} />
              <FaFileWord className="text-blue-500 cursor-pointer hover:text-blue-700" title="Download Word" size={20} />
              <FaFileExcel className="text-green-500 cursor-pointer hover:text-green-700" title="Download Excel" size={20} />
              <FaCopy className="text-gray-500 cursor-pointer hover:text-gray-700" title="Copy" size={20} />
              <FaPrint className="text-black cursor-pointer hover:text-gray-700" title="Print" size={20} />
              <FaColumns className="text-gray-500 cursor-pointer hover:text-gray-700" title="Columns View" size={20} />
            </div>
          </div>
          <table className="w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">Subject</th>
                <th className="px-4 py-2 text-left">Subject Code</th>
                <th className="px-4 py-2 text-left">Subject Type</th>
                <th className="px-4 py-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentRecords.length > 0 ? (
                currentRecords.map((subject, index) => (
                  <tr key={startIndex + index} className="border-t">
                    <td className="px-4 py-2">{subject.name}</td>
                    <td className="px-4 py-2">{subject.code}</td>
                    <td className="px-4 py-2">{subject.type}</td>
                    <td className="px-4 py-2 flex space-x-2">
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
                  <td colSpan="4" className="px-4 py-2 text-center text-gray-500">
                    No subjects found.
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
                className={`px-3 py-1 rounded ${currentPage === 1 ? "bg-gray-300" : "bg-blue-500 text-white"}`}
              >
                &lt;
              </button>
              <span>{currentPage}</span>
              <button
                onClick={() => handlePageChange("next")}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded ${currentPage === totalPages ? "bg-gray-300" : "bg-blue-500 text-white"}`}
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

export default SubjectPage;



