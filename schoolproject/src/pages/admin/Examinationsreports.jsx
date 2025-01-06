import { jsPDF } from "jspdf";
import { FaFileAlt } from 'react-icons/fa';

const ExaminationsReports = () => {
  // Function to handle PDF download based on report name
  const downloadPDF = (reportName) => {
    const doc = new jsPDF();
    doc.text(`${reportName} Report`, 10, 10);
    doc.text("Report details here", 10, 20);
    doc.save(`${reportName}_report.pdf`);
  };

  // List of Examinations reports
  const examsReports = [
    { name: 'Rank Report' },
  ];

  return (
    <div className="min-h-screen p-6 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white transition-colors duration-300">
      {/* Page Header */}
      <h2 className="text-2xl font-bold mb-6 text-center">Examinations Reports</h2>

      {/* Report Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {examsReports.map((report, index) => (
          <div
            key={index}
            className="flex items-center p-4 bg-white rounded-lg shadow-lg dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer transition-colors duration-300"
            onClick={() => downloadPDF(report.name)} // Trigger PDF download for clicked report
          >
            <FaFileAlt className="text-blue-500 dark:text-blue-300 text-xl mr-3" />
            <span>{report.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExaminationsReports;
