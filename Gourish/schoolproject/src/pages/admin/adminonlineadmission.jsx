
import React, { useState } from "react";
import { FaFilePdf, FaFileCsv, FaFileExcel, FaFileWord, FaCopy,FaColumns } from "react-icons/fa";

const StudentList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage, setStudentsPerPage] = useState(5); // Default to 5 students per page
  const [recordsPerPageOption, setRecordsPerPageOption] = useState("5");

  // Sample student data (JSON)
  const students = [
    { referenceNo: "S001", studentName: "John Doe", className: "5", fatherName: "Michael Doe", dob: "2009-04-15", gender: "Male", category: "General", mobileNumber: "1234567890", formStatus: "Completed", enrolled: "Yes", createdAt: "2024-01-01" },
    { referenceNo: "S002", studentName: "Jane Smith", className: "4", fatherName: "David Smith", dob: "2010-07-10", gender: "Female", category: "OBC", mobileNumber: "0987654321", formStatus: "Pending", enrolled: "No", createdAt: "2024-01-05" },
    { referenceNo: "S003", studentName: "Alice Brown", className: "6", fatherName: "Robert Brown", dob: "2008-02-20", gender: "Female", category: "General", mobileNumber: "1230987654", formStatus: "Completed", enrolled: "Yes", createdAt: "2024-01-10" },
    { referenceNo: "S004", studentName: "Bob Green", className: "7", fatherName: "Thomas Green", dob: "2007-09-25", gender: "Male", category: "SC", mobileNumber: "2345678901", formStatus: "Completed", enrolled: "Yes", createdAt: "2024-02-01" },
    { referenceNo: "S005", studentName: "Charlie White", className: "8", fatherName: "James White", dob: "2006-12-11", gender: "Male", category: "General", mobileNumber: "3456789012", formStatus: "Pending", enrolled: "No", createdAt: "2024-02-10" },
    { referenceNo: "S006", studentName: "Diana Blue", className: "5", fatherName: "Michael Blue", dob: "2009-06-30", gender: "Female", category: "OBC", mobileNumber: "4567890123", formStatus: "Completed", enrolled: "Yes", createdAt: "2024-02-15" },
    { referenceNo: "S007", studentName: "Eve Black", className: "4", fatherName: "John Black", dob: "2010-05-05", gender: "Female", category: "General", mobileNumber: "5678901234", formStatus: "Completed", enrolled: "Yes", createdAt: "2024-02-18" },
    { referenceNo: "S008", studentName: "Frank Yellow", className: "6", fatherName: "George Yellow", dob: "2008-11-18", gender: "Male", category: "ST", mobileNumber: "6789012345", formStatus: "Pending", enrolled: "No", createdAt: "2024-02-20" },
    { referenceNo: "S009", studentName: "Grace Red", className: "7", fatherName: "Richard Red", dob: "2007-03-10", gender: "Female", category: "OBC", mobileNumber: "7890123456", formStatus: "Completed", enrolled: "Yes", createdAt: "2024-03-01" },
    { referenceNo: "S010", studentName: "Hannah Grey", className: "8", fatherName: "Edward Grey", dob: "2006-08-21", gender: "Female", category: "General", mobileNumber: "8901234567", formStatus: "Pending", enrolled: "No", createdAt: "2024-03-05" },
  ];

  // Function to handle search button click
  const handleSearch = () => {
    const result = students.filter((student) =>
      student.studentName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredStudents(result);
    setCurrentPage(1); // Reset to the first page after search
  };

  // Function to handle the search input change
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Function to handle download icons (placeholder functions)
  const downloadPdf = () => { console.log("Download PDF"); };
  const downloadCsv = () => { console.log("Download CSV"); };
  const downloadExcel = () => { console.log("Download Excel"); };
  const downloadWord = () => { console.log("Download Word"); };
  const copyToClipboard = () => { console.log("Copied to clipboard"); };
  

  // Handle records per page change
  const handleRecordsPerPageChange = (e) => {
    setRecordsPerPageOption(e.target.value);
    setStudentsPerPage(e.target.value === "All" ? students.length : parseInt(e.target.value));
    setCurrentPage(1); // Reset to first page when changing the records per page
  };

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.length > 0
    ? filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent)
    : students.slice(indexOfFirstStudent, indexOfLastStudent);

  const totalPages = Math.ceil(
    (filteredStudents.length > 0 ? filteredStudents.length : students.length) / studentsPerPage
  );

  const totalRecords = filteredStudents.length > 0 ? filteredStudents.length : students.length;

  return (
    <div className="max-w-7xl p-5 bg-white shadow-lg rounded-md ml-5 mr-5 mt-5 mb-5 relative bg-gray-100 dark:bg-gray-900 dark:text-white">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Student List</h2>
      </div>
  
      {/* Search Box and Button */}
      <div className="mb-4 flex items-center space-x-1">
        <input
          type="text"
          className="px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
          placeholder="Search by Student Name"
          value={searchTerm}
          onChange={handleInputChange}
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 border border-gray-500 bg-gray-500 text-white rounded-r-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Search
        </button>
  
        {/* Dropdown for selecting records per page */}
        <div className="w-full flex justify-end">
          <select
            value={recordsPerPageOption}
            onChange={handleRecordsPerPageChange}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 dark:bg-gray-800 dark:text-white"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="100">100</option>
            <option value="All">All</option>
          </select>
        </div>
        <div className="flex space-x-4">
          <button onClick={downloadPdf} className="text-red-600 hover:text-red-800">
            <FaFilePdf size={24} />
          </button>
          <button onClick={downloadCsv} className="text-green-600 hover:text-green-800">
            <FaFileCsv size={24} />
          </button>
          <button onClick={downloadExcel} className="text-blue-600 hover:text-blue-800">
            <FaFileExcel size={24} />
          </button>
          <button onClick={downloadWord} className="text-purple-600 hover:text-purple-800">
            <FaFileWord size={24} />
          </button>
          <button onClick={copyToClipboard} className="text-gray-600 hover:text-gray-800">
            <FaCopy size={24} />
          </button>
        </div>
      </div>
  
      {/* Table with horizontal scrolling */}
      <div className="">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700">
              <th className="px-4 py-4 text-left text-gray-600 dark:text-white">Reference No</th>
              <th className="px-4 py-4 text-left text-gray-600 dark:text-white">Student Name</th>
              <th className="px-4 py-4 text-left text-gray-600 dark:text-white">Class</th>
              <th className="px-4 py-4 text-left text-gray-600 dark:text-white">Father Name</th>
              <th className="px-4 py-4 text-left text-gray-600 dark:text-white">Date Of Birth</th>
              <th className="px-4 py-4 text-left text-gray-600 dark:text-white">Gender</th>
              <th className="px-4 py-4 text-left text-gray-600 dark:text-white">Category</th>
              <th className="px-4 py-4 text-left text-gray-600 dark:text-white">Form Status</th>
              <th className="px-4 py-4 text-left text-gray-600 dark:text-white">Enrolled</th>
              <th className="px-4 py-4 text-left text-gray-600 dark:text-white">Created At</th>
              <th className="px-4 py-4 text-left text-gray-600 dark:text-white">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentStudents.length > 0 ? (
              currentStudents.map((student, index) => (
                <tr key={index} className="border-b dark:border-gray-600">
                  <td className="px-4 py-4 text-gray-800 dark:text-white">{student.referenceNo}</td>
                  <td className="px-4 py-4 text-gray-800 dark:text-white">{student.studentName}</td>
                  <td className="px-4 py-4 text-gray-800 dark:text-white">{student.className}</td>
                  <td className="px-4 py-4 text-gray-800 dark:text-white">{student.fatherName}</td>
                  <td className="px-4 py-4 text-gray-800 dark:text-white">{student.dob}</td>
                  <td className="px-4 py-4 text-gray-800 dark:text-white">{student.gender}</td>
                  <td className="px-4 py-4 text-gray-800 dark:text-white">{student.category}</td>
                  <td className="px-4 py-4 text-gray-800 dark:text-white">{student.formStatus}</td>
                  <td className="px-4 py-4 text-gray-800 dark:text-white">{student.enrolled}</td>
                  <td className="px-4 py-4 text-gray-800 dark:text-white">{student.createdAt}</td>
                  <td className="px-4 py-4 text-blue-600 hover:text-blue-800 cursor-pointer">
                    <button>Edit</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="12" className="px-4 py-4 text-center text-gray-600 dark:text-white">
                  No data available in table
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
  
      <div className="flex justify-between items-center mt-4">
        <div className="text-gray-700">
          Records {indexOfFirstStudent + 1} to {Math.min(indexOfLastStudent, totalRecords)} of {totalRecords}
        </div>
        <div>
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 border bg-gray-300 rounded-md"
          >
            Previous
          </button>
          <span className="mx-4">Page {currentPage} of {totalPages}</span>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border bg-gray-300 rounded-md"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
  
};

export default StudentList;








