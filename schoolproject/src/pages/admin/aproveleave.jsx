import React, { useState } from "react";
import { FaFilePdf, FaFileWord, FaPrint, FaFileExcel, FaCopy, FaColumns } from "react-icons/fa";

const ApproveLeaveRequest = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [showForm, setShowForm] = useState(false); // State to control modal visibility
  const [formData, setFormData] = useState({
    role: "",
    name: "",
    applyDate: "",
    leaveType: "",
    leaveFromDate: "",
    leaveToDate: "",
    reason: "",
    note: "",
    document: null, // To handle file input
    status: "Pending",
  });
  const [searchQuery, setSearchQuery] = useState("");

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle file input change (for document upload)
  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      document: e.target.files[0], // Store the file object
    });
  };

  const handleAddLeaveRequest = () => {
    const newRequest = {
      id: leaveRequests.length + 1,
      ...formData,
    };
    setLeaveRequests([...leaveRequests, newRequest]);
    setShowForm(false); // Hide form after submission
    setFormData({
      role: "",
      name: "",
      applyDate: "",
      leaveType: "",
      leaveFromDate: "",
      leaveToDate: "",
      reason: "",
      note: "",
      document: null,
      status: "Pending",
    });
  };

  const handleDelete = (id) => {
    setLeaveRequests(leaveRequests.filter((request) => request.id !== id));
  };

  const handleEdit = (id) => {
    const requestToEdit = leaveRequests.find((request) => request.id === id);
    setFormData({ ...requestToEdit });
    setShowForm(true); // Show form to edit
  };

  // Close modal
  const closeModal = () => {
    setShowForm(false);
    setFormData({
      role: "",
      name: "",
      applyDate: "",
      leaveType: "",
      leaveFromDate: "",
      leaveToDate: "",
      reason: "",
      note: "",
      document: null,
      status: "Pending",
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Top Section */}
      <div className="p-4 bg-white shadow-md flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold">Approve Leave Request</h2>
          {/* Search Section below Heading */}
          <div className="w-full max-w-xs mt-2">
            <input
              type="text"
              placeholder="Search by staff name or leave type"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border p-2 rounded w-full"
            />
          </div>
        </div>

        {/* Action Icons and Add Leave Request Button on the right */}
        <div className="flex flex-col items-end space-y-2">
          {/* Action Icons */}
          <div className="flex space-x-2">
            <FaFilePdf className="text-red-600 cursor-pointer" title="Export to PDF" />
            <FaFileWord className="text-blue-600 cursor-pointer" title="Export to Word" />
            <FaPrint className="text-gray-600 cursor-pointer" title="Print" />
            <FaFileExcel className="text-green-600 cursor-pointer" title="Export to Excel" />
            <FaCopy className="text-gray-600 cursor-pointer" title="Copy" />
            <FaColumns className="text-gray-600 cursor-pointer" title="Column Visibility" />
          </div>

          {/* Add Leave Request Button */}
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={() => setShowForm(true)}
          >
            + Add Leave Request
          </button>
        </div>
      </div>

      {/* Modal for Add Leave Request */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg w-3/4 md:w-1/2 lg:w-1/3 max-w-5xl overflow-y-auto max-h-[80vh]">
            <h3 className="text-xl font-bold mb-4">{formData.id ? "Edit" : "Add"} Leave Request</h3>
            <form>
              {/* Form Fields */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Role</label>
                <select
                  name="role"
                  className="border p-2 rounded w-full"
                  value={formData.role}
                  onChange={handleInputChange}
                >
                  <option value="">Select</option>
                  <option value="Admin">Admin</option>
                  <option value="Staff">Staff</option>
                  <option value="Manager">Manager</option>
                  <option value="HR">HR</option>
                  {/* Add more roles as needed */}
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  className="border p-2 rounded w-full"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Apply Date</label>
                <input
                  type="date"
                  name="applyDate"
                  className="border p-2 rounded w-full"
                  value={formData.applyDate}
                  onChange={handleInputChange}
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Leave Type</label>
                <select
                  name="leaveType"
                  className="border p-2 rounded w-full"
                  value={formData.leaveType}
                  onChange={handleInputChange}
                >
                  <option value="">Select</option>
                  <option value="Sick Leave">Sick Leave</option>
                  <option value="Vacation">Vacation</option>
                  <option value="Maternity Leave">Maternity Leave</option>
                  <option value="Personal Leave">Personal Leave</option>
                  {/* Add more leave types as needed */}
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Leave From Date</label>
                <input
                  type="date"
                  name="leaveFromDate"
                  className="border p-2 rounded w-full"
                  value={formData.leaveFromDate}
                  onChange={handleInputChange}
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Leave To Date</label>
                <input
                  type="date"
                  name="leaveToDate"
                  className="border p-2 rounded w-full"
                  value={formData.leaveToDate}
                  onChange={handleInputChange}
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Reason</label>
                <textarea
                  name="reason"
                  className="border p-2 rounded w-full"
                  value={formData.reason}
                  onChange={handleInputChange}
                  rows="4"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Note</label>
                <textarea
                  name="note"
                  className="border p-2 rounded w-full"
                  value={formData.note}
                  onChange={handleInputChange}
                  rows="4"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Attach Document</label>
                <input
                  type="file"
                  name="document"
                  className="border p-2 rounded w-full"
                  onChange={handleFileChange}
                />
                {formData.document && <p className="mt-2">{formData.document.name}</p>}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Status</label>
                <select
                  name="status"
                  className="border p-2 rounded w-full"
                  value={formData.status}
                  onChange={handleInputChange}
                >
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Disapproved">Disapproved</option>
                </select>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={handleAddLeaveRequest}
                >
                  {formData.id ? "Save Changes" : "Add Request"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Table displaying leave requests */}
      <div className="p-4 overflow-x-auto">
        <table className="min-w-full bg-white shadow-md">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3">Staff</th>
              <th className="p-3">Leave Type</th>
              <th className="p-3">Leave Date</th>
              <th className="p-3">Days</th>
              <th className="p-3">Apply Date</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {leaveRequests
              .filter(
                (request) =>
                  request.staff.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  request.leaveType.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((request) => (
                <tr key={request.id}>
                  <td className="p-3">{request.staff}</td>
                  <td className="p-3">{request.leaveType}</td>
                  <td className="p-3">{request.leaveDate}</td>
                  <td className="p-3">{request.days}</td>
                  <td className="p-3">{request.applyDate}</td>
                  <td className="p-3">{request.status}</td>
                  <td className="p-3 flex space-x-2">
                    <button
                      className="bg-yellow-500 text-white px-4 py-2 rounded"
                      onClick={() => handleEdit(request.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded"
                      onClick={() => handleDelete(request.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApproveLeaveRequest;
