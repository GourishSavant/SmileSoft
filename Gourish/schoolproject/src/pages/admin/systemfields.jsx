

import React, { useState } from "react";
import {
  FaFilePdf,
  FaFileWord,
  FaFileExcel,
  FaCopy,
  FaPrint,
  FaColumns,
} from "react-icons/fa";

const MODULES = {
  Student: [
    "Roll Number",
    "Middle Name",
    "Last Name",
    "Category",
    "Religion",
    "Caste",
    "Mobile Number",
    "Email",
    "Admission Date",
    "Student Photo",
    "House",
    "Blood Group",
    "Height",
    "Weight",
    "Measurement Date",
    "Father Name",
    "Father Phone",
    "Father Occupation",
    "Father Photo",
    "Mother Name",
    "Mother Phone",
    "Mother Occupation",
    "Mother Photo",
    "Guardian Name",
    "Guardian Phone",
    "Guardian Relation",
    "Guardian Email",
    "Guardian Occupation",
    "Guardian Photo",
    "Guardian Address",
    "If Guardian Address Is Current Address",
    "If Permanent Address Is Current Address",
    "Route List",
    "Hostel Details",
    "Bank Account Number",
    "Bank Name",
    "IFSC Code",
    "National Identification Number",
    "Local Identification Number",
    "RTE",
    "Previous School Details",
    "Note",
    "Upload Documents",
    "Barcode",
  ],
  Staff: [
    "Designation",
    "Department",
    "Last Name",
    "Father Name",
    "Mother Name",
    "Date Of Joining",
    "Phone",
    "Emergency Contact Number",
    "Marital Status",
    "Photo",
    "Current Address",
    "Permanent Address",
    "Qualification",
    "Work Experience",
    "Note",
    "EPF No.",
    "Basic Salary",
    "Contract Type",
    "Work Shift",
    "Work Location",
    "Leaves",
    "Bank Account Details",
    "Social Media Link",
    "Upload Documents",
    "Barcode",
  ],
};

const Modules = () => {
  const [currentModule, setCurrentModule] = useState("Student");
  const [enabledItems, setEnabledItems] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [showColumnOptions, setShowColumnOptions] = useState(false);
  const [columns, setColumns] = useState({ name: true, action: true });

  const filteredItems = MODULES[currentModule].filter((item) =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleItem = (module, item) => {
    setEnabledItems((prev) => ({
      ...prev,
      [module]: {
        ...prev[module],
        [item]: !prev[module]?.[item],
      },
    }));
  };

  const toggleColumnVisibility = (column) => {
    setColumns((prev) => ({ ...prev, [column]: !prev[column] }));
  };

  return (
    <div className="flex min-h-screen dark:bg-gray-800 dark:text-white bg-white p-4 rounded shadow-md mt-4 mr-4 ml-4 mb-4">
      <div className="flex-1 p-6 relative">
        <h1 className="text-3xl font-semibold mb-6">Modules</h1>
        <div className="absolute top-6 right-6 flex space-x-6">
          {Object.keys(MODULES).map((module) => (
            <span
              key={module}
              onClick={() => setCurrentModule(module)}
              className={`cursor-pointer ${
                currentModule === module
                  ? "text-blue-500 font-semibold"
                  : "text-gray-700 dark:text-white hover:text-blue-500"
              }`}
            >
              {module}
            </span>
          ))}
        </div>

        <div className="flex items-center mb-4 justify-between">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 w-1/2 rounded-md border focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
          <div className="flex space-x-3">
            <FaFilePdf className="cursor-pointer text-red-600" size={24} />
            <FaFileWord className="cursor-pointer text-blue-600" size={24} />
            <FaFileExcel className="cursor-pointer text-green-600" size={24} />
            <FaCopy className="cursor-pointer text-gray-600" size={24} />
            <FaPrint className="cursor-pointer text-black" size={24} />
            <FaColumns
              className="cursor-pointer text-gray-500 hover:text-gray-700"
              title="Columns View"
              size={20}
              onClick={() => setShowColumnOptions(!showColumnOptions)}
            />
          </div>
        </div>

        {showColumnOptions && (
          <div className="absolute right-0 mt-2 rounded-lg shadow-md bg-gray-100 dark:bg-gray-700 p-4 w-full sm:w-64">
            <h2 className="text-lg font-semibold mb-2">Select Columns to Show</h2>
            <div className="flex flex-col space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={columns.name}
                  onChange={() => toggleColumnVisibility("name")}
                  className="mr-2"
                />
                Name
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={columns.action}
                  onChange={() => toggleColumnVisibility("action")}
                  className="mr-2"
                />
                Action
              </label>
            </div>
          </div>
        )}

        <table className="w-full border-collapse border dark:bg-gray-800 dark:text-white mt-12">
          <thead>
            <tr>
              {columns.name && (
                <th className="border p-2 text-left dark:bg-gray-700 dark:text-white">
                  Name
                </th>
              )}
              {columns.action && (
                <th className="border p-2 text-end dark:bg-gray-700 dark:text-white">
                  Action
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item) => (
              <tr key={item}>
                {columns.name && (
                  <td className="border p-2 dark:bg-gray-700 dark:text-white">
                    {item}
                  </td>
                )}
                {columns.action && (
                  <td className="border p-2 text-center dark:bg-gray-700 dark:text-white">
                    <label className="flex items-center justify-end">
                      <input
                        type="checkbox"
                        className="toggle toggle-success"
                        checked={enabledItems[currentModule]?.[item] || false}
                        onChange={() => toggleItem(currentModule, item)}
                      />
                    </label>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Modules;


