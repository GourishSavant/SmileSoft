
import React, { useState } from "react";
import { FaFilePdf, FaFileExcel, FaFileCsv, FaPrint, FaCopy, FaFileWord, FaColumns } from 'react-icons/fa';

const AssignClassTeacher = () => {
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedTeachers, setSelectedTeachers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [teacherList, setTeacherList] = useState([]);
  const [editingRow, setEditingRow] = useState(null); // Track which row is being edited


  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  // Example class teachers
  const classTeachers = [
    { id: 1, name: "Gourish (2)" },
    { id: 2, name: "Yashavanth B A (123)" },
    { id: 3, name: "Chetan H S (154)" },
  ];

  // Handle selecting a teacher
  const handleTeacherChange = (e) => {
    const { value, checked } = e.target;
    setSelectedTeachers((prevSelectedTeachers) =>
      checked
        ? [...prevSelectedTeachers, value]
        : prevSelectedTeachers.filter((teacher) => teacher !== value)
    );
  };

  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
  };

  const handleSectionChange = (e) => {
    setSelectedSection(e.target.value);
  };

  const handleAssign = () => {
    if (selectedClass && selectedSection && selectedTeachers.length > 0) {
      const newTeacherList = selectedTeachers.map((teacherName) => ({
        class: selectedClass,
        section: selectedSection,
        teacher: teacherName,
      }));

      setTeacherList([...teacherList, ...newTeacherList]);
      // Reset after assignment
      setSelectedClass("");
      setSelectedSection("");
      setSelectedTeachers([]);
    } else {
      alert("Please select class, section, and teacher(s).");
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter teachers by search term
  const filteredTeachers = teacherList.filter((teacher) =>
    teacher.teacher.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle Edit
  const handleEdit = (index) => {
    const teacher = teacherList[index];
    setSelectedClass(teacher.class);
    setSelectedSection(teacher.section);
    setEditingRow(index);
  };

  // Handle Delete
  const handleDelete = (index) => {
    const newTeacherList = teacherList.filter((_, i) => i !== index);
    setTeacherList(newTeacherList);
  };
  // Paginated teachers
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredTeachers.slice(indexOfFirstRow, indexOfLastRow);

 // Pagination controls
 const totalPages = Math.ceil(filteredTeachers.length / rowsPerPage);

 const handleNextPage = () => {
   if (currentPage < totalPages) {
     setCurrentPage((prev) => prev + 1);
   }
 };

 const handlePreviousPage = () => {
   if (currentPage > 1) {
     setCurrentPage((prev) => prev - 1);
   }
 };
  return (
    <div className="flex justify-between items-start bg-gray-100 p-10 space-x-6">
      {/* Left Section: Assign Class Teacher */}
      <div className="w-1/3 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Assign Class Teacher</h2>

        {/* Class Dropdown */}
        <div className="mb-4">
          <label htmlFor="class" className="block text-gray-600 text-sm font-medium mb-2">
            Class *
          </label>
          <select
            id="class"
            value={selectedClass}
            onChange={handleClassChange}
            className="w-full border border-gray-300 rounded px-4 py-3 text-gray-700 focus:outline-none focus:ring focus:ring-blue-400"
          >
            <option value="">Select</option>
            <option value="Class 1">Class 1</option>
            <option value="Class 2">Class 2</option>
            <option value="Class 3">Class 3</option>
            <option value="Class 4">Class 4</option>
            <option value="Class 5">Class 5</option>
          </select>
        </div>

        {/* Section Dropdown */}
        <div className="mb-4">
          <label htmlFor="section" className="block text-gray-600 text-sm font-medium mb-2">
            Section *
          </label>
          <select
            id="section"
            value={selectedSection}
            onChange={handleSectionChange}
            className="w-full border border-gray-300 rounded px-4 py-3 text-gray-700 focus:outline-none focus:ring focus:ring-blue-400"
          >
            <option value="">Select</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
          </select>
        </div>

        {/* Class Teachers List */}
        <div className="mb-4">
          <h3 className="text-sm text-gray-600 font-medium mb-2">Class Teachers</h3>
          {classTeachers.map((teacher) => (
            <div key={teacher.id} className="flex items-center mb-2">
              <input
                type="checkbox"
                value={teacher.name}
                onChange={handleTeacherChange}
                className="mr-2"
              />
              <label htmlFor={teacher.name} className="text-gray-700 text-sm">
                {teacher.name}
              </label>
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleAssign}
            disabled={!selectedClass || !selectedSection || selectedTeachers.length === 0}
            className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {editingRow !== null ? "Update" : "Assign"}
          </button>
        </div>
      </div>

      {/* Right Section: Class Teacher List */}
      <div className="w-2/3 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Class Teacher List</h2>

        {/* Search Input and Icons */}
        <div className="flex items-center justify-between space-x-4 mb-6">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search teacher"
            className="p-2 border border-gray-300 rounded-lg w-1/3"
          />
          {/* Downloadable Icons */}
          <div className="flex space-x-2">
            <FaFilePdf className="text-red-500 cursor-pointer hover:text-red-700" title="Download PDF" size={20} />
            <FaFileWord className="text-blue-500 cursor-pointer hover:text-blue-700" title="Download Word" size={20} />
            <FaFileExcel className="text-green-500 cursor-pointer hover:text-green-700" title="Download Excel" size={20} />
            <FaCopy className="text-gray-500 cursor-pointer hover:text-gray-700" title="Copy" size={20} />
            <FaPrint className="text-black cursor-pointer hover:text-gray-700" title="Print" size={20} />
            <FaColumns className="text-gray-500 cursor-pointer hover:text-gray-700" title="Columns View" size={20} />
          </div>
        </div>

        {/* Table for Teacher List */}
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4 text-sm text-gray-600 font-semibold">Class</th>
                <th className="py-2 px-4 text-sm text-gray-600 font-semibold">Section</th>
                <th className="py-2 px-4 text-sm text-gray-600 font-semibold">Class Teacher</th>
                <th className="py-2 px-4 text-sm text-gray-600 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredTeachers.map((teacher, index) => (
                <tr key={index}>
                  <td className="py-3 px-4 text-sm text-gray-700">{teacher.class}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">{teacher.section}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">{teacher.teacher}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">
                    <button
                      onClick={() => handleEdit(index)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="text-red-500 hover:text-red-700 ml-4"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
       {/* Pagination */}
<div className="flex justify-between items-center mt-4">
  <span className="text-sm text-gray-600">
    Records {indexOfFirstRow + 1} to {Math.min(indexOfLastRow, filteredTeachers.length)} of{" "}
    {filteredTeachers.length} 
  </span>
  <div>
    <button
      onClick={handlePreviousPage}
      disabled={currentPage === 1}
      className="px-3 py-2 mx-1 text-sm bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
    >
      &lt; {/* Left arrow */}
    </button>
    <button
      onClick={handleNextPage}
      disabled={currentPage === totalPages}
      className="px-3 py-2 mx-1 text-sm bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
    >
      &gt; {/* Right arrow */}
    </button>
  </div>
</div>
</div>
</div>

  );
};

export default AssignClassTeacher;




