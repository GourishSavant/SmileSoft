// import React, { useState } from 'react';
// import { FaList, FaTh, FaEdit, FaTrashAlt } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';
// import AddStaff from './addstaff'; // Adjust the path if needed

// const SearchAndTabView = () => {
//   const [searchType, setSearchType] = useState('');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [viewType, setViewType] = useState('list'); // 'card' or 'list'
//   const navigate = useNavigate();

//   const handleRoleSearch = () => {
//     console.log(`Searching by Role: ${searchType}`);
//   };

//   const handleKeywordSearch = () => {
//     console.log(`Searching by Keyword: ${searchQuery}`);
//   };

//   const handleEdit = (id) => {
//     console.log(`Editing entry with ID: ${id}`);
//   };

//   const handleDelete = (id) => {
//     console.log(`Deleting entry with ID: ${id}`);
//   };

//   const sampleListData = [
//     {
//       staffId: 'ST001',
//       name: 'John Doe',
//       role: 'Admin',
//       department: 'HR',
//       designation: 'Manager',
//       mobile: '123-456-7890',
//     },
//     {
//       staffId: 'ST002',
//       name: 'Jane Smith',
//       role: 'Staff',
//       department: 'Finance',
//       designation: 'Analyst',
//       mobile: '987-654-3210',
//     },
//   ];

//   return (
//     <div className="container mx-auto p-6 dark:bg-gray-800 dark:text-white text-sm">
//       {/* Top Section */}
//       <div className="flex flex-wrap justify-between items-center mb-4">
//         <h1 className="text-base font-bold text-left">Select Criteria</h1>
//         <button
//           onClick={() => navigate("/admin/addstaff")}
//           className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
//         >
//           + Add Staff
//         </button>
//       </div>

//       {/* Search Section */}
//       <div className="flex flex-wrap justify-between gap-4 mb-4">
//         {/* Role Search */}
//         <div className="flex flex-col w-full sm:w-1/2 lg:w-1/3">
//           <label htmlFor="role" className="block text-gray-700 dark:text-white">
//             Role *
//           </label>
//           <div className="flex gap-2 mt-2">
//             <select
//               id="role"
//               value={searchType}
//               onChange={(e) => setSearchType(e.target.value)}
//               className="w-full p-2 border border-gray-300 rounded dark:bg-gray-600 dark:text-white text-sm"
//               required
//             >
//               <option value="" disabled>
//                 Select Role
//               </option>
//               <option value="Admin">Admin</option>
//               <option value="Manager">Manager</option>
//               <option value="Staff">Staff</option>
//             </select>
//             <button
//               onClick={handleRoleSearch}
//               className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
//             >
//               Search
//             </button>
//           </div>
//         </div>

//         {/* Keyword Search */}
//         <div className="flex flex-col w-full sm:w-1/2 lg:w-1/3">
//           <label htmlFor="search" className="block text-gray-700 dark:text-white">
//             Search By Keyword
//           </label>
//           <div className="flex gap-2 mt-2">
//             <input
//               type="text"
//               id="search"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               placeholder="Search by Staff ID, Name, Role, etc."
//               className="w-full p-2 border border-gray-300 rounded dark:bg-gray-600 dark:text-white text-sm"
//               required
//             />
//             <button
//               onClick={handleKeywordSearch}
//               className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
//             >
//               Search
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Tabs for Card View and List View */}
//       <div>
//         <div role="tablist" className="flex items-center gap-4 mb-4">
//           <button
//             role="tab"
//             className={`flex items-center gap-2 text-sm ${
//               viewType === 'card' ? 'text-blue-600' : 'text-gray-500 dark:text-white'
//             }`}
//             onClick={() => setViewType('card')}
//           >
//             <FaTh /> Card View
//           </button>
//           <button
//             role="tab"
//             className={`flex items-center gap-2 text-sm ${
//               viewType === 'list' ? 'text-blue-600' : 'text-gray-500 dark:text-white'
//             }`}
//             onClick={() => setViewType('list')}
//           >
//             <FaList /> List View
//           </button>
//         </div>

