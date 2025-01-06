import React, { useState } from 'react';
import { FaEdit, FaTrashAlt, FaFilePdf, FaFileWord, FaFileExcel, FaPrint, FaCopy, FaColumns, FaPlus } from 'react-icons/fa'; // Font Awesome icons
import { jsPDF } from 'jspdf';  // Import jsPDF for PDF generation
import * as XLSX from 'xlsx';   // Import XLSX for Excel generation

const AddExpense = () => {
  const [expenseHead, setExpenseHead] = useState('');
  const [name, setName] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [expenses, setExpenses] = useState([]); // List of expenses
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(5); // Reduce the records per page for a compact view
  const [searchTerm, setSearchTerm] = useState(''); // State for search term
  const [editingExpense, setEditingExpense] = useState(null); // To track which expense is being edited
  const [filter, setFilter] = useState({ size: 'All' }); // Define filter state

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!expenseHead || !name || !date || !amount) {
      alert("Please fill all required fields!");
      return;
    }

    const newExpense = {
      expenseHead,
      name,
      invoiceNumber,
      date,
      amount,
      description,
      file: file ? file.name : '',
    };

    if (editingExpense) {
      const updatedExpenses = expenses.map((expense) =>
        expense === editingExpense ? newExpense : expense
      );
      setExpenses(updatedExpenses);
      setEditingExpense(null); 
    } else {
      setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
    }

    setExpenseHead('');
    setName('');
    setInvoiceNumber('');
    setDate('');
    setAmount('');
    setDescription('');
    setFile(null);
  };

  const indexOfLastExpense = currentPage * recordsPerPage;
  const indexOfFirstExpense = indexOfLastExpense - recordsPerPage;
  const currentExpenses = expenses.slice(indexOfFirstExpense, indexOfLastExpense);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(expenses.length / recordsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const filteredExpenses = expenses.filter((expense) => {
    return (
      expense.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.expenseHead.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleEdit = (expense) => {
    setEditingExpense(expense);
    setExpenseHead(expense.expenseHead);
    setName(expense.name);
    setInvoiceNumber(expense.invoiceNumber);
    setDate(expense.date);
    setAmount(expense.amount);
    setDescription(expense.description);
    setFile(null);
  };

  const handleDelete = (expenseToDelete) => {
    const updatedExpenses = expenses.filter((expense) => expense !== expenseToDelete);
    setExpenses(updatedExpenses);
  };

  // Export to PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text('Expense Report', 20, 10);
    const tableColumn = ["Name", "Description", "Invoice Number", "Date", "Expense Head", "Amount ($)"];
    const tableRows = filteredExpenses.map(expense => [
      expense.name,
      expense.description,
      expense.invoiceNumber,
      expense.date,
      expense.expenseHead,
      expense.amount
    ]);
    doc.autoTable({ head: [tableColumn], body: tableRows, startY: 20 });
    doc.save('expenses.pdf');
  };

  // Export to Excel
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredExpenses);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Expenses');
    XLSX.writeFile(wb, 'expenses.xlsx');
  };

  return (
    <div className="flex h-screen dark:bg-gray-800 dark:text-white">
      {/* Left Section: Form */}
      <div className="w-1/3 p-4 bg-white shadow-lg dark:bg-gray-800 dark:text-white overflow-auto">
        <h2 className="text-xl font-semibold mb-4">{editingExpense ? "Edit Expense" : "Add Expense"}</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-2">
            <label className="block text-xs font-medium text-gray-700 dark:bg-gray-800 dark:text-white" htmlFor="expenseHead">Expense Head *</label>
            <select id="expenseHead" value={expenseHead} onChange={(e) => setExpenseHead(e.target.value)} className="mt-1 block w-full p-1 border border-gray-300 dark:bg-gray-600 dark:text-white rounded-sm text-xs" required>
              <option value="">Select</option>
              <option value="office-supplies">Office Supplies</option>
              <option value="travel">Travel</option>
              <option value="miscellaneous">Miscellaneous</option>
            </select>
          </div>
          <div className="mb-2">
            <label className="block text-xs font-medium text-gray-700 dark:bg-gray-800 dark:text-white" htmlFor="name">Name *</label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 block w-full p-1 border border-gray-300 dark:bg-gray-600 dark:text-white rounded-sm text-xs" required />
          </div>
          <div className="mb-2">
            <label className="block text-xs font-medium text-gray-700 dark:bg-gray-800 dark:text-white" htmlFor="invoiceNumber">Invoice Number</label>
            <input type="text" id="invoiceNumber" value={invoiceNumber} onChange={(e) => setInvoiceNumber(e.target.value)} className="mt-1 block w-full p-1 border border-gray-300 dark:bg-gray-600 dark:text-white rounded-sm text-xs" />
          </div>
          <div className="mb-2">
            <label className="block text-xs font-medium text-gray-700 dark:bg-gray-800 dark:text-white" htmlFor="date">Date *</label>
            <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} className="mt-1 block w-full p-1 border border-gray-300 rounded-sm text-xs dark:bg-gray-600 dark:text-white" required />
          </div>
          <div className="mb-2">
            <label className="block text-xs font-medium text-gray-700 dark:bg-gray-800 dark:text-white" htmlFor="amount">Amount ($) *</label>
            <input type="number" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} className="mt-1 block w-full p-1 border border-gray-300 rounded-sm text-xs dark:bg-gray-600 dark:text-white" required />
          </div>
          <div className="mb-2">
            <label className="block text-xs font-medium text-gray-700 dark:bg-gray-800 dark:text-white" htmlFor="file">Attach Document</label>
            <input type="file" id="file" onChange={handleFileChange} className="mt-1 block w-full p-1 border border-gray-300 rounded-sm text-xs dark:bg-gray-600 dark:text-white" />
            {file && <span className="text-xs text-gray-600">{file.name}</span>}
          </div>
          <div className="mb-2">
            <label className="block text-xs font-medium text-gray-700 dark:bg-gray-800 dark:text-white" htmlFor="description">Description</label>
            <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="mt-1 block w-full p-1 border border-gray-300 rounded-sm text-xs dark:bg-gray-600 dark:text-white" rows="2"></textarea>
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-1 rounded-sm text-xs">{editingExpense ? "Update Expense" : "Add Expense"}</button>
        </form>
      </div>

      {/* Right Section: Table */}
      <div className="w-2/3 p-4 bg-white shadow-lg dark:bg-gray-800 dark:text-white overflow-auto">
        {/* Export Icons */}
        <div className="flex justify-end space-x-2 mb-4">
  <FaFilePdf
    className="text-base text-red-600 cursor-pointer"
    title="Export to PDF"
    onClick={exportToPDF} // Link the function
  />
  <FaFileExcel
    className="text-base text-green-600 cursor-pointer"
    title="Export to Excel"
    onClick={exportToExcel} // Link the function
  />
  <FaFileWord
    className="text-base text-blue-600 cursor-pointer"
    title="Export to Word"
    onClick={() => alert('Word export functionality is not implemented yet!')} // Placeholder
  />
  <FaPrint
    className="text-base text-gray-600 cursor-pointer"
    title="Print"
    onClick={() => window.print()} // Print functionality
  />
  <FaCopy
    className="text-base text-gray-600 cursor-pointer"
    title="Copy"
    onClick={() => navigator.clipboard.writeText(JSON.stringify(filteredExpenses))} // Copy to clipboard
  />
  <FaColumns
    className="text-base text-gray-600 cursor-pointer"
    title="Column Visibility"
    onClick={() => alert('Column visibility functionality is not implemented yet!')} // Placeholder
  />
