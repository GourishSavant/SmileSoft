
import React, { useState, useEffect } from "react";

const SelectCriteriaPage = () => {
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [studentsData, setStudentsData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [noRecordFound, setNoRecordFound] = useState(false);

  const [currentPage, setCurrentPage] = useState(1); // For pagination
  const itemsPerPage = 10; // Records per page

  // Fetch the student data from the JSON file
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/admin/Bulk.json"); // Adjust the path if needed
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
    setCurrentPage(1); // Reset to first page on search
  };

  // Handle Delete All Logic
  const handleDeleteAll = () => {
    const updatedData = studentsData.filter(
      (student) =>
        !(student.class === selectedClass && student.section === selectedSection)
    );
    setStudentsData(updatedData);
    setFilteredData([]);
    setNoRecordFound(true);
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="p-6 dark:bg-gray-800 min-h-screen">
      <div className="max-w-5xl mx-auto bg-white dark:bg-gray-900 shadow-md rounded-md p-6">
        <h2 className="text-2xl font-bold dark:text-white mb-6">Select Criteria</h2>
        
        {/* Criteria Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block dark:text-white mb-2 font-medium">Class *</label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white"
            >
              <option value="">Select</option>
              <option value="1">Class 1</option>
              <option value="2">Class 2</option>
              <option value="3">Class 3</option>
            </select>
          </div>
          <div>
            <label className="block dark:text-white mb-2 font-medium">Section *</label>
            <select
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white"
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
            className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-gray-800 text-sm"
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
            <table className="min-w-full bg-white border border-gray-300 dark:bg-gray-900">
              <thead>
                <tr>
                  <th className="px-4 py-2 border-b dark:text-white">Admission No</th>
                  <th className="px-4 py-2 border-b dark:text-white">Student Name</th>
                  <th className="px-4 py-2 border-b dark:text-white">Roll No</th>
                  <th className="px-4 py-2 border-b dark:text-white">Class</th>
                  <th className="px-4 py-2 border-b dark:text-white">Father Name</th>
                  <th className="px-4 py-2 border-b dark:text-white">Date Of Birth</th>
                  <th className="px-4 py-2 border-b dark:text-white">Gender</th>
                  <th className="px-4 py-2 border-b dark:text-white">Category</th>
                  <th className="px-4 py-2 border-b dark:text-white">Mobile Number</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((student) => (
                  <tr key={student.admissionNo}>
                    <td className="px-4 py-2 border-b dark:text-white">{student.admissionNo}</td>
                    <td className="px-4 py-2 border-b dark:text-white">{student.studentName}</td>
                    <td className="px-4 py-2 border-b dark:text-white">{student.rollNo}</td>
                    <td className="px-4 py-2 border-b dark:text-white">{student.class}</td>
                    <td className="px-4 py-2 border-b dark:text-white">{student.fatherName}</td>
                    <td className="px-4 py-2 border-b dark:text-white">{student.dob}</td>
                    <td className="px-4 py-2 border-b dark:text-white">{student.gender}</td>
                    <td className="px-4 py-2 border-b dark:text-white">{student.category}</td>
                    <td className="px-4 py-2 border-b dark:text-white">{student.mobileNumber}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
{/* Pagination Controls */}
{filteredData.length > itemsPerPage && (
  <div className="flex justify-center items-center mt-4 space-x-4">
    <button
      onClick={handlePreviousPage}
      disabled={currentPage === 1}
      className={`py-2 px-4 rounded-md text-white text-sm ${
        currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-gray-400 hover:bg-gray-600"
      }`}
    >
      &lt; {/* Left arrow */}
    </button>
    <span className="text-sm dark:text-white">
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


        {/* Delete All Button */}
        {filteredData.length > 0 && (
          <div className="flex justify-end mt-4">
            <button
              onClick={handleDeleteAll}
              className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-gray-700 text-sm"
            >
              Delete All Students in {selectedClass} {selectedSection}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectCriteriaPage;



