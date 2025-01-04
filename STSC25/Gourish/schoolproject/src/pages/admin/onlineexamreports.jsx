import React, { useState, useEffect } from 'react';
import { jsPDF } from "jspdf";
import { FaFilePdf } from 'react-icons/fa';

const OnlineExamReport = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({
    exam: "",
    class: "",
    section: "",
  });

  useEffect(() => {
    fetch('/admin/onlineexamreport.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((jsonData) => {
        setData(jsonData);
        setFilteredData(jsonData);
      })
      .catch((error) => console.error("Error fetching JSON data:", error));
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);

    setFilteredData(
      data.filter(
        (item) =>
          (!newFilters.exam || item.exam === newFilters.exam) &&
          (!newFilters.class || item.class === newFilters.class) &&
          (!newFilters.section || item.section === newFilters.section)
      )
    );
  };

  const downloadPDF = (reportName) => {
    const doc = new jsPDF();
    doc.text(`${reportName}`, 10, 10);
    doc.text("Detailed report content goes here.", 10, 20);
    doc.save(`${reportName.toLowerCase().replace(/\s+/g, '_')}.pdf`);
  };

  const reports = [
    { name: 'Result Report' },
    { name: 'Exams Report' },
    { name: 'Student Exams Attempt Report' },
    { name: 'Exams Rank Report' },
  ];

  return (

    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 dark:text-white">
        <div className="p-6 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white">
          <h1 className="text-2xl font-bold text-center mb-6 text-black dark:text-white">
            Online Examinations Report
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mb-6 dark:text-white">
            {reports.map((report, index) => (
              <div
                key={index}
                className="flex items-center p-4 bg-white rounded-lg shadow-lg dark:bg-gray-700 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-600 cursor-pointer"
                onClick={() => downloadPDF(report.name)}
              >
                <FaFilePdf className="text-blue-500 text-xl mr-3 dark:text-white" />
                <span>{report.name}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 mb-5 dark:text-white">
            <select
              name="exam"
              value={filters.exam}
              onChange={handleFilterChange}
              className="p-2 border rounded-md w-1/4 dark:bg-gray-800 dark:text-white"
            >
              <option value="">Select Exam</option>
              <option value="Midterm">Midterm</option>
              <option value="Final">Final</option>
            </select>
            <select
              name="class"
              value={filters.class}
              onChange={handleFilterChange}
              className="p-2 border rounded-md w-1/4 dark:bg-gray-800 dark:text-white"
            >
              <option value="">Select Class</option>
              <option value="10">Class 10</option>
              <option value="11">Class 11</option>
            </select>
            <select
              name="section"
              value={filters.section}
              onChange={handleFilterChange}
              className="p-2 border rounded-md w-1/4 dark:bg-gray-800 dark:text-white"
            >
              <option value="">Select Section</option>
              <option value="A">Section A</option>
              <option value="B">Section B</option>
            </select>
          </div>

          <div className="overflow-x-auto">

            <table className="min-w-full border-collapse border border-gray-200 dark:bg-gray-800 dark:text-white">
              <thead className="bg-gray-100 dark:bg-gray-800 dark:text-white">
                <tr>
                  <th className="border border-gray-200 p-2">Admission No</th>
                  <th className="border border-gray-200 p-2">Student Name</th>
                  <th className="border border-gray-200 p-2">Class</th>
                  <th className="border border-gray-200 p-2">Section</th>
                  <th className="border border-gray-200 p-2">Exam</th>
                  <th className="border border-gray-200 p-2">Total Attempt</th>
                  <th className="border border-gray-200 p-2">Remaining Attempt</th>
                  <th className="border border-gray-200 p-2">Exam Submitted</th>
                  <th className="border border-gray-200 p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((item) => (
                    <tr key={item.admissionNo} className="hover:bg-gray-50 dark:bg-gray-800 dark:text-white">
                      <td className="border border-gray-200 p-2">{item.admissionNo}</td>
                      <td className="border border-gray-200 p-2">{item.studentName}</td>
                      <td className="border border-gray-200 p-2">{item.class}</td>
                      <td className="border border-gray-200 p-2">{item.section}</td>
                      <td className="border border-gray-200 p-2">{item.exam}</td>
                      <td className="border border-gray-200 p-2">{item.totalAttempt}</td>
                      <td className="border border-gray-200 p-2">{item.remainingAttempt}</td>
                      <td className="border border-gray-200 p-2">
                        {item.examSubmitted ? "Yes" : "No"}
                      </td>
                      <td className="border border-gray-200 p-2 dark:text-white">
                        <button className="bg-green-500 text-white px-3 py-1 rounded bg-green-600 transition">
                          Download PDF
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="border border-gray-200 p-2 text-center dark:text-white">
                      No data available in table
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        </div>
      
  );
};

export default OnlineExamReport;