//         {/* Display Selected View */}
//         <div>
//           {viewType === 'card' ? (
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//               {sampleListData.map((item) => (
//                 <div
//                   key={item.staffId}
//                   className="border rounded p-4 bg-white dark:bg-gray-600 dark:text-white"
//                 >
//                   <h3 className="font-semibold text-lg">{item.name}</h3>
//                   <p className="text-sm mt-2">
//                     <strong>Role:</strong> {item.role}
//                   </p>
//                   <p className="text-sm mt-1">
//                     <strong>Department:</strong> {item.department}
//                   </p>
//                   <p className="text-sm mt-1">
//                     <strong>Designation:</strong> {item.designation}
//                   </p>
//                   <p className="text-sm mt-1">
//                     <strong>Mobile:</strong> {item.mobile}
//                   </p>
//                   <div className="mt-4 flex gap-2">
//                     <button
//                       onClick={() => handleEdit(item.staffId)}
//                       className="text-blue-600 hover:underline flex items-center gap-1"
//                     >
//                       <FaEdit /> Edit
//                     </button>
//                     <button
//                       onClick={() => handleDelete(item.staffId)}
//                       className="text-red-600 hover:underline flex items-center gap-1"
//                     >
//                       <FaTrashAlt /> Delete
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <table className="min-w-full table-auto border-collapse text-sm">
//               <thead className="dark:bg-gray-700 dark:text-white">
//                 <tr>
//                   <th className="px-4 py-2 border">Staff ID</th>
//                   <th className="px-4 py-2 border">Name</th>
//                   <th className="px-4 py-2 border">Role</th>
//                   <th className="px-4 py-2 border">Department</th>
//                   <th className="px-4 py-2 border">Designation</th>
//                   <th className="px-4 py-2 border">Mobile Number</th>
//                   <th className="px-4 py-2 border">Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {sampleListData.map((item) => (
//                   <tr key={item.staffId} className="dark:bg-gray-800 dark:text-white">
//                     <td className="px-4 py-2 border">{item.staffId}</td>
//                     <td className="px-4 py-2 border">{item.name}</td>
//                     <td className="px-4 py-2 border">{item.role}</td>
//                     <td className="px-4 py-2 border">{item.department}</td>
//                     <td className="px-4 py-2 border">{item.designation}</td>
//                     <td className="px-4 py-2 border">{item.mobile}</td>
//                     <td className="px-4 py-2 border flex gap-2">
//                       <button
//                         onClick={() => handleEdit(item.staffId)}
//                         className="text-blue-600 hover:underline flex items-center gap-1"
//                       >
//                         <FaEdit /> Edit
//                       </button>
//                       <button
//                         onClick={() => handleDelete(item.staffId)}
//                         className="text-red-600 hover:underline flex items-center gap-1"
//                       >
//                         <FaTrashAlt /> Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SearchAndTabView;




import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaPen } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faThList } from '@fortawesome/free-solid-svg-icons';
import axiosApi from "../../api/axiosApi.jsx";

