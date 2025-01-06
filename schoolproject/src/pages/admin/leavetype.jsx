import React, { useState } from 'react';
import { FaFilePdf, FaFileWord, FaFileExcel, FaPrint, FaCopy, FaColumns, FaEdit, FaTrash } from 'react-icons/fa'; // Import the necessary icons
import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';

const LeaveTypePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [leaveTypes, setLeaveTypes] = useState([]);
  const [newLeaveType, setNewLeaveType] = useState('');
  const [isColumnDropdownOpen, setIsColumnDropdownOpen] = useState(false);
  const [columns, setColumns] = useState({
    name: true,
    actions: true
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredLeaveTypes = leaveTypes.filter(leave =>
    leave.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredLeaveTypes.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredLeaveTypes.length / itemsPerPage);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text('Leave Type List', 20, 10);
    const tableColumn = ['Leave Type Name'];
    const tableRows = leaveTypes.map(leave => [leave.name]);
    doc.autoTable({ head: [tableColumn], body: tableRows, startY: 20 });
    doc.save('leave_type_list.pdf');
  };

  const exportToExcel = () => {
    const data = leaveTypes.map(leave => ({
      leaveName: leave.name,
    }));
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Leave Type List');
    XLSX.writeFile(wb, 'leave_type_list.xlsx');
  };

  const exportToDOCX = () => {
    alert('DOCX export not implemented yet');
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopy = () => {
    const content = currentItems.map(leave => `${leave.name}`).join('\n');
    navigator.clipboard.writeText(content);
  };

  const handleColumns = () => {
    setIsColumnDropdownOpen(!isColumnDropdownOpen);
  };

  const toggleColumn = (columnName) => {
    setColumns((prevColumns) => ({
      ...prevColumns,
      [columnName]: !prevColumns[columnName]
    }));
  };

  const restoreDefaultVisibility = () => {
    setColumns({
      name: true,
      actions: true
    });
    setIsColumnDropdownOpen(false);
  };

  const handleAddLeaveType = (e) => {
    e.preventDefault();
    if (newLeaveType) {
      const newLeave = {
        id: (leaveTypes.length + 1).toString(),
        name: newLeaveType,
      };
      setLeaveTypes([...leaveTypes, newLeave]);
      setNewLeaveType('');
    }
  };

  // Define the handleDelete function
  const handleDelete = (index) => {
    setLeaveTypes(leaveTypes.filter((leave, i) => i !== index));
  };

  return (
    <div className="container mx-auto p-6 dark:bg-gray-800 dark:text-white">

      <div className="flex space-x-6">
        {/* Left section: Add Leave Type Form */}
        <div className="w-1/3 p-6 bg-gray-100 rounded-lg shadow-lg border border-gray-300 dark:bg-gray-600 dark:border-gray-700">
          <h2 className="text-xl font-bold mb-4">Add Leave Type</h2>
          <form onSubmit={handleAddLeaveType}>
            <div className="mb-4">
              <label htmlFor="leaveTypeName" className="block text-sm font-medium text-gray-700 dark:text-white">Leave Type Name</label>
              <input
                type="text"
                id="leaveTypeName"
                value={newLeaveType}
                onChange={(e) => setNewLeaveType(e.target.value)}
                className="mt-2 p-2 w-full text-sm rounded-md border border-gray-300 dark:bg-gray-600"
                placeholder="Enter leave type name"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
            >
              Save
            </button>
          </form>
        </div>

        {/* Right section: Leave Type List */}
        <div className="w-2/3 p-6 bg-gray-100 rounded-lg shadow-lg border border-gray-300 dark:bg-gray-600 dark:border-gray-700">
          <h2 className="text-xl font-bold mb-4">Leave Type List</h2>

          {/* Search and Actions */}
          <div className="mb-4 flex justify-between">
            <div className="w-1/3">
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search..."
                className="p-2 w-full text-sm rounded-md border border-gray-300 dark:bg-gray-600"
              />
            </div>
            <div className="space-x-4 flex items-center relative">
              {/* Action Buttons */}
              <button onClick={exportToPDF} className="text-red-600 hover:text-red-800" title="Export to PDF">
                <FaFilePdf size={20} />
              </button>
              <button onClick={exportToDOCX} className="text-blue-600 hover:text-blue-800" title="Export to DOCX">
                <FaFileWord size={20} />
              </button>
              <button onClick={exportToExcel} className="text-green-600 hover:text-green-800" title="Export to Excel">
                <FaFileExcel size={20} />
              </button>
              <button onClick={handlePrint} className="text-gray-600 hover:text-dark-900" title="Print">
                <FaPrint size={20} />
              </button>
              <button onClick={handleCopy} className="text-purple-600 hover:text-purple-800" title="Copy">
                <FaCopy size={20} />
              </button>
              <button onClick={handleColumns} className="text-teal-600 hover:text-teal-800" title="Columns">
                <FaColumns size={20} />
                {isColumnDropdownOpen && (
                  <div className="absolute top-12 right-0 bg-white shadow-lg p-2 rounded-lg w-44 z-10">
                    <div className="text-sm">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={columns.name}
                          onChange={() => toggleColumn('name')}
                          className="mr-2"
                        />
                        Leave Type Name
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={columns.actions}
                          onChange={() => toggleColumn('actions')}
                          className="mr-2"
                        />
                        Actions
                      </label>
                      <button
                        onClick={restoreDefaultVisibility}
                        className="mt-2 text-blue-600"
                      >
                        Restore Default
                      </button>
                    </div>
                  </div>
                )}
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border border-gray-300 dark:border-gray-600">
              <thead className="bg-gray-300 dark:bg-gray-800">
                <tr>
                  {columns.name && (
                    <th className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-left text-sm font-medium">Name</th>
                  )}
                  {columns.actions && (
                    <th className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-left text-sm font-medium">Actions</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {currentItems.length > 0 ? (
                  currentItems.map((leave, index) => (
                    <tr key={index} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'} dark:bg-gray-700`}>
                      {columns.name && <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm">{leave.name}</td>}
                      {columns.actions && (
                        <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm">
                          <button onClick={() => alert('Editing record')} className="text-blue-500 hover:text-blue-700 mr-2" title="Edit">
                            <FaEdit size={18} />
                          </button>
                          <button onClick={() => handleDelete(index)} className="text-red-500 hover:text-red-700" title="Delete">
                            <FaTrash size={18} />
                          </button>
                        </td>
                      )}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={columns.name && columns.actions ? 2 : 1} className="px-4 py-2 text-center text-sm">No data available in table</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between mt-4">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className={`px-3 py-1 rounded ${currentPage === 1 ? 'bg-gray-300 dark:bg-gray-700 text-gray-500' : 'bg-blue-500 text-white'}`}
            >
              Previous
            </button>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
              className={`px-3 py-1 rounded ${currentPage === totalPages ? 'bg-gray-300 dark:bg-gray-700 text-gray-500' : 'bg-blue-500 text-white'}`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveTypePage;
