
import React, { useState } from "react";

const FileSettings = () => {
  const [fileExtensions, setFileExtensions] = useState(
    "pdf, zip, jpg, jpeg, png, txt, 7z, gif, csv, docx, mp3, mp4, accdb, odt, ods, ppt, pptx, xlsx, wmv, jfif, apk, ppt, bmp, jpe, mdb, rar, xls, svg"
  );
  const [fileMimeTypes, setFileMimeTypes] = useState(
    "application/pdf, image/zip, image/jpg, image/png, image/jpeg, text/plain, application/x-zip-compressed, application/zip, image/gif, text/csv, application/vnd.openxmlformats-officedocument.wordprocessingml.document, audio/mpeg, application/msaccess, application/vnd.oasis.opendocument.text, application/vnd.oasis.opendocument.spreadsheet, application/vnd.ms-powerpoint, application/vnd.openxmlformats-officedocument.presentationml.presentation, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, video/x-ms-wmv, video/mp4, image/jpeg, application/vnd.android.package-archive, application/x-msdownload, application/vnd.ms-powerpoint, image/bmp, image/jpeg, application/msaccess, application/vnd.ms-excel, image/svg+xml"
  );
  const [fileUploadSize, setFileUploadSize] = useState("100048576");

  const [imageExtensions, setImageExtensions] = useState("jfif, png, jpe, jpeg, jpg, bmp, gif, svg");
  const [imageMimeTypes, setImageMimeTypes] = useState(
    "image/jpeg, image/png, image/jpeg, image/jpeg, image/bmp, image/gif, image/x-ms-bmp, image/svg+xml"
  );
  const [imageUploadSize, setImageUploadSize] = useState("10048576");

  const handleSave = () => {
    alert("Settings saved successfully!");
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 dark:bg-gray-800 dark:text-white rounded-lg shadow-md mt-4 mb-4 ml-4 mr-4 ">
      <h1 className="text-2xl font-bold mb-6">File Settings</h1>
      {/* File Settings Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Settings For Files</h2>
        <div className="mb-4">
          <label className="block font-medium mb-2">Allowed Extension *</label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            rows="4"
            value={fileExtensions}
            onChange={(e) => setFileExtensions(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-2">Allowed MIME Type *</label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            rows="4"
            value={fileMimeTypes}
            onChange={(e) => setFileMimeTypes(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-2">Upload Size (In Bytes) *</label>
          <input
            type="number"
            className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            value={fileUploadSize}
            onChange={(e) => setFileUploadSize(e.target.value)}
          />
        </div>
      </div>

      {/* Image Settings Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Settings For Images</h2>
        <div className="mb-4">
          <label className="block font-medium mb-2">Allowed Extension *</label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            rows="3"
            value={imageExtensions}
            onChange={(e) => setImageExtensions(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-2">Allowed MIME Type *</label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            rows="3"
            value={imageMimeTypes}
            onChange={(e) => setImageMimeTypes(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-2">Upload Size (In Bytes) *</label>
          <input
            type="number"
            className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            value={imageUploadSize}
            onChange={(e) => setImageUploadSize(e.target.value)}
          />
        </div>
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
      >
        Save Settings
      </button>
    </div>
  );
};

export default FileSettings;


