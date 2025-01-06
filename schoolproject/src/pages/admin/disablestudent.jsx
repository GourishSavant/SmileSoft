
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faThList } from "@fortawesome/free-solid-svg-icons";
import { FaFilePdf, FaFileCsv, FaFileExcel, FaFileWord, FaCopy ,FaColumns } from "react-icons/fa";

// Sample JSON data
const studentsData = [
  {
    admissionNo: "A001",
    studentName: "John Doe",
    rollNo: "101",
    class: "Class 1",
    fatherName: "Mr. Doe",
    disableReason: "Personal",
    gender: "Male",
    category: "General",
    mobileNumber: "1234567890",
  },
  {
    admissionNo: "A002",
    studentName: "Jane Smith",
    rollNo: "102",
    class: "Class 1",
    fatherName: "Mr. Smith",
    disableReason: "Personal",
    gender: "Female",
    category: "OBC",
    mobileNumber: "0987654321",
  },
  {
    admissionNo: "A003",
    studentName: "Alice Johnson",
    rollNo: "103",
    class: "Class 2",
    fatherName: "Mr. Johnson",
    disableReason: "Personal",
    gender: "Female",
    category: "SC",
    mobileNumber: "1122334455",
  },
];

const SelectCriteriaPage = () => {
  const [classOption, setClassOption] = useState("");
  const [sectionOption, setSectionOption] = useState("");
  const [keyword, setKeyword] = useState("");
  const [additionalKeyword, setAdditionalKeyword] = useState(""); // New state for additional search box
  const [viewType, setViewType] = useState("list"); // 'list' or 'details'
  const [filteredData, setFilteredData] = useState(studentsData); // Store filtered students data

  // Handle Search
  const handleSearch = () => {
    let filtered = studentsData;

    // Filter by class
    if (classOption) {
      filtered = filtered.filter((student) => student.class === classOption);
    }

    // Filter by section (if applicable)
    if (sectionOption) {
      filtered = filtered.filter((student) => student.section === sectionOption);
    }

    // Filter by keyword in name or roll number
    if (keyword) {
      filtered = filtered.filter(
        (student) =>
          student.studentName.toLowerCase().includes(keyword.toLowerCase()) ||
          student.rollNo.includes(keyword)
      );
    }

    // Filter by additional search keyword (if provided)
    if (additionalKeyword) {
      filtered = filtered.filter(
        (student) =>
          student.studentName.toLowerCase().includes(additionalKeyword.toLowerCase()) ||
          student.rollNo.includes(additionalKeyword)
      );
    }

    setFilteredData(filtered);
  };

  // Function to handle download icons (placeholder functions)
  const downloadPdf = () => {
    console.log("Download PDF");
  };
  const downloadCsv = () => {
    console.log("Download CSV");
  };
  const downloadExcel = () => {
    console.log("Download Excel");
  };
  const downloadWord = () => {
    console.log("Download Word");
  };
  const copyToClipboard = () => {
    console.log("Copied to clipboard");
  };
  const downloadColumns = () => {
    console.log("Download Column");
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen p-6">
      <div className="bg-white  dark:bg-gray-800 shadow-md p-4 rounded-md">
        {/* Header */}
        <h2 className="text-xl font-semibold mb-4 dark:text-white">Select Criteria</h2>

        {/* Form Section */}
        <div className="grid grid-cols-3 gap-4 items-start  dark:text-white mb-4">
          {/* Class Select */}
          <div>
            <label className="block text-gray-700 mb-1 dark:text-white">
              Class <span className="text-red-500">*</span>
            </label>
            <select
              value={classOption}
              onChange={(e) => setClassOption(e.target.value)}
              className="border rounded-md w-full p-2  dark:bg-gray-800 dark:text-white"
            >
              <option value="">Select</option>
              <option value="Class 1">Class 1</option>
              <option value="Class 2">Class 2</option>
            </select>
          </div>

          {/* Section Select */}
          <div>
            <label className="block text-gray-700 mb-1 dark:text-white">Section</label>
            <select
              value={sectionOption}
              onChange={(e) => setSectionOption(e.target.value)}
              className="border rounded-md w-full p-2 dark:bg-gray-800 dark:text-white"
            >
              <option value="">Select</option>
              <option value="A">A</option>
              <option value="B">B</option>
            </select>

            {/* Search Button Below Section Filter */}
            <div className="flex justify-end mt-2 dark:text-white">
              <button
                onClick={handleSearch}
                className="bg-gray-600 text-white px-4 py-1 rounded hover:bg-gray-700 dark:bg-gray-800 dark:text-white"
              >
                Search
              </button>
            </div>
          </div>

          {/* Search By Keyword */}
          <div>
            <label className="block text-gray-700 mb-1  dark:text-white">Search By Keyword</label>
            <input
              type="text"
              placeholder="Search By Student Name, Roll Number, ..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="border rounded-md w-full p-2 dark:bg-gray-800 dark:text-white"
            />

            {/* Search Button Below Search By Keyword */}
            <div className="flex justify-end mt-2 dark:text-white">
              <button
                onClick={handleSearch}
                className="bg-gray-600 text-white px-4 py-1 rounded hover:bg-gray-700"
              >
                Search
              </button>
            </div>
            
          </div>
        </div>

        {/* Tabs with Font Awesome Icons */}
        <div className="flex space-x-4 mt-4">
          <button
            className={`px-4 py-2 flex items-center ${
              viewType === "list"
                ? "border-b-2 border-orange-500 text-orange-500"
                : "text-gray-600"
            }`}
            onClick={() => setViewType("list")}
          >
            <FontAwesomeIcon icon={faList} className="mr-2" /> List View
          </button>
          <button
            className={`px-4 py-2 flex items-center ${
              viewType === "details"
                ? "border-b-2 border-orange-500 text-orange-500"
                : "text-gray-600"
            }`}
            onClick={() => setViewType("details")}
          >
            <FontAwesomeIcon icon={faThList} className="mr-2" /> Details View
          </button>
        </div>

        {/* New Search Box Below List View */}
        {viewType === "list" && (
          <div className="mt-4">
            <input
              type="text"
              placeholder="Search again by Student Name, Roll Number..."
              value={additionalKeyword}
              onChange={(e) => setAdditionalKeyword(e.target.value)}
              className="border rounded-md  p-2 dark:bg-gray-800 dark:text-white"
            />
{/* Icons aligned to the right */}
<div className="flex justify-end space-x-1">
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
          <button onClick={downloadColumns} className="text-gray-600 hover:text-gray-800">
            <FaColumns size={24} />
          </button>
        </div>
          
          </div>
          
        )}

        {/* Conditional Display */}
        <div className="mt-4">
          {viewType === "list" ? (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border">
                <thead>
                  <tr className="bg-gray-200 dark:bg-gray-800 dark:text-white">
                    <th className="border p-2">Admission No</th>
                    <th className="border p-2">Student Name</th>
                    <th className="border p-2">Roll No.</th>
                    <th className="border p-2">Class</th>
                    <th className="border p-2">Father Name</th>
                    <th className="border p-2">Disable Reason</th>
                    <th className="border p-2">Gender</th>
                    <th className="border p-2">Category</th>
                    <th className="border p-2">Mobile Number</th>
                    <th className="border p-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.length > 0 ? (
                    filteredData.map((student) => (
                      <tr key={student.admissionNo}className="dark:bg-gray-800 dark:text-white">
                        <td className="border p-2">{student.admissionNo}</td>
                        <td className="border p-2">{student.studentName}</td>
                        <td className="border p-2">{student.rollNo}</td>
                        <td className="border p-2">{student.class}</td>
                        <td className="border p-2">{student.fatherName}</td>
                        <td className="border p-2">{student.disableReason}</td>
                        <td className="border p-2">{student.gender}</td>
                        <td className="border p-2">{student.category}</td>
                        <td className="border p-2">{student.mobileNumber}</td>
                        <td className="border p-2">
                          <div className="flex space-x-2">
                            <button className="bg-blue-500 text-white px-3 py-1 text-sm rounded hover:bg-blue-600">
                              Edit
                            </button>
                            <button className="bg-red-500 text-white px-3 py-1 text-sm rounded hover:bg-red-600">
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="10" className="text-center p-4 text-red-500 dark:text-white">
                        No data available in table
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {filteredData.length > 0 ? (
    filteredData.map((student) => (
      <div
        key={student.admissionNo}
        className="bg-white shadow-md rounded-lg p-4 border"
      >
        <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">
          {student.studentName}
        </h3>
        <div className="text-sm text-gray-600 dark:text-white space-y-2">
          {/* Group 1: Basic Information */}
          <p><strong>Admission No:</strong> {student.admissionNo}</p>
          <p><strong>Roll No:</strong> {student.rollNo}</p>
          <p><strong>First Name:</strong> {student.firstName}</p>
          <p><strong>Middle Name:</strong> {student.middleName}</p>
          <p><strong>Last Name:</strong> {student.lastName}</p>

          {/* Group 2: Gender */}
          <p><strong>Gender:</strong> {student.gender}</p>

          {/* Group 3: Additional Details */}
          <p><strong>Date Of Birth:</strong> {student.dob}</p>
          <p><strong>Category:</strong> {student.category}</p>
          <p><strong>Religion:</strong> {student.religion}</p>
          <p><strong>Caste:</strong> {student.caste}</p>
          <p><strong>Mobile No.:</strong> {student.mobileNumber}</p>
          <p><strong>Email:</strong> {student.email}</p>
          <p><strong>Admission Date:</strong> {student.admissionDate}</p>
          <p><strong>Blood Group:</strong> {student.bloodGroup}</p>
          <p><strong>House:</strong> {student.house}</p>
          <p><strong>Height:</strong> {student.height}</p>
          <p><strong>Weight:</strong> {student.weight}</p>
          <p><strong>Measurement Date:</strong> {student.measurementDate}</p>

          {/* Group 4: Father's Details */}
          <p><strong>Father Name:</strong> {student.fatherName}</p>
          <p><strong>Father Phone:</strong> {student.fatherPhone}</p>
          <p><strong>Father Occupation:</strong> {student.fatherOccupation}</p>

          {/* Group 5: Mother's Details */}
          <p><strong>Mother Name:</strong> {student.motherName}</p>
          <p><strong>Mother Phone:</strong> {student.motherPhone}</p>
          <p><strong>Mother Occupation:</strong> {student.motherOccupation}</p>
        </div>
        <div className="flex space-x-2 mt-4">
          <button className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600">
            Edit
          </button>
          <button className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600">
            Delete
          </button>
        </div>
      </div>
    ))
              ) : (
                <p className="text-center text-red-500">No data available</p>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="mt-4 join flex justify-end space-x-1 ">
        <button className="join-item btn btn-active dark:bg-gray-800 dark:text-white">1</button>
        <button className="join-item btn dark:bg-gray-800 dark:text-white">2</button>
        <button className="join-item btn dark:bg-gray-800 dark:text-white">3</button>
        <button className="join-item btn dark:bg-gray-800 dark:text-white">4</button>
      </div>
    </div>
  );
};

export default SelectCriteriaPage;