</div>

        
        {/* Filter Dropdown on the Right */}
        <div className="flex items-center mb-4">
          <label className="mr-2 text-sm font-medium"></label>
          <select
            value={filter.size}
            onChange={(e) =>
              setFilter({ ...filter, size: e.target.value })
            }
            className="border p-2 rounded text-sm dark:bg-gray-700 dark:text-white"
          >
            <option value="All">All</option>
            <option value="100">100</option>
          </select>
        </div>

        {/* Search Bar */}
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by Name, Invoice, or Expense Head"
            className="w-1/2 p-2 text-xs border rounded-sm dark:bg-gray-600 dark:text-white dark:bg-gray-800 dark:text-white"
          />
        </div>

        {/* Expense Table */}
        <table className="table-auto w-full text-xs dark:bg-gray-800 dark:text-white dark:bg-gray-800 dark:text-white">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Invoice Number</th>
              <th>Date</th>
              <th>Expense Head</th>
              <th>Amount ($)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredExpenses.length > 0 ? (
              filteredExpenses.map((expense, index) => (
                <tr key={index}>
                  <td>{expense.name}</td>
                  <td>{expense.description}</td>
                  <td>{expense.invoiceNumber}</td>
                  <td>{expense.date}</td>
                  <td>{expense.expenseHead}</td>
                  <td>{expense.amount}</td>
                  <td className="space-x-2">
                    <FaEdit onClick={() => handleEdit(expense)} className="cursor-pointer text-blue-500 text-xs" />
                    <FaTrashAlt onClick={() => handleDelete(expense)} className="cursor-pointer text-red-500 text-xs" />
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="7" className="text-center">No expenses found.</td></tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="mt-4 flex justify-between items-center">
          <button onClick={handlePrevPage} className="p-2 bg-gray-300 text-xs rounded-sm">Prev</button>
          <button onClick={handleNextPage} className="p-2 bg-gray-300 text-xs rounded-sm">Next</button>
        </div>
      </div>
    </div>
  );
};

export default AddExpense;
