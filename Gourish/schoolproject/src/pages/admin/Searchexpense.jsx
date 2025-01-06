import React, { useState } from 'react';

const SearchExpense = () => {
  const [searchType, setSearchType] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [expenseData, setExpenseData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Sample data for demonstration
  const sampleExpenseData = [
    { name: 'John Doe', invoiceNumber: 'EXP-001', expenseHead: 'Utilities', date: '2023-12-01', amount: 200 },
    { name: 'Jane Smith', invoiceNumber: 'EXP-002', expenseHead: 'Office Supplies', date: '2023-12-02', amount: 500 },
    // Add more items for testing
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);

    // Filter data based on search type and query
    const filteredData = sampleExpenseData.filter(item =>
      item[searchType.toLowerCase().replace(' ', '')].toString().toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Simulate loading delay
    setTimeout(() => {
      setExpenseData(filteredData);
      setLoading(false);
    }, 500);
  };

  return (
    <div className="container mx-auto p-4 dark:bg-gray-800 dark:text-white">
      <h1 className="text-3xl font-bold text-center mb-6">Search Expense</h1>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          {/* Search Type */}
          <div className="flex flex-col">
            <label className="font-medium text-gray-700 dark:bg-gray-800 dark:text-white" htmlFor="searchType">Search Type *</label>
            <select
              id="searchType"
              name="searchType"
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
              className="w-full p-2 mt-2 border border-gray-300 rounded dark:bg-gray-600 dark:text-white"
              required
            >
              <option value="" disabled>Select</option>
              <option value="Expense Head">Search By Expense Head</option>
              <option value="Name">Search By Name</option>
              <option value="Invoice Number">Search By Invoice Number</option>
              <option value="Date">Search By Date</option>
            </select>
          </div>

          {/* Search Query */}
          <div className="flex flex-col">
            <label className="font-medium text-gray-700 dark:bg-gray-800 dark:text-white" htmlFor="search">Search *</label>
            <input
              type="text"
              id="search"
              name="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter search keyword"
              className="w-full p-2 mt-2 border border-gray-300 rounded dark:bg-gray-600 dark:text-white"
              required
            />
          </div>
        </div>

        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Search
        </button>
      </form>

      {/* Loading State */}
      {loading && <div className="text-center text-blue-500">Searching...</div>}

      {/* Expense List Table */}
      <h2 className="text-2xl font-semibold mb-4">Expense List</h2>
      <table className="min-w-full table-auto border-collapse overflow-x-auto">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Invoice Number</th>
            <th className="px-4 py-2 border">Expense Head</th>
            <th className="px-4 py-2 border">Date</th>
            <th className="px-4 py-2 border">Amount ($)</th>
          </tr>
        </thead>
        <tbody>
          {expenseData.length > 0 ? (
            expenseData.map((item, index) => (
              <tr key={index} className="text-center">
                <td className="px-4 py-2 border">{item.name}</td>
                <td className="px-4 py-2 border">{item.invoiceNumber}</td>
                <td className="px-4 py-2 border">{item.expenseHead}</td>
                <td className="px-4 py-2 border">{item.date}</td>
                <td className="px-4 py-2 border">{item.amount}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="px-4 py-2 text-center text-gray-500">No data available in table</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SearchExpense;
