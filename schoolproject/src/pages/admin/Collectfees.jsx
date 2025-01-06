
import React, { useState } from "react";

// Sample JSON data with sections added
const studentsData = [
  {
    admissionNo: "A001",
    studentName: "John Doe",
    rollNo: "101",
    class: "Class 1",
    section: "A", // Section added
    fatherName: "Mr. Doe",
    dob: "2010-05-15",
    gender: "Male",
    category: "General",
    mobileNumber: "1234567890",
  },
  {
    admissionNo: "A002",
    studentName: "Jane Smith",
    rollNo: "102",
    class: "Class 1",
    section: "B", // Section added
    fatherName: "Mr. Smith",
    dob: "2010-08-20",
    gender: "Female",
    category: "OBC",
    mobileNumber: "0987654321",
  },
  {
    admissionNo: "A003",
    studentName: "Alice Johnson",
    rollNo: "103",
    class: "Class 2",
    section: "A", // Section added
    fatherName: "Mr. Johnson",
    dob: "2011-03-11",
    gender: "Female",
    category: "SC",
    mobileNumber: "1122334455",
  },
];

const SelectCriteriaPage = () => {
  const [classOption, setClassOption] = useState("");
  const [sectionOption, setSectionOption] = useState("");
  const [keyword, setKeyword] = useState("");
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

    setFilteredData(filtered);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="bg-white shadow-md p-4 rounded-md">
        {/* Header */}
        <h2 className="text-xl font-semibold mb-4">Select Criteria</h2>

        {/* Form Section */}
        <div className="grid grid-cols-3 gap-4 items-start mb-4">
          {/* Class Select */}
          <div>
            <label className="block text-gray-700 mb-1">
              Class <span className="text-red-500">*</span>
            </label>
            <select
              value={classOption}
              onChange={(e) => setClassOption(e.target.value)}
              className="border rounded-md w-full p-2"
            >
              <option value="">Select</option>
              <option value="Class 1">Class 1</option>
              <option value="Class 2">Class 2</option>
            </select>
          </div>

          {/* Section Select */}
          <div>
            <label className="block text-gray-700 mb-1">Section</label>
            <select
              value={sectionOption}
              onChange={(e) => setSectionOption(e.target.value)}
              className="border rounded-md w-full p-2"
            >
              <option value="">Select</option>
              <option value="A">A</option>
              <option value="B">B</option>
            </select>

            {/* Search Button Below Section Filter */}
            <div className="flex justify-end mt-2">
              <button
                onClick={handleSearch}
                className="bg-gray-600 text-white px-4 py-1 rounded hover:bg-gray-700"
              >
                Search
              </button>
            </div>
          </div>

          {/* Search By Keyword */}
          <div>
            <label className="block text-gray-700 mb-1">Search By Keyword</label>
            <input
              type="text"
              placeholder="Search By Student Name, Roll Number, ..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="border rounded-md w-full p-2"
            />

            {/* Search Button Below Search By Keyword */}
            <div className="flex justify-end mt-2">
              <button
                onClick={handleSearch}
                className="bg-gray-600 text-white px-4 py-1 rounded hover:bg-gray-700"
              >
                Search
              </button>
            </div>
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-4">Student List</h2>
        {/* Table */}
        <div className="mt-4 overflow-x-auto">
          <table className="w-full border-collapse border">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Admission No</th>
                <th className="border p-2">Student Name</th>
                <th className="border p-2">Roll No.</th>
                <th className="border p-2">Class</th>
                <th className="border p-2">Section</th> {/* Section column added */}
                <th className="border p-2">Father Name</th>
                <th className="border p-2">Date Of Birth</th>
                <th className="border p-2">Gender</th>
                <th className="border p-2">Category</th>
                <th className="border p-2">Mobile Number</th>
                <th className="border p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((student) => (
                  <tr key={student.admissionNo}>
                    <td className="border p-2">{student.admissionNo}</td>
                    <td className="border p-2">{student.studentName}</td>
                    <td className="border p-2">{student.rollNo}</td>
                    <td className="border p-2">{student.class}</td>
                    <td className="border p-2">{student.section}</td> {/* Section value displayed */}
                    <td className="border p-2">{student.fatherName}</td>
                    <td className="border p-2">{student.dob}</td>
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
                  <td colSpan="11" className="text-center p-4 text-red-500">
                    No data available in table
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="mt-4 join flex justify-end space-x-1">
        <button className="join-item btn btn-active">1</button>
        <button className="join-item btn ">2</button>
        <button className="join-item btn">3</button>
        <button className="join-item btn">4</button>
      </div>
    </div>
  );
};

export default SelectCriteriaPage;




