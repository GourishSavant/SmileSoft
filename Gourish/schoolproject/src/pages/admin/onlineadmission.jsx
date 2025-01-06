
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {
  FaFilePdf,
  FaFileWord,
  FaFileExcel,
  FaCopy,
  FaPrint,
  FaColumns,
} from "react-icons/fa";

function OnlineAdmissionPage() {
  const [activeTab, setActiveTab] = useState("form-setting");
  const [isOnlineAdmission, setIsOnlineAdmission] = useState(true);
  const [isPaymentOptionEnabled, setIsPaymentOptionEnabled] = useState(false);
  const [instructions, setInstructions] = useState("");
  const [termsAndConditions, setTermsAndConditions] = useState("");
  const [enabledItems, setEnabledItems] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [showColumnOptions, setShowColumnOptions] = useState(false);
  const [columns, setColumns] = useState({ name: true, action: true });
  

  const quillModules = {
    toolbar: [
      [{ font: [] }, { size: ["small", false, "large", "huge"] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      ["link", "image", "video"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ align: [] }],
      ["clean"],
    ],
  };
  const handleSave = () => {
    const formData = {
      isOnlineAdmission,
      isPaymentOptionEnabled,
      instructions,
      termsAndConditions,
    };
    console.log("Saved Data:", formData);
    alert("Online Admission Form Settings Saved!");
  };
  
  const toggleItem = (module, item) => {
    setEnabledItems((prev) => ({
      ...prev,
      [module]: {
        ...prev[module],
        [item]: !prev[module]?.[item],
      },
    }));
  };

  const toggleColumnVisibility = (column) => {
    setColumns((prev) => ({ ...prev, [column]: !prev[column] }));
  };


  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-md p-6">
        {/* Page Header */}
        <h1 className="text-2xl font-semibold text-green-700 mb-6">Online Admission</h1>

        {/* Tabs */}
        <div className="flex border-b border-gray-300 mb-6">
          <button
            onClick={() => setActiveTab("form-setting")}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === "form-setting"
                ? "text-green-700 border-b-2 border-green-700"
                : "text-gray-600"
            }`}
          >
            Online Admission Form Setting
          </button>
          <button
            onClick={() => setActiveTab("fields-setting")}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === "fields-setting"
                ? "text-green-700 border-b-2 border-green-700"
                : "text-gray-600"
            }`}
          >
            Online Admission Fields Setting
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "form-setting" && (
          <div>
            {/* Online Admission Toggle */}
            <div className="mb-6 flex items-center justify-between">
              <label className="font-medium">Online Admission</label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={isOnlineAdmission}
                  onChange={(e) => setIsOnlineAdmission(e.target.checked)}
                  className="sr-only"
                />
                <div
                  className={`w-11 h-6 bg-gray-300 rounded-full shadow-inner transition-colors duration-300 ${
                    isOnlineAdmission ? "bg-green-500" : ""
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-300 ${
                      isOnlineAdmission ? "translate-x-5" : ""
                    }`}
                  ></div>
                </div>
              </label>
            </div>

            {/* Payment Option */}
            <div className="mb-6 flex items-center justify-between">
              <label className="font-medium">Online Admission Payment Option</label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={isPaymentOptionEnabled}
                  onChange={(e) => setIsPaymentOptionEnabled(e.target.checked)}
                  className="sr-only"
                />
                <div
                  className={`w-11 h-6 bg-gray-300 rounded-full shadow-inner transition-colors duration-300 ${
                    isPaymentOptionEnabled ? "bg-green-500" : ""
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-300 ${
                      isPaymentOptionEnabled ? "translate-x-5" : ""
                    }`}
                  ></div>
                </div>
              </label>
            </div>

            {/* Upload Form */}
            <div className="mb-6">
              <label className="block font-medium mb-2">Upload Admission Application Form</label>
              <input
                type="file"
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border file:border-gray-300 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
              />
            </div>

            {/* Online Admission Instructions */}
            <div className="mb-6">
              <label className="block font-medium mb-2">Online Admission Instructions</label>
              <ReactQuill
                theme="snow"
                value={instructions}
                onChange={setInstructions}
                modules={quillModules}
                placeholder="Type instructions here..."
                className="bg-white rounded-md shadow-sm border border-gray-300"
              />
            </div>

            {/* Terms and Conditions */}
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-4">Terms & Conditions</h2>
              <ReactQuill
                theme="snow"
                value={instructions}
                onChange={setInstructions}
                modules={quillModules}
                placeholder="Type instructions here..."
                className="bg-white rounded-md shadow-sm border border-gray-300"
              />
              <h3 className="mt-4 font-medium">Preview:</h3>
              <div
                className="p-4 border border-gray-300 rounded-md bg-gray-50"
                dangerouslySetInnerHTML={{ __html: termsAndConditions }}
              />
            </div>
         

        {/* Save Button */}
        <div className="mt-6">
              <button
                onClick={handleSave}
                className=" px-4 py-2 bg-gray-700 text-white font-medium rounded-md hover:bg-gray-600"
              >
                Save
              </button>
            </div>
          </div>
        )}


        {activeTab === "fields-setting" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Online Admission Fields</h2>
             <div className="flex items-center mb-4 justify-between">
                      <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="p-2 w-1/2 rounded-md border focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      />
                      <div className="flex space-x-3">
                        <FaFilePdf className="cursor-pointer text-red-600" size={24} />
                        <FaFileWord className="cursor-pointer text-blue-600" size={24} />
                        <FaFileExcel className="cursor-pointer text-green-600" size={24} />
                        <FaCopy className="cursor-pointer text-gray-600" size={24} />
                        <FaPrint className="cursor-pointer text-black" size={24} />
                        <FaColumns
                  className="cursor-pointer text-gray-500 hover:text-gray-700"
                  title="Columns View"
                  size={20}
                  onClick={() => setShowColumnOptions(!showColumnOptions)}
                />
              </div>
            </div>

            {/* Column Options */}
            {showColumnOptions && (
              <div className="absolute right-0 mt-2 rounded-lg shadow-md bg-gray-100 dark:bg-gray-700 p-4 w-full sm:w-64">
                <h2 className="text-lg font-semibold mb-2">Select Columns to Show</h2>
                <div className="flex flex-col space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={columns.name}
                      onChange={() => toggleColumnVisibility("name")}
                      className="mr-2"
                    />
                    Name
                  </label>
                  <label className="flex items-center">
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

            <table className="w-full border-collapse border border-gray-300">
              <thead>
              <tr>
                  {columns.name && <th className="border border-gray-300 p-2 text-left">Name</th>}
                  {columns.action && <th className="border border-gray-300 p-2">Action</th>}
                </tr>
              </thead>
              <tbody>
                {[
                  "Religion",
                  "Caste",
                  "Mobile Number",
                  "Email",
                  "Student Photo",
                  "House",
                  "Blood Group",
                  "Height",
                  "Weight",
                  "Measurement Date",
                  "Father Name",
                  "Father Phone",
                  "Father Occupation",
                  "Father Photo",
                  "Mother Name",
                  "Mother Phone",
                  "Mother Occupation",
                  "Mother Photo",
                  "If Guardian Is",
                  "Guardian Name",
                  "Guardian Relation",
                  "Guardian Phone",
                  "Guardian Email",
                  "Guardian Occupation",
                  "Guardian Photo",
                  "Guardian Address",
                  "If Guardian Address Is Current Address",
                  "If Permanent Address Is Current Address",
                  "Bank Account Number",
                  "Bank Name",
                  "IFSC Code",
                  "National Identification Number",
                  "Local Identification Number",
                  "RTE",
                  "Previous School Details",
                  "Note",
                  "Upload Documents",
                ].map((field, index) => (
                  <tr key={index}>
                    {columns.name && <td className="border border-gray-300 p-2">{field}</td>}
                    {columns.action && (
                      <td className="border border-gray-300 p-2 text-center">
                        <input
                          type="checkbox"
                          className="toggle toggle-success"
                          defaultChecked
                        />
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default OnlineAdmissionPage;



