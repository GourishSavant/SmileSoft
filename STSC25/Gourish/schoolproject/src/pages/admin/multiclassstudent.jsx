
import React, { useState, useEffect } from "react";

const SelectCriteriaPage = () => {
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [studentsData, setStudentsData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [noRecordFound, setNoRecordFound] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 1; // Number of items per page

  // Fetch the student data from the JSON file
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/admin/Multiclass.json"); // Adjust the path if needed
        const data = await response.json();
        setStudentsData(data); // Store all students data
        setFilteredData(data); // Initially show all students
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };
    fetchData();
  }, []);

  // Handle Search Logic
  const handleSearch = () => {
    if (selectedClass && selectedSection) {
      const results = studentsData.filter(
        (student) =>
          student.class === selectedClass && student.section === selectedSection
      );

      if (results.length > 0) {
        setFilteredData(results);
        setNoRecordFound(false);
      } else {
        setFilteredData([]);
        setNoRecordFound(true);
      }
    } else {
      setFilteredData([]);
      setNoRecordFound(true);
    }
    setCurrentPage(1); // Reset to first page after search
  };

  // Pagination Logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Select Criteria</h2>

        {/* Criteria Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 mb-2 font-medium">Class *</label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select</option>
              <option value="1">Class 1</option>
              <option value="2">Class 2</option>
              <option value="3">Class 3</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 mb-2 font-medium">Section *</label>
            <select
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select</option>
              <option value="A">Section A</option>
              <option value="B">Section B</option>
              <option value="C">Section C</option>
            </select>
          </div>
        </div>

        {/* Search Button */}
        <div className="flex justify-end mt-6">
          <button
            onClick={handleSearch}
            className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
          >
            Search
          </button>
        </div>

        {/* No Record Found */}
        {noRecordFound && (
          <div className="mt-6 text-center text-red-600 font-semibold">
            No Record Found
          </div>
        )}

        {/* Display Table */}
        {currentItems.length > 0 && (
          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr>
                  <th className="px-4 py-2 border-b">Admission No</th>
                  <th className="px-4 py-2 border-b">Student Name</th>
                  <th className="px-4 py-2 border-b">Roll No</th>
                  <th className="px-4 py-2 border-b">Class</th>
                  <th className="px-4 py-2 border-b">Father Name</th>
                  <th className="px-4 py-2 border-b">Date Of Birth</th>
                  <th className="px-4 py-2 border-b">Gender</th>
                  <th className="px-4 py-2 border-b">Category</th>
                  <th className="px-4 py-2 border-b">Mobile Number</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((student) => (
                  <tr key={student.admissionNo}>
                    <td className="px-4 py-2 border-b">{student.admissionNo}</td>
                    <td className="px-4 py-2 border-b">{student.studentName}</td>
                    <td className="px-4 py-2 border-b">{student.rollNo}</td>
                    <td className="px-4 py-2 border-b">{student.class}</td>
                    <td className="px-4 py-2 border-b">{student.fatherName}</td>
                    <td className="px-4 py-2 border-b">{student.dob}</td>
                    <td className="px-4 py-2 border-b">{student.gender}</td>
                    <td className="px-4 py-2 border-b">{student.category}</td>
                    <td className="px-4 py-2 border-b">{student.mobileNumber}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Controls */}
        {filteredData.length > itemsPerPage && (
          <div className="flex justify-end items-center mt-4 space-x-4">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className={`py-2 px-4 rounded-md text-white text-sm ${
                currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-gray-400 hover:bg-gray-600"
              }`}
            >
              &lt; {/* Left arrow */}
            </button>
            <span className="text-sm text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`py-2 px-4 rounded-md text-white text-sm ${
                currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-gray-400 hover:bg-gray-600"
              }`}
            >
              &gt; {/* Right arrow */}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectCriteriaPage;


