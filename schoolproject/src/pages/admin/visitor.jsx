import React, { useState } from "react";
import {
  FaFilePdf,
  FaFileExcel,
  FaPrint,
  FaPlus,
  FaFileWord,
  FaCopy,
  FaColumns,
} from "react-icons/fa";

const VisitorList = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [visitorData, setVisitorData] = useState([]);
  const [formData, setFormData] = useState({
    purpose: "",
    meetingWith: "",
    visitorName: "",
    phone: "",
    idCard: "",
    numberOfPerson: 1,
    date: "",
    inTime: "",
    outTime: "",
    document: null,
  });

  const handleAddFormSubmit = (e) => {
    e.preventDefault();
    setVisitorData([...visitorData, formData]);
    setFormData({
      purpose: "",
      meetingWith: "",
      visitorName: "",
      phone: "",
      idCard: "",
      numberOfPerson: 1,
      date: "",
      inTime: "",
      outTime: "",
      document: null,
    });
    setShowAddForm(false);
  };

  // Dummy functions for icons
  const handleExportPdf = () => alert("Exporting PDF...");
  const handleExportExcel = () => alert("Exporting Excel...");
  const handleExportWord = () => alert("Exporting Word...");
  const handlePrint = () => window.print();
  const handleCopy = () => alert("Copying data...");
  const handleColumnToggle = () => alert("Toggle columns visibility...");

  return (
    <div className="p-5 bg-white min-h-screen dark:bg-gray-800 dark:text-white">
      {/* Header with Icons */}
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-semibold">Visitor List</h1>

        {/* Export and Action Icons */}
        <div className="flex space-x-4">
          <button
            onClick={handleExportPdf}
            className="text-gray-600 dark:text-red-600 hover:text-red-800"
          >
            <FaFilePdf size={24} />
          </button>
          <button
            onClick={handleExportExcel}
            className="text-gray-600 dark:text-green-600 hover:text-green-800"
          >
            <FaFileExcel size={24} />
          </button>
          <button
            onClick={handleExportWord}
            className="text-gray-600 dark:text-blue-600 hover:text-blue-800"
          >
            <FaFileWord size={24} />
          </button>
          <button
            onClick={handlePrint}
            className="text-gray-600 dark:text-gray-600 hover:text-gray-800"
          >
            <FaPrint size={24} />
          </button>
          <button
            onClick={handleCopy}
            className="text-gray-600 dark:text-gray-600 hover:text-gray-800"
          >
            <FaCopy size={24} />
          </button>
          <button
            onClick={handleColumnToggle}
            className="text-gray-600 dark:text-gray-600 hover:text-gray-800"
          >
            <FaColumns size={24} />
          </button>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-black text-white px-4 py-2 rounded flex items-center space-x-2"
          >
            <FaPlus /> <span>ADD</span>
          </button>
        </div>
      </div>

      {/* Search Field */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search..."
          className="p-2  border bg-gray-100 rounded dark:bg-gray-700 dark:text-white"
        />
      </div>

      {/* Visitor Table */}
      <div className="bg-white shadow-md rounded p-4 dark:bg-gray-700">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="border p-2">Purpose</th>
              <th className="border p-2">Meeting With</th>
              <th className="border p-2">Visitor Name</th>
              <th className="border p-2">Phone</th>
              <th className="border p-2">ID Card</th>
              <th className="border p-2">Number Of Person</th>
              <th className="border p-2">Date</th>
              <th className="border p-2">In Time</th>
              <th className="border p-2">Out Time</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {visitorData.length > 0 ? (
              visitorData.map((visitor, index) => (
                <tr key={index} className="hover:bg-white dark:hover:bg-gray-600">
                  <td className="border p-2">{visitor.purpose}</td>
                  <td className="border p-2">{visitor.meetingWith}</td>
                  <td className="border p-2">{visitor.visitorName}</td>
                  <td className="border p-2">{visitor.phone}</td>
                  <td className="border p-2">{visitor.idCard}</td>
                  <td className="border p-2">{visitor.numberOfPerson}</td>
                  <td className="border p-2">{visitor.date}</td>
                  <td className="border p-2">{visitor.inTime}</td>
                  <td className="border p-2">{visitor.outTime}</td>
                  <td className="border p-2 text-center">
                    <button className="text-blue-500 hover:underline mr-2">Edit</button>
                    <button className="text-red-500 hover:underline">Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="text-center p-4">
                  No data available in table
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Visitor Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[80vh] p-5 overflow-y-auto dark:bg-gray-700 dark:text-white">
            <h2 className="text-xl font-semibold mb-4">Add Visitor</h2>
            <form onSubmit={handleAddFormSubmit} className="space-y-4">
              {/* Purpose */}
              <div>
                <label>Purpose *</label>
                <select
                  className="border p-2 w-full bg-gray-100 dark:bg-gray-600 dark:text-white"
                  required
                  value={formData.purpose}
                  onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                >
                  <option value="">Select</option>
                  <option value="Meeting">Meeting</option>
                  <option value="Delivery">Delivery</option>
                </select>
              </div>

              {/* Meeting With */}
              <div>
                <label>Meeting With *</label>
                <select
                  className="border p-2 w-full bg-gray-100 dark:bg-gray-600 dark:text-white"
                  required
                  value={formData.meetingWith}
                  onChange={(e) => setFormData({ ...formData, meetingWith: e.target.value })}
                >
                  <option value="">Select</option>
                  <option value="Principal">Principal</option>
                  <option value="Manager">Manager</option>
                </select>
              </div>

              {/* Visitor Name */}
              <div>
                <label>Visitor Name *</label>
                <input
                  type="text"
                  className="border p-2 w-full bg-gray-100 dark:bg-gray-600 dark:text-white"
                  required
                  value={formData.visitorName}
                  onChange={(e) => setFormData({ ...formData, visitorName: e.target.value })}
                />
              </div>

              {/* Phone */}
              <div>
                <label>Phone</label>
                <input
                  type="text"
                  className="border p-2 w-full bg-gray-100 dark:bg-gray-600 dark:text-white"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              {/* ID Card */}
              <div>
                <label>ID Card</label>
                <input
                  type="text"
                  className="border p-2 w-full bg-gray-100 dark:bg-gray-600 dark:text-white"
                  value={formData.idCard}
                  onChange={(e) => setFormData({ ...formData, idCard: e.target.value })}
                />
              </div>

              {/* Number of Persons */}
              <div>
                <label>Number of Persons</label>
                <input
                  type="number"
                  className="border p-2 w-full bg-gray-100 dark:bg-gray-600 dark:text-white"
                  value={formData.numberOfPerson}
                  onChange={(e) => setFormData({ ...formData, numberOfPerson: e.target.value })}
                />
              </div>

              {/* Date */}
              <div>
                <label>Date *</label>
                <input
                  type="date"
                  className="border p-2 w-full bg-gray-100 dark:bg-gray-600 dark:text-white"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
              </div>

              {/* In Time */}
              <div>
                <label>In Time</label>
                <input
                  type="time"
                  className="border p-2 w-full bg-gray-100 dark:bg-gray-600 dark:text-white"
                  value={formData.inTime}
                  onChange={(e) => setFormData({ ...formData, inTime: e.target.value })}
                />
              </div>

              {/* Out Time */}
              <div>
                <label>Out Time</label>
                <input
                  type="time"
                  className="border p-2 w-full bg-gray-100 dark:bg-gray-600 dark:text-white"
                  value={formData.outTime}
                  onChange={(e) => setFormData({ ...formData, outTime: e.target.value })}
                />
              </div>

              {/* Attach Document */}
              <div>
                <label>Attach Document</label>
                <input
                  type="file"
                  className="border p-2 w-full bg-gray-100 dark:bg-gray-600 dark:text-white"
                  onChange={(e) => setFormData({ ...formData, document: e.target.files[0] })}
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="bg-gray-400 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded"
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

export default VisitorList;
