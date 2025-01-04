
import React, { useState } from "react";

const SelectCriteriaPage = () => {
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");

  const handleClassChange = (e) => setSelectedClass(e.target.value);
  const handleSectionChange = (e) => setSelectedSection(e.target.value);

  // Sample class and section data
  const classes = ["Class 1", "Class 2", "Class 3", "Class 4"];
  const sections = ["Section A", "Section B", "Section C", "Section D"];

  const handleSubmit = () => {
    alert(`Selected Class: ${selectedClass}, Selected Section: ${selectedSection}`);
  };

  return (
    <div className="container mx-auto p-6 dark:bg-gray-900 dark:text-white">

      {/* Frame containing both Class and Section dropdowns */}
      <div className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-800">
      <h1 className="text-2xl font-bold mb-6 text-gray-700 dark:text-white">Select Criteria</h1>

        {/* Flexbox layout for Class and Section */}
        <div className="flex space-x-6">
          {/* Left Section: Select Class */}
          <div className="w-1/2">
            <label className="block text-gray-700 font-medium dark:text-white">Class *</label>
            <select
              value={selectedClass}
              onChange={handleClassChange}
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="">Select Class</option>
              {classes.map((className, index) => (
                <option key={index} value={className}>
                  {className}
                </option>
              ))}
            </select>
          </div>

          {/* Right Section: Select Section */}
          <div className="w-1/2">
            <label className="block text-gray-700 font-medium dark:text-white">Section *</label>
            <select
              value={selectedSection}
              onChange={handleSectionChange}
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="">Select Section</option>
              {sections.map((section, index) => (
                <option key={index} value={section}>
                  {section}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-6 flex justify-end">
        <button
          onClick={handleSubmit}
          className="py-2 px-4 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SelectCriteriaPage;



