
import React, { useState, useEffect } from "react";

const PrintAdmitCard = () => {
  const [filters, setFilters] = useState({
    examGroup: "",
    exam: "",
    session: "",
    class: "",
    section: "",
    template: "",
  });

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [errors, setErrors] = useState({});

  // Fetch data from JSON
  useEffect(() => {
    fetch("/admin/admitCardData.json") // Replace with the correct path to your JSON file
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching print admit card data:", error));
  }, []);

  // Handle dropdown change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // Validate filters
  const validateFilters = () => {
    const newErrors = {};
    for (const key in filters) {
      if (!filters[key]) {
        newErrors[key] = `${key} is required`;
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Search
  const handleSearch = () => {
    if (validateFilters()) {
      const results = data.filter((item) =>
        Object.keys(filters).every(
          (key) => filters[key] === "" || filters[key] === item[key]
        )
      );
      setFilteredData(results);
    }
  };

  return (
    <div className="h-screen bg-gray-100 overflow-auto dark:bg-gray-800 dark:text-white mr-3 mt-3 ml-3">
      <div className="min-w-1xl min-auto bg-white rounded shadow-md p-6 dark:bg-gray-800 dark:text-white">

        {/* Filter Form */}
        <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">Select Criteria</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
          {[{
            name: "examGroup", placeholder: "Exam Group"
          }, {
            name: "exam", placeholder: "Exam"
          }, {
            name: "session", placeholder: "Session"
          }, {
            name: "class", placeholder: "Class"
          }, {
            name: "section", placeholder: "Section"
          }, {
            name: "template", placeholder: "Admit Card Template"
          }].map(({ name, placeholder }) => (
            <div key={name} className="flex flex-col">
              <label className="text-sm text-black dark:text-white">{placeholder} *</label>
              <select
                name={name}
                value={filters[name]}
                onChange={handleChange}
                className="p-2 border rounded text-black dark:bg-gray-600 dark:text-white"
                disabled={data.length === 0} // Disable if data is not loaded
              >
                <option value="">Select</option>
                {[...new Set(data.map((item) => item[name]))].map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {errors[name] && (
                <span className="text-red-500 text-sm mt-1">
                  {errors[name]}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Search Button */}
        <div className="flex justify-center mt-5">
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Search
          </button>
        </div>

        {/* Filtered Results */}
        {filteredData.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-bold text-black dark:text-white">Filtered Results</h2>
            <div className="overflow-x-auto mt-4">
              <table className="table-auto w-full border-collapse border border-gray-300">
                <thead className="bg-gray-200">
                  <tr className="text-black">
                    {["Exam Group", "Exam", "Session", "Class", "Section", "Template"].map((header) => (
                      <th key={header} className="border border-gray-300 px-4 py-2">{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((item, index) => (
                    <tr key={index}>
                      {Object.values(item).map((value, idx) => (
                        <td key={idx} className="border border-gray-300 px-4 py-2 text-center">
                          {value}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PrintAdmitCard;

