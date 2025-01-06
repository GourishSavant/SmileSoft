
import React, { useState } from "react";

const MarksGradePage = () => {
  const [grade, setGrade] = useState({
    examType: "",
    gradeName: "",
    percentFrom: "",
    percentUpto: "",
    gradePoint: "",
    description: "",
  });

  const [gradesList, setGradesList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGrade({ ...grade, [name]: value });
  };

  const handleAddGrade = () => {
    if (
      grade.examType &&
      grade.gradeName &&
      grade.percentFrom &&
      grade.percentUpto &&
      grade.gradePoint
    ) {
      setGradesList([...gradesList, grade]);
      setGrade({
        examType: "",
        gradeName: "",
        percentFrom: "",
        percentUpto: "",
        gradePoint: "",
        description: "",
      });
    } else {
      alert("Please fill in all required fields.");
    }
  };

  const handleDeleteGrade = (index) => {
    setGradesList(gradesList.filter((_, i) => i !== index));
  };

  const totalPages = Math.ceil(gradesList.length / recordsPerPage);
  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;
  const currentRecords = gradesList.slice(startIndex, endIndex);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="h-screen bg-gray-100 p-4 flex gap-4">
      {/* Left Section: Add Marks Grade */}
      <div className="w-1/3 bg-white p-4 rounded shadow-md">
        <h2 className="text-xl font-semibold mb-4">Add Marks Grade</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium">Exam Type *</label>
          <select
            name="examType"
            value={grade.examType}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Select</option>
            <option value="General Purpose">General Purpose (Pass/Fail)</option>
            <option value="School Based">School Based Grading System</option>
            <option value="College Based">College Based Grading System</option>
            <option value="GPA Based">GPA Grading System</option>
            <option value="Average Passing">Average Passing</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Grade Name *</label>
          <input
            type="text"
            name="gradeName"
            value={grade.gradeName}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium">Percent From *</label>
            <input
              type="number"
              name="percentFrom"
              value={grade.percentFrom}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Percent Upto *</label>
            <input
              type="number"
              name="percentUpto"
              value={grade.percentUpto}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Grade Point *</label>
          <input
            type="number"
            name="gradePoint"
            value={grade.gradePoint}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Description</label>
          <textarea
            name="description"
            value={grade.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          ></textarea>
        </div>

        <div className="flex justify-end mt-4">
          <button
            onClick={handleAddGrade}
            className="bg-blue-500 text-white p-3 rounded"
          >
            Save
          </button>
        </div>
      </div>

      {/* Right Section: Grade List */}
      <div className="w-2/3 bg-white p-4 rounded shadow-md">
        <h2 className="text-xl font-semibold mb-4">Grade List</h2>

        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border border-gray-300">Exam Type</th>
              <th className="p-2 border border-gray-300">Grade Name</th>
              <th className="p-2 border border-gray-300">Percent From / Upto</th>
              <th className="p-2 border border-gray-300">Grade Point</th>
              <th className="p-2 border border-gray-300">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentRecords.length > 0 ? (
              currentRecords.map((item, index) => (
                <tr key={index}>
                  <td className="p-2 border border-gray-300">{item.examType}</td>
                  <td className="p-2 border border-gray-300">{item.gradeName}</td>
                  <td className="p-2 border border-gray-300">
                    {item.percentFrom} - {item.percentUpto}
                  </td>
                  <td className="p-2 border border-gray-300">{item.gradePoint}</td>
                  <td className="p-2 border border-gray-300 text-center">
                    <button
                      onClick={() => handleDeleteGrade(startIndex + index)}
                      className="text-red-500"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="p-2 border border-gray-300 text-center"
                >
                  No grades added yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="flex justify-between items-center mt-4">
          <span>
            Records {startIndex + 1} to {Math.min(endIndex, gradesList.length)} of {gradesList.length}
          </span>
          <div className="flex gap-2">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="bg-gray-300 p-2 rounded disabled:opacity-50"
            >
              &lt;
            </button>
            <span>{currentPage}</span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="bg-gray-300 p-2 rounded disabled:opacity-50"
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarksGradePage;