const StaffManagement = () => {
  const [role, setRole] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [viewMode, setViewMode] = useState('card');
  const [staffData, setStaffData] = useState([]);
  const [loading, setLoading] = useState(true); // For loading state
  const navigate = useNavigate();
  // // Sample staff data
  // const staffData = [
  //   { id: 1, name: 'Gourish Savant', role: 'Super Admin', staffId: '9000', phone: '09591166883' },
  //   { id: 2, name: 'Gourish', role: 'Teacher', staffId: '12', phone: '09591166883' },
  //   { id: 3, name: 'John Doe', role: 'Admin', staffId: '3', phone: '09591166884' },
  // ];

  // const roleMapping = {
  //   1: 'Super Admin',
  //   2: 'Admin',
  //   3: 'Teacher'
  // };
// Fetch staff data from backend
 // Fetch staff data from the backend
 useEffect(() => {
  const fetchStaffData = async () => {
    setLoading(true);
    try {
      const response = await axiosApi.get('/auth/getAllStaff'); // API endpoint
      setStaffData(response.data); // Set fetched data to state
      console.log('Fetched Staff Data:', response.data); // Debugging
    } catch (error) {
      console.error('Error fetching staff data:', error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  fetchStaffData();
}, []);

// Filtered staff based on role and search keyword
// const filteredStaff = staffData.filter(
//   (staff) =>
//     (role === '' || staff.role?.toLowerCase() === role.toLowerCase()) &&
//     (staff.name?.toLowerCase().includes(searchKeyword.toLowerCase()) || staff.staffId?.includes(searchKeyword))
// );


  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white dark:bg-gray-800 shadow-md p-4 rounded-md">
        <h1 className="text-2xl font-bold mb-6">Staff Management</h1>

        <div className="flex justify-between items-center mb-4">
          {/* Filters */}
          <div className="flex gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Role *</label>
              <select
                className="w-40 border rounded px-3 py-2"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="">Select</option>
                <option value="Super Admin">Super Admin</option>
                <option value="Teacher">Teacher</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Search By Keyword</label>
              <input
                type="text"
                className="w-40 border rounded px-3 py-2"
                placeholder="Search by Staff ID, Name, Role"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-4 mt-5">
            <button
              type="button"
              className="px-6 py-2 bg-blue-500 text-white font-semibold rounded shadow hover:bg-blue-600 transition"
            >
              Search
            </button>
            
          </div>
          </div>

          {/* Search and Add Staff */}
          <div className="flex items-center gap-4">
           
            <button
              type="button"
              className="px-6 py-2 bg-green-500 text-white font-semibold rounded shadow hover:bg-green-600 transition"
              onClick={() => navigate('/admin/staff/create')} // Navigate to create staff page
            >
              + Add Staff
            </button>
          </div>
        </div>

        {/* Tabs with Font Awesome Icons */}
        <div className="flex space-x-4 mb-6">
          
          <button
            className={`px-4 py-2 flex items-center ${
              viewMode === 'card'
                ? 'border-b-2 border-orange-500 text-orange-500'
                : 'text-gray-600 dark:text-white'
            }`}
            onClick={() => setViewMode('card')}
          >
            <FontAwesomeIcon icon={faThList} className="mr-2" /> Card View
          </button>
          <button
            className={`px-4 py-2 flex items-center ${
              viewMode === 'list'
                ? 'border-b-2 border-orange-500 text-orange-500'
                : 'text-gray-600 dark:text-white'
            }`}
            onClick={() => setViewMode('list')}
          >
            <FontAwesomeIcon icon={faList} className="mr-2" /> List View
          </button>
        </div>

        {/* Display Staff */}
        <div>
          {viewMode === 'card' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {staffData.map((staff) => (
                <div
                  key={staff.id}
                  className="bg-white border rounded shadow p-4 relative group hover:shadow-lg transition-all"
                >
                  <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center mb-4 text-white text-2xl font-semibold mx-auto">
                    {staff.first_name.split(' ').map((word) => word[0]).join('')}
                  </div>
                  <h3 className="text-xl font-semibold text-center">{staff.first_name}</h3>
                  <p className="text-sm text-center">Role: {staff.role}</p>
                  <p className="text-sm text-center">Staff ID: {staff.staff_id}</p>
                  <p className="text-sm text-center">Phone: {staff.phone_no}</p>

                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      className="flex items-center justify-center w-10 h-10 bg-blue-500 text-white rounded-full mx-2 hover:bg-blue-600"
                      onClick={() => navigate(`/admin/staff/${staff.staff_emp_id}`)} // Navigate to profile
                    >
                      <FaEye />
                    </button>
                    <button
                      className="flex items-center justify-center w-10 h-10 bg-green-500 text-white rounded-full mx-2 hover:bg-green-600"
                      onClick={() => navigate(`/admin/staff/${staff.id}/edit`)} // Navigate to edit
                    >
                      <FaPen />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead>
                <tr>
                    <th className="px-4 py-2 border-b">Staff ID</th>
                    <th className="px-4 py-2 border-b">Name</th>
                    <th className="px-4 py-2 border-b">Role</th>
                    <th className="px-4 py-2 border-b">Department</th>
                    <th className="px-4 py-2 border-b">Designation</th>
                    <th className="px-4 py-2 border-b">Mobile Number</th>
                    <th className="px-4 py-2 border-b">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {staffData.map((staff) => (
                    <tr key={staff.id}>
                     <td className="px-4 py-2 border-b">{staff.staffId}</td>
                      <td className="px-4 py-2 border-b">{staff.name}</td>
                      <td className="px-4 py-2 border-b">{staff.role}</td>
                      <td className="px-4 py-2 border-b">{staff.department}</td>
                      <td className="px-4 py-2 border-b">{staff.designation}</td>
                      <td className="px-4 py-2 border-b">{staff.phone}</td>
                      <td className="px-4 py-2 border-b flex gap-2">
                        <button
                          className="flex items-center justify-center w-8 h-8 bg-blue-500 text-white rounded-full hover:bg-blue-600"
                          onClick={() => navigate(`/admin/staff/${staff.staff_emp_id}`)} // Navigate to profile
                        >
                          <FaEye />
                        </button>
                        <button
                          className="flex items-center justify-center w-8 h-8 bg-green-500 text-white rounded-full hover:bg-green-600"
                          onClick={() => navigate(`/admin/staff/${staff.id}/edit`)} // Navigate to edit
                        >
                          <FaPen />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
    
  );
};

export default StaffManagement;
