import React, { useState } from "react";
import { FaFilePdf, FaFileExcel, FaPrint, FaCopy, FaFileWord, FaColumns, FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const OnlineExamList = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editorContent, setEditorContent] = useState('');
  const [examData, setExamData] = useState({
    examTitle: "",
    quizTitle: "",
    attempt: 1,
    examFrom: "",
    examTo: "",
    duration: "",
    description: "",
    examPublished: false,
    resultPublished: false
  });

  const [upcomingExams, setUpcomingExams] = useState([]);
  const [closedExams, setClosedExams] = useState([]);
  const [editingExam, setEditingExam] = useState(null); // State to track the exam being edited
  const [selectedExams, setSelectedExams] = useState([]); // State for selected exams in closed exams

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setExamData({
      ...examData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const { examTitle, quizTitle, attempt, examFrom, examTo, duration, description, examPublished, resultPublished } = examData;

    const newExam = {
      id: editingExam ? editingExam.id : new Date().getTime(), // Unique ID for each exam
      examTitle,
      quizTitle,
      attempt,
      examFrom,
      examTo,
      duration,
      description, // Save the description here
      examPublished: examPublished ? "Yes" : "No",
      resultPublished: resultPublished ? "Yes" : "No",
    };

    // Add exam to the appropriate list based on examFrom date
    const examDate = new Date(examFrom);
    if (examDate > new Date()) {
      if (editingExam) {
        setUpcomingExams(prevExams =>
          prevExams.map(exam => (exam.id === editingExam.id ? newExam : exam))
        );
      } else {
        setUpcomingExams((prevExams) => [...prevExams, newExam]);
      }
    } else {
      if (editingExam) {
        setClosedExams(prevExams =>
          prevExams.map(exam => (exam.id === editingExam.id ? newExam : exam))
        );
      } else {
        setClosedExams((prevExams) => [...prevExams, newExam]);
      }
    }

    handleModalClose(); // Close the modal after submission
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingExam(null); // Reset editing state
    setEditorContent('');
    setExamData({
      examTitle: "",
      quizTitle: "",
      attempt: 1,
      examFrom: "",
      examTo: "",
      duration: "",
      description: "",
      examPublished: false,
      resultPublished: false
    });
  };

  const handleEdit = (exam) => {
    setEditingExam(exam);
    setExamData({
      examTitle: exam.examTitle,
      quizTitle: exam.quizTitle,
      attempt: exam.attempt,
      examFrom: exam.examFrom,
      examTo: exam.examTo,
      duration: exam.duration,
      description: exam.description, // Pre-fill the description for editing
      examPublished: exam.examPublished === "Yes",
      resultPublished: exam.resultPublished === "Yes"
    });
    setEditorContent(exam.description); // Pre-fill the description editor
    setIsModalOpen(true);
  };

  const handleDelete = (examId) => {
    if (activeTab === "upcoming") {
      setUpcomingExams(prevExams => prevExams.filter(exam => exam.id !== examId));
    } else {
      setClosedExams(prevExams => prevExams.filter(exam => exam.id !== examId));
    }
  };

  const handleBulkDelete = () => {
    if (activeTab === "upcoming") {
      setUpcomingExams(prevExams => prevExams.filter(exam => !selectedExams.includes(exam.id)));
    } else {
      setClosedExams(prevExams => prevExams.filter(exam => !selectedExams.includes(exam.id)));
    }
    setSelectedExams([]); // Clear selected exams after bulk delete
  };

  const handleCheckboxChange = (examId) => {
    setSelectedExams((prevSelectedExams) =>
      prevSelectedExams.includes(examId)
        ? prevSelectedExams.filter((id) => id !== examId)
        : [...prevSelectedExams, examId]
    );
  };

  const handleSelectAllChange = () => {
    if (selectedExams.length === closedExams.length) {
      setSelectedExams([]);
    } else {
      setSelectedExams(closedExams.map(exam => exam.id));
    }
  };

  const filteredExams = (exams) =>
    exams.filter((exam) =>
      exam.examTitle.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Online Exam Report", 20, 10);
    const tableColumn = ["Exam", "Quiz", "Questions", "Attempt", "Exam From", "Exam To", "Duration", "Published", "Result", "Description"];
    const tableRows = filteredExams(activeTab === "upcoming" ? upcomingExams : closedExams).map(item => [
      item.examTitle,
      item.quizTitle,
      item.attempt,
      item.examFrom,
      item.examTo,
      item.duration,
      item.examPublished,
      item.resultPublished,
      item.description
    ]);
    doc.autoTable({ head: [tableColumn], body: tableRows, startY: 20 });
    doc.save("online_exams.pdf");
  };

  const exportToExcel = () => {
    const exams = filteredExams(activeTab === "upcoming" ? upcomingExams : closedExams);
    const ws = XLSX.utils.json_to_sheet(exams);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Online Exams");
    XLSX.writeFile(wb, "online_exams.xlsx");
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopy = () => {
    alert("Copy functionality is not implemented.");
  };

  const handleColumns = () => {
    alert("Column selection functionality is not implemented.");
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="container mx-auto p-4">
      {/* +ADD EXAM Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={handleModalOpen}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 flex items-center space-x-1"
        >
          <FaPlus />
          <span>Add Exam</span>
        </button>
      </div>

      {/* Modal for Adding Exam */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded shadow-lg w-1/2 max-h-[90vh] overflow-auto">
            <h2 className="text-2xl font-bold mb-4">{editingExam ? 'Edit Exam' : 'Add New Exam'}</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label className="block font-medium">Exam Title *</label>
                <input
                  type="text"
                  name="examTitle"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={examData.examTitle}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium">Quiz Title *</label>
                <input
                  type="text"
                  name="quizTitle"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={examData.quizTitle}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium">Exam From *</label>
                <input
                  type="datetime-local"
                  name="examFrom"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={examData.examFrom}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium">Exam To *</label>
                <input
                  type="datetime-local"
                  name="examTo"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={examData.examTo}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium">Time Duration *</label>
                <input
                  type="text"
                  name="duration"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={examData.duration}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium">Attempt *</label>
                <input
                  type="number"
                  name="attempt"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={examData.attempt}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium">Description *</label>
                <ReactQuill
                  theme="snow"
                  value={editorContent}
                  onChange={setEditorContent}
                  placeholder="Start typing here..."
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={handleModalClose}
                  className="bg-gray-400 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  {editingExam ? 'Update Exam' : 'Save Exam'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => setActiveTab("upcoming")}
          className={`py-2 px-4 rounded ${activeTab === "upcoming" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          Upcoming Exams
        </button>
        <button
          onClick={() => setActiveTab("closed")}
          className={`py-2 px-4 rounded ${activeTab === "closed" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          Closed Exams
        </button>
      </div>

      {/* Main Content */}
      <div className="border rounded shadow-md p-4">
        {/* Header with Export Icons */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {activeTab === "upcoming" ? "Upcoming Exams" : "Closed Exams"}
          </h2>
          <div className="flex space-x-2 items-center">
            <button
              onClick={exportToPDF}
              className="text-red-600 hover:text-red-800"
              title="Download PDF"
            >
              <FaFilePdf size={24} />
            </button>
            <button
              onClick={exportToExcel}
              className="text-green-600 hover:text-green-800"
              title="Download Excel"
            >
              <FaFileExcel size={24} />
            </button>
            <button
              onClick={handlePrint}
              className="text-gray-600 hover:text-gray-800"
              title="Print"
            >
              <FaPrint size={24} />
            </button>
            <button
              onClick={handleCopy}
              className="text-blue-600 hover:text-blue-800"
              title="Copy"
            >
              <FaCopy size={24} />
            </button>
            <button
              onClick={handleColumns}
              className="text-yellow-600 hover:text-yellow-800"
              title="Columns"
            >
              <FaColumns size={24} />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-4">
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Search exams..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Select All Checkbox */}
        {activeTab === "closed" && (
          <div className="mb-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={selectedExams.length === closedExams.length}
                onChange={handleSelectAllChange}
                className="p-2"
              />
              <span className="ml-2">Select All</span>
            </label>
          </div>
        )}

        {/* Exams Table */}
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-100">
              {activeTab === "closed" && (
                <th className="p-2">
                  <input
                    type="checkbox"
                    checked={selectedExams.length === closedExams.length}
                    onChange={handleSelectAllChange}
                    className="p-2"
                  />
                </th>
              )}
              <th>Exam Title</th>
              <th>Quiz Title</th>
              <th>Attempt</th>
              <th>Exam From</th>
              <th>Exam To</th>
              <th>Duration</th>
              <th>Published</th>
              <th>Result</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredExams(activeTab === "upcoming" ? upcomingExams : closedExams).map((exam) => (
              <tr key={exam.id}>
                {activeTab === "closed" && (
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedExams.includes(exam.id)}
                      onChange={() => handleCheckboxChange(exam.id)}
                      className="p-2"
                    />
                  </td>
                )}
                <td>{exam.examTitle}</td>
                <td>{exam.quizTitle}</td>
                <td>{exam.attempt}</td>
                <td>{exam.examFrom}</td>
                <td>{exam.examTo}</td>
                <td>{exam.duration}</td>
                <td>{exam.examPublished}</td>
                <td>{exam.resultPublished}</td>
                <td>{exam.description}</td>
                <td>
                  <button onClick={() => handleEdit(exam)} className="text-blue-500 hover:text-blue-700">
                    <FaEdit />
                  </button>
                  <button onClick={() => handleDelete(exam.id)} className="text-red-500 hover:text-red-700 ml-2">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Bulk Delete Button */}
        {selectedExams.length > 0 && activeTab === "closed" && (
          <div className="flex justify-end mt-4">
            <button
              onClick={handleBulkDelete}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Delete Selected
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OnlineExamList;
