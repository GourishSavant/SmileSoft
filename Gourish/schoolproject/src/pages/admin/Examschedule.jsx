
import React, { useState, useEffect } from "react";
import { FaFilePdf, FaFileWord, FaFileExcel, FaFileCsv, FaPrint, FaCopy } from "react-icons/fa";

const ExamSchedule = () => {
  const [examGroups, setExamGroups] = useState([]);
  const [exams, setExams] = useState([]);
  const [selectedExamGroup, setSelectedExamGroup] = useState("");
  const [selectedExam, setSelectedExam] = useState("");
  const [scheduleData, setScheduleData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Fetch data from JSON
  useEffect(() => {
    fetch("/admin/examschedule.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch exam schedule data");
        }
        return response.json();
      })
      .then((data) => {
        setExamGroups(data.examGroups);
      })
      .catch((error) => console.error("Error fetching exam groups:", error));
  }, []);

  // Update exams when exam group changes
  useEffect(() => {
    if (selectedExamGroup) {
      fetch("/admin/examschedule.json")
        .then((response) => response.json())
        .then((data) => {
          setExams(data.exams[selectedExamGroup] || []);
        })
        .catch((error) => console.error("Error fetching exams:", error));
    } else {
      setExams([]);
    }
  }, [selectedExamGroup]);

  // Fetch schedule data on search
  const handleSearch = () => {
    setLoading(true);
    fetch("/examschedule.json")
      .then((response) => response.json())
      .then((data) => {
        setScheduleData(data.scheduleData[selectedExam] || []);
      })
      .catch((error) => console.error("Error fetching schedule data:", error))
      .finally(() => setLoading(false));
  };

  // Search filter
  const filteredData = scheduleData.filter((item) =>
    item.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white shadow-md rounded-lg dark:bg-gray-800 dark:text-white mt-3 mb-3">
      <h1 className="text-3xl font-semibold text-left mb-6 dark:bg-gray-800 dark:text-white">Exam Schedule</h1>

      {/* Filters */}
      <div className="grid grid-cols-3 gap-4 items-end mb-6 dark:bg-gray-800 dark:text-white">
        {/* Exam Group */}
        <div>
          <label className="block text-gray-700 font-medium mb-2 dark:bg-gray-800 dark:text-white">Exam Group *</label>
          <select
            value={selectedExamGroup}
            onChange={(e) => setSelectedExamGroup(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 dark:bg-gray-500 dark:text-white"
          >
            <option value="">Select</option>
            {examGroups.map((group) => (
              <option key={group.name} value={group.name}>
                {group.name}
              </option>
            ))}
          </select>
        </div>

        {/* Exam */}
        <div>
          <label className="block text-gray-700 font-medium mb-2 dark:bg-gray-800 dark:text-white">Exam *</label>
          <select
            value={selectedExam}
            onChange={(e) => setSelectedExam(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 dark:bg-gray-500 dark:text-white"
          >
            <option value="">Select</option>
            {exams.map((exam) => (
              <option key={exam.name} value={exam.name}>
                {exam.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Search Button (moved below Exam filter) */}
      <div className="mb-6 flex justify-end">
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white font-bold py-3 px-6 dark:bg-gray-800 dark:text-white rounded-lg hover:bg-blue-600 transition"
        >
          Search
        </button>
      </div>

      {/* Exam Schedule Table */}
      {loading ? (
        <p className="text-center text-gray-500 dark:bg-gray-800 dark:text-white">Loading...</p>
      ) : (
        <div>
          <h2 className="text-2xl font-semibold mb-4 dark:text-white">Exam Schedule</h2>

          {/* Search Field and Icons */}
          <div className="flex items-center mb-4 justify-between space-x-4">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by Subject"
              className="p-3  border rounded-lg dark:bg-gray-700 dark:text-white"
            />
            <div className="flex space-x-2">
              <FaFilePdf className="cursor-pointer text-red-600" size={24} />
              <FaFileWord className="cursor-pointer text-blue-600" size={24} />
              <FaFileExcel className="cursor-pointer text-green-600" size={24} />
              <FaFileCsv className="cursor-pointer text-yellow-600" size={24} />
              <FaPrint className="cursor-pointer text-black" size={24} />
              <FaCopy className="cursor-pointer text-gray-600" size={24} />
            </div>
          </div>

          <table className="w-full border border-gray-300 dark:bg-gray-800 dark:text-white rounded-lg overflow-hidden">
            <thead className="bg-gray-200 dark:bg-gray-700 dark:text-white">
              <tr>
                <th className="text-left px-4 py-2 border">Subject</th>
                <th className="text-left px-4 py-2 border">Date From</th>
                <th className="text-left px-4 py-2 border">Start Time</th>
                <th className="text-left px-4 py-2 border">Duration (min)</th>
                <th className="text-left px-4 py-2 border">Room No.</th>
                <th className="text-left px-4 py-2 border">Marks (Max.)</th>
                <th className="text-left px-4 py-2 border">Marks (Min.)</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((item, index) => (
                  <tr key={index}>
                    <td className="border px-4 py-2 dark:bg-gray-800 dark:text-white">{item.subject}</td>
                    <td className="border px-4 py-2 dark:bg-gray-800 dark:text-white">{item.dateFrom}</td>
                    <td className="border px-4 py-2 dark:bg-gray-800 dark:text-white">{item.startTime}</td>
                    <td className="border px-4 py-2 dark:bg-gray-800 dark:text-white">{item.duration}</td>
                    <td className="border px-4 py-2 dark:bg-gray-800 dark:text-white">{item.roomNo}</td>
                    <td className="border px-4 py-2 dark:bg-gray-800 dark:text-white">{item.marksMax}</td>
                    <td className="border px-4 py-2 dark:bg-gray-800 dark:text-white">{item.marksMin}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center text-gray-500 py-6 dark:bg-gray-800 dark:text-white">
                    No data available in table
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <span className="text-gray-600 dark:text-white">
          Records: {indexOfFirstItem + 1} to {indexOfLastItem} of {filteredData.length}
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
  );
};

export default ExamSchedule;




