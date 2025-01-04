import React, { useState } from 'react';
import {
  FaSearch,
  FaPlus,
  FaEdit,
  FaTrash,
  FaFilePdf,
  FaFileExcel,
  FaFileWord,
  FaPrint,
  FaCopy,
  FaColumns,
} from 'react-icons/fa';

const ApplyLeavePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [leaves, setLeaves] = useState([
    { id: '1', staffId: '1', leaveType: 'Sick Leave', leaveDate: '2024-12-20', days: 2, applyDate: '2024-12-19', status: 'Approved' },
    { id: '2', staffId: '2', leaveType: 'Vacation', leaveDate: '2024-12-25', days: 5, applyDate: '2024-12-22', status: 'Pending' },
    // Add more mock data as needed
  ]);
  const [visibleColumns, setVisibleColumns] = useState({
    staffId: true,
    leaveType: true,
    leaveDate: true,
    days: true,
    applyDate: true,
    status: true,
    action: true,
  });
  const [showColumnDropdown, setShowColumnDropdown] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false); // Form open state
  const [formData, setFormData] = useState({
    id: '',
    applyDate: '12/26/2024',
    availableLeave: '',
    leaveFromDate: '',
    leaveToDate: '',
    reason: '',
    file: null,
  });

  const toggleColumn = (column) => {
    setVisibleColumns({ ...visibleColumns, [column]: !visibleColumns[column] });
  };

  const handleDownload = (type) => {
    alert(`Downloading in ${type} format`);
    // Implement actual file download logic here
    // For example, create a mock file download or link for the respective format.
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleEdit = (leaveId) => {
    const leave = leaves.find((leave) => leave.id === leaveId);
    if (leave) {
      setFormData({ ...leave });
      setIsFormOpen(true);
    }
  };

  const handleDelete = (leaveId) => {
    setLeaves(leaves.filter((leave) => leave.id !== leaveId));
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (formData.id) {
      // Edit existing leave entry
      setLeaves(leaves.map((leave) => (leave.id === formData.id ? formData : leave)));
    } else {
      // Add new leave entry
      setLeaves([...leaves, { ...formData, id: `${leaves.length + 1}` }]);
    }
    setIsFormOpen(false);
  };

  return (
    <div className="min-h-screen container mx-auto p-6 dark:bg-gray-800 dark:text-white">
      <h1 className="text-2xl font-bold text-center mb-6">Leave Application List</h1>

      {/* Apply Leave Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setIsFormOpen(true)} // Open the form modal
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 flex items-center space-x-2"
        >
          <FaPlus size={18} />
          <span>Add Leave</span>
        </button>
      </div>

      {/* Icons Section */}
      <div className="flex justify-end space-x-4 mb-6">
        <button
          onClick={() => handleDownload('PDF')}
          className="text-red-600 hover:text-red-800"
          title="Export to PDF"
        >
          <FaFilePdf size={20} />
        </button>
        <button
          onClick={() => handleDownload('Word')}
          className="text-blue-600 hover:text-blue-800"
          title="Export to DOCX"
        >
          <FaFileWord size={20} />
        </button>
        <button
          onClick={() => handleDownload('Excel')}
          className="text-green-600 hover:text-green-800"
          title="Export to Excel"
        >
          <FaFileExcel size={20} />
        </button>
        <button className="text-gray-600 hover:text-gray-800" title="Print">
          <FaPrint size={20} />
        </button>
        <button className="text-purple-600 hover:text-purple-800" title="Copy">
          <FaCopy size={20} />
        </button>
        <div className="relative">
          <button
            className="text-teal-600 hover:text-teal-800"
            title="Toggle Columns"
            onClick={() => setShowColumnDropdown(!showColumnDropdown)}
          >
            <FaColumns size={20} />
          </button>
          {showColumnDropdown && (
            <div className="absolute bg-white dark:bg-gray-700 shadow-lg rounded-md mt-2 p-2 w-full z-10 max-h-48 overflow-auto">
              <div>
                {Object.keys(visibleColumns).map((column) => (
                  <label key={column} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={visibleColumns[column]}
                      onChange={() => toggleColumn(column)}
                      className="text-blue-600"
                    />
                    <span className="text-sm">{column}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search..."
          className="p-2 w-full text-sm rounded-md border border-gray-300 dark:bg-gray-600"
        />
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-300 dark:border-gray-600">
          <thead className="bg-gray-300 dark:bg-gray-600">
            <tr>
              {visibleColumns.staffId && <th className="px-4 py-2 border">Staff</th>}
              {visibleColumns.leaveType && <th className="px-4 py-2 border">Leave Type</th>}
              {visibleColumns.leaveDate && <th className="px-4 py-2 border">Leave Date</th>}
              {visibleColumns.days && <th className="px-4 py-2 border">Days</th>}
              {visibleColumns.applyDate && <th className="px-4 py-2 border">Apply Date</th>}
              {visibleColumns.status && <th className="px-4 py-2 border">Status</th>}
              {visibleColumns.action && <th className="px-4 py-2 border">Action</th>}
            </tr>
          </thead>
          <tbody>
            {leaves.map((leave, index) => (
              <tr key={leave.id} className={`bg-${index % 2 === 0 ? 'white' : 'gray-100'} dark:bg-gray-700`}>
                {visibleColumns.staffId && <td className="px-4 py-2 border">{leave.staffId}</td>}
                {visibleColumns.leaveType && <td className="px-4 py-2 border">{leave.leaveType}</td>}
                {visibleColumns.leaveDate && <td className="px-4 py-2 border">{leave.leaveDate}</td>}
                {visibleColumns.days && <td className="px-4 py-2 border">{leave.days}</td>}
                {visibleColumns.applyDate && <td className="px-4 py-2 border">{leave.applyDate}</td>}
                {visibleColumns.status && <td className="px-4 py-2 border">{leave.status}</td>}
                {visibleColumns.action && (
                  <td className="px-4 py-2 border">
                    <button onClick={() => handleEdit(leave.id)} className="text-blue-500 hover:text-blue-700 mr-2">
                      <FaEdit size={18} />
                    </button>
                    <button onClick={() => handleDelete(leave.id)} className="text-red-500 hover:text-red-700">
                      <FaTrash size={18} />
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Apply Leave Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-md w-full sm:w-96 max-h-[80vh] overflow-y-auto">
            <form onSubmit={handleSubmitForm}>
              <h2 className="text-xl font-semibold mb-4">{formData.id ? 'Edit Leave' : 'Apply Leave'}</h2>
              <div className="mb-4">
                <label className="block text-sm mb-1">Apply Date</label>
                <input
                  type="date"
                  name="applyDate"
                  value={formData.applyDate}
                  onChange={handleFormChange}
                  className="p-2 w-full text-sm border border-gray-300 dark:bg-gray-600"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm mb-1">Leave From Date</label>
                <input
                  type="date"
                  name="leaveFromDate"
                  value={formData.leaveFromDate}
                  onChange={handleFormChange}
                  className="p-2 w-full text-sm border border-gray-300 dark:bg-gray-600"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm mb-1">Leave To Date</label>
                <input
                  type="date"
                  name="leaveToDate"
                  value={formData.leaveToDate}
                  onChange={handleFormChange}
                  className="p-2 w-full text-sm border border-gray-300 dark:bg-gray-600"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm mb-1">Reason</label>
                <textarea
                  name="reason"
                  value={formData.reason}
                  onChange={handleFormChange}
                  className="p-2 w-full text-sm border border-gray-300 dark:bg-gray-600"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm mb-1">Attach File (Optional)</label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="p-2 w-full text-sm border border-gray-300 dark:bg-gray-600"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  {formData.id ? 'Update Leave' : 'Submit Leave'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplyLeavePage;
