


import React, { useState } from 'react';
import { FaFilePdf, FaFileWord, FaFileExcel, FaCopy, FaPrint, FaColumns } from 'react-icons/fa';

const LeaveApprovalPage = () => {
  const [classFilter, setClassFilter] = useState('');
  const [sectionFilter, setSectionFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [leaveList, setLeaveList] = useState([
    {
      id: 1,
      studentName: 'John Doe',
      className: '10',
      section: 'A',
      applyDate: '2024-12-15',
      fromDate: '2024-12-18',
      toDate: '2024-12-20',
      status: 'Pending',
      approvedBy: '',
    },
  ]);
  
  // State to toggle form visibility
  const [isFormOpen, setIsFormOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  // Form field states
  const [formData, setFormData] = useState({
    className: '',
    section: '',
    studentName: '',
    applyDate: '',
    fromDate: '',
    toDate: '',
    reason: '',
    leaveStatus: 'Pending',
    file: null,
  });

  // Handle change in form fields
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle file upload
  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      file: e.target.files[0],
    }));
  };

  // Open and close the form
  const toggleForm = () => {
    setIsFormOpen(!isFormOpen);
  };

  // Handle form submit (for now just logging form data)
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Optionally, you can save this data into the leaveList and close the form
    setLeaveList([...leaveList, { id: leaveList.length + 1, ...formData }]);
    setIsFormOpen(false); // Close form after submitting
  };

  const filteredLeaveList = leaveList.filter(
    (leave) =>
      (classFilter ? leave.className === classFilter : true) &&
      (sectionFilter ? leave.section === sectionFilter : true) &&
      (searchTerm
        ? leave.studentName.toLowerCase().includes(searchTerm.toLowerCase())
        : true)
  );
  
  const handleApprove = (id) => {
    setLeaveList(
      leaveList.map((leave) =>
        leave.id === id
          ? { ...leave, status: 'Approved', approvedBy: 'Admin' }
          : leave
      )
    );
  };

  const handleDisapprove = (id) => {
    setLeaveList(
      leaveList.map((leave) =>
        leave.id === id
          ? { ...leave, status: 'Disapproved', approvedBy: 'Admin' }
          : leave
      )
    );
  };

  const totalRecords = filteredLeaveList.length;
  const totalPages = Math.ceil(totalRecords / recordsPerPage);
  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = Math.min(startIndex + recordsPerPage, totalRecords);
  const currentRecords = filteredLeaveList.slice(startIndex, endIndex);
  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };


  return (
    <div className="container mx-auto p-6 bg-gray-50 border border-gray-200 rounded-lg shadow-lg">
      {/* Select Criteria Section */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Select Criteria</h3>
        <div className="flex items-center space-x-6">
          <div className="w-1/3">
            <label htmlFor="class" className="block text-sm font-medium text-gray-700">
              Class *
            </label>
            <select
              id="class"
              value={classFilter}
              onChange={(e) => setClassFilter(e.target.value)}
              className="mt-1 block w-full py-3 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
            >
              <option value="">Select</option>
              <option value="10">10</option>
              <option value="9">9</option>
            </select>
          </div>

          <div className="w-1/3">
            <label htmlFor="section" className="block text-sm font-medium text-gray-700">
              Section *
            </label>
            <select
              id="section"
              value={sectionFilter}
              onChange={(e) => setSectionFilter(e.target.value)}
              className="mt-1 block w-full py-3 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
            >
              <option value="">Select</option>
              <option value="A">A</option>
              <option value="B">B</option>
            </select>
          </div>
        </div>

        {/* Search Button Below Section Filter */}
        <div className="mt-4 text-right">
          <button
            onClick={() => console.log('Search triggered')}
            className="py-2 px-4 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 sm:text-base"
          >
            Search
          </button>
        </div>
      </div>

      {/* Heading with Add Button */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-700">Approve Leave List</h2>
        <button
          onClick={toggleForm}
          className="py-2 px-4 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          + Add
        </button>
      </div>

      {/* Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl overflow-y-auto max-h-[80vh]">
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">Add Leave</h3>
            <form onSubmit={handleSubmit}>
              {/* Class */}
              <div className="mb-4">
                <label htmlFor="className" className="block text-sm font-medium text-gray-700">
                  Class *
                </label>
                <select
                  id="className"
                  name="className"
                  value={formData.className}
                  onChange={handleFormChange}
                  className="mt-1 block w-full py-3 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
                >
                  <option value="">Select</option>
                  <option value="10">10</option>
                  <option value="9">9</option>
                </select>
              </div>

              {/* Section */}
              <div className="mb-4">
                <label htmlFor="section" className="block text-sm font-medium text-gray-700">
                  Section *
                </label>
                <select
                  id="section"
                  name="section"
                  value={formData.section}
                  onChange={handleFormChange}
                  className="mt-1 block w-full py-3 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
                >
                  <option value="">Select</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                </select>
              </div>

              {/* Student Name */}
              <div className="mb-4">
                <label htmlFor="studentName" className="block text-sm font-medium text-gray-700">
                  Student *
                </label>
                <input
                  type="text"
                  id="studentName"
                  name="studentName"
                  value={formData.studentName}
                  onChange={handleFormChange}
                  required
                  className="mt-1 block w-full py-3 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
                />
              </div>

              {/* Apply Date */}
              <div className="mb-4">
                <label htmlFor="applyDate" className="block text-sm font-medium text-gray-700">
                  Apply Date *
                </label>
                <input
                  type="date"
                  id="applyDate"
                  name="applyDate"
                  value={formData.applyDate}
                  onChange={handleFormChange}
                  required
                  className="mt-1 block w-full py-3 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
                />
              </div>

              {/* From Date */}
              <div className="mb-4">
                <label htmlFor="fromDate" className="block text-sm font-medium text-gray-700">
                  From Date *
                </label>
                <input
                  type="date"
                  id="fromDate"
                  name="fromDate"
                  value={formData.fromDate}
                  onChange={handleFormChange}
                  required
                  className="mt-1 block w-full py-3 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
                />
              </div>

              {/* To Date */}
              <div className="mb-4">
                <label htmlFor="toDate" className="block text-sm font-medium text-gray-700">
                  To Date *
                </label>
                <input
                  type="date"
                  id="toDate"
                  name="toDate"
                  value={formData.toDate}
                  onChange={handleFormChange}
                  required
                  className="mt-1 block w-full py-3 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
                />
              </div>

              {/* Reason */}
              <div className="mb-4">
                <label htmlFor="reason" className="block text-sm font-medium text-gray-700">
                  Reason
                </label>
                <textarea
                  id="reason"
                  name="reason"
                  value={formData.reason}
                  onChange={handleFormChange}
                  className="mt-1 block w-full py-3 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
                ></textarea>
              </div>

              {/* Leave Status */}
              <div className="mb-4">
                <label htmlFor="leaveStatus" className="block text-sm font-medium text-gray-700">
                  Leave Status *
                </label>
                <select
                  id="leaveStatus"
                  name="leaveStatus"
                  value={formData.leaveStatus}
                  onChange={handleFormChange}
                  className="mt-1 block w-full py-3 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
                >
                  <option value="Pending">Pending</option>
                  <option value="Approve">Approve</option>
                  <option value="Disapprove">Disapprove</option>
                </select>
              </div>

              {/* Attach Document */}
              <div className="mb-4">
                <label htmlFor="file" className="block text-sm font-medium text-gray-700">
                  Attach Document
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={handleFileChange}
                  className="mt-1 block w-full py-2 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
                />
                {formData.file && <p className="text-gray-500 mt-2">File: {formData.file.name}</p>}
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={toggleForm}
                  className="py-2 px-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700 focus:outline-none"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Leave Approval List Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full table-auto text-sm text-left text-gray-500">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-3 text-sm font-medium text-gray-700">Student Name</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-700">Class</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-700">Section</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-700">Apply Date</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-700">From Date</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-700">To Date</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-700">Status</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-700">Approved/Disapproved By</th>
              <th className="px-4 py-3 text-sm font-medium text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeaveList.length === 0 ? (
              <tr>
                <td colSpan="9" className="px-4 py-3 text-center text-gray-500">
                  No data available in table
                </td>
              </tr>
            ) : (
              filteredLeaveList.map((leave) => (
                <tr key={leave.id} className="border-t">
                  <td className="px-4 py-3">{leave.studentName}</td>
                  <td className="px-4 py-3">{leave.className}</td>
                  <td className="px-4 py-3">{leave.section}</td>
                  <td className="px-4 py-3">{leave.applyDate}</td>
                  <td className="px-4 py-3">{leave.fromDate}</td>
                  <td className="px-4 py-3">{leave.toDate}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-md text-xs ${
                        leave.status === 'Approved'
                          ? 'bg-green-100 text-green-800'
                          : leave.status === 'Pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {leave.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">{leave.approvedBy ? leave.approvedBy : 'N/A'}</td>
                  <td className="px-4 py-3 flex space-x-4">
                    {leave.status === 'Pending' && (
                      <>
                        <button
                          onClick={() => handleApprove(leave.id)}
                          className="py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleDisapprove(leave.id)}
                          className="py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700"
                        >
                          Disapprove
                        </button>
                      </>
                    )}
                    {leave.status === 'Approved' && (
                      <span className="text-green-600">Approved</span>
                    )}
                    {leave.status === 'Disapproved' && (
                      <span className="text-red-600">Disapproved</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    
      {/* Pagination Controls */}
      <div className="flex items-center justify-between mt-4">
        <p className="text-sm text-gray-600">
          Records {startIndex + 1} of {endIndex} to {totalRecords}
        </p>
        <div className="flex space-x-2">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className={`py-1 px-3 rounded-md ${
              currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-gray-600 text-white'
            }`}
          >
            {'<'}
          </button>
          <span className="text-gray-700">{currentPage}</span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`py-1 px-3 rounded-md ${
              currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-gray-600 text-white'
            }`}
          >
            {'>'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeaveApprovalPage;




