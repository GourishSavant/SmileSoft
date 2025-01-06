
import React, { useState } from "react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";

const FeesReceiptPage = () => {
  const [headerImage, setHeaderImage] = useState(null);
  const [editorContent, setEditorContent] = useState("");
  const [selectedOption, setSelectedOption] = useState(""); // Track the selected option

  const modules = {
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

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setHeaderImage(URL.createObjectURL(file));
    }
  };

  const handleSave = () => {
    // Save button logic
    console.log("Saving content...");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white shadow-md">
        {/* Header Section */}
        <div className="p-4 border-b border-gray-300">
          <div className="flex items-center justify-between">
            {/* Page Heading */}
            <h1 className="text-2xl font-bold text-gray-800">Print Header Footer</h1>

            {/* Navigation Buttons */}
            <div className="flex space-x-1">
              <button
                className="px-4 py-2 bg-gray-600 text-white text-sm font-medium hover:bg-gray-700 focus:outline-none"
                onClick={() => setSelectedOption("feesReceipt")}
              >
                Fees Receipt
              </button>
              <button
                className="px-4 py-2 bg-gray-600 text-white text-sm font-medium hover:bg-gray-700 focus:outline-none"
                onClick={() => setSelectedOption("payslip")}
              >
                Payslip
              </button>
              <button
                className="px-4 py-2 bg-gray-600 text-white text-sm font-medium hover:bg-gray-700 focus:outline-none"
                onClick={() => setSelectedOption("onlineAdmission")}
              >
                Online Admission Receipt
              </button>
              <button
                className="px-4 py-2 bg-gray-600 text-white text-sm font-medium hover:bg-gray-700 focus:outline-none"
                onClick={() => setSelectedOption("onlineExam")}
              >
                Online Exam
              </button>
            </div>
          </div>
        </div>

        {/* Conditional Rendering Based on Selected Option */}
        {selectedOption === "feesReceipt" || selectedOption === "payslip" || selectedOption === "onlineAdmission" || selectedOption === "onlineExam" ? (
          <>
            {/* Header Image Section */}
            <div className="p-6">
              <label className="block text-lg font-semibold mb-2">
                Header Image (2230px X 300px) *
              </label>
              {headerImage ? (
                <div className="relative">
                  <img
                    src={headerImage}
                    alt="Header"
                    className="w-full h-auto border rounded-md mb-4"
                  />
                  <button
                    className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => setHeaderImage(null)}
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                  <label className="cursor-pointer text-blue-500 hover:underline">
                    Drag and drop a file here or click
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </label>
                </div>
              )}
            </div>

            {/* Custom Text Editor Section */}
            <div className="p-6">
              <h2 className="text-lg font-semibold mb-2">Footer Content</h2>
              <ReactQuill
                theme="snow"
                value={editorContent}
                onChange={setEditorContent}
                modules={modules}
                placeholder="This receipt is computer generated hence no signature is required"
              />
            </div>

            {/* Save Button */}
            <div className="p-6 flex justify-end">
              <button
                className="px-6 py-2 bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 rounded"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </>
        ) : (
          <div className="p-6">
            <h2 className="text-lg font-semibold">Please select an option to edit content.</h2>
          </div>
        )}

        {/* Default Footer Section */}
       
      </div>
    </div>
  );
};

export default FeesReceiptPage;



