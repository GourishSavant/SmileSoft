import React, { useState } from "react";

const Student = () => {
  const [criteria, setCriteria] = useState({
    classFilter: "", // Class filter
    sectionFilter: "", // Section filter
  });

  // Handle changes in Class and Section filters
  const handleClassChange = (e) => {
    setCriteria({ ...criteria, classFilter: e.target.value });
  };

  const handleSectionChange = (e) => {
    setCriteria({ ...criteria, sectionFilter: e.target.value });
  };

  const handleSearch = () => {
    // You can add the search functionality here if needed
    alert(`Searching for Class: ${criteria.classFilter} and Section: ${criteria.sectionFilter}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 dark:text-white p-6">
      <h1 className="text-2xl font-semibold mb-6">Student </h1>

      {/* Filter Section */}
      <div className="bg-white dark:bg-gray-800 shadow-md p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Select Criteria</h2>
        
        {/* Filters in one line */}
        <div className="flex space-x-4 mb-4">
          {/* Class Filter */}
          <div className="w-1/2">
            <label className="block text-xs font-medium">Class</label>
            <select
              value={criteria.classFilter}
              onChange={handleClassChange}
              className="w-full p-2 border border-gray-300 rounded text-sm dark:bg-gray-700 dark:text-white"
            >
              <option value="">Select Class</option>
              <option value="Class 1">Class 1</option>
              <option value="Class 2">Class 2</option>
              <option value="Class 3">Class 3</option>
              {/* Add more class options */}
            </select>
          </div>

          {/* Section Filter */}
          <div className="w-1/2">
            <label className="block text-xs font-medium">Section</label>
            <select
              value={criteria.sectionFilter}
              onChange={handleSectionChange}
              className="w-full p-2 border border-gray-300 rounded text-sm dark:bg-gray-700 dark:text-white"
            >
              <option value="">Select Section</option>
              <option value="A">Section A</option>
              <option value="B">Section B</option>
              <option value="C">Section C</option>
              {/* Add more section options */}
            </select>
          </div>
        </div>

        {/* Search Button */}
        <div className="mt-4">
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white p-2 rounded text-sm dark:bg-blue-700 dark:text-white"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default Student;
