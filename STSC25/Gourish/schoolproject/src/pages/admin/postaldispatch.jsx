import React, { useState } from "react";
import {
  FaFilePdf,
  FaFileExcel,
  FaPrint,
  FaFileWord,
  FaTrash,
  FaEdit,
  FaCopy,  // Added Copy Icon
  FaColumns // Added Columns Icon
} from "react-icons/fa";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";

const PostalDispatch = () => {
  const [dispatchList, setDispatchList] = useState([]);
  const [newDispatch, setNewDispatch] = useState({
    toTitle: "",
    referenceNo: "",
    address: "",
    note: "",
    fromTitle: "",
    date: "",
    document: null,
  });
  const [editId, setEditId] = useState(null);
  const [filter, setFilter] = useState("");

  // Handle Add or Update
  const handleAddOrUpdateDispatch = () => {
    if (
      newDispatch.toTitle &&
      newDispatch.referenceNo &&
      newDispatch.fromTitle &&
      newDispatch.date
    ) {
      if (editId !== null) {
        // Update the record
        setDispatchList((prevList) =>
          prevList.map((dispatch) =>
            dispatch.id === editId ? { ...newDispatch, id: editId } : dispatch
          )
        );
        setEditId(null);
      } else {
        // Add new record
        setDispatchList([ ...dispatchList, { ...newDispatch, id: dispatchList.length + 1 } ]);
      }
      // Reset form
      setNewDispatch({
        toTitle: "",
        referenceNo: "",
        address: "",
        note: "",
        fromTitle: "",
        date: "",
        document: null,
      });
    } else {
      alert("Please fill in the required fields (To Title, Reference No, From Title, and Date).");
    }
  };

  // Handle Document Upload
  const handleDocumentUpload = (e) => {
    const file = e.target.files[0];
    setNewDispatch({ ...newDispatch, document: file });
  };

  // Handle Edit
  const handleEdit = (id) => {
    const dispatchToEdit = dispatchList.find((dispatch) => dispatch.id === id);
    if (dispatchToEdit) {
      setNewDispatch(dispatchToEdit);
      setEditId(id);
    }
  };

  // Handle Delete
  const handleDelete = (id) => {
    setDispatchList(dispatchList.filter((dispatch) => dispatch.id !== id));
  };

  // Filter Records
  const filteredDispatchList = dispatchList.filter((dispatch) =>
    dispatch.toTitle.toLowerCase().includes(filter.toLowerCase())
  );

  // Export to PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Postal Dispatch List", 20, 10);
    const tableColumn = [
      "To Title",
      "Reference No",
      "Address",
      "Note",
      "From Title",
      "Date",
      "Document",
    ];
    const tableRows = filteredDispatchList.map((dispatch) => [
      dispatch.toTitle,
      dispatch.referenceNo,
      dispatch.address,
      dispatch.note,
      dispatch.fromTitle,
      dispatch.date,
      dispatch.document ? dispatch.document.name : "No File",
    ]);
    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.save("postal-dispatch-list.pdf");
  };

  // Export to Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      filteredDispatchList.map((dispatch) => ({
        "To Title": dispatch.toTitle,
        "Reference No": dispatch.referenceNo,
        Address: dispatch.address,
        Note: dispatch.note,
        "From Title": dispatch.fromTitle,
        Date: dispatch.date,
        Document: dispatch.document ? dispatch.document.name : "No File",
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Postal Dispatch List");
    XLSX.writeFile(workbook, "postal-dispatch-list.xlsx");
  };

  // Export to DOC
  const exportToDOC = () => {
    const content = filteredDispatchList
      .map(
        (dispatch) =>
          `To Title: ${dispatch.toTitle}\nReference No: ${dispatch.referenceNo}\nAddress: ${dispatch.address}\nNote: ${dispatch.note}\nFrom Title: ${dispatch.fromTitle}\nDate: ${dispatch.date}\nDocument: ${
            dispatch.document ? dispatch.document.name : "No File"
          }\n`
      )
      .join("\n\n");
    const blob = new Blob([content], { type: "application/msword" });
    saveAs(blob, "postal-dispatch-list.doc");
  };

  // Print List
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="container mx-auto p-4 dark:bg-gray-800 dark:text-white">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Postal Dispatch</h1>
        <div className="flex space-x-2">
          <button onClick={exportToPDF} className="text-gray-500 dark:text-red-500">
            <FaFilePdf size={20} />
          </button>
          <button onClick={exportToExcel} className="text-gray-500 dark:text-green-500">
            <FaFileExcel size={20} />
          </button>
          <button onClick={exportToDOC} className="text-gray-500 dark:text-blue-500">
            <FaFileWord size={20} />
          </button>
          <button onClick={handlePrint} className="text-gray-700">
            <FaPrint size={20} />
          </button>
          <button className="text-gray-700">
            <FaCopy size={20} /> {/* Added Copy Icon */}
          </button>
          <button className="text-gray-700">
            <FaColumns size={20} /> {/* Added Columns Icon */}
          </button>
        </div>
      </div>

      <div className="flex">
        {/* Left Section - Form */}
        <div className="w-full sm:w-1/3 pr-4 mb-4 border p-4 rounded-lg bg-gray-100 dark:bg-gray-700">
          <div className="mb-2">
            <label className="block text-sm">To Title *</label>
            <input
              type="text"
              value={newDispatch.toTitle}
              onChange={(e) =>
                setNewDispatch({ ...newDispatch, toTitle: e.target.value })
              }
              className="border p-2 w-full text-sm rounded dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm">Reference No *</label>
            <input
              type="text"
              value={newDispatch.referenceNo}
              onChange={(e) =>
                setNewDispatch({ ...newDispatch, referenceNo: e.target.value })
              }
              className="border p-2 w-full text-sm rounded dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm">Address</label>
            <input
              type="text"
              value={newDispatch.address}
              onChange={(e) =>
                setNewDispatch({ ...newDispatch, address: e.target.value })
              }
              className="border p-2 w-full text-sm rounded dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm">Note</label>
            <textarea
              value={newDispatch.note}
              onChange={(e) =>
                setNewDispatch({ ...newDispatch, note: e.target.value })
              }
              className="border p-2 w-full text-sm rounded dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm">From Title *</label>
            <input
              type="text"
              value={newDispatch.fromTitle}
              onChange={(e) =>
                setNewDispatch({ ...newDispatch, fromTitle: e.target.value })
              }
              className="border p-2 w-full text-sm rounded dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm">Date *</label>
            <input
              type="date"
              value={newDispatch.date}
              onChange={(e) =>
                setNewDispatch({ ...newDispatch, date: e.target.value })
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
            {newDispatch.document && (
              <p className="mt-1 text-xs">
                Selected: {newDispatch.document.name}
              </p>
            )}
          </div>
          <button
            onClick={handleAddOrUpdateDispatch}
            className="bg-blue-500 text-white p-2 text-sm rounded"
          >
            {editId !== null ? "Update Postal Dispatch" : "Add Postal Dispatch"}
          </button>
        </div>

        {/* Right Section - Table */}
        <div className="w-full sm:w-2/3 border p-4 rounded-lg bg-gray-100 dark:bg-gray-700">
          <h2 className="text-xl font-semibold mb-4">Postal Dispatch List</h2>
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
                <th className="border p-2">To Title</th>
                <th className="border p-2">Reference No</th>
                <th className="border p-2">Address</th>
                <th className="border p-2">Note</th>
                <th className="border p-2">From Title</th>
                <th className="border p-2">Date</th>
                <th className="border p-2">Document</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDispatchList.length > 0 ? (
                filteredDispatchList.map((dispatch) => (
                  <tr key={dispatch.id}>
                    <td className="border p-2">{dispatch.toTitle}</td>
                    <td className="border p-2">{dispatch.referenceNo}</td>
                    <td className="border p-2">{dispatch.address}</td>
                    <td className="border p-2">{dispatch.note}</td>
                    <td className="border p-2">{dispatch.fromTitle}</td>
                    <td className="border p-2">{dispatch.date}</td>
                    <td className="border p-2">
                      {dispatch.document ? dispatch.document.name : "No File"}
                    </td>
                    <td className="border p-2 flex space-x-2 justify-center">
                      <button
                        onClick={() => handleEdit(dispatch.id)}
                        className="text-blue-500"
                      >
                        <FaEdit size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(dispatch.id)}
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

export default PostalDispatch;
