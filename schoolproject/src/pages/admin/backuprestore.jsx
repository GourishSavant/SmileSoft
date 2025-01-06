
import React, { useState } from "react";
import { FaDownload, FaSync, FaTrash, FaPlus, FaUpload, FaRedo, FaEye, FaEyeSlash } from "react-icons/fa";

const BackupManagement = () => {
  const backups = [
    "db_ver_7.0.0_2024-12-21_18-01-29.sql",
    "db_ver_7.0.0_2024-12-22_11-30-14.sql",
    "db_ver_7.0.0_2024-12-22_11-38-28.sql",
    "db_ver_7.0.0_2024-12-29_10-09-29.sql",
  ];

  const [showSecretKey, setShowSecretKey] = useState(false);
  const [secretKey, setSecretKey] = useState("********"); // Default hidden state

  const handleDownload = (file) => alert(`Downloading ${file}`);
  const handleRestore = (file) => alert(`Restoring ${file}`);
  const handleDelete = (file) => alert(`Deleting ${file}`);
  const handleCreateBackup = () => alert("Creating a new backup...");
  const handleUpload = () => alert("Uploading file...");
  const handleRegenerateKey = () => setSecretKey("new-secret-key"); // Simulate key regeneration

  return (
    <div className="container mx-auto p-4 flex space-x-4 bg-gray-50 dark:bg-gray-800 dark:text-white">
      {/* Left Frame: Backup History */}
      <div className="w-3/4 bg-white shadow-md rounded-lg p-4 relative dark:bg-gray-800 dark:text-white">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Backup History</h2>
          <button
            onClick={handleCreateBackup}
            className="bg-blue-500 text-white px-4 py-2 rounded flex items-center space-x-2 hover:bg-blue-600"
          >
            <FaPlus />
            <span>Create Backup</span>
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-600">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-600">
                <th className="border border-gray-300 px-4 py-2 text-left dark:border-gray-500">Backup Files</th>
                <th className="border border-gray-300 px-4 py-2 text-center dark:border-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {backups.map((file, index) => (
                <tr key={index} className="odd:bg-white even:bg-gray-50 dark:odd:bg-gray-800 dark:even:bg-gray-700">
                  <td className="border border-gray-300 px-4 py-2 dark:border-gray-600">{file}</td>
                  <td className="border border-gray-300 px-4 py-2 flex justify-center space-x-2 dark:border-gray-600">
                    <button
                      onClick={() => handleDownload(file)}
                      className="bg-blue-500 text-white px-2 py-1 rounded flex items-center space-x-1 hover:bg-blue-600"
                    >
                      <FaDownload />
                      <span>Download</span>
                    </button>
                    <button
                      onClick={() => handleRestore(file)}
                      className="bg-green-500 text-white px-2 py-1 rounded flex items-center space-x-1 hover:bg-green-600"
                    >
                      <FaSync />
                      <span>Restore</span>
                    </button>
                    <button
                      onClick={() => handleDelete(file)}
                      className="bg-red-500 text-white px-2 py-1 rounded flex items-center space-x-1 hover:bg-red-600"
                    >
                      <FaTrash />
                      <span>Delete</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Right Frame: Upload Local Directory */}
      <div className="w-1/4 bg-white shadow-md rounded-lg p-4 dark:bg-gray-800 dark:text-white">
        <h2 className="text-xl font-bold mb-4">Upload From Local Directory</h2>
        <div className="border border-dashed border-gray-300 p-4 rounded-md dark:border-gray-600 dark:bg-gray-600">
          <input type="file" id="file-upload" className="hidden" />
          <label
            htmlFor="file-upload"
            className="cursor-pointer text-blue-500 hover:text-blue-700 block text-center"
          >
            Drag and drop a file here or click to upload
          </label>
        </div>
        <div className="flex justify-end items-center mt-6">
          <button
            onClick={handleUpload}
            className="bg-blue-500 text-white px-4 py-2 rounded flex items-center space-x-2 hover:bg-blue-600"
          >
            <FaUpload />
            <span>Upload</span>
          </button>
        </div>
        <div className="mt-6">
          <label className="block text-gray-700 dark:text-white mb-2">Cron Secret Key</label>
          <div className="flex items-center space-x-2">
            <input
              type={showSecretKey ? "text" : "password"}
              className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-600 dark:text-white"
              value={showSecretKey ? secretKey : "********"}
              readOnly
            />
            <button
              onClick={() => setShowSecretKey((prev) => !prev)}
              className="bg-gray-500 text-white px-4 py-2 rounded flex items-center space-x-2 hover:bg-gray-600"
            >
              {showSecretKey ? <FaEyeSlash /> : <FaEye />}
            </button>
            <button
              onClick={handleRegenerateKey}
              className="bg-yellow-500 text-white px-4 py-2 rounded flex items-center space-x-2 hover:bg-yellow-600"
            >
              <FaRedo />
              <span>Regenerate</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackupManagement;






