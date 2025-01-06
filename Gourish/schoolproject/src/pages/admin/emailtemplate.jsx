import React, { useState } from "react";
import { FaFilePdf, FaFileWord, FaFileExcel, FaPrint, FaCopy, FaColumns, FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const EmailTemplateList = () => {
  const [templates, setTemplates] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newTemplate, setNewTemplate] = useState({
    id: null,
    title: "",
    message: "",
    attachment: null,
  });

  const rowsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTemplate((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setNewTemplate((prevState) => ({
      ...prevState,
      attachment: e.target.files[0],
    }));
  };

  const handleEditorChange = (value) => {
    setNewTemplate((prevState) => ({
      ...prevState,
      message: value,
    }));
  };

  const handleAddTemplate = () => {
    if (newTemplate.id) {
      setTemplates((prevTemplates) =>
        prevTemplates.map((template) =>
          template.id === newTemplate.id ? newTemplate : template
        )
      );
    } else {
      setTemplates((prevTemplates) => [
        ...prevTemplates,
        { ...newTemplate, id: prevTemplates.length + 1 },
      ]);
    }
    setNewTemplate({ id: null, title: "", message: "", attachment: null });
    setShowForm(false);
  };

  const handleDeleteTemplate = (id) => {
    setTemplates((prevTemplates) =>
      prevTemplates.filter((template) => template.id !== id)
    );
  };

  const handleEditTemplate = (template) => {
    setNewTemplate(template);
    setShowForm(true);
  };

  const totalPages = Math.ceil(templates.length / rowsPerPage);
  const currentRows = templates.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handlePageChange = (page) => setCurrentPage(page);

  // Toolbar configuration for ReactQuill
  const modules = {
    toolbar: [
      [{ 'font': [] }, { 'size': ['small', false, 'large', 'huge'] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['link', 'image'],
      [{ 'align': [] }],
      ['clean']
    ]
  };

  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-800 dark:text-white min-h-screen">
      <h1 className="text-2xl font-bold mb-4 dark:bg-gray-800 dark:text-white">Email Template List</h1>

      <div className="flex justify-between items-center mb-4 dark:bg-gray-800 dark:text-white">
        <input
          type="text"
          placeholder="Search..."
          className="p-2 border border-gray-300 rounded dark:bg-gray-600 dark:text-white"
        />
        <div className="flex gap-4 items-center">
          <FaFilePdf className="text-red-500 cursor-pointer" title="Export to PDF" />
          <FaFileWord className="text-blue-500 cursor-pointer" title="Export to Word" />
          <FaFileExcel className="text-green-500 cursor-pointer" title="Export to Excel" />
          <FaPrint className="text-gray-700 cursor-pointer" title="Print" />
          <FaCopy className="text-gray-500 cursor-pointer" title="Copy" />
          <FaColumns className="text-gray-400 cursor-pointer" title="Column Options" />
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-500 text-white p-2 rounded flex items-center gap-2"
          >
            <FaPlus /> Add
          </button>
        </div>
      </div>

      {/* Table */}
      <table className="table-auto w-full border-collapse border border-gray-300 dark:border-gray-600">
        <thead>
          <tr className="bg-gray-200 dark:bg-gray-700">
            <th className="border border-gray-300 p-2 dark:border-gray-600">Title</th>
            <th className="border border-gray-300 p-2 dark:border-gray-600">Message</th>
            <th className="border border-gray-300 p-2 dark:border-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentRows.map((row) => (
            <tr key={row.id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
              <td className="border border-gray-300 p-2 dark:border-gray-600">{row.title}</td>
              <td className="border border-gray-300 p-2 dark:border-gray-600">{row.message}</td>
              <td className="border border-gray-300 p-2 dark:border-gray-600">
                <div className="flex gap-2">
                  <FaEdit
                    className="text-blue-500 cursor-pointer"
                    onClick={() => handleEditTemplate(row)}
                    title="Edit"
                  />
                  <FaTrash
                    className="text-red-500 cursor-pointer"
                    onClick={() => handleDeleteTemplate(row.id)}
                    title="Delete"
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className="px-3 py-1 bg-gray-200 rounded dark:bg-gray-700 dark:text-white"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className="px-3 py-1 bg-gray-200 rounded dark:bg-gray-700 dark:text-white"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      {showForm && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
          <div className="bg-white p-6 rounded-lg shadow-lg w-500 dark:bg-gray-800 dark:text-white">
            <h2 className="text-2xl font-bold mb-4">
              {newTemplate.id ? "Edit Email Template" : "Add Email Template"}
            </h2>
            <div>
              <label htmlFor="title" className="block mb-2">Title *</label>
              <input
                type="text"
                id="title"
                name="title"
                value={newTemplate.title}
                onChange={handleInputChange}
                className="p-2 border border-gray-300 rounded w-full mb-4 dark:bg-gray-600 dark:text-white"
              />
            </div>
            <div>
              <label htmlFor="attachment" className="block mb-2">Attachment</label>
              <input
                type="file"
                id="attachment"
                onChange={handleFileChange}
                className="p-2 border border-gray-300 rounded w-full mb-4 dark:bg-gray-600 dark:text-white"
              />
            </div>
            <div>
              <label htmlFor="message" className="block mb-2">Message *</label>
              {/* Custom React Quill Editor */}
              <ReactQuill
                theme="snow"
                value={newTemplate.message}
                onChange={handleEditorChange}
                modules={modules}
                placeholder="Start typing your message..."
                className="border p-2 rounded w-full mb-4 dark:bg-gray-600 dark:text-white"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowForm(false)}
                className="bg-gray-500 text-white p-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleAddTemplate}
                className="bg-blue-500 text-white p-2 rounded"
              >
                {newTemplate.id ? "Save Changes" : "Add Template"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmailTemplateList;
