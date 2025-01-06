import React, { useState } from 'react';
import { FaList, FaTh, FaEdit, FaTrashAlt } from 'react-icons/fa';

const SearchAndTabView = () => {
  const [searchType, setSearchType] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewType, setViewType] = useState('list'); // 'card' or 'list'

  const handleRoleSearch = () => {
    console.log(`Searching by Role: ${searchType}`);
  };

  const handleKeywordSearch = () => {
    console.log(`Searching by Keyword: ${searchQuery}`);
  };

  const handleEdit = (id) => {
    console.log(`Editing entry with ID: ${id}`);
  };

  const handleDelete = (id) => {
    console.log(`Deleting entry with ID: ${id}`);
  };

  const sampleListData = [
    {
      staffId: 'ST001',
      name: 'John Doe',
      role: 'Admin',
      department: 'HR',
      designation: 'Manager',
      mobile: '123-456-7890',
    },
    {
      staffId: 'ST002',
      name: 'Jane Smith',
      role: 'Staff',
      department: 'Finance',
      designation: 'Analyst',
      mobile: '987-654-3210',
    },
  ];

  return (
    <div className="container mx-auto p-6 dark:bg-gray-800 dark:text-white text-sm">
      <h1 className="text-base font-bold text-left mb-4">Select Criteria</h1>

      {/* Top Section: Role and Keyword Search */}
      <div className="flex flex-wrap justify-between gap-4 mb-4">
        {/* Left Section: Role */}
        <div className="flex flex-col w-full sm:w-1/2 lg:w-1/3">
          <label htmlFor="role" className="block text-gray-700 dark:text-white">
            Role *
          </label>
          <div className="flex gap-2 mt-2">
            <select
              id="role"
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded dark:bg-gray-600 dark:text-white text-sm"
              required
            >
              <option value="" disabled>
                Select Role
              </option>
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
              <option value="Staff">Staff</option>
            </select>
            <button
              onClick={handleRoleSearch}
              className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
            >
              Search
            </button>
          </div>
        </div>

        {/* Right Section: Search By Keyword */}
        <div className="flex flex-col w-full sm:w-1/2 lg:w-1/3">
          <label htmlFor="search" className="block text-gray-700 dark:text-white">
            Search By Keyword
          </label>
          <div className="flex gap-2 mt-2">
            <input
              type="text"
              id="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Staff ID, Name, Role, etc."
              className="w-full p-2 border border-gray-300 rounded dark:bg-gray-600 dark:text-white text-sm"
              required
            />
            <button
              onClick={handleKeywordSearch}
              className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Tabs for Card View and List View */}
      <div>
        <div role="tablist" className="flex items-center gap-4 mb-4">
          <button
            role="tab"
            className={`flex items-center gap-2 text-sm ${
              viewType === 'card' ? 'text-blue-600' : 'text-gray-500 dark:text-white'
            }`}
            onClick={() => setViewType('card')}
          >
            <FaTh /> Card View
          </button>
          <button
            role="tab"
            className={`flex items-center gap-2 text-sm ${
              viewType === 'list' ? 'text-blue-600' : 'text-gray-500 dark:text-white'
            }`}
            onClick={() => setViewType('list')}
          >
            <FaList /> List View
          </button>
        </div>

        {/* Display Selected View */}
        <div>
          {viewType === 'card' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {sampleListData.map((item) => (
                <div
                  key={item.staffId}
                  className="border rounded p-4 bg-white dark:bg-gray-600 dark:text-white"
                >
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <p className="text-sm mt-2">
                    <strong>Role:</strong> {item.role}
                  </p>
                  <p className="text-sm mt-1">
                    <strong>Department:</strong> {item.department}
                  </p>
                  <p className="text-sm mt-1">
                    <strong>Designation:</strong> {item.designation}
                  </p>
                  <p className="text-sm mt-1">
                    <strong>Mobile:</strong> {item.mobile}
                  </p>
                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => handleEdit(item.staffId)}
                      className="text-blue-600 hover:underline flex items-center gap-1"
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.staffId)}
                      className="text-red-600 hover:underline flex items-center gap-1"
                    >
                      <FaTrashAlt /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <table className="min-w-full table-auto border-collapse text-sm">
              <thead className="dark:bg-gray-700 dark:text-white">
                <tr>
                  <th className="px-4 py-2 border">Staff ID</th>
                  <th className="px-4 py-2 border">Name</th>
                  <th className="px-4 py-2 border">Role</th>
                  <th className="px-4 py-2 border">Department</th>
                  <th className="px-4 py-2 border">Designation</th>
                  <th className="px-4 py-2 border">Mobile Number</th>
                  <th className="px-4 py-2 border">Action</th>
                </tr>
              </thead>
              <tbody>
                {sampleListData.map((item) => (
                  <tr key={item.staffId} className="dark:bg-gray-800 dark:text-white">
                    <td className="px-4 py-2 border">{item.staffId}</td>
                    <td className="px-4 py-2 border">{item.name}</td>
                    <td className="px-4 py-2 border">{item.role}</td>
                    <td className="px-4 py-2 border">{item.department}</td>
                    <td className="px-4 py-2 border">{item.designation}</td>
                    <td className="px-4 py-2 border">{item.mobile}</td>
                    <td className="px-4 py-2 border flex gap-2">
                      <button
                        onClick={() => handleEdit(item.staffId)}
                        className="text-blue-600 hover:underline flex items-center gap-1"
                      >
                        <FaEdit /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.staffId)}
                        className="text-red-600 hover:underline flex items-center gap-1"
                      >
                        <FaTrashAlt /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchAndTabView;
