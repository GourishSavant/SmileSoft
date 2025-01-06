import React from "react";
import { FaDownload } from "react-icons/fa";

const StaffImport = () => {
  const downloadSample = () => {
    const csvContent = `Staff ID,First Name,Last Name,Father Name,Mother Name,Email,Gender,Date Of Birth,Date Of Joining,Phone,Emergency Contact Number,Marital Status,Current Address,Permanent Address,Qualification,Work Experience,Note,Role,Designation,Department
    XYZ,John,Doe,Richard Doe,Mary Doe,john.doe@example.com,Male,1990-01-01,2015-06-06,1234567890,0987654321,Single,123 Main St,456 Secondary St,Bachelor,5 years,No Notes,Admin,Manager,HR`;
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Sample_Staff_Import.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen p-8">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Staff Import</h1>
          <button
            className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            onClick={downloadSample}
          >
            <FaDownload className="mr-2" />
            Download Sample
          </button>
        </div>

        {/* Instructions */}
        <div className="text-sm text-gray-700 mb-6">
          <p>
            1. Your CSV data should be in the format below. The first line of
            your CSV file should be the column headers as in the table example.
            Also make sure that your file is UTF-8 to avoid unnecessary encoding
            problems.
          </p>
          <p>
            2. If the column you are trying to import is a date, make sure it is
            formatted in <strong>Y-m-d</strong> (e.g., 2018-06-06).
          </p>
        </div>

        {/* Table Example */}
        <div className="overflow-x-auto mb-6">
          <table className="min-w-full border border-gray-300 text-sm text-left text-gray-700">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 border">Staff ID *</th>
                <th className="px-4 py-2 border">First Name *</th>
                <th className="px-4 py-2 border">Last Name</th>
                <th className="px-4 py-2 border">Father Name</th>
                <th className="px-4 py-2 border">Mother Name</th>
                <th className="px-4 py-2 border">Email *</th>
                <th className="px-4 py-2 border">Gender *</th>
                <th className="px-4 py-2 border">Date Of Birth *</th>
                <th className="px-4 py-2 border">Date Of Joining</th>
                <th className="px-4 py-2 border">Phone</th>
                <th className="px-4 py-2 border">Emergency Contact Number</th>
                <th className="px-4 py-2 border">Marital Status</th>
                <th className="px-4 py-2 border">Current Address</th>
                <th className="px-4 py-2 border">Permanent Address</th>
                <th className="px-4 py-2 border">Qualification</th>
                <th className="px-4 py-2 border">Work Experience</th>
                <th className="px-4 py-2 border">Note</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2 border">XYZ</td>
                <td className="px-4 py-2 border">John</td>
                <td className="px-4 py-2 border">Doe</td>
                <td className="px-4 py-2 border">Richard Doe</td>
                <td className="px-4 py-2 border">Mary Doe</td>
                <td className="px-4 py-2 border">john.doe@example.com</td>
                <td className="px-4 py-2 border">Male</td>
                <td className="px-4 py-2 border">1990-01-01</td>
                <td className="px-4 py-2 border">2015-06-06</td>
                <td className="px-4 py-2 border">1234567890</td>
                <td className="px-4 py-2 border">0987654321</td>
                <td className="px-4 py-2 border">Single</td>
                <td className="px-4 py-2 border">123 Main St</td>
                <td className="px-4 py-2 border">456 Secondary St</td>
                <td className="px-4 py-2 border">Bachelor</td>
                <td className="px-4 py-2 border">5 years</td>
                <td className="px-4 py-2 border">No Notes</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Additional Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Role *</label>
            <select className="w-full border border-gray-300 rounded p-2">
              <option>Select</option>
              <option>Admin</option>
              <option>Staff</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Designation *</label>
            <select className="w-full border border-gray-300 rounded p-2">
              <option>Select</option>
              <option>Manager</option>
              <option>Employee</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Department *</label>
            <select className="w-full border border-gray-300 rounded p-2">
              <option>Select</option>
              <option>HR</option>
              <option>IT</option>
            </select>
          </div>
        </div>

        {/* File Upload */}
        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2">
            Select CSV File *
          </label>
          <div className="border-dashed border-2 border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50">
            <p className="text-gray-500">Drag and drop a file here or click</p>
            <p className="text-sm text-gray-400">No file chosen</p>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-end space-x-4">
          <button
            className="px-6 py-2 bg-green-500 text-white font-semibold rounded shadow hover:bg-green-600 transition"
            onClick={() => alert("Staff Imported Successfully!")}
          >
            Import Staff
          </button>
        </div>
      </div>
    </div>
  );
};

export default StaffImport;
