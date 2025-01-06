
import React, { useState } from "react";

const SelectCriteria = () => {
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedSubjectGroup, setSelectedSubjectGroup] = useState("");
  const [isAddVisible, setIsAddVisible] = useState(false);

  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
  };

  const handleSectionChange = (e) => {
    setSelectedSection(e.target.value);
  };

  const handleSubjectGroupChange = (e) => {
    setSelectedSubjectGroup(e.target.value);
  };

  const handleAddClick = () => {
    setIsAddVisible(!isAddVisible);
  };

  return (
    <div className="flex justify-center items-start bg-gray-100 py-10">
      <div className="bg-white p-10 rounded-lg shadow-md w-full max-w-full mr-3 ml-3 relative">
        <h2 className="text-lg font-semibold text-gray-700 mb-6">Select Criteria</h2>

        {/* + Add Button */}
        <button
          onClick={handleAddClick}
          className="absolute top-4 right-4 bg-gray-500 text-white py-2 px-4  hover:bg-gray-600 transition-colors"
        >
          + Add
        </button>

        {/* Class, Section, and Subject Group Filters Side by Side */}
        <div className="flex space-x-8 mb-6">
          {/* Class Dropdown */}
          <div className="w-1/3">
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
          <div className="w-1/3">
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

          {/* Subject Group Dropdown (Only shown when +Add is clicked) */}
          {isAddVisible && (
            <div className="w-1/3">
              <label htmlFor="subject-group" className="block text-gray-600 text-sm font-medium mb-2">
                Subject Group *
              </label>
              <select
                id="subject-group"
                value={selectedSubjectGroup}
                onChange={handleSubjectGroupChange}
                className="w-full border border-gray-300 rounded px-4 py-3 text-gray-700 focus:outline-none focus:ring focus:ring-blue-400"
              >
                <option value="">Select</option>
                <option value="Group 1">Group 1</option>
                <option value="Group 2">Group 2</option>
                <option value="Group 3">Group 3</option>
              </select>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={() => alert(`Class: ${selectedClass}, Section: ${selectedSection}, Subject Group: ${selectedSubjectGroup}`)}
            disabled={!selectedClass || !selectedSection || (isAddVisible && !selectedSubjectGroup)}
            className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectCriteria;





