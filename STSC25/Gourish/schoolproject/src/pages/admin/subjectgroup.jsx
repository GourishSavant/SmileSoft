
import React, { useState } from 'react';
import { FaFileExcel, FaFilePdf, FaFileWord, FaPrint } from 'react-icons/fa';

const SubjectPage = () => {
  const [subjectGroupName, setSubjectGroupName] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [description, setDescription] = useState('');
  const [subjectGroupList, setSubjectGroupList] = useState([]);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  const handleAddSubjectGroup = () => {
    const newGroup = {
      name: subjectGroupName,
      class: selectedClass,
      section: selectedSection,
      subject: selectedSubject,
      description: description,
    };
    setSubjectGroupList([...subjectGroupList, newGroup]);
    // Clear form fields
    setSubjectGroupName('');
    setSelectedClass('');
    setSelectedSection('');
    setSelectedSubject('');
    setDescription('');
  };

  // Pagination Logic
  const totalRecords = subjectGroupList.length;
  const totalPages = Math.ceil(totalRecords / recordsPerPage);
  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = Math.min(startIndex + recordsPerPage, totalRecords);
  const displayedRecords = subjectGroupList.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 p-4">
      {/* Left Frame: Subject Group Form */}
      <div className="w-1/3 p-6 bg-white border border-gray-300 rounded shadow-lg">
        <h2 className="text-2xl font-semibold mb-6">Subject Group</h2>
        <div className="space-y-4">
          {/* Subject Group Name */}
          <div>
            <label htmlFor="subjectGroupName" className="block text-gray-600">Name *</label>
            <input
              id="subjectGroupName"
              type="text"
              value={subjectGroupName}
              onChange={(e) => setSubjectGroupName(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-2"
            />
          </div>

          {/* Class */}
          <div>
            <label htmlFor="class" className="block text-gray-600">Class *</label>
            <select
              id="class"
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-2"
            >
              <option value="">Select</option>
              <option value="Class 1">Class 1</option>
              <option value="Class 2">Class 2</option>
              <option value="Class 3">Class 3</option>
              <option value="Class 4">Class 4</option>
              <option value="Class 5">Class 5</option>
            </select>
          </div>

          {/* Section */}
          <div>
            <label htmlFor="section" className="block text-gray-600">Section *</label>
            <select
              id="section"
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-2"
            >
              <option value="">Select</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
            </select>
          </div>

          {/* Subject */}
          <div>
            <label htmlFor="subject" className="block text-gray-600">Subject *</label>
            <input
              id="subject"
              type="text"
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-2"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-gray-600">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-2"
              rows="4"
            ></textarea>
          </div>

          {/* Add Button */}
          <div className="mt-4 flex justify-end">
            <button
              onClick={handleAddSubjectGroup}
              className="w-1/3 bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </div>
      </div>

      {/* Right Frame: Subject Group List */}
      <div className="flex-1 p-6 bg-white border border-gray-300 rounded shadow-lg ml-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Subject Group List</h2>
          {/* Download Icons */}
          <div className="flex space-x-4">
            <FaFileExcel className="text-green-500 cursor-pointer" size={24} />
            <FaFilePdf className="text-red-500 cursor-pointer" size={24} />
            <FaFileWord className="text-blue-500 cursor-pointer" size={24} />
            <FaPrint className="text-black cursor-pointer" size={24} />
          </div>
        </div>

        {/* Subject Group Table */}
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Class (Section)</th>
              <th className="px-4 py-2 text-left">Subject</th>
              <th className="px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {displayedRecords.map((group, index) => (
              <tr key={index} className="border-t">
                <td className="px-4 py-2">{group.name}</td>
                <td className="px-4 py-2">{`${group.class} (${group.section})`}</td>
                <td className="px-4 py-2">{group.subject}</td>
                <td className="px-4 py-2">
                  <button className="text-blue-500 hover:underline">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4">
          <span className="text-gray-600">
            Records {startIndex + 1} to {endIndex} of {totalRecords}
          </span>
          <div className="flex space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              className={`px-4 py-2 border rounded ${currentPage === 1 ? 'cursor-not-allowed text-gray-400' : 'hover:bg-gray-100'}`}
              disabled={currentPage === 1}
            >
              &lt;
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i + 1)}
                className={`px-4 py-2 border rounded ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className={`px-4 py-2 border rounded ${currentPage === totalPages ? 'cursor-not-allowed text-gray-400' : 'hover:bg-gray-100'}`}
              disabled={currentPage === totalPages}
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubjectPage;




