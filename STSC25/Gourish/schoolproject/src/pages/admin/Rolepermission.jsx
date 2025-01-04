
import React, { useState } from "react";
import { FaPen, FaUserShield, FaFilePdf, FaFileWord, FaFileExcel, FaCopy, FaPrint, FaColumns } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const RoleManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState(null); // State to track selected role for editing
  const [roles, setRoles] = useState([
    { id: 1, name: "Admin", type: "System" },
    { id: 2, name: "Teacher", type: "System" },
    { id: 3, name: "Accountant", type: "System" },
    { id: 4, name: "Librarian", type: "System" },
    { id: 5, name: "Receptionist", type: "System" },
    { id: 6, name: "Super Admin", type: "System" },
  ]);

  const [columns, setColumns] = useState({
    role: true,
    type: true,
    action: true,
  });

  const [showColumnOptions, setShowColumnOptions] = useState(false); // To toggle the column options

  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredRoles = roles.filter((role) =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const navigateToPermissions = (roleName) => {
    navigate(`/admin/${roleName.toLowerCase()}-permission`);
  };

  const handleEditRole = (role) => {
    setSelectedRole(role);
  };

  const handleSaveRole = () => {
    if (selectedRole) {
      setRoles((prevRoles) =>
        prevRoles.map((role) =>
          role.id === selectedRole.id ? selectedRole : role
        )
      );
      setSelectedRole(null); // Clear the selected role after saving
    }
  };

  const toggleColumnVisibility = (column) => {
    setColumns((prevColumns) => ({
      ...prevColumns,
      [column]: !prevColumns[column],
    }));
  };

  return (
    <div className="container mx-auto p-4 flex dark:bg-gray-800 dark:text-white">
      {/* Left Frame (Role Edit) */}
      <div className="w-1/4 border-r border-gray-300 p-4 bg-white shadow-md rounded mb-42 dark:bg-gray-800 dark:border-gray-600 dark:text-white">
        <h2 className="text-xl font-bold mb-4">Role</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="mb-4">
            <label htmlFor="roleName" className="block text-sm font-medium text-gray-700 mb-1 dark:text-white">
              Name *
            </label>
            <input
              type="text"
              id="roleName"
              name="roleName"
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Enter role name"
              required
              value={selectedRole ? selectedRole.name : ""}
              onChange={(e) => setSelectedRole({ ...selectedRole, name: e.target.value })}
            />
          </div>
          <button
            type="submit"
            onClick={handleSaveRole}
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500"
          >
            {selectedRole ? "Save Changes" : "Save Role"}
          </button>
        </form>
      </div>

      {/* Right Frame (Role Table) */}
      <div className="w-3/4 p-4 bg-white shadow-md rounded-lg ml-4 relative dark:bg-gray-800 dark:border-gray-600 dark:text-white">
        <h1 className="text-2xl font-bold mb-4">Role Management</h1>
        <div className="flex items-center justify-between space-x-4 mb-6">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search Role..."
            className="p-2 border border-gray-300 rounded-lg w-1/3 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <div className="flex space-x-2">
            <FaFilePdf
              className="text-red-500 cursor-pointer hover:text-red-700"
              title="Download PDF"
              size={20}
            />
            <FaFileWord
              className="text-blue-500 cursor-pointer hover:text-blue-700"
              title="Download Word"
              size={20}
            />
            <FaFileExcel
              className="text-green-500 cursor-pointer hover:text-green-700"
              title="Download Excel"
              size={20}
            />
            <FaCopy
              className="text-gray-500 cursor-pointer hover:text-gray-700"
              title="Copy"
              size={20}
            />
            <FaPrint
              className="text-black cursor-pointer hover:text-gray-700"
              title="Print"
              size={20}
            />
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
          <div className="absolute right-0 rounded-lg shadow-md bg-gray-100 w-full sm:w-40 flex flex-col dark:bg-gray-700 dark:text-white">
            <h2 className="text-lg font-semibold mb-2">Select Columns to Show</h2>
            <div className="flex flex-col space-y-2 justify-end">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={columns.role}
                  onChange={() => toggleColumnVisibility("role")}
                  className="mr-2"
                />
                Role
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={columns.type}
                  onChange={() => toggleColumnVisibility("type")}
                  className="mr-2"
                />
                Type
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

        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-600">
            <thead>
              <tr>
                {columns.role && <th className="border-gray-300 px-4 py-2 text-left dark:border-gray-600 dark:text-white">Role</th>}
                {columns.type && <th className="border-gray-300 px-4 py-2 text-left dark:border-gray-600 dark:text-white">Type</th>}
                {columns.action && <th className="border-gray-300 px-4 py-2 text-end dark:border-gray-600 dark:text-white">Action</th>}
              </tr>
            </thead>
            <tbody>
              {filteredRoles.map((role) => (
                <tr key={role.id} className="odd:bg-gray-100 dark:odd:bg-gray-700">
                  {columns.role && <td className="border-gray-300 px-4 py-2 text-left dark:border-gray-600 dark:text-white">{role.name}</td>}
                  {columns.type && <td className="border-gray-300 px-4 py-2 dark:border-gray-600 dark:text-white">{role.type}</td>}
                  {columns.action && (
                    <td className="border-gray-300 px-4 py-2 flex justify-end space-x-4 dark:border-gray-600 dark:text-white">
                      <button
                        className="text-blue-500 hover:text-blue-700 flex items-end"
                        title="Assign Permissions"
                        onClick={() => navigateToPermissions(role.name)}
                      >
                        <FaUserShield className="mr-1" />
                      </button>
                      <button
                        className="text-green-500 hover:text-green-700 flex items-end"
                        title="Edit Role"
                        onClick={() => handleEditRole(role)}
                      >
                        <FaPen className="mr-1" />
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RoleManagement;



