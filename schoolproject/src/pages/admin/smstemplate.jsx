import React, { useState } from "react";
import {
  FaFilePdf,
  FaFileWord,
  FaFileExcel,
  FaPrint,
  FaCopy,
  FaColumns,
  FaPlus,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import ReactQuill's CSS

const SmsTemplateList = () => {
  const [templates, setTemplates] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newTemplate, setNewTemplate] = useState({
    id: null,
    title: "",
    message: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Handle input change for the add/edit form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTemplate((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle change for the message editor
  const handleEditorChange = (value) => {
    setNewTemplate((prevState) => ({
      ...prevState,
      message: value,
    }));
  };

  // Add or edit template
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
    setNewTemplate({ id: null, title: "", message: "" });
    setShowForm(false);
  };

  // Delete a template
  const handleDeleteTemplate = (id) => {
    setTemplates((prevTemplates) =>
      prevTemplates.filter((template) => template.id !== id)
    );
  };

  // Edit a template
  const handleEditTemplate = (template) => {
    setNewTemplate(template);
    setShowForm(true);
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTemplates = templates.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(templates.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-800 dark:text-white min-h-screen">
      <h1 className="text-2xl font-bold mb-4">SMS Template List</h1>

      {/* Custom Header */}
      <div className="flex justify-between items-center mb-4 dark:bg-gray-800 dark:text-white">
        <div>
          <input
            type="text"
            placeholder="Search..."
            className="p-2 border border-gray-300 rounded dark:bg-gray-600 dark:text-white"
          />
        </div>
        <div className="flex gap-4 items-center">
          <FaFilePdf className="text-red-500 cursor-pointer" title="Export to PDF" />
          <FaFileWord className="text-blue-500 cursor-pointer" title="Export to Word" />
          <FaFileExcel className="text-green-500 cursor-pointer" title="Export to Excel" />
          <FaPrint className="text-gray-700 cursor-pointer" title="Print" />
          <FaCopy className="text-gray-500 cursor-pointer" title="Copy" />
          <FaColumns className="text-gray-400 cursor-pointer" title="Column Options" />
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-500 text-white p-2 rounded flex items-center gap-2 dark:bg-gray-800 dark:text-white"
          >
            <FaPlus /> Add
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 dark:border-gray-600">
          <thead className="bg-gray-200 dark:bg-gray-700">
            <tr>
              <th className="border border-gray-300 dark:border-gray-600 p-2">Title</th>
              <th className="border border-gray-300 dark:border-gray-600 p-2">Message</th>
              <th className="border border-gray-300 dark:border-gray-600 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentTemplates.length > 0 ? (
              currentTemplates.map((template) => (
                <tr key={template.id} className="odd:bg-gray-100 even:bg-white dark:odd:bg-gray-700 dark:even:bg-gray-800">
                  <td className="border border-gray-300 dark:border-gray-600 p-2">{template.title}</td>
                  <td className="border border-gray-300 dark:border-gray-600 p-2">{template.message}</td>
                  <td className="border border-gray-300 dark:border-gray-600 p-2">
                    <div className="flex gap-2">
                      <FaEdit
                        className="text-blue-500 cursor-pointer"
                        onClick={() => handleEditTemplate(template)}
                        title="Edit"
                      />
                      <FaTrash
                        className="text-red-500 cursor-pointer"
                        onClick={() => handleDeleteTemplate(template.id)}
                        title="Delete"
                      />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center p-4">
                  No templates found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => paginate(currentPage - 1)}
          className="px-3 py-1 bg-gray-200 rounded dark:bg-gray-700 dark:text-white"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => paginate(currentPage + 1)}
          className="px-3 py-1 bg-gray-200 rounded dark:bg-gray-700 dark:text-white"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center z-10 dark:bg-gray-600 dark:text-white">
          <div className="bg-white p-6 rounded-lg shadow-lg w-500 dark:bg-gray-800 dark:text-white">
            <h2 className="text-2xl font-bold mb-4">
              {newTemplate.id ? "Edit SMS Template" : "Add SMS Template"}
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
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block mb-2">Message *</label>
              <ReactQuill
                theme="snow"
                value={newTemplate.message}
                onChange={handleEditorChange}
                placeholder="Start typing here..."
                className="p-2 border border-gray-300 rounded w-full mb-4 dark:bg-gray-600 dark:text-white"
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

export default SmsTemplateList;
