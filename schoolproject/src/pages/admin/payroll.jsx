import React, { useState } from "react";

const PayrollPage = () => {
  const [role, setRole] = useState("");
  const [month, setMonth] = useState("November");
  const [year, setYear] = useState("2024");

  const handleSearch = () => {
    alert(`Searching payroll for Role: ${role}, Month: ${month}, Year: ${year}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 flex justify-center">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md w-full max-w-5xl mt-6">
        <h2 className="text-2xl font-semibold text-center mb-4 text-gray-900 dark:text-white">
          Select Criteria
        </h2>
        <form className="flex items-center space-x-4">
          {/* Role Dropdown */}
          <div>
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Role
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="mt-1 block w-40 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-800 dark:text-white"
            >
              <option value="">Select</option>
              <option value="Teacher">Teacher</option>
              <option value="Admin">Admin</option>
              <option value="Staff">Staff</option>
            </select>
          </div>

          {/* Month Dropdown */}
          <div>
            <label
              htmlFor="month"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Month
            </label>
            <select
              id="month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="mt-1 block w-40 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-800 dark:text-white"
            >
              <option value="January">January</option>
              <option value="February">February</option>
              <option value="March">March</option>
              <option value="April">April</option>
              <option value="May">May</option>
              <option value="June">June</option>
              <option value="July">July</option>
              <option value="August">August</option>
              <option value="September">September</option>
              <option value="October">October</option>
              <option value="November">November</option>
              <option value="December">December</option>
            </select>
          </div>

          {/* Year Dropdown */}
          <div>
            <label
              htmlFor="year"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Year
            </label>
            <select
              id="year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="mt-1 block w-40 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-800 dark:text-white"
            >
              <option value="2023">2023</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
            </select>
          </div>

          {/* Search Button */}
          <div className="mt-5">
            <button
              type="button"
              onClick={handleSearch}
              className="bg-blue-500 dark:bg-blue-600 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PayrollPage;
