

import React, { useState, useEffect } from "react";

const ExamResult = () => {
  const [filters, setFilters] = useState({
    academicYear: "",
    examType: "",
    class: "",
    section: "",
    subject: "",
    searchQuery: "",
  });

  const [results, setResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 10; // Change this to the number of results per page

  // Fetch the exam results data from the JSON file
  useEffect(() => {
    fetch("/admin/examResultsData.json") // Adjust the path to where your JSON file is located
      .then((response) => response.json()) // Parse the JSON file
      .then((data) => {
        setResults(data); // Store the results in state
      })
      .catch((error) => console.error("Error fetching exam data:", error)); // Log any errors
  }, []); // Empty dependency array ensures this runs once when the component mounts

  // Handle input changes for filters
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // Handle search and filtering
  const handleSearch = () => {
    const filtered = results.filter((result) => {
      const matchesYear =
        !filters.academicYear || result.academicYear === filters.academicYear;
      const matchesExam =
        !filters.examType || result.examType === filters.examType;
      const matchesClass =
        !filters.class || result.class === filters.class;
      const matchesSection =
        !filters.section || result.section === filters.section;
      const matchesSubject =
        !filters.subject || result.subject === filters.subject;
      const matchesSearch =
        !filters.searchQuery ||
        result.studentName
          .toLowerCase()
          .includes(filters.searchQuery.toLowerCase()) ||
        result.studentId.includes(filters.searchQuery);

      return (
        matchesYear &&
        matchesExam &&
        matchesClass &&
        matchesSection &&
        matchesSubject &&
        matchesSearch
      );
    });

    setResults(filtered); // Update filtered results state
    setCurrentPage(1); // Reset to the first page on new search
  };

  // Reset filters
  const handleReset = () => {
    setFilters({
      academicYear: "",
      examType: "",
      class: "",
      section: "",
      subject: "",
      searchQuery: "",
    });
    setResults(results); // Reset to all results
  };

  // Calculate current page data
  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = results.slice(indexOfFirstResult, indexOfLastResult);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Total number of pages
  const totalPages = Math.ceil(results.length / resultsPerPage);

  return (
    <div className="min-h-screen bg-gray-100 p-5 dark:bg-gray-800 dark:text-white">
      <h1 className="text-2xl font-bold mb-4 text-center dark:bg-gray-600 dark:text-white">Exam Results</h1>

      {/* Filters Section */}
      <div className="mb-5 p-4 border rounded bg-white shadow-md dark:bg-gray-800 dark:text-white">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <select
            name="academicYear"
            value={filters.academicYear}
            onChange={handleFilterChange}
            className="p-2 border rounded dark:bg-gray-600 dark:text-white"
          >
            <option value="">Select Academic Year</option>
            <option value="2023-2024">2023-2024</option>
            <option value="2024-2025">2024-2025</option>
          </select>

          <select
            name="examType"
            value={filters.examType}
            onChange={handleFilterChange}
            className="p-2 border rounded dark:bg-gray-600 dark:text-white"
          >
            <option value="">Select Exam Type</option>
            <option value="Midterm">Midterm</option>
            <option value="Final">Final</option>
          </select>

          <select
            name="class"
            value={filters.class}
            onChange={handleFilterChange}
            className="p-2 border rounded dark:bg-gray-600 dark:text-white"
          >
            <option value="">Select Class</option>
            <option value="10th">10th</option>
            <option value="9th">9th</option>
            <option value="8th">8th</option>
          </select>

          <select
            name="section"
            value={filters.section}
            onChange={handleFilterChange}
            className="p-2 border rounded dark:bg-gray-600 dark:text-white"
          >
            <option value="">Select Section</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
          </select>

          <select
            name="subject"
            value={filters.subject}
            onChange={handleFilterChange}
            className="p-2 border rounded dark:bg-gray-600 dark:text-white"
          >
            <option value="">Select Subject</option>
            <option value="Math">Math</option>
            <option value="Science">Science</option>
            <option value="English">English</option>
            <option value="History">History</option>
            <option value="Geography">Geography</option>
          </select>

          <input
            type="text"
            name="searchQuery"
            value={filters.searchQuery}
            onChange={handleFilterChange}
            placeholder="Search by Student Name or ID"
            className="col-span-2 md:col-span-1 p-2 border rounded dark:bg-gray-600 dark:text-white"
          />
        </div>

        <div className="mt-4 flex gap-4">
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-blue-500 text-white rounded dark:bg-gray-800 dark:text-white"
          >
            Search
          </button>
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded dark:bg-gray-800 dark:text-white"
          >
            Reset Filters
          </button>
        </div>
      </div>

      {/* Results Table */}
      <div className="overflow-x-auto border rounded bg-white dark:bg-gray-800 dark:text-white shadow-md max-h-[60vh] overflow-y-auto">
        <table className="table-auto w-full border-collapse border dark:bg-gray-800 dark:text-white">
          <thead className="bg-gray-200">
            <tr>
              <th className="border p-2 dark:bg-gray-800 dark:text-white">Student Name</th>
              <th className="border p-2 dark:bg-gray-800 dark:text-white">Student ID</th>
              <th className="border p-2 dark:bg-gray-800 dark:text-white">Class</th>
              <th className="border p-2 dark:bg-gray-800 dark:text-white">Section</th>
              <th className="border p-2 dark:bg-gray-800 dark:text-white">Exam Type</th>
              <th className="border p-2 dark:bg-gray-800 dark:text-white">Academic Year</th>
              <th className="border p-2 dark:bg-gray-800 dark:text-white">Subject</th>
              <th className="border p-2 dark:bg-gray-800 dark:text-white">Marks</th>
              <th className="border p-2 dark:bg-gray-800 dark:text-white">Grade</th>
              <th className="border p-2 dark:bg-gray-800 dark:text-white">Status</th>
            </tr>
          </thead>
          <tbody>
            {currentResults.length > 0 ? (
              currentResults.map((result) => (
                <tr key={result.id}>
                  <td className="border p-2">{result.studentName}</td>
                  <td className="border p-2">{result.studentId}</td>
                  <td className="border p-2">{result.class}</td>
                  <td className="border p-2">{result.section}</td>
                  <td className="border p-2">{result.examType}</td>
                  <td className="border p-2">{result.academicYear}</td>
                  <td className="border p-2">{result.subject}</td>
                  <td className="border p-2">
                    {result.marksObtained} / {result.totalMarks}
                  </td>
                  <td className="border p-2">{result.grade}</td>
                  <td className="border p-2">{result.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="text-center p-4">
                  No results found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="mt-4 flex justify-center gap-2">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
        >
          Previous
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={`px-4 py-2 rounded ${
              currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ExamResult;
