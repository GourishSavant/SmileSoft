


import React, { useState, useEffect } from 'react';
import { FaFilePdf, FaFileWord, FaFileExcel, FaCopy, FaPrint, FaColumns } from "react-icons/fa";

const User = () => {
  const [activeModule, setActiveModule] = useState('students');
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    // Fetch data from your API or local JSON file
    fetch('/admin/users.json') // Replace with your actual API endpoint
      .then((response) => response.json())
      .then((jsonData) => {
        setData(jsonData);
        setFilteredData(jsonData);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    const filtered = data.filter((item) => {
      const matchSearch =
        (item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.role && item.role.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchModule =
        activeModule === 'all' ||
        (activeModule === 'students' && item.role === 'student') ||
        (activeModule === 'staff' && item.role === 'staff') ||
        (activeModule === 'parents' && item.role === 'parent');

      return matchSearch && matchModule;
    });
    setFilteredData(filtered);
    setCurrentPage(1); // Reset to the first page when filters change
  }, [searchTerm, activeModule, data]);

  // Pagination logic
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredData.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(filteredData.length / recordsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  const renderHeading = () => {
    const headings = {
      students: 'Students',
      staff: 'Staff',
      parents: 'Parents',
    };
    return headings[activeModule] || 'Users';
  };

  const handleToggleChange = (item) => {
    // Check the current status and confirm action
    const isConfirmed = window.confirm(
      item.status === 'active'
        ? `Are you sure you want to deactivate ${item.name}'s account?`
        : `Are you sure you want to activate ${item.name}'s account?`
    );

    if (isConfirmed) {
      // Toggle the status of the account
      const newStatus = item.status === 'active' ? 'deactivated' : 'activated';
      setStatusMessage(`${item.name}'s account has been ${newStatus}`);

      // Optionally, update the status in your data (if needed)
      item.status = newStatus;  // This will only affect the local data for now
    }
  };

  const renderTable = () => {
    if (currentRecords.length === 0) {
      return (
        <tr>
          <td colSpan="8" className="text-center py-4 dark:bg-gray-800">
            No data available in table.
          </td>
        </tr>
      );
    }

    return currentRecords.map((item, index) => (
      <tr key={index} className="hover:bg-gray-100 dark:text-white dark:bg-gray-800">
        {activeModule === 'staff' && (
          <>
            <td className="border p-2">{item.staffId}</td>
            <td className="border p-2">{item.name}</td>
            <td className="border p-2">{item.email}</td>
            <td className="border p-2">{item.role}</td>
            <td className="border p-2">{item.designation}</td>
            <td className="border p-2">{item.department}</td>
            <td className="border p-2">{item.phone}</td>
          </>
        )}
        {activeModule === 'students' && (
          <>
            <td className="border p-2">{item.admissionNo}</td>
            <td className="border p-2">{item.name}</td>
            <td className="border p-2">{item.username}</td>
            <td className="border p-2">{item.class}</td>
            <td className="border p-2">{item.fatherName}</td>
            <td className="border p-2">{item.mobileNumber}</td>
          </>
        )}
        {activeModule === 'parents' && (
          <>
            <td className="border p-2">{item.guardianName}</td>
            <td className="border p-2">{item.guardianPhone}</td>
            <td className="border p-2">{item.username}</td>
          </>
        )}
        <td className="border p-2">
          <input
            type="checkbox"
            className="toggle toggle-success"
            defaultChecked={item.status === 'active'}
            onChange={() => handleToggleChange(item)}
          />
        </td>
      </tr>
    ));
  };
  
     const [columns, setColumns] = useState({
        admissionNo: true,
        studentname: true,
        username: true,
        class:true,
        fatherName:true,
        mobileNumber:true,
        action:true,
      });
    const [showColumnOptions, setShowColumnOptions] = useState(false); // To toggle the column options
    
    const toggleColumnVisibility = (column) => {
      setColumns((prevColumns) => ({
        ...prevColumns,
        [column]: !prevColumns[column],
      }));
    };

  return (
    <div className={`${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'} min-h-screen transition-colors duration-300`}>
      <div className="bg-gray-200 min-h-screen dark:bg-gray-600 dark:text-white">
        <div className="p-6 dark:bg-gray-800 dark:text-white">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">{`Users - ${renderHeading()}`}</h1>
            <div className="space-x-4">
              {['students', 'staff', 'parents'].map((module) => (
                <button
                  key={module}
                  className={`py-2 px-4 rounded ${
                    activeModule === module ? 'bg-blue-600 text-white' : 'bg-gray-400'
                  }`}
                  onClick={() => setActiveModule(module)}
                >
                  {module.charAt(0).toUpperCase() + module.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between space-x-4 mb-6">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search Section..."
              className="p-2 border border-gray-300 rounded-lg w-1/3"
            />
            <div className="flex space-x-2">
              <FaFilePdf className="text-red-500 cursor-pointer hover:text-red-700" title="Download PDF" size={20} />
              <FaFileWord className="text-blue-500 cursor-pointer hover:text-blue-700" title="Download Word" size={20} />
              <FaFileExcel className="text-green-500 cursor-pointer hover:text-green-700" title="Download Excel" size={20} />
              <FaCopy className="text-gray-500 cursor-pointer hover:text-gray-700" title="Copy" size={20} />
              <FaPrint className="text-black cursor-pointer hover:text-gray-700" title="Print" size={20} />
               <FaColumns
                                  className="text-gray-500 cursor-pointer hover:text-gray-700"
                                  title="Columns View"
                                  size={20}
                                  onClick={() => setShowColumnOptions(!showColumnOptions)} // Toggle column options
                                  />
                                  </div>
                                  </div>
                                 
                                         {/* Column Options Form Below Icons */}
                                         {showColumnOptions && (
                                           <div className=" absolute right-0 rounded-lg shadow-md bg-gray-100 w-full sm:w-40 flex flex-col">
                                             <h2 className="text-lg font-semibold mb-2">Select Columns to Show</h2>
                                             <div className="flex flex-col space-y-2  justify-end">
                                               <label className="flex items-center">
                                                 <input
                                                   type="checkbox"
                                                   checked={columns.session}
                                                   onChange={() => toggleColumnVisibility("role")}
                                                   className="mr-2"
                                                 />
                                                 Admission No
                                               </label>
                                               <label className="flex items-center">
                                                 <input
                                                   type="checkbox"
                                                   checked={columns.status}
                                                   onChange={() => toggleColumnVisibility("type")}
                                                   className="mr-2"
                                                 />
                                                 Student name
                                               </label>
                                               <label className="flex items-end">
                                                 <input
                                                   type="checkbox"
                                                   checked={columns.action}
                                                   onChange={() => toggleColumnVisibility("action")}
                                                   className="mr-2"
                                                 />
                                                 User name
                                               </label>
                                               <label className="flex items-end">
                                                 <input
                                                   type="checkbox"
                                                   checked={columns.action}
                                                   onChange={() => toggleColumnVisibility("action")}
                                                   className="mr-2"
                                                 />
                                                 Class
                                               </label>
                                               <label className="flex items-end">
                                                 <input
                                                   type="checkbox"
                                                   checked={columns.action}
                                                   onChange={() => toggleColumnVisibility("action")}
                                                   className="mr-2"
                                                 />
                                                 Father Name
                                               </label>
                                               <label className="flex items-end">
                                                 <input
                                                   type="checkbox"
                                                   checked={columns.action}
                                                   onChange={() => toggleColumnVisibility("action")}
                                                   className="mr-2"
                                                 />
                                                 Mobile Number
                                               </label>
                                               <label className="flex items-end">
                                                 <input
                                                   type="checkbox"
                                                   checked={columns.action}
                                                   onChange={() => toggleColumnVisibility("action")}
                                                   className="mr-2"
                                                 />
                                                 Action
                                               </label>
                                             </div>
                                           </div>
                                         )}

          {statusMessage && (
            <div className="mb-4 p-2 text-white bg-green-500 rounded">
              {statusMessage}
            </div>
          )}

          <div className="overflow-auto bg-white shadow-md rounded dark:text-white dark:bg-gray-800">
            <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-800">
              <thead className="bg-gray-200 dark:bg-gray-800 dark:text-white">
                <tr>
                  {activeModule === 'staff' && (
                    <>
                      <th className="border p-2">Staff ID</th>
                      <th className="border p-2">Name</th>
                      <th className="border p-2">Email</th>
                      <th className="border p-2">Role</th>
                      <th className="border p-2">Designation</th>
                      <th className="border p-2">Department</th>
                      <th className="border p-2">Phone</th>
                    </>
                  )}
                  {activeModule === 'students' && (
                    <>
                      <th className="border p-2">Admission No</th>
                      <th className="border p-2">Student Name</th>
                      <th className="border p-2">Username</th>
                      <th className="border p-2">Class</th>
                      <th className="border p-2">Father Name</th>
                      <th className="border p-2">Mobile Number</th>
                    </>
                  )}
                  {activeModule === 'parents' && (
                    <>
                      <th className="border p-2">Guardian Name</th>
                      <th className="border p-2">Guardian Phone</th>
                      <th className="border p-2">Username</th>
                    </>
                  )}
                  <th className="border p-2">Action</th>
                </tr>
              </thead>
              <tbody>{renderTable()}</tbody>
            </table>
          </div>

          <div className="flex justify-between items-center mt-4">
            <span>
              Records {indexOfFirstRecord + 1} to {Math.min(indexOfLastRecord, filteredData.length)} of {filteredData.length}
            </span>
            <div className="flex">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  className={`px-3 py-1 border ${
                    currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'
                  }`}
                  onClick={() => handlePageChange(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;






