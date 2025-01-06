import React from 'react';
import { FaFileAlt } from 'react-icons/fa';
import { jsPDF } from 'jspdf';

const financeReports = [
  { name: 'Balance Fees Statement' },
  { name: 'Daily Collection Report' },
  { name: 'Fees Statement' },
  { name: 'Balance Fees Report' },
  { name: 'Fees Collection Report' },
  { name: 'Online Fees Collection Report' },
  { name: 'Balance Fees Report With Remark' },
  { name: 'Income Report' },
  { name: 'Expense Report' },
  { name: 'Payroll Report' },
  { name: 'Income Group Report' },
  { name: 'Expense Group Report' },
  { name: 'Online Admission Fees Collection Report' },
];

const FinanceReports = () => {
  // Function to handle PDF download
  const downloadPDF = (reportName) => {
    const doc = new jsPDF();
    doc.text(reportName, 10, 10); // Add report name to PDF
    doc.text("Report content goes here...", 10, 20); // Add placeholder content (can be customized)
    doc.save(`${reportName.replace(/\s+/g, '_').toLowerCase()}.pdf`); // Generate file name from report name
  };

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white">
      {/* Page Header */}
      <h2 className="text-xl font-bold mb-6">Finance Reports</h2>

      {/* Report Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {financeReports.map((report, index) => (
          <div
            key={index}
            className="flex items-center p-4 bg-white rounded-lg shadow-lg dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer"
            onClick={() => downloadPDF(report.name)} // Trigger PDF download on click
          >
            <FaFileAlt className="text-blue-500 text-xl mr-3" />
            <span>{report.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FinanceReports;
