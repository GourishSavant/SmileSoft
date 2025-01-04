

import React, { useState } from "react";

const FeesReminder = () => {
  // State to store reminders data
  const [reminders, setReminders] = useState([
    { id: 1, action: false, type: "Before", days: 1 },
    { id: 2, action: false, type: "Before", days: 5 },
    { id: 3, action: false, type: "After", days: 2 },
    { id: 4, action: false, type: "After", days: 5 },
  ]);

  // Handle checkbox change
  const handleCheckboxChange = (id) => {
    setReminders((prevReminders) =>
      prevReminders.map((reminder) =>
        reminder.id === id
          ? { ...reminder, action: !reminder.action }
          : reminder
      )
    );
  };

  // Handle Save button click
  const handleSave = () => {
    // Implement your save logic here
    alert("Changes saved successfully!");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-800"> {/* dark:bg-gray-800 */}
      {/* Outer Frame */}
      <div className="w-full max-w-5xl bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6 text-left text-gray-800 dark:text-white">
          Fees Reminder
        </h1>

        {/* Table */}
        <div className="overflow-x-auto rounded-md mb-4">
          <table className="w-full border-collapse border border-gray-300 dark:border-gray-700">
            <thead>
              <tr className="bg-gray-200 text-left dark:bg-gray-700 dark:text-white">
                <th className="px-4 py-2 border border-gray-300 dark:border-gray-600">
                  Action
                </th>
                <th className="px-4 py-2 border border-gray-300 dark:border-gray-600">
                  Reminder Type
                </th>
                <th className="px-4 py-2 border border-gray-300 dark:border-gray-600">
                  Days
                </th>
              </tr>
            </thead>
            <tbody>
              {reminders.map((reminder) => (
                <tr
                  key={reminder.id}
                  className="hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  {/* Action Column with Checkbox */}
                  <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 flex items-center">
                    <input
                      type="checkbox"
                      checked={reminder.action}
                      onChange={() => handleCheckboxChange(reminder.id)}
                      className="form-checkbox h-5 w-5 text-blue-600 dark:text-green-500 mr-2"
                    />
                    <span className="text-gray-700 dark:text-white">Active</span>
                  </td>

                  <td className="px-4 py-2 border border-gray-300 dark:border-gray-600">
                    {reminder.type}
                  </td>

                  {/* Days Column with Number Input (Arrows Hidden) */}
                  <td className="px-4 py-2 border border-gray-300 dark:border-gray-600">
                    <input
                      type="number"
                      value={reminder.days}
                      onChange={(e) =>
                        setReminders((prevReminders) =>
                          prevReminders.map((r) =>
                            r.id === reminder.id
                              ? { ...r, days: Number(e.target.value) }
                              : r
                          )
                        )
                      }
                      className="w-16 p-2 border w-60 border-gray-300 rounded dark:bg-gray-600 dark:text-white"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 dark:bg-green-800 dark:text-white"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeesReminder;


