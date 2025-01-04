import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';
import {
  FaFilePdf,
  FaFileWord,
  FaFileExcel,
  FaPrint,
  FaCopy,
  FaColumns,
  FaEdit,
  FaTrash,
} from 'react-icons/fa';

const DepartmentPage = () => {
  const [columns, setColumns] = useState({
    name: true,
    actions: true,
  });
  const [isColumnDropdownOpen, setIsColumnDropdownOpen] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [newDepartment, setNewDepartment] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const defaultColumns = { name: true, actions: true };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text('Department List', 20, 10);
    const tableColumn = ['Department Name'];
    const tableRows = departments.map((department) => [department]);
    doc.autoTable({ head: [tableColumn], body: tableRows, startY: 20 });
    doc.save('department_list.pdf');
  };

  const exportToExcel = () => {
    const data = departments.map((department) => ({
      departmentName: department,
    }));
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Department List');
    XLSX.writeFile(wb, 'department_list.xlsx');
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopy = () => {
    const content = 'Department List: \n' + departments.join('\n');
    navigator.clipboard.writeText(content);
  };

  const handleColumns = () => {
    setIsColumnDropdownOpen(!isColumnDropdownOpen);
  };

  const toggleColumn = (columnName) => {
    setColumns((prevColumns) => ({
      ...prevColumns,
      [columnName]: !prevColumns[columnName],
    }));
  };

  const restoreDefaultVisibility = () => {
    setColumns(defaultColumns);
    setIsColumnDropdownOpen(false);
  };

  const handleSaveDepartment = () => {
    if (newDepartment.trim()) {
      if (editIndex !== null) {
        const updatedDepartments = [...departments];
        updatedDepartments[editIndex] = newDepartment.trim();
        setDepartments(updatedDepartments);
        setEditIndex(null);
      } else {
        setDepartments([...departments, newDepartment.trim()]);
      }
      setNewDepartment('');
    }
  };

  const handleEdit = (index) => {
    setNewDepartment(departments[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedDepartments = departments.filter((_, i) => i !== index);
    setDepartments(updatedDepartments);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = departments.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(departments.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mx-auto p-6 dark:bg-gray-800 dark:text-white">
      <h1 className="text-2xl font-bold text-center mb-6">Department Page</h1>

      <div className="flex space-x-6 mb-6">
        <div className="w-1/3 p-4 bg-gray-200 dark:bg-gray-700 dark:text-white rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-center">
            {editIndex !== null ? 'Edit Department' : 'Add Department'}
          </h2>
          <div className="mt-4">
            <label htmlFor="departmentName" className="block text-sm">
              Name *
            </label>
            <input
              id="departmentName"
              type="text"
              value={newDepartment}
              onChange={(e) => setNewDepartment(e.target.value)}
              placeholder="Enter Department Name"
              className="mt-2 p-2 w-full text-sm rounded-md border border-gray-300 dark:bg-gray-600"
            />
          </div>
          <button
            onClick={handleSaveDepartment}
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-md text-sm"
          >
            {editIndex !== null ? 'Update' : 'Save'}
          </button>
        </div>

        <div className="w-2/3">
          <div className="p-4 bg-gray-200 dark:bg-gray-700 dark:text-white rounded-lg shadow-lg">
            <div className="flex justify-end mb-6">
              <div className="space-x-4 flex items-center">
                <button
                  onClick={exportToPDF}
                  className="text-red-600 hover:text-red-800 text-sm"
                  title="Download PDF"
                >
                  <FaFilePdf size={20} />
                </button>
                <button
                  onClick={() =>
                    alert('Download DOCX functionality is not implemented.')
                  }
                  className="text-blue-600 hover:text-blue-800 text-sm"
                  title="Download DOCX"
                >
                  <FaFileWord size={20} />
                </button>
                <button
                  onClick={exportToExcel}
                  className="text-green-600 hover:text-green-800 text-sm"
                  title="Download Excel"
                >
                  <FaFileExcel size={20} />
                </button>
                <button
                  onClick={handlePrint}
                  className="text-gray-600 hover:text-gray-800 text-sm"
                  title="Print"
                >
                  <FaPrint size={20} />
                </button>
                <button
                  onClick={handleCopy}
                  className="text-purple-600 hover:text-purple-800 text-sm"
                  title="Copy"
                >
                  <FaCopy size={20} />
                </button>
                <button
                  onClick={handleColumns}
                  className="text-teal-600 hover:text-teal-800 text-sm relative"
                  title="Columns"
                >
                  <FaColumns size={20} />
                  {isColumnDropdownOpen && (
                    <div className="absolute top-6 right-0 bg-white shadow-lg p-2 rounded-lg w-44 z-10">
                      <div className="text-sm">
                        <div className="flex items-center py-1">
                          <input
                            type="checkbox"
                            checked={columns.name}
                            onChange={() => toggleColumn('name')}
                            className="mr-2"
                          />
                          Department Name
                        </div>
                        <div className="flex items-center py-1">
                          <input
                            type="checkbox"
                            checked={columns.actions}
                            onChange={() => toggleColumn('actions')}
                            className="mr-2"
                          />
                          Actions
                        </div>
                        <hr className="my-2" />
                        <button
                          onClick={restoreDefaultVisibility}
                          className="bg-gray-200 px-2 py-1 rounded text-sm w-full text-center"
                        >
                          Restore Default
                        </button>
                      </div>
                    </div>
                  )}
                </button>
              </div>
            </div>

            <div className="mt-6 overflow-x-auto">
              <table className="min-w-full table-auto border border-gray-300 dark:border-gray-600">
                <thead className="bg-gray-300 dark:bg-gray-600">
                  <tr>
                    {columns.name && (
                      <th className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-left text-sm font-medium">
                        Department Name
                      </th>
                    )}
                    {columns.actions && (
                      <th className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-left text-sm font-medium">
                        Actions
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {currentItems.length > 0 ? (
                    currentItems.map((department, index) => (
                      <tr
                        key={index}
                        className={`${
                          index % 2 === 0
                            ? 'bg-white dark:bg-gray-800'
                            : 'bg-gray-100 dark:bg-gray-700'
                        }`}
                      >
                        {columns.name && (
                          <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm">
                            {department}
                          </td>
                        )}
                        {columns.actions && (
                          <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm space-x-4">
                            <button
                              onClick={() => handleEdit(index)}
                              className="text-blue-500 hover:text-blue-700"
                              title="Edit"
                            >
                              <FaEdit />
                            </button>
                            <button
                              onClick={() => handleDelete(index)}
                              className="text-red-500 hover:text-red-700"
                              title="Delete"
                            >
                              <FaTrash />
                            </button>
                          </td>
                        )}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={columns.name && columns.actions ? 2 : 1}
                        className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-center text-sm"
                      >
                        No departments available.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              <div className="flex justify-between mt-4">
                <button
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                  className={`px-3 py-1 rounded ${
                    currentPage === 1
                      ? 'bg-gray-300 dark:bg-gray-700 text-gray-500'
                      : 'bg-blue-500 text-white'
                  }`}
                >
                  Previous
                </button>
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                  className={`px-3 py-1 rounded ${
                    currentPage === totalPages
                      ? 'bg-gray-300 dark:bg-gray-700 text-gray-500'
                      : 'bg-blue-500 text-white'
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentPage;
