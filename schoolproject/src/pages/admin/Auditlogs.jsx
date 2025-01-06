import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";

const AuditLogs = () => {
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [search, setSearch] = useState("");

  // Fetch audit logs from JSON file
  useEffect(() => {
    fetch("/admin/audit-logs.json")
      .then((response) => response.json())
      .then((data) => {
        setLogs(data.logs);
        setFilteredLogs(data.logs);
      })
      .catch((error) => console.error("Error fetching logs:", error));
  }, []);

  // Filter logs based on search query
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearch(query);
    setFilteredLogs(
      logs.filter(
        (log) =>
          log.action.toLowerCase().includes(query) ||
          log.user.toLowerCase().includes(query) ||
          log.timestamp.toLowerCase().includes(query)
      )
    );
  };

  // Download logs as PDF
  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Audit Logs", 10, 10);

    filteredLogs.forEach((log, index) => {
      doc.text(`${index + 1}. Action: ${log.action}, User: ${log.user}, Time: ${log.timestamp}`, 10, 20 + index * 10);
    });

    doc.save("audit_logs.pdf");
  };

  return (
    <div className="p-6 max-w-7xl mx-auto bg-gray-50 shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">Audit Logs</h1>

      {/* Search and Download Section */}
      <div className="mb-4 flex flex-col md:flex-row gap-4 items-center">
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Search by action, user, or timestamp"
          className="w-full md:w-1/2 p-3 border border-gray-300 rounded-md shadow-sm"
        />
        <button
          onClick={downloadPDF}
          className="bg-blue-500 text-white py-2 px-4 rounded-md shadow hover:bg-blue-600"
        >
          Download PDF
        </button>
      </div>

      {/* Audit Logs Table */}
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Action</th>
              <th className="px-4 py-2 text-left">User</th>
              <th className="px-4 py-2 text-left">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.map((log) => (
              <tr key={log.id} className="border-b">
                <td className="px-4 py-2">{log.id}</td>
                <td className="px-4 py-2">{log.action}</td>
                <td className="px-4 py-2">{log.user}</td>
                <td className="px-4 py-2">{log.timestamp}</td>
              </tr>
            ))}
            {filteredLogs.length === 0 && (
              <tr>
                <td colSpan="4" className="px-4 py-2 text-center text-gray-500">
                  No logs found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AuditLogs;
