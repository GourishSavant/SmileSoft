import { jsPDF } from "jspdf";
import { FaFileAlt } from 'react-icons/fa';

const Studentreports = () => {
  // Function to handle PDF download
  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Student Information Report", 10, 10);
    // Add additional content for the report
    doc.text("Report details here", 10, 20);
    // Download the PDF
    doc.save("student_information_report.pdf");
  };

  const reports = [
    { name: 'Student Report' },
    { name: 'Class & Section Report' },
    { name: 'Guardian Report' },
    { name: 'Student History' },
    { name: 'Student Login Credential' },
    { name: 'Parent Login Credential' },
    { name: 'Class Subject Report' },
    { name: 'Admission Report' },
    { name: 'Sibling Report' },
    { name: 'Student Profile' },
    { name: 'Student Gender Ratio Report' },
    { name: 'Student Teacher Ratio Report' },
    { name: 'Online Admission Report' },
  ];

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white">
      {/* Page Header */}
      <h2 className="text-xl font-bold mb-6">Student Information Report</h2>

      {/* Report Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {reports.map((report, index) => (
          <div
            key={index}
            className="flex items-center p-4 bg-white rounded-lg shadow-lg dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer"
            onClick={downloadPDF} // Trigger PDF download on click
          >
            <FaFileAlt className="text-blue-500 text-xl mr-3" />
            <span>{report.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Studentreports;
