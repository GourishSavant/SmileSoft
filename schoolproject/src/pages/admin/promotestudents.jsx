
import React, { useState } from "react";

const SelectCriteria = () => {
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [promoteSession, setPromoteSession] = useState("");
  const [promoteClass, setPromoteClass] = useState("");
  const [promoteSection, setPromoteSection] = useState("");

  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
  };

  const handleSectionChange = (e) => {
    setSelectedSection(e.target.value);
  };

  const handlePromoteSessionChange = (e) => {
    setPromoteSession(e.target.value);
  };

  const handlePromoteClassChange = (e) => {
    setPromoteClass(e.target.value);
  };

  const handlePromoteSectionChange = (e) => {
    setPromoteSection(e.target.value);
  };

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      {/* Frame wrapper */}
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">Select Criteria</h2>

        {/* Select Criteria Section */}
        <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2">
          <div>
            <label
              htmlFor="class"
              className="block text-gray-600 text-sm font-medium mb-2"
            >
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

          <div>
            <label
              htmlFor="section"
              className="block text-gray-600 text-sm font-medium mb-2"
            >
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
        </div>

        {/* Promote Students Section (Promote In Session, Class, Section in one line) */}
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-gray-700 mb-4">
            Promote Students in Next Session
          </h1>
          <div className="flex space-x-4">
            {/* Promote In Session */}
            <div className="flex-1">
              <label
                htmlFor="promoteSession"
                className="block text-gray-600 text-sm font-medium mb-2"
              >
                Promote In Session *
              </label>
              <select
                id="promoteSession"
                value={promoteSession}
                onChange={handlePromoteSessionChange}
                className="w-full border border-gray-300 rounded px-4 py-3 text-gray-700 focus:outline-none focus:ring focus:ring-blue-400"
              >
                <option value="">Select</option>
                <option value="Session 2023-24">Session 2023-24</option>
                <option value="Session 2024-25">Session 2024-25</option>
              </select>
            </div>

            {/* Class */}
            <div className="flex-1">
              <label
                htmlFor="promoteClass"
                className="block text-gray-600 text-sm font-medium mb-2"
              >
                Class *
              </label>
              <select
                id="promoteClass"
                value={promoteClass}
                onChange={handlePromoteClassChange}
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

            {/* Section */}
            <div className="flex-1">
              <label
                htmlFor="promoteSection"
                className="block text-gray-600 text-sm font-medium mb-2"
              >
                Section *
              </label>
              <select
                id="promoteSection"
                value={promoteSection}
                onChange={handlePromoteSectionChange}
                className="w-full border border-gray-300 rounded px-4 py-3 text-gray-700 focus:outline-none focus:ring focus:ring-blue-400"
              >
                <option value="">Select</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
              </select>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-8 flex justify-end">
          <button
            className="bg-gray-500 text-white py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors"
            disabled={
              !selectedClass ||
              !selectedSection ||
              !promoteSession ||
              !promoteClass ||
              !promoteSection
            }
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectCriteria;







