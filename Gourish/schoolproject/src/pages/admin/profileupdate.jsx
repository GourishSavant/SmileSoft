
import React, { useState } from "react";

const EnableDisableCheckbox = () => {
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleEnable = (status) => {
    setIsEnabled(status);
  };

  const fields = [
    "First Name",
    "Admission Date",
    "RTE",
    "Student Photo",
    "Mobile Number",
    "Email",
    "Religion",
    "Caste",
    "Date Of Birth",
    "Blood Group",
    "If Guardian Is",
    "Gender",
    "Current Address",
    "Permanent Address",
    "Bank Account Number",
    "Bank Name",
    "IFSC Code",
    "Father Name",
    "Father Phone",
    "Father Occupation",
    "Mother Name",
    "Mother Phone",
    "House",
    "Mother Occupation",
    "Guardian Name",
    "Guardian Relation",
    "Guardian Phone",
    "Guardian Occupation",
    "Guardian Address",
    "Guardian Email",
    "National Identification Number",
    "Local Identification Number",
    "Father Photo",
    "Mother Photo",
    "Guardian Photo",
    "Height",
    "Weight",
    "Previous School Details",
  ];

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 dark:bg-gray-700 py-6">
      {/* Main Header */}
      <div className="bg-white dark:bg-gray-800 dark:text-white p-8 rounded-lg shadow-md text-center w-full max-w-5xl mx-4">
        <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white text-left">
          Student Profile Form Update
        </h1>

        {/* Enable/Disable Checkboxes Section */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-gray-700 dark:text-white">
            Allow Editable Form Fields
          </h2>
          <div className="flex items-center space-x-4">
            {/* Enable Checkbox */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="enable"
                checked={isEnabled}
                onChange={() => toggleEnable(true)}
                className="w-6 h-6 text-blue-600 bg-gray-100 rounded-full border-gray-300 focus:ring-blue-500"
              />
              <label htmlFor="enable" className="text-gray-700 dark:text-white font-medium">
                Enable
              </label>
            </div>

            {/* Disable Checkbox */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="disable"
                checked={!isEnabled}
                onChange={() => toggleEnable(false)}
                className="w-6 h-6 text-red-600 bg-gray-100 rounded-full border-gray-300 focus:ring-red-500"
              />
              <label htmlFor="disable" className="text-gray-700 dark:text-white font-medium">
                Disable
              </label>
            </div>

            {/* Save Button */}
            <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
              Save
            </button>
          </div>
        </div>
      </div>

      {/* Editable Fields Section */}
      {isEnabled && (
        <div className="bg-white dark:bg-gray-800 dark:text-white p-6 rounded-lg shadow-md w-full max-w-5xl mt-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
            Allowed Edit Form Fields on Student Profile
          </h2>
          <table className="table-auto w-full border-collapse border border-gray-200 dark:border-gray-700">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700">
                <th className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-left">
                  Name
                </th>
                <th className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {fields.map((field, index) => (
                <tr key={index} className="odd:bg-white even:bg-gray-50 dark:odd:bg-gray-800 dark:even:bg-gray-700">
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">{field}</td>
                  <td className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-center">
                    <input
                      type="checkbox"
                      className="toggle toggle-success"
                      defaultChecked
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default EnableDisableCheckbox;

