
import React, { useState } from "react";
import {  FaTrash } from "react-icons/fa";
import { FaPen, FaUserShield, FaFilePdf, FaFileWord, FaFileExcel, FaCopy, FaPrint, FaColumns } from "react-icons/fa";
const SessionManagement = () => {
  const [sessionName, setSessionName] = useState("");
  const [sessions, setSessions] = useState([
    { id: 1, name: "2016-17", status: "" },
    { id: 2, name: "2017-18", status: "" },
    { id: 3, name: "2018-19", status: "" },
    { id: 4, name: "2019-20", status: "" },
    { id: 5, name: "2020-21", status: "" },
    { id: 6, name: "2021-22", status: "" },
    { id: 7, name: "2022-23", status: "" },
    { id: 8, name: "2023-24", status: "Active" },
    { id: 9, name: "2024-25", status: "" },
    { id: 10, name: "2025-26", status: "" },
  ]);
  const [editingSession, setEditingSession] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSave = () => {
    if (!sessionName.trim()) return;

    if (editingSession) {
      setSessions(
        sessions.map((session) =>
          session.id === editingSession.id
            ? { ...session, name: sessionName }
            : session
        )
      );
      setEditingSession(null);
    } else {
      setSessions([
        ...sessions,
        { id: Date.now(), name: sessionName, status: "" },
      ]);
    }
    setSessionName("");
  };

  const handleEdit = (session) => {
    setEditingSession(session);
    setSessionName(session.name);
  };

  const handleDelete = (id) => {
    setSessions(sessions.filter((session) => session.id !== id));
  };

  const filteredSessions = sessions.filter((session) =>
    session.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

   const [columns, setColumns] = useState({
      session: true,
      status: true,
      action: true,
    });
  const [showColumnOptions, setShowColumnOptions] = useState(false); // To toggle the column options
  
  const toggleColumnVisibility = (column) => {
    setColumns((prevColumns) => ({
      ...prevColumns,
      [column]: !prevColumns[column],
    }));
  };
  return (
    <div className="container mx-auto p-4 flex space-x-4 dark:bg-gray-800 dark:text-white">
      {/* Left Section */}
      <div className="w-1/3 border border-gray-300 p-4 rounded-lg bg-white shadow-md dark:bg-gray-900 dark:border-gray-700">
        <h2 className="text-xl font-bold mb-4">Add Session</h2>
        <div className="mb-4">
          <label
            htmlFor="session"
            className="block text-sm font-medium text-gray-700 dark:text-white mb-1"
          >
            Session *
          </label>
          <input
            type="text"
            id="session"
            value={sessionName}
            onChange={(e) => setSessionName(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-700"
            placeholder="Enter session name"
          />
        </div>
        <button
          onClick={handleSave}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          {editingSession ? "Update Session" : "Save Session"}
        </button>
      </div>

      {/* Right Section */}
      <div className="w-2/3 border border-gray-300 p-4 rounded-lg bg-white shadow-md dark:bg-gray-900 dark:border-gray-700">
        <h2 className="text-xl font-bold mb-4">Session List</h2>
        <div className="flex items-center justify-between space-x-4 mb-6">
                 <input
                   type="text"
                   value={searchTerm}
                   onChange={handleSearchChange}
                   placeholder="Search Role..."
                   className="p-2 border border-gray-300 rounded-lg w-1/3"
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
                                   Session
                                 </label>
                                 <label className="flex items-center">
                                   <input
                                     type="checkbox"
                                     checked={columns.status}
                                     onChange={() => toggleColumnVisibility("type")}
                                     className="mr-2"
                                   />
                                   Status
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
                   
        
        <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-700">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2 dark:border-gray-700">
                Session
              </th>
              <th className=" border border-gray-300 px-4 py-2 dark:border-gray-700">
                Status
              </th>
              <th className=" flex justify-end border border-gray-300 px-4 py-2 dark:border-gray-700">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
  {filteredSessions.map((session) => (
    <tr
      key={session.id}
      className="odd:bg-gray-100 dark:odd:bg-gray-700"
    >
      <td className="px-4 py-2 dark:border-gray-700">
        {session.name}
      </td>
      <td className="px-4 py-2 dark:border-gray-700">
        <div
          className={`${
            session.status === "Active"
              ? "bg-green-500 text-white  py-1 rounded text-center"
              : "text-gray-500"
          }`}
        >
          {session.status || ""}
        </div>
      </td>
      <td className="px-4 py-2 dark:border-gray-700 flex justify-end space-x-4">
        <button
          onClick={() => handleEdit(session)}
          className="text-blue-500 hover:text-blue-700"
        >
          <FaPen />
        </button>
        <button
          onClick={() => handleDelete(session.id)}
          className="text-red-500 hover:text-red-700"
        >
          <FaTrash />
        </button>
      </td>
    </tr>
  ))}
</tbody>

        </table>
      </div>
    </div>
  );
};

export default SessionManagement;





