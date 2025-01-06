import React, { useState } from "react";
import {
  FaFilePdf,
  FaFileExcel,
  FaPrint,
  FaFileWord,
  FaTrash,
  FaEdit,
  FaCopy,
  FaColumns,
} from "react-icons/fa";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";

const PostalReceive = () => {
  const [receiveList, setReceiveList] = useState([]);
  const [newReceive, setNewReceive] = useState({
    fromTitle: "",
    referenceNo: "",
    address: "",
    note: "",
    toTitle: "",
    date: "",
    document: null,
  });
  const [editId, setEditId] = useState(null);
  const [filter, setFilter] = useState("");

  // Handle Add or Update
  const handleAddOrUpdateReceive = () => {
    if (
      newReceive.fromTitle &&
      newReceive.referenceNo &&
      newReceive.toTitle &&
      newReceive.date
    ) {
      if (editId !== null) {
        // Update the record
        setReceiveList((prevList) =>
          prevList.map((receive) =>
            receive.id === editId ? { ...newReceive, id: editId } : receive
          )
        );
        setEditId(null);
      } else {
        // Add new record
        setReceiveList([ ...receiveList, { ...newReceive, id: receiveList.length + 1 } ]);
      }
      // Reset form
      setNewReceive({
        fromTitle: "",
        referenceNo: "",
        address: "",
        note: "",
        toTitle: "",
        date: "",
        document: null,
      });
    } else {
      alert("Please fill in the required fields (From Title, Reference No, To Title, and Date).");
    }
  };

  // Handle Document Upload
  const handleDocumentUpload = (e) => {
    const file = e.target.files[0];
    setNewReceive({ ...newReceive, document: file });
  };

  // Handle Edit
  const handleEdit = (id) => {
    const receiveToEdit = receiveList.find((receive) => receive.id === id);
    if (receiveToEdit) {
      setNewReceive(receiveToEdit);
      setEditId(id);
    }
  };

  // Handle Delete
  const handleDelete = (id) => {
    setReceiveList(receiveList.filter((receive) => receive.id !== id));
  };

  // Filter Records
  const filteredReceiveList = receiveList.filter((receive) =>
    receive.fromTitle.toLowerCase().includes(filter.toLowerCase())
  );

  // Export to PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Postal Receive List", 20, 10);
    const tableColumn = [
      "From Title",
      "Reference No",
      "Address",
      "Note",
      "To Title",
      "Date",
      "Document",
    ];
    const tableRows = filteredReceiveList.map((receive) => [
      receive.fromTitle,
      receive.referenceNo,
      receive.address,
      receive.note,
      receive.toTitle,
      receive.date,
      receive.document ? receive.document.name : "No File",
    ]);
    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.save("postal-receive-list.pdf");
  };

  // Export to Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      filteredReceiveList.map((receive) => ({
        "From Title": receive.fromTitle,
        "Reference No": receive.referenceNo,
        Address: receive.address,
        Note: receive.note,
        "To Title": receive.toTitle,
        Date: receive.date,
        Document: receive.document ? receive.document.name : "No File",
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Postal Receive List");
    XLSX.writeFile(workbook, "postal-receive-list.xlsx");
  };

  // Export to DOC
  const exportToDOC = () => {
    const content = filteredReceiveList
      .map(
        (receive) =>
          `From Title: ${receive.fromTitle}\nReference No: ${receive.referenceNo}\nAddress: ${receive.address}\nNote: ${receive.note}\nTo Title: ${receive.toTitle}\nDate: ${receive.date}\nDocument: ${
            receive.document ? receive.document.name : "No File"
          }\n`
      )
      .join("\n\n");
    const blob = new Blob([content], { type: "application/msword" });
    saveAs(blob, "postal-receive-list.doc");
  };

  // Print List
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="container mx-auto p-4 dark:bg-gray-800 dark:text-white">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Add Postal Receive</h1>
        <div className="flex space-x-2">
          <button onClick={exportToPDF} className="text-gray-500 dark:text-red-500">
            <FaFilePdf size={20} />
          </button>
          <button onClick={exportToExcel} className="text-gray-500 dark:text-green-500">
            <FaFileExcel size={20} />
          </button>
          <button onClick={exportToDOC} className="text-gray-500 dark;text-blue-500">
            <FaFileWord size={20} />
          </button>
          <button onClick={handlePrint} className="text-gray-700">
            <FaPrint size={20} />
          </button>
          <button className="text-gray-700">
            <FaCopy size={20} />
          </button>
          <button className="text-gray-700">
            <FaColumns size={20} />
          </button>
        </div>
      </div>

      <div className="flex">
        {/* Left Section - Form */}
        <div className="w-full sm:w-1/3 pr-4 mb-4 border p-4 rounded-lg bg-gray-100 dark:bg-gray-700">
          <div className="mb-2">
            <label className="block text-sm">From Title *</label>
            <input
              type="text"
              value={newReceive.fromTitle}
              onChange={(e) =>
                setNewReceive({ ...newReceive, fromTitle: e.target.value })
              }
              className="border p-2 w-full text-sm rounded dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm">Reference No *</label>
            <input
              type="text"
              value={newReceive.referenceNo}
              onChange={(e) =>
                setNewReceive({ ...newReceive, referenceNo: e.target.value })
              }
              className="border p-2 w-full text-sm rounded dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm">Address</label>
            <input
              type="text"
              value={newReceive.address}
              onChange={(e) =>
                setNewReceive({ ...newReceive, address: e.target.value })
              }
              className="border p-2 w-full text-sm rounded dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm">Note</label>
            <textarea
              value={newReceive.note}
              onChange={(e) =>
                setNewReceive({ ...newReceive, note: e.target.value })
              }
              className="border p-2 w-full text-sm rounded dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm">To Title *</label>
            <input
              type="text"
              value={newReceive.toTitle}
              onChange={(e) =>
                setNewReceive({ ...newReceive, toTitle: e.target.value })
              }
              className="border p-2 w-full text-sm rounded dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm">Date *</label>
            <input
              type="date"
              value={newReceive.date}
              onChange={(e) =>
                setNewReceive({ ...newReceive, date: e.target.value })
              }
              className="border p-2 w-full text-sm rounded dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm">Attach Document</label>
            <input
              type="file"
              onChange={handleDocumentUpload}
              className="border p-2 w-full text-sm rounded dark:bg-gray-700 dark:text-white"
            />
            {newReceive.document && (
              <p className="mt-1 text-xs">
                Selected: {newReceive.document.name}
              </p>
            )}
          </div>
          <button
            onClick={handleAddOrUpdateReceive}
            className="bg-blue-500 text-white p-2 text-sm rounded"
          >
            {editId !== null ? "Update Postal Receive" : "Add Postal Receive"}
          </button>
        </div>

        {/* Right Section - List */}
        <div className="w-full sm:w-2/3 border p-4 rounded-lg bg-gray-100 dark:bg-gray-700">

          <h2 className="text-xl font-semibold mb-4">Postal Receive List</h2>
          <input
            type="text"
            placeholder="Search..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border mb-2 p-2 text-sm rounded dark:bg-gray-700 dark:text-white"
          />
          <table className="table-auto w-full border-collapse border text-sm">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700">
                <th className="border p-2">From Title</th>
                <th className="border p-2">Reference No</th>
                <th className="border p-2">Address</th>
                <th className="border p-2">Note</th>
                <th className="border p-2">To Title</th>
                <th className="border p-2">Date</th>
                <th className="border p-2">Document</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredReceiveList.length > 0 ? (
                filteredReceiveList.map((receive) => (
                  <tr key={receive.id}>
                    <td className="border p-2">{receive.fromTitle}</td>
                    <td className="border p-2">{receive.referenceNo}</td>
                    <td className="border p-2">{receive.address}</td>
                    <td className="border p-2">{receive.note}</td>
                    <td className="border p-2">{receive.toTitle}</td>
                    <td className="border p-2">{receive.date}</td>
                    <td className="border p-2">
                      {receive.document ? receive.document.name : "No File"}
                    </td>
                    <td className="border p-2 flex space-x-2 justify-center">
                      <button
                        onClick={() => handleEdit(receive.id)}
                        className="text-blue-500"
                      >
                        <FaEdit size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(receive.id)}
                        className="text-red-500"
                      >
                        <FaTrash size={14} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center p-2">
                    No data available in table.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PostalReceive;
