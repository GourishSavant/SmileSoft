import React, { useState } from "react";
import {
  FaFilePdf,
  FaFileExcel,
  FaPrint,
  FaFileWord,
  FaTrash,
  FaCopy,
  FaColumns,
  FaEdit,
} from "react-icons/fa";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";

const ComplaintPage = () => {
  const [complaintTypeData, setComplaintTypeData] = useState([]);
  const [sourceData, setSourceData] = useState([]);
  const [referenceData, setReferenceData] = useState([]);
  const [formData, setFormData] = useState({ purpose: "", description: "" });
  const [selectedForm, setSelectedForm] = useState("complaintType");
  const [editId, setEditId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Handle Add Data
  const handleAddData = () => {
    if (formData.purpose.trim() === "" || formData.description.trim() === "") {
      alert("Purpose and Description are required.");
      return;
    }
    const newData = {
      ...formData,
      id:
        selectedForm === "complaintType"
          ? complaintTypeData.length + 1
          : selectedForm === "source"
          ? sourceData.length + 1
          : referenceData.length + 1,
    };

    if (selectedForm === "complaintType") {
      setComplaintTypeData([...complaintTypeData, newData]);
    } else if (selectedForm === "source") {
      setSourceData([...sourceData, newData]);
    } else if (selectedForm === "reference") {
      setReferenceData([...referenceData, newData]);
    }

    setFormData({ purpose: "", description: "" });
  };

  // Handle Edit
  const handleEdit = (type, id) => {
    const data =
      type === "complaintType"
        ? complaintTypeData
        : type === "source"
        ? sourceData
        : referenceData;
    const itemToEdit = data.find((item) => item.id === id);
    if (itemToEdit) {
      setFormData({
        purpose: itemToEdit.purpose,
        description: itemToEdit.description,
      });
      setEditId(id);
    }
  };

  // Handle Delete
  const handleDelete = (type, id) => {
    if (type === "complaintType") {
      setComplaintTypeData(complaintTypeData.filter((item) => item.id !== id));
    } else if (type === "source") {
      setSourceData(sourceData.filter((item) => item.id !== id));
    } else if (type === "reference") {
      setReferenceData(referenceData.filter((item) => item.id !== id));
    }
  };

  // Export to PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Complaint List", 20, 10);
    const tableColumn = ["ID", "Purpose", "Description"];
    const tableRows = [...complaintTypeData, ...sourceData, ...referenceData].map((item) => [
      item.id,
      item.purpose,
      item.description,
    ]);
    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.save("complaint-list.pdf");
  };

  // Export to Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      [...complaintTypeData, ...sourceData, ...referenceData].map((item) => ({
        ID: item.id,
        Purpose: item.purpose,
        Description: item.description,
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Complaint List");
    XLSX.writeFile(workbook, "complaint-list.xlsx");
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-800 dark:text-white text-sm">
      {/* Left Sidebar */}
      <div className="w-1/5 p-2 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-lg">
        <h2 className="text-lg font-bold mb-2">Menu</h2>
        <ul className="space-y-2">
          <li
            className={`p-2 rounded cursor-pointer ${
              selectedForm === "complaintType"
                ? "bg-blue-500 text-white"
                : "hover:bg-blue-300 dark:hover:bg-blue-600"
            }`}
            onClick={() => setSelectedForm("complaintType")}
          >
            Complaint Type
          </li>
          <li
            className={`p-2 rounded cursor-pointer ${
              selectedForm === "source"
                ? "bg-green-500 text-white"
                : "hover:bg-green-300 dark:hover:bg-green-600"
            }`}
            onClick={() => setSelectedForm("source")}
          >
            Source
          </li>
          <li
            className={`p-2 rounded cursor-pointer ${
              selectedForm === "reference"
                ? "bg-yellow-500 text-white"
                : "hover:bg-yellow-300 dark:hover:bg-yellow-600"
            }`}
            onClick={() => setSelectedForm("reference")}
          >
            Reference
          </li>
        </ul>
      </div>

      {/* Middle Section */}
      <div className="w-2/5 p-6 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-lg">
        <h2 className="text-lg font-bold mb-4">
          {selectedForm === "complaintType"
            ? "Add Complaint Type"
            : selectedForm === "source"
            ? "Add Source"
            : "Add Reference"}
        </h2>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium">Purpose</label>
          <input
            type="text"
            value={formData.purpose}
            onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
            className="w-full p-3 border rounded-lg dark:bg-gray-600 dark:text-white"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full p-3 border rounded-lg dark:bg-gray-600 dark:text-white"
          />
        </div>
        <button
          onClick={handleAddData}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Save
        </button>
      </div>

      {/* Right Section */}
      <div className="w-2/5 p-6 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">
            {selectedForm === "complaintType"
              ? "Complaint Types"
              : selectedForm === "source"
              ? "Sources"
              : "References"}
          </h2>
          <div className="flex space-x-2">
            <button onClick={exportToPDF} className="dark:text-red-500 text-gray-500">
              <FaFilePdf size={20} />
            </button>
            <button onClick={exportToExcel} className="dark:text-green-500 text-gray-500">
              <FaFileExcel size={20} />
            </button>
            <button className="dark:text-blue-500 text-gray-500">
              <FaFileWord size={20} />
            </button>
            <button className="dark:text-gray-500 text-gray-500">
              <FaPrint size={20} />
            </button>
            <button className="dark:text-purple-500 text-gray-500">
              <FaCopy size={20} />
            </button>
            <button className="dark:text-yellow-500 text-gray-500">
              <FaColumns size={20} />
            </button>
          </div>
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border rounded-lg dark:bg-gray-600 dark:text-white"
          />
        </div>
        <table className="min-w-full table-auto text-sm">
          <thead>
            <tr>
              <th className="border p-4">ID</th>
              <th className="border p-4">Purpose</th>
              <th className="border p-4">Description</th>
              <th className="border p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {(selectedForm === "complaintType"
              ? complaintTypeData
              : selectedForm === "source"
              ? sourceData
              : referenceData
            )
              .filter(
                (item) =>
                  item.purpose.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  item.description.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((item) => (
                <tr key={item.id}>
                  <td className="border p-2">{item.id}</td>
                  <td className="border p-2">{item.purpose}</td>
                  <td className="border p-2">{item.description}</td>
                  <td className="border p-2">
                    <button
                      onClick={() => handleEdit(selectedForm, item.id)}
                      className="text-blue-500"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(selectedForm, item.id)}
                      className="text-red-500"
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

export default ComplaintPage;
