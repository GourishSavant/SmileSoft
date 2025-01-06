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
  FaClipboard,
} from "react-icons/fa";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";

const ComplaintPage = () => {
  const [complaints, setComplaints] = useState([]);
  const [newComplaint, setNewComplaint] = useState({
    complaintType: "",
    source: "",
    complainBy: "",
    phone: "",
    date: "",
    description: "",
    actionTaken: "",
    assigned: "",
    note: "",
    document: null,
  });
  const [editId, setEditId] = useState(null);
  const [filter, setFilter] = useState("");

  // Handle Add or Update
  const handleAddOrUpdateComplaint = () => {
    if (newComplaint.complainBy && newComplaint.phone && newComplaint.date) {
      if (editId !== null) {
        // Update the record
        setComplaints((prevComplaints) =>
          prevComplaints.map((complaint) =>
            complaint.id === editId ? { ...newComplaint, id: editId } : complaint
          )
        );
        setEditId(null);
      } else {
        // Add new record
        setComplaints([ 
          ...complaints, 
          { ...newComplaint, id: complaints.length + 1 }
        ]);
      }
      // Reset form
      setNewComplaint({
        complaintType: "",
        source: "",
        complainBy: "",
        phone: "",
        date: "",
        description: "",
        actionTaken: "",
        assigned: "",
        note: "",
        document: null,
      });
    } else {
      alert("Please fill in the required fields (Complain By, Phone, and Date).");
    }
  };

  // Handle Document Upload
  const handleDocumentUpload = (e) => {
    const file = e.target.files[0];
    setNewComplaint({ ...newComplaint, document: file });
  };

  // Handle Edit
  const handleEdit = (id) => {
    const complaintToEdit = complaints.find((complaint) => complaint.id === id);
    if (complaintToEdit) {
      setNewComplaint(complaintToEdit);
      setEditId(id);
    }
  };

  // Handle Delete
  const handleDelete = (id) => {
    setComplaints(complaints.filter((complaint) => complaint.id !== id));
  };

  // Filter Records
  const filteredComplaints = complaints.filter((complaint) =>
    complaint.complainBy.toLowerCase().includes(filter.toLowerCase())
  );

  // Export to PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Complaint List", 20, 10);
    const tableColumn = [
      "Complain #",
      "Complaint Type",
      "Complain By",
      "Phone",
      "Date",
      "Action Taken",
    ];
    const tableRows = filteredComplaints.map((complaint) => [
      complaint.id,
      complaint.complaintType,
      complaint.complainBy,
      complaint.phone,
      complaint.date,
      complaint.actionTaken,
    ]);
    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.save("complaint-list.pdf");
  };

  // Export to Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      filteredComplaints.map((complaint) => ({
        "Complain #": complaint.id,
        "Complaint Type": complaint.complaintType,
        "Complain By": complaint.complainBy,
        Phone: complaint.phone,
        Date: complaint.date,
        "Action Taken": complaint.actionTaken,
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Complaint List");
    XLSX.writeFile(workbook, "complaint-list.xlsx");
  };

  // Export to DOC
  const exportToDOC = () => {
    const content = filteredComplaints
      .map(
        (complaint) =>
          `Complain #: ${complaint.id}\nComplaint Type: ${complaint.complaintType}\nComplain By: ${complaint.complainBy}\nPhone: ${complaint.phone}\nDate: ${complaint.date}\nAction Taken: ${complaint.actionTaken}\n`
      )
      .join("\n\n");
    const blob = new Blob([content], { type: "application/msword" });
    saveAs(blob, "complaint-list.doc");
  };

  // Print List
  const handlePrint = () => {
    window.print();
  };

  // Handle Copy
  const handleCopy = () => {
    const tableContent = document.querySelector("table").innerText;
    navigator.clipboard.writeText(tableContent)
      .then(() => alert("Table content copied to clipboard"))
      .catch((err) => alert("Failed to copy: " + err));
  };

  return (
    <div className="container mx-auto p-4 dark:bg-gray-800 dark:text-white">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Complaint Page</h1>
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
            <label className="block text-sm">Complaint Type</label>
            <select
              value={newComplaint.complaintType}
              onChange={(e) =>
                setNewComplaint({ ...newComplaint, complaintType: e.target.value })
              }
              className="border p-2 w-full text-sm rounded dark:bg-gray-700 dark:text-white"
            >
              <option value="">Select</option>
              <option value="Service">Service</option>
              <option value="Product">Product</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="mb-2">
            <label className="block text-sm">Source</label>
            <select
              value={newComplaint.source}
              onChange={(e) =>
                setNewComplaint({ ...newComplaint, source: e.target.value })
              }
              className="border p-2 w-full text-sm rounded dark:bg-gray-700 dark:text-white"
            >
              <option value="">Select</option>
              <option value="Website">Website</option>
              <option value="Phone">Phone</option>
              <option value="Email">Email</option>
            </select>
          </div>

          <div className="mb-2">
            <label className="block text-sm">Complain By *</label>
            <input
              type="text"
              value={newComplaint.complainBy}
              onChange={(e) =>
                setNewComplaint({ ...newComplaint, complainBy: e.target.value })
              }
              className="border p-2 w-full text-sm rounded dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div className="mb-2">
            <label className="block text-sm">Phone</label>
            <input
              type="text"
              value={newComplaint.phone}
              onChange={(e) =>
                setNewComplaint({ ...newComplaint, phone: e.target.value })
              }
              className="border p-2 w-full text-sm rounded dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div className="mb-2">
            <label className="block text-sm">Date</label>
            <input
              type="date"
              value={newComplaint.date}
              onChange={(e) =>
                setNewComplaint({ ...newComplaint, date: e.target.value })
              }
              className="border p-2 w-full text-sm rounded dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div className="mb-2">
            <label className="block text-sm">Description</label>
            <textarea
              value={newComplaint.description}
              onChange={(e) =>
                setNewComplaint({ ...newComplaint, description: e.target.value })
              }
              className="border p-2 w-full text-sm rounded dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div className="mb-2">
            <label className="block text-sm">Action Taken</label>
            <textarea
              value={newComplaint.actionTaken}
              onChange={(e) =>
                setNewComplaint({ ...newComplaint, actionTaken: e.target.value })
              }
              className="border p-2 w-full text-sm rounded dark:bg-save-700 dark:text-white"
            />
          </div>

          <div className="mb-2">
            <label className="block text-sm">Assigned To</label>
            <input
              type="text"
              value={newComplaint.assigned}
              onChange={(e) =>
                setNewComplaint({ ...newComplaint, assigned: e.target.value })
              }
              className="border p-2 w-full text-sm rounded dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div className="mb-2">
            <label className="block text-sm">Note</label>
            <textarea
              value={newComplaint.note}
              onChange={(e) =>
                setNewComplaint({ ...newComplaint, note: e.target.value })
              }
              className="border p-2 w-full text-sm rounded dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div className="mb-2">
            <label className="block text-sm">Upload Document</label>
            <input
              type="file"
              onChange={handleDocumentUpload}
              className="border p-2 w-full text-sm rounded dark:bg-gray-700 dark:text-white"
            />
          </div>

          <button
            onClick={handleAddOrUpdateComplaint}
            className="bg-blue-500 text-white p-2 rounded w-full mt-4"
          >
            {editId ? "Update Complaint" : "Add Complaint"}
          </button>
        </div>

        {/* Right Section - Table */}
        <div className="w-full sm:w-2/3 border p-4 rounded-lg bg-gray-100 dark:bg-gray-700">

          <div className="mb-4">
            <label className="block text-sm">Search Complaints</label>
            <input
              type="text"
              placeholder="Search by Complain By"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border p-2 text-sm rounded dark:bg-gray-700 dark:text-white"
            />
          </div>

          <table className="table-auto w-full text-sm border-collapse dark:bg-gray-700 dark:text-white">
            <thead>
              <tr>
                <th className="px-4 py-2 border">Complain #</th>
                <th className="px-4 py-2 border">Complaint Type</th>
                <th className="px-4 py-2 border">Complain By</th>
                <th className="px-4 py-2 border">Phone</th>
                <th className="px-4 py-2 border">Date</th>
                <th className="px-4 py-2 border">Action Taken</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredComplaints.map((complaint) => (
                <tr key={complaint.id}>
                  <td className="px-4 py-2 border">{complaint.id}</td>
                  <td className="px-4 py-2 border">{complaint.complaintType}</td>
                  <td className="px-4 py-2 border">{complaint.complainBy}</td>
                  <td className="px-4 py-2 border">{complaint.phone}</td>
                  <td className="px-4 py-2 border">{complaint.date}</td>
                  <td className="px-4 py-2 border">{complaint.actionTaken}</td>
                  <td className="px-4 py-2 border">
                    <button
                      onClick={() => handleEdit(complaint.id)}
                      className="text-yellow-500 px-2 py-1 rounded mr-2"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(complaint.id)}
                      className="text-red-500 px-2 py-1 rounded"
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
    </div>
  );
};

export default ComplaintPage;
