import React, { useState } from "react";
import {
  FaFilePdf,
  FaFileExcel,
  FaFileWord,
  FaPrint,
  FaEdit,
  FaTrash,
  FaCopy,
  FaColumns,
} from "react-icons/fa";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";

const PhoneCallLog = () => {
  const [phoneLogs, setPhoneLogs] = useState([
    {
      id: 1,
      name: "John Doe",
      phone: "123-456-7890",
      date: "12/17/2024",
      nextFollowUp: "12/20/2024",
      callType: "Incoming",
      callDuration: "5 min",
      note: "Discussed project details.",
    },
  ]);

  const [newCallLog, setNewCallLog] = useState({
    name: "",
    phone: "",
    date: "",
    nextFollowUp: "",
    callType: "Incoming",
    callDuration: "",
    note: "",
  });

  const [filter, setFilter] = useState({
    name: "",
    phone: "",
    size: "All", // Added for size filtering
  });

  const handleAddCallLog = () => {
    if (
      newCallLog.name &&
      newCallLog.phone &&
      newCallLog.date &&
      newCallLog.nextFollowUp &&
      newCallLog.callDuration
    ) {
      setPhoneLogs([...phoneLogs, { ...newCallLog, id: phoneLogs.length + 1 }]);
      setNewCallLog({
        name: "",
        phone: "",
        date: "",
        nextFollowUp: "",
        callType: "Incoming",
        callDuration: "",
        note: "",
      });
    } else {
      alert("Please fill in all required fields.");
    }
  };

  const filteredPhoneLogs = phoneLogs.filter(
    (log, index) =>
      log.name.toLowerCase().includes(filter.name.toLowerCase()) &&
      log.phone.toLowerCase().includes(filter.phone.toLowerCase()) &&
      (filter.size === "100" ? index < 100 : true)
  );

  // Export to PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Phone Call Log", 20, 10);
    const tableColumn = [
      "Name",
      "Phone",
      "Date",
      "Next Follow Up Date",
      "Call Type",
      "Call Duration",
      "Note",
    ];
    const tableRows = filteredPhoneLogs.map((log) => [
      log.name,
      log.phone,
      log.date,
      log.nextFollowUp,
      log.callType,
      log.callDuration,
      log.note,
    ]);
    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.save("phone-call-log.pdf");
  };

  // Export to Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredPhoneLogs);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Phone Call Log");
    XLSX.writeFile(workbook, "phone-call-log.xlsx");
  };

  // Export to DOC
  const exportToDOC = () => {
    const content = filteredPhoneLogs
      .map(
        (log) =>
          `Name: ${log.name}, Phone: ${log.phone}, Date: ${log.date}, Next Follow Up Date: ${log.nextFollowUp}, Call Type: ${log.callType}, Call Duration: ${log.callDuration}, Note: ${log.note}`
      )
      .join("\n\n");
    const blob = new Blob([content], { type: "application/msword" });
    saveAs(blob, "phone-call-log.doc");
  };

  // Handle Print
  const handlePrint = () => {
    window.print();
  };

  // Handle Edit
  const handleEdit = (id) => {
    const logToEdit = phoneLogs.find((log) => log.id === id);
    setNewCallLog(logToEdit);
  };

  // Handle Delete
  const handleDelete = (id) => {
    const updatedLogs = phoneLogs.filter((log) => log.id !== id);
    setPhoneLogs(updatedLogs);
  };

  // Handle Copy (Dummy Function)
  const handleCopy = () => {
    console.log("Copy clicked");
  };

  // Handle Column Toggle (Dummy Function)
  const handleColumnToggle = () => {
    console.log("Columns toggle clicked");
  };

  return (
    <div className="container mx-auto p-4 dark:bg-gray-800 dark:text-white">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Phone Call Log</h1>
        {/* Export and Action Icons */}
        <div className="flex flex-col items-end">
          
          <div className="flex space-x-2">
            <button
              onClick={exportToPDF}
              className="text-gray-500 dark:text-red-500"
            >
              <FaFilePdf size={24} />
            </button>
            <button
              onClick={exportToExcel}
              className="text-gray-500 dark:text-green-500"
            >
              <FaFileExcel size={24} />
            </button>
            <button
              onClick={exportToDOC}
              className="text-gray-500 dark:text-blue-500"
            >
              <FaFileWord size={24} />
            </button>
            <button onClick={handlePrint} className="text-gray-700">
              <FaPrint size={24} />
            </button>
            <button
              onClick={handleCopy}
              className="text-gray-600 hover:text-gray-800"
            >
              <FaCopy size={24} />
            </button>
            <button
              onClick={handleColumnToggle}
              className="text-gray-600 hover:text-gray-800"
            >
              <FaColumns size={24} />
            </button>
          </div>
        </div>
      </div>
      
    



      <div className="flex">
        {/* Left Section - Form */}
        <div className="w-full sm:w-1/3 pr-4 mb-4 border p-4 rounded-lg bg-gray-100 dark:bg-gray-700">

          <div className="mb-4">
            <label className="block mb-2">Name</label>
            <input
              type="text"
              value={newCallLog.name}
              onChange={(e) =>
                setNewCallLog({ ...newCallLog, name: e.target.value })
              }
              className="border p-2 w-full rounded dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Phone *</label>
            <input
              type="text"
              value={newCallLog.phone}
              onChange={(e) =>
                setNewCallLog({ ...newCallLog, phone: e.target.value })
              }
              className="border p-2 w-full rounded dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Date *</label>
            <input
              type="date"
              value={newCallLog.date}
              onChange={(e) =>
                setNewCallLog({ ...newCallLog, date: e.target.value })
              }
              className="border p-2 w-full rounded dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Next Follow Up Date</label>
            <input
              type="date"
              value={newCallLog.nextFollowUp}
              onChange={(e) =>
                setNewCallLog({ ...newCallLog, nextFollowUp: e.target.value })
              }
              className="border p-2 w-full rounded dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Call Duration</label>
            <input
              type="text"
              value={newCallLog.callDuration}
              onChange={(e) =>
                setNewCallLog({ ...newCallLog, callDuration: e.target.value })
              }
              className="border p-2 w-full rounded dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Note</label>
            <textarea
              value={newCallLog.note}
              onChange={(e) =>
                setNewCallLog({ ...newCallLog, note: e.target.value })
              }
              className="border p-2 w-full rounded dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Call Type *</label>
            <select
              value={newCallLog.callType}
              onChange={(e) =>
                setNewCallLog({ ...newCallLog, callType: e.target.value })
              }
              className="border p-2 w-full rounded dark:bg-gray-700 dark:text-white"
            >
              <option value="Incoming">Incoming</option>
              <option value="Outgoing">Outgoing</option>
            </select>
          </div>
          <button
            onClick={handleAddCallLog}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Call Log
          </button>
        </div>

        {/* Right Section - Call Log List */}
        <div className="sm:w-2/3 border p-4 rounded-lg bg-gray-100 dark:bg-gray-700">
        <div className="mb-4 flex justify-between items-center">
  {/* Search Bar on the Left */}
  <div className="flex-1 mr-4">
    <label className="block mb-1 text-sm font-medium">Search</label>
    <input
      type="text"
      placeholder="Search..."
      value={filter.name}
      onChange={(e) =>
        setFilter({ ...filter, name: e.target.value })
      }
      className=" border p-2 rounded dark:bg-gray-700 dark:text-white"
    />
  </div>

  {/* Filter Dropdown on the Right */}
  <div className="flex items-center">
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
</div>

          
          <div className="overflow-auto border rounded dark:bg-gray-800 dark:text-white">
            <table className="w-full table-auto">
              <thead className="bg-gray-200 dark:bg-gray-600">
                <tr>
                  <th className="border p-2">Name</th>
                  <th className="border p-2">Phone</th>
                  <th className="border p-2">Date</th>
                  <th className="border p-2">Next Follow Up</th>
                  <th className="border p-2">Call Type</th>
                  <th className="border p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredPhoneLogs.length > 0 ? (
                  filteredPhoneLogs.map((log) => (
                    <tr key={log.id}>
                      <td className="border p-2">{log.name}</td>
                      <td className="border p-2">{log.phone}</td>
                      <td className="border p-2">{log.date}</td>
                      <td className="border p-2">{log.nextFollowUp}</td>
                      <td className="border p-2">{log.callType}</td>
                      <td className="border p-2">
                        <button
                          className="text-blue-500"
                          onClick={() => handleEdit(log.id)}
                        >
                          <FaEdit size={18} />
                        </button>
                        <button
                          className="text-red-500 ml-2"
                          onClick={() => handleDelete(log.id)}
                        >
                          <FaTrash size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-2">
                      No data available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhoneCallLog;
