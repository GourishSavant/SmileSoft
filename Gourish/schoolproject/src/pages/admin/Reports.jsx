import React, { useState } from "react";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";

const ReportsAndAnalytics = () => {
  const [selectedReport, setSelectedReport] = useState("");
  const [reportData, setReportData] = useState([]);

  // Dummy data for reports
  const dummyReports = {
    studentPerformance: [
      { id: 1, name: "madan", score: 85, grade: "A" },
      { id: 2, name: "arun", score: 78, grade: "B" },
      { id: 3, name: "abhi", score: 92, grade: "A+" },
    ],
    teacherActivity: [
      { id: 1, teacher: "Mrs. Sampreth", classesTaken: 30, feedback: "Good" },
      { id: 2, teacher: "Mr. Nishanth", classesTaken: 25, feedback: "Average" },
      { id: 3, teacher: "Ms. Nandan", classesTaken: 35, feedback: "Excellent" },
    ],
    systemUsage: [
      { id: 1, date: "2024-11-01", activeUsers: 150, logins: 300 },
      { id: 2, date: "2024-11-02", activeUsers: 200, logins: 400 },
      { id: 3, date: "2024-11-03", activeUsers: 250, logins: 500 },
    ],
  };

  // Handle report selection
  const handleReportSelection = (type) => {
    setSelectedReport(type);
    setReportData(dummyReports[type]);
  };

  // Export report to Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(reportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Report");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, `${selectedReport}_report.xlsx`);
  };

  // Export report to PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text(`${selectedReport.toUpperCase()} REPORT`, 10, 10);

    const headers = Object.keys(reportData[0] || {});
    const data = reportData.map((row) => headers.map((key) => row[key]));
    doc.autoTable({
      head: [headers],
      body: data,
    });

    doc.save(`${selectedReport}_report.pdf`);
  };

  return (
    <div className="p-8 max-w-5xl mx-auto bg-gray-50 shadow-md rounded-lg dark:bg-gray-800 dark:text-white">
      <h1 className="text-2xl font-bold text-center mb-6 dark:bg-gray-800 dark:text-white">Reports and Analytics</h1>

      {/* Report Selection */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4 dark:bg-gray-800 dark:text-white">Select a Report</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button
            onClick={() => handleReportSelection("studentPerformance")}
            className={`py-3 px-4 rounded-md shadow ${
              selectedReport === "studentPerformance"
                ? "bg-blue-500 text-white dark:bg-blue-500 dark:text-white"
                : "bg-gray-100 text-gray-700 dark:bg-gray-500 dark:text-white"
            } hover:bg-blue-400`}
          >
            Student Performance
          </button>
          <button
            onClick={() => handleReportSelection("teacherActivity")}
            className={`py-3 dark:bg-gray-800 dark:text-white px-4 rounded-md shadow ${
              selectedReport === "teacherActivity"
                ? "bg-blue-500 text-white dark:bg-blue-500 dark:text-white"
                : "bg-gray-100 text-gray-700 dark:bg-gray-500 dark:text-white"
            } hover:bg-blue-400`}
          >
            Teacher Activity
          </button>
          <button
            onClick={() => handleReportSelection("systemUsage")}
            className={`py-3 px-4 dark:bg-gray-600 dark:text-white rounded-md shadow ${
              selectedReport === "systemUsage"
                ? "bg-blue-500 text-white dark:bg-blue-500 dark:text-white"
                : "bg-gray-100 text-gray-700 dark:bg-gray-500 dark:text-white"
            } hover:bg-blue-400`}
          >
            System Usage
          </button>
        </div>
      </div>

      {/* Report Table */}
      {selectedReport && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-4 dark:bg-gray-700 dark:text-white">{selectedReport.replace(/([A-Z])/g, " $1")}</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 dark:bg-gray-800 dark:text-white">
              <thead>
                <tr className="bg-gray-200 dark:bg-gray-800 dark:text-white">
                  {Object.keys(reportData[0] || {}).map((key) => (
                    <th
                      key={key}
                      className="text-left py-2 px-4 border-b border-gray-300 dark:bg-gray-600 dark:text-white"
                    >
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {reportData.map((row, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    {Object.values(row).map((value, i) => (
                      <td key={i} className="py-2 px-4 border-b border-gray-300 dark:bg-gray-600 dark:text-white">
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Export Buttons */}
          <div className="flex justify-end gap-4 mt-2 dark:bg-gray-800 dark:text-white">
            <button
              onClick={exportToExcel}
              className="bg-green-500 text-white py-2 dark:bg-gray-800 dark:text-white px-4 rounded-md shadow hover:bg-green-600"
            >
              Export to Excel
            </button>
            <button
              onClick={exportToPDF}
              className="bg-red-500 text-white py-1 dark:bg-gray-800 dark:text-white px-4 rounded-md shadow hover:bg-red-600"
            >
              Export to PDF
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportsAndAnalytics;
