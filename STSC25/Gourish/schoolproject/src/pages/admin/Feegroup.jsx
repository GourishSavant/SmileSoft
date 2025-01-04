

import React, { useState } from "react";
import { FaCopy, FaFileCsv, FaFileExcel, FaFileWord, FaFilePdf, FaPrint } from "react-icons/fa";
import { saveAs } from "file-saver"; // For file download functionality
import * as XLSX from "xlsx"; // For Excel export
import jsPDF from "jspdf"; // For PDF export
import "jspdf-autotable"; // For table data in PDF

const FeesGroupPage = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [feesGroups, setFeesGroups] = useState([]);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Add Fees Group
  const handleAddFeesGroup = () => {
    if (!name) {
      alert("Please enter a Name for the Fees Group!");
      return;
    }
    const newGroup = {
      id: feesGroups.length + 1,
      name,
      description,
    };
    setFeesGroups([...feesGroups, newGroup]);
    clearForm();
  };

  // Clear Form
  const clearForm = () => {
    setName("");
    setDescription("");
  };

  // Delete Fees Group
  const handleDeleteGroup = (id) => {
    setFeesGroups(feesGroups.filter((group) => group.id !== id));
  };

  // Filtered Fees Group List
  const filteredGroups = feesGroups.filter((group) =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredGroups.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredGroups.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Export Logic
  const handleExport = (type) => {
    const tableData = feesGroups.map((group) => ({
      Name: group.name,
      Description: group.description || "-",
    }));

    if (type === "copy") {
      navigator.clipboard.writeText(JSON.stringify(tableData, null, 2));
      alert("Data copied to clipboard!");
    } else if (type === "csv") {
      const csvContent = [
        ["Name", "Description"],
        ...feesGroups.map((group) => [group.name, group.description || "-"]),
      ];
      const blob = new Blob([csvContent.map((e) => e.join(",")).join("\n")], {
        type: "text/csv;charset=utf-8;",
      });
      saveAs(blob, "fees_groups.csv");
    } else if (type === "excel") {
      const worksheet = XLSX.utils.json_to_sheet(tableData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "FeesGroups");
      XLSX.writeFile(workbook, "fees_groups.xlsx");
    } else if (type === "word") {
      const blob = new Blob(
        [tableData.map((item) => `Name: ${item.Name}\nDescription: ${item.Description}\n\n`).join("")],
        { type: "application/msword;charset=utf-8;" }
      );
      saveAs(blob, "fees_groups.doc");
    } else if (type === "pdf") {
      const doc = new jsPDF();
      doc.text("Fees Groups", 14, 10);
      doc.autoTable({
        head: [["Name", "Description"]],
        body: feesGroups.map((group) => [group.name, group.description || "-"]),
      });
      doc.save("fees_groups.pdf");
    } else if (type === "print") {
      window.print();
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-700">Fees Group Management</h1>

      <div className="grid grid-cols-3 gap-6">
        {/* Left Section: Add Fees Group */}
        <div className="col-span-1 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Add Fees Group</h2>

          <div className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-gray-700 font-medium">Name *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-gray-700 font-medium">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            {/* Add Button */}
            <div className="flex justify-end">
              <button
                onClick={handleAddFeesGroup}
                className="py-2 px-4 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600"
              >
                Add Group
              </button>
            </div>
          </div>
        </div>

        {/* Right Section: Fees Group List */}
        <div className="col-span-2 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Fees Group List</h2>

          {/* Search and Export Icons */}
          <div className="flex items-center mb-4 justify-between space-x-2">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-2 rounded-md focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex items-center space-x-2">
              <FaCopy onClick={() => handleExport("copy")} className="text-gray-600 hover:text-Gray-500 cursor-pointer" />
              <FaFileCsv onClick={() => handleExport("csv")} className="text-gray-600 hover:text-green-500 cursor-pointer" />
              <FaFileExcel onClick={() => handleExport("excel")} className="text-gray-600 hover:text-green-500 cursor-pointer" />
              <FaFileWord onClick={() => handleExport("word")} className="text-gray-600 hover:text-blue-500 cursor-pointer" />
              <FaFilePdf onClick={() => handleExport("pdf")} className="text-gray-600 hover:text-red-500 cursor-pointer" />
              <FaPrint onClick={() => handleExport("print")} className="text-gray-600 hover:text-gray-500 cursor-pointer" />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full border">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2 text-left border">Name</th>
                  <th className="p-2 text-left border">Description</th>
                  <th className="p-2 text-left border">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.length > 0 ? (
                  currentItems.map((group) => (
                    <tr key={group.id} className="hover:bg-gray-100">
                      <td className="p-2 border">{group.name}</td>
                      <td className="p-2 border">{group.description || "-"}</td>
                      <td className="p-2 border">
                        <button
                          onClick={() => handleDeleteGroup(group.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="p-4 text-center text-gray-500">
                      No data available in table
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="mt-4 flex justify-between items-center text-gray-600">
            <button
              onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
              className="px-4 py-2 bg-gray-200 rounded-l-md hover:bg-gray-300"
            >
              {"<"}
            </button>
            <span>
              Page {currentPage} of {totalPages || 1}
            </span>
            <button
              onClick={() => paginate(currentPage < totalPages ? currentPage + 1 : totalPages)}
              className="px-4 py-2 bg-gray-200 rounded-r-md hover:bg-gray-300"
            >
              {">"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeesGroupPage;





