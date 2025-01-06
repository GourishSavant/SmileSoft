import React, { useState } from "react";
import { FaFilePdf, FaFileWord, FaFileExcel, FaPrint, FaCopy } from "react-icons/fa";
import jsPDF from "jspdf";
import * as XLSX from "xlsx";
import html2canvas from "html2canvas";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const QuestionBank = () => {
  const [isFormOpen, setIsFormOpen] = useState(false); // State to toggle form visibility
  const [editorContent, setEditorContent] = useState(''); // State for editor content

  const modules = {
    toolbar: [
      [{ 'source': 'code' }, { 'save': 'save' }], // Custom icons or handlers
      [{ 'font': [] }, { 'size': ['small', false, 'large', 'huge'] }],
      ['bold', 'italic', 'underline', 'strike'],        // Text styling
      [{ 'color': [] }, { 'background': [] }],          // Color and background
      [{ 'script': 'sub' }, { 'script': 'super' }],     // Sub/superscript
      ['link', 'image', 'video'],                      // Media
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],    // Lists
      [{ 'align': [] }],                               // Alignment
      ['clean']                                        // Clear formatting
    ]
  };

  const handlePDFDownload = () => {
    const doc = new jsPDF();
    doc.text("Question Bank Table", 10, 10);
    doc.html(document.querySelector("#table-container"), {
      callback: function (doc) {
        doc.save("Question_Bank.pdf");
      },
      x: 10,
      y: 20,
    });
  };

  const handleExcelDownload = () => {
    const table = document.getElementById("table");
    const workbook = XLSX.utils.table_to_book(table, { sheet: "Sheet1" });
    XLSX.writeFile(workbook, "Question_Bank.xlsx");
  };

  const handleWordDownload = () => {
    const table = document.getElementById("table-container").outerHTML;
    const blob = new Blob([table], { type: "application/msword" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "Question_Bank.doc";
    link.click();
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopy = () => {
    const table = document.getElementById("table-container").outerHTML;
    navigator.clipboard.writeText(table).then(() => {
      alert("Table copied to clipboard!");
    });
  };

  const toggleForm = () => {
    setIsFormOpen(!isFormOpen); // Toggle form visibility
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 dark:text-white">
      {/* Top Section */}
      <div className="flex flex-wrap justify-between items-center p-4 bg-white dark:bg-gray-900 shadow-md">
        <h1 className="text-xl font-semibold">Select Criteria</h1>
        <div className="flex space-x-2">
          <button
            onClick={toggleForm}
            className="bg-black text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            + Add Question
          </button>
          <button className="bg-black text-white px-4 py-2 rounded hover:bg-green-600">
            + Import
          </button>
          <button className="bg-black text-white px-4 py-2 rounded hover:bg-red-600">
            Bulk Delete
          </button>
        </div>
      </div>

      {/* Filter Section */}
      <div className="grid grid-cols-7 gap-4 p-4">
        <div>
          <label className="block text-sm font-medium mb-1">Class</label>
          <select className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600">
            <option>Select</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Section</label>
          <select className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600">
            <option>Select</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Subject</label>
          <select className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600">
            <option>Select</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Question Type</label>
          <select className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600">
            <option>Select</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Question Level</label>
          <select className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600">
            <option>Select</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Created By</label>
          <select className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600">
            <option>Select</option>
          </select>
        </div>
        <div className="flex items-end">
          <button className="bg-black text-white px-4 py-2 rounded hover:bg-blue-600 w-full">
            Search
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="p-4">
        <div
          id="table-container"
          className="overflow-x-auto bg-white dark:bg-gray-900 shadow-md rounded-lg"
        >
          <div className="flex justify-between items-center p-4">
            <input
              type="text"
              placeholder="Search..."
              className="border rounded p-2 w-1/3 dark:bg-gray-700 dark:border-gray-600"
            />
            <div className="space-x-2 flex">
              <button
                onClick={handlePDFDownload}
                className="text-red-500 text-2xl hover:scale-110 transition-transform"
              >
                <FaFilePdf />
              </button>
              <button
                onClick={handleWordDownload}
                className="text-blue-500 text-2xl hover:scale-110 transition-transform"
              >
                <FaFileWord />
              </button>
              <button
                onClick={handleExcelDownload}
                className="text-green-500 text-2xl hover:scale-110 transition-transform"
              >
                <FaFileExcel />
              </button>
              <button
                onClick={handlePrint}
                className="text-gray-500 text-2xl hover:scale-110 transition-transform"
              >
                <FaPrint />
              </button>
              <button
                onClick={handleCopy}
                className="text-gray-700 text-2xl hover:scale-110 transition-transform"
              >
                <FaCopy />
              </button>
            </div>
          </div>

          <table
            id="table"
            className="w-full border-collapse border border-gray-300 dark:border-gray-600"
          >
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700">
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2">Q. ID</th>
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2">Subject</th>
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                  Question Type
                </th>
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2">Level</th>
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2">Question</th>
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                  Created By
                </th>
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td
                  className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center"
                  colSpan="7"
                >
                  No data available in table
                </td>
              </tr>
            </tbody>
          </table>

          <div className="p-4 text-center">
            <p>Add new record or search with different criteria.</p>
          </div>
        </div>
      </div>

      {/* Add Question Form (Modal) */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-96 max-h-screen overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">Add New Question</h2>
            <form>
              {/* Subject */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Subject *</label>
                <select className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600">
                  <option>Select</option>
                  {/* Add your options here */}
                </select>
              </div>

              {/* Question Type */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Question Type *</label>
                <select className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600">
                  <option>Select</option>
                  {/* Add your options here */}
                </select>
              </div>

              {/* Question Level */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Question Level *</label>
                <select className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600">
                  <option>Select</option>
                  {/* Add your options here */}
                </select>
              </div>

              {/* Class */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Class *</label>
                <select className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600">
                  <option>Select</option>
                  {/* Add your options here */}
                </select>
              </div>

              {/* Section */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Section</label>
                <select className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600">
                  <option>Select</option>
                  {/* Add your options here */}
                </select>
              </div>

              {/* Question */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Question *</label>
                <ReactQuill
                  theme="snow"
                  value={editorContent}
                  onChange={setEditorContent}
                  modules={modules}
                  placeholder="Start typing your question..."
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={toggleForm}
                  className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionBank;
