import React, { useState } from 'react';
import { FaFilePdf, FaFileExcel, FaFileWord, FaPrint, FaCopy, FaColumns, FaEdit, FaTrash } from 'react-icons/fa';
import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';

const ExpenseHeadPage = () => {
  const [expenseHead, setExpenseHead] = useState('');
  const [description, setDescription] = useState('');
  const [expenseHeads, setExpenseHeads] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleAddExpenseHead = (e) => {
    e.preventDefault();
    if (expenseHead && description) {
      const newExpenseHead = { expenseHead, description };
      setExpenseHeads([...expenseHeads, newExpenseHead]);
      setExpenseHead('');
      setDescription('');
    }
  };

  const handleEditExpenseHead = (index) => {
    const editedExpenseHead = expenseHeads[index];
    setExpenseHead(editedExpenseHead.expenseHead);
    setDescription(editedExpenseHead.description);
    const updatedExpenseHeads = expenseHeads.filter((_, i) => i !== index);
    setExpenseHeads(updatedExpenseHeads);
  };

  const handleDeleteExpenseHead = (index) => {
    const updatedExpenseHeads = expenseHeads.filter((_, i) => i !== index);
    setExpenseHeads(updatedExpenseHeads);
  };

  const filteredExpenseHeads = expenseHeads.filter((item) =>
    item.expenseHead.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Export to PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text('Expense Head Report', 20, 10);
    const tableColumn = ["Expense Head", "Description"];
    const tableRows = filteredExpenseHeads.map(item => [
      item.expenseHead,
      item.description
    ]);
    doc.autoTable({ head: [tableColumn], body: tableRows, startY: 20 });
    doc.save('expense_heads.pdf');
  };

  // Export to Excel
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredExpenseHeads);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Expense Heads');
    XLSX.writeFile(wb, 'expense_heads.xlsx');
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopy = () => {
    alert('Copy functionality is not implemented.');
  };

  const handleColumns = () => {
    alert('Columns functionality is not implemented.');
  };

  return (
    <div className="container mx-auto p-4 dark:bg-gray-800 dark:text-white">
      <h1 className="text-3xl font-bold text-center mb-6">Expense Head</h1>

      {/* Top-right Icons Section */}
      <div className="flex justify-end mb-6">
        <div className="space-x-4 flex items-center">
          <button
            onClick={exportToPDF}
            className="text-red-600 hover:text-red-800"
            title="Download PDF"
          >
            <FaFilePdf size={24} />
          </button>
          <button
            onClick={() => alert('Download DOCX functionality is not implemented.')}
            className="text-blue-600 hover:text-blue-800"
            title="Download DOCX"
          >
            <FaFileWord size={24} />
          </button>
          <button
            onClick={exportToExcel}
            className="text-green-600 hover:text-green-800"
            title="Download Excel"
          >
            <FaFileExcel size={24} />
          </button>
          <button
            onClick={handlePrint}
            className="text-gray-600 hover:text-gray-800"
            title="Print"
          >
            <FaPrint size={24} />
          </button>
          <button
            onClick={handleCopy}
            className="text-purple-600 hover:text-purple-800"
            title="Copy"
          >
            <FaCopy size={24} />
          </button>
          <button
            onClick={handleColumns}
            className="text-teal-600 hover:text-teal-800"
            title="Columns"
          >
            <FaColumns size={24} />
          </button>
        </div>
      </div>

      {/* Layout for Add Expense Head and Expense Head List */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Section: Add Expense Head Form */}
        <div className="flex-1">
          <h2 className="text-2xl font-semibold mb-4">Add Expense Head</h2>
          <form onSubmit={handleAddExpenseHead} className="space-y-4">
            <div>
              <label htmlFor="expenseHead" className="block font-medium text-gray-700 dark:text-white">Expense Head *</label>
              <input
                type="text"
                id="expenseHead"
                value={expenseHead}
                onChange={(e) => setExpenseHead(e.target.value)}
                placeholder="Enter expense head"
                className="w-full p-2 mt-2 border border-gray-300 rounded dark:bg-gray-800 dark:text-white"
                required
              />
            </div>

            <div>
              <label htmlFor="description" className="block font-medium text-gray-700 dark:text-white">Description</label>
              <input
                type="text"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter description"
                className="w-full p-2 mt-2 border border-gray-300 rounded dark:bg-gray-800 dark:text-white"
              />
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Add Expense Head
            </button>
          </form>
        </div>

        {/* Right Section: Expense Head List */}
        <div className="flex-1">
          <h2 className="text-2xl font-semibold mb-4">Expense Head List</h2>
          
          {/* Search for Expense Head */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="p-2 border border-gray-300 rounded dark:bg-gray-800 dark:text-white"
            />
          </div>

          {/* Expense Head List Table */}
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr>
                <th className="px-4 py-2 border">Expense Head</th>
                <th className="px-4 py-2 border">Description</th>
                <th className="px-4 py-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredExpenseHeads.length > 0 ? (
                filteredExpenseHeads.map((item, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 border">{item.expenseHead}</td>
                    <td className="px-4 py-2 border">{item.description}</td>
                    <td className="px-4 py-2 border">
                      <button
                        className="text-yellow-500 hover:text-yellow-700"
                        onClick={() => handleEditExpenseHead(index)}
                      >
                        <FaEdit size={16} />
                      </button> |
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleDeleteExpenseHead(index)}
                      >
                        <FaTrash size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="px-4 py-2 text-center text-gray-500">No data available in table</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ExpenseHeadPage;
