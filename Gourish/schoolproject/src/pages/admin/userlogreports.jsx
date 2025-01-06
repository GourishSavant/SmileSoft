import React, { useState, useEffect } from "react";
import { FaFilePdf, FaFileExcel, FaFileWord, FaPrint } from "react-icons/fa";

const UserManagement = () => {
  const [activeModule, setActiveModule] = useState("all");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("/admin/userlog.json")
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch data");
        return response.json();
      })
      .then((jsonData) => {
        setData(jsonData);
        setFilteredData(jsonData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    const filtered = data.filter((item) => {
      const matchSearch =
        item.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.role.toLowerCase().includes(searchTerm.toLowerCase());
      const matchModule =
        activeModule === "all" ||
        (activeModule === "students" && item.role.toLowerCase() === "student") ||
        (activeModule === "staff" && item.role.toLowerCase() === "teacher") ||
        (activeModule === "parents" && item.role.toLowerCase() === "parent");
      return matchSearch && matchModule;
    });
    setFilteredData(filtered);
  }, [searchTerm, activeModule, data]);

  const handleDownloadPDF = () => {
    alert("Downloading data as PDF!");
  };

  const handleDownloadExcel = () => {
    alert("Downloading data as Excel!");
  };

  const handleDownloadWord = () => {
    alert("Downloading data as Word Document!");
  };

  const handlePrint = () => {
    window.print();
  };

  const renderTable = () => {
    if (filteredData.length === 0) {
      return (
        
        <tr>
          <td colSpan="6" className="text-center py-4 dark:bg-gray-800">
            No data available in table
            <br />
            Add new record or search with different criteria.
          </td>
        </tr>
      );
    }

    return filteredData.map((item, index) => (
      <tr key={index} className="hover:bg-gray-100 dark:text-white dark:bg-gray-800">
        <td className="border p-2">{item.user}</td>
        <td className="border p-2">{item.role}</td>
        {activeModule !== "staff" && activeModule !== "parents" && (
          <td className="border p-2">{item.class || "N/A"}</td>
        )}
        <td className="border p-2">{item.ipAddress}</td>
        <td className="border p-2">{item.loginDateTime}</td>
        <td className="border p-2">{item.userAgent}</td>
      </tr>
    ));
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white transition-colors duration-300">



    <div className="bg-gray-200 min-h-screen dark:bg-gray-800 dark:text-white">
      <div className="p-6">
        {/* Top Navigation for Modules */}
        <div className="flex justify-between items-center mb-4 dark:bg-gray-800 dark:text-white">
          <div>
            {["all", "students", "staff", "parents"].map((module) => (
              <button
                key={module}
                className={`py-2 px-4 rounded ${
                  activeModule === module ? "bg-gray-600 text-black dark:bg-blue-500 dark:text-white" : "bg-gray-400"
                }`}
                onClick={() => setActiveModule(module)}
              >
                {module.charAt(0).toUpperCase() + module.slice(1)}
              </button>
            ))}
          </div>

          {/* Download and Print Icons */}
          <div className="flex items-center gap-4">
            <button
              onClick={handleDownloadPDF}
              className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600"
              title="Download as PDF"
            >
              <FaFilePdf />
            </button>
            <button
              onClick={handleDownloadExcel}
              className="p-2 rounded-full bg-green-500 text-white hover:bg-green-600"
              title="Download as Excel"
            >
              <FaFileExcel />
            </button>
            <button
              onClick={handleDownloadWord}
              className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600"
              title="Download as Word"
            >
              <FaFileWord />
            </button>
            <button
              onClick={handlePrint}
              className="p-2 rounded-full bg-gray-500 text-white hover:bg-gray-600"
              title="Print"
            >
              <FaPrint />
            </button>
          </div>
        </div>

        {/* Search Section */}
        <div className="flex justify-between items-center mb-4 dark:bg-gray-800 dark:text-white">
          <input
            type="text"
            placeholder="Search..."
            className="border p-2 dark:bg-gray-800 dark:text-whiterounded w-1/3"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Table */}
        <div className="overflow-auto bg-white shadow-md rounded dark:text-white dark:bg-gray-800">
          <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-800">
            <thead className="bg-gray-200 dark:bg-gray-800 dark:text-white">
              <tr>
                <th className="border p-2">Users</th>
                <th className="border p-2">Role</th>
                {activeModule !== "staff" && activeModule !== "parents" && (
                  <th className="border p-2">Class</th>
                )}
                <th className="border p-2">IP Address</th>
                <th className="border p-2">Login Date Time</th>
                <th className="border p-2">User Agent</th>
              </tr>
            </thead>
            <tbody>{renderTable()}</tbody>
          </table>
        </div>
        </div>
      </div>
    </div>
  
  );
};

export default UserManagement;
