import React, { useState } from 'react';
import { FaFilePdf, FaFileWord, FaFileExcel, FaPrint, FaCopy, FaColumns, FaEdit, FaTrash } from 'react-icons/fa';
import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';

const TeacherRatingList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [ratings, setRatings] = useState([
    { staffId: '1', name: 'John Doe', rating: '5', comment: 'Excellent', status: 'Active', studentName: 'Jane Smith' },
    { staffId: '2', name: 'Jane Roe', rating: '4', comment: 'Good', status: 'Inactive', studentName: 'Tom Lee' },
    // Add more mock data as needed
  ]);
  const [columns, setColumns] = useState({
    staffId: true,
    name: true,
    rating: true,
    comment: true,
    status: true,
    studentName: true,
    actions: true
  });
  const [isColumnDropdownOpen, setIsColumnDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredRatings = ratings.filter(rating =>
    rating.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rating.staffId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rating.studentName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredRatings.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredRatings.length / itemsPerPage);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text('Teacher Rating List', 20, 10);
    const tableColumn = ['Staff ID', 'Name', 'Rating', 'Comment', 'Status', 'Student Name'];
    const tableRows = currentItems.map(rating => [
      rating.staffId,
      rating.name,
      rating.rating,
      rating.comment,
      rating.status,
      rating.studentName
    ]);
    doc.autoTable({ head: [tableColumn], body: tableRows, startY: 20 });
    doc.save('teacher_rating_list.pdf');
  };

  const exportToExcel = () => {
    const data = currentItems.map(rating => ({
      staffId: rating.staffId,
      name: rating.name,
      rating: rating.rating,
      comment: rating.comment,
      status: rating.status,
      studentName: rating.studentName
    }));
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Teacher Rating List');
    XLSX.writeFile(wb, 'teacher_rating_list.xlsx');
  };

  const exportToDOCX = () => {
    alert('DOCX export not implemented yet');
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopy = () => {
    const content = currentItems.map(rating => `${rating.name}: ${rating.rating}`).join('\n');
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
      staffId: true,
      name: true,
      rating: true,
      comment: true,
      status: true,
      studentName: true,
      actions: true
    });
    setIsColumnDropdownOpen(false);
  };

  const handleEdit = (index) => {
    alert('Editing record ' + index); // Placeholder action
  };

  const handleDelete = (index) => {
    const updatedRatings = ratings.filter((_, i) => i !== index);
    setRatings(updatedRatings);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mx-auto p-6 dark:bg-gray-800 dark:text-white">
      <h1 className="text-2xl font-bold text-center mb-6">Teacher Rating List</h1>

      <div className="flex justify-between mb-6">
        <div className="w-1/3">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search..."
            className="p-2 w-full text-sm rounded-md border border-gray-300 dark:bg-gray-600"
          />
        </div>
        <div className="space-x-4 flex items-center">
          <button onClick={exportToPDF} className="text-red-600 hover:text-red-800" title="Export to PDF">
            <FaFilePdf size={20} />
          </button>
          <button onClick={exportToDOCX} className="text-blue-600 hover:text-blue-800" title="Export to DOCX">
            <FaFileWord size={20} />
          </button>
          <button onClick={exportToExcel} className="text-green-600 hover:text-green-800" title="Export to Excel">
            <FaFileExcel size={20} />
          </button>
          <button onClick={handlePrint} className="text-gray-600 hover:text-gray-800" title="Print">
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
                  {Object.keys(columns).map((column) => (
                    <div key={column} className="flex items-center py-1">
                      <input
                        type="checkbox"
                        checked={columns[column]}
                        onChange={() => toggleColumn(column)}
                        className="mr-2"
                      />
                      {column.charAt(0).toUpperCase() + column.slice(1)}
                    </div>
                  ))}
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

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-300 dark:border-gray-600">
          <thead className="bg-gray-300 dark:bg-gray-600">
            <tr>
              {columns.staffId && (
                <th className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-left text-sm font-medium">Staff ID</th>
              )}
              {columns.name && (
                <th className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-left text-sm font-medium">Name</th>
              )}
              {columns.rating && (
                <th className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-left text-sm font-medium">Rating</th>
              )}
              {columns.comment && (
                <th className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-left text-sm font-medium">Comment</th>
              )}
              {columns.status && (
                <th className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-left text-sm font-medium">Status</th>
              )}
              {columns.studentName && (
                <th className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-left text-sm font-medium">Student Name</th>
              )}
              {columns.actions && (
                <th className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-left text-sm font-medium">Actions</th>
              )}
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((rating, index) => (
                <tr key={index} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'} dark:bg-gray-700`}>
                  {columns.staffId && (
                    <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm">{rating.staffId}</td>
                  )}
                  {columns.name && (
                    <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm">{rating.name}</td>
                  )}
                  {columns.rating && (
                    <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm">{rating.rating}</td>
                  )}
                  {columns.comment && (
                    <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm">{rating.comment}</td>
                  )}
                  {columns.status && (
                    <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm">{rating.status}</td>
                  )}
                  {columns.studentName && (
                    <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm">{rating.studentName}</td>
                  )}
                  {columns.actions && (
                    <td className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm">
                      <button onClick={() => handleEdit(index)} className="text-blue-500 hover:text-blue-700">
                        <FaEdit size={18} />
                      </button>
                      <button onClick={() => handleDelete(index)} className="text-red-500 hover:text-red-700 ml-2">
                        <FaTrash size={18} />
                      </button>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="px-4 py-2 text-center text-sm">No data available in table</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between mt-4">
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          className={`px-3 py-1 rounded ${currentPage === 1 ? 'bg-gray-300 dark:bg-gray-700 text-gray-500' : 'bg-blue-500 text-white'}`}
        >
          Previous
        </button>
        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
          className={`px-3 py-1 rounded ${currentPage === totalPages ? 'bg-gray-300 dark:bg-gray-700 text-gray-500' : 'bg-blue-500 text-white'}`}
        >
          Next
        </button>
      </div>

      <div className="text-center mt-4">
        <p className="text-sm">Add new record or search with different criteria.</p>
      </div>
    </div>
  );
};

export default TeacherRatingList;
