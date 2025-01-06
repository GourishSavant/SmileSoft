
import React, { useState, useEffect } from "react";

const SearchdueFees = () => {
  const [dueFees, setDueFees] = useState([]);
  const [filters, setFilters] = useState({
    feesGroup: "",
    class: "",
    section: "",
    year: "",
  });

  // Fetch data from JSON
  useEffect(() => {
    fetch("/admin/duefees.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => setDueFees(data))
      .catch((error) => console.error("Error fetching due fees:", error));
  }, []);

  // Handle filter change
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Filter due fees data based on selected filters
  const filteredDueFees = dueFees.filter((fee) => {
    return (
      (filters.feesGroup === "" || fee.feesGroup === filters.feesGroup) &&
      (filters.class === "" || fee.class === filters.class) &&
      (filters.section === "" || fee.section === filters.section) &&
      (filters.year === "" || fee.year === filters.year)
    );
  });

  return (
    <div className="container mx-auto p-5 dark:bg-gray-800 dark:text-white ">
      <h1 className="text-3xl font-semibold mb-6 dark:bg-gray-800 dark:text-white">
        Search Due Fees
      </h1>

      {/* Filter Section */}
      <div className="mb-6 grid grid-cols-4 gap-4 dark:bg-gray-600 dark:text-white">
        <select
          name="feesGroup"
          value={filters.feesGroup}
          onChange={handleFilterChange}
          className="px-4 py-2 border rounded-md shadow-sm dark:bg-gray-600 dark:text-white"
        >
          <option value="">Select Fees Group</option>
          <option value="Admission Fees">Admission Fees</option>
          <option value="Exam Fees">Exam Fees</option>
          <option value="Book Fees">Book Fees</option>
        </select>

        <select
          name="class"
          value={filters.class}
          onChange={handleFilterChange}
          className="px-4 py-2 border rounded-md shadow-sm dark:bg-gray-600 dark:text-white"
        >
          <option value="">Select Class</option>
          <option value="10th">10th</option>
          <option value="9th">9th</option>
          <option value="8th">8th</option>
        </select>

        <select
          name="section"
          value={filters.section}
          onChange={handleFilterChange}
          className="px-4 py-2 border rounded-md shadow-sm dark:bg-gray-600 dark:text-white"
        >
          <option value="">Select Section</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
        </select>

        <select
          name="year"
          value={filters.year}
          onChange={handleFilterChange}
          className="px-4 py-2 border rounded-md shadow-sm dark:bg-gray-600 dark:text-white"
        >
          <option value="">Select Year</option>
          <option value="2023-2024">2023-2024</option>
          <option value="2022-2023">2022-2023</option>
        </select>
      </div>

      {/* Search Button */}
      <div className="flex justify-end mb-6 mt-4">
        <button
          onClick={() => console.log("Filters Applied:", filters)}
          className="px-6 py-2 bg-gray-500 text-white font-medium rounded-md hover:bg-gray-600 shadow-md"
        >
          Search
        </button>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:text-white">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-400 dark:text-white">
              <th className="px-4 py-2 text-left">Student Name</th>
              <th className="px-4 py-2 text-left">Class</th>
              <th className="px-4 py-2 text-left">Section</th>
              <th className="px-4 py-2 text-left">Fees Group</th>
              <th className="px-4 py-2 text-left">Due Amount ($)</th>
              <th className="px-4 py-2 text-left">Year</th>
            </tr>
          </thead>
          <tbody>
            {filteredDueFees.length > 0 ? (
              filteredDueFees.map((fee) => (
                <tr
                  key={fee.id}
                  className="border-t hover:bg-gray-50 dark:hover:bg-blue-500"
                >
                  <td className="px-4 py-2">{fee.studentName}</td>
                  <td className="px-4 py-2">{fee.class}</td>
                  <td className="px-4 py-2">{fee.section}</td>
                  <td className="px-4 py-2">{fee.feesGroup}</td>
                  <td className="px-4 py-2">{fee.dueAmount}</td>
                  <td className="px-4 py-2">{fee.year}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-4 py-2 text-center">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SearchdueFees;





