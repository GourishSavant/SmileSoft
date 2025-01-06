
import React, { useState } from "react";
import { FiUpload } from "react-icons/fi";
import anime from "animejs";


const ImportStudent = () => {
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "text/csv") {
      setSelectedFile(file);
      setError("");
    } else {
      setError("Please upload a valid CSV file.");
      setSelectedFile(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedClass || !selectedSection) {
      setError("Please select Class and Section.");
      return;
    }
    if (!selectedFile) {
      setError("Please upload a valid CSV file.");
      return;
    }

    // Handle file upload logic here (e.g., send to backend)
    console.log("File to upload:", selectedFile);
    console.log("Selected Class:", selectedClass);
    console.log("Selected Section:", selectedSection);

    setSuccessMessage("File uploaded successfully!");
    setError("");

    
    
  };
  
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-md p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Select Criteria</h2>
          <button className="flex items-center bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-900">
            <FiUpload className="mr-2" size={20} /> Download Sample Import File
          </button>
        </div>

        {/* Instructions */}
        <div className="bg-blue-100 p-4 mb-6 rounded-md border-l-4 border-blue-500">
          <p className="text-sm text-blue-700">
            <strong>Select Criteria</strong>
            <ol className="list-decimal list-inside mt-2">
              <li>
                Your CSV data should be in the format below. The first line of your CSV file should
                be the column headers as in the table example. Also, make sure that your file is
                UTF-8 to avoid unnecessary encoding problems.
              </li>
              <li>If the column you are trying to import is a date, make sure that it is formatted in Y-m-d (e.g., 2018-06-06).</li>
              <li>Duplicate Admission Number (unique) rows will not be imported.</li>
              <li>For student Gender, use Male or Female values.</li>
              <li>For student Blood Group, use O+, A+, B+, AB+, O-, A-, B-, AB- values.</li>
              <li>For RTE, use Yes or No values.</li>
              <li>If the Guardian is the user, use Father, Mother, or Other values.</li>
              <li>
                Category name comes from another table, so for category, enter Category Id
                (Category Id can be found on the category page).
              </li>
              <li>
                Student house comes from another table, so for student house, enter Student House Id
                (Student House Id can be found on the student house page).
              </li>
            </ol>
          </p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-white shadow-md rounded-md mb-6">
          <li> admission_no roll_no firstname middlename lastname gender dob category_id religion cast mobileno email admission_date blood_group school_house_id height weight measurement_date father_name father_phone father_occupation mother_name mother_phone mother_occupation guardian_is guardian_name guardian_relation guardian_email guardian_phone guardian_occupation guardian_address current_address permanent_address bank_account_no bank_name ifsc_code adhar_no samagra_id rte previous_school note</li>
          <table className="min-w-full border-collapse border border-gray-300">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">
                <span className="text-red-500">*</span>  Admission No 
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">
                  Roll No.
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">
                  First Name
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">
                  Middle Name
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">
                  Last Name
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">
                <span className="text-red-500">*</span> Gender
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">
                <span className="text-red-500">*</span> Date of Birth
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">
                  Category
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">
                  Religion
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">
                  caste
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">
                  Mobile No.
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">
                  Email
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">
                Admission Date                </th>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">
                Blood Group                </th>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">
                House                </th>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">
                Height	                </th>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">
                Measurement Date                </th>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">
                Father Name	                </th>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">
                Father Phone	                </th>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">
                Father Occupation	                </th>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">
                Mother Name	                </th>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">
                Mother Phone	                </th>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">
                Mother Occupation	                </th>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">
                <span className="text-red-500">*</span> If Guardian Is	                </th>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">
                <span className="text-red-500">*</span> If Guardian Name		                </th>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">
                Guardian Relation		                </th>
                 <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">
                Guardian Email		                </th> 
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">
                <span className="text-red-500">*</span> Guardian Phone	                </th>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">
                Guardian Occupation                </th>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">
                Guardian Address                </th>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">
                Current Address	                </th>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">
                Permanent Address             </th>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">
                Bank Account No                </th>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">
                Bank Name	                </th>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">
                IFSC Code		                </th>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">
                National Identification No                </th>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">
                Local Identification No	RTE                </th>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">
                Previous School Details                </th>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700">
                Note               </th>
                
                {/* Add remaining columns as necessary */}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2 text-sm">123</td>
                <td className="border border-gray-300 px-4 py-2 text-sm">-</td>
                <td className="border border-gray-300 px-4 py-2 text-sm">-</td>
                <td className="border border-gray-300 px-4 py-2 text-sm">-</td>
                <td className="border border-gray-300 px-4 py-2 text-sm">-</td>
                <td className="border border-gray-300 px-4 py-2 text-sm">-</td>
                <td className="border border-gray-300 px-4 py-2 text-sm">-</td>
                <td className="border border-gray-300 px-4 py-2 text-sm">-</td>
                <td className="border border-gray-300 px-4 py-2 text-sm">-</td>
                <td className="border border-gray-300 px-4 py-2 text-sm">-</td>
                <td className="border border-gray-300 px-4 py-2 text-sm">-</td>
                <td className="border border-gray-300 px-4 py-2 text-sm">-</td>
                <td className="border border-gray-300 px-4 py-2 text-sm">-</td>
                <td className="border border-gray-300 px-4 py-2 text-sm">-</td>

                {/* Add rows with placeholder data */}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 mb-1 font-medium">
                Class <span className="text-red-500">*</span>
              </label>
              <select
                name="class"
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">Select</option>
                <option value="1">Class 1</option>
                <option value="2">Class 2</option>
                <option value="3">Class 3</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 mb-1 font-medium">
                Section <span className="text-red-500">*</span>
              </label>
              <select
                name="section"
                value={selectedSection}
                onChange={(e) => setSelectedSection(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">Select</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
              </select>
            </div>
          </div>

  <div>
  <label className="block text-gray-700 mb-1 font-medium">
    Select CSV File <span className="text-red-500">*</span>
  </label>
  <div className="flex items-center justify-left w-full">
    <label
      className="flex flex-col items-center px-4 py-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer w-80 h-14 animate-pulse-on-hover hover:animate-pulse"
    >
      <FiUpload size={24} className="text-gray-600 mb-2 " />
      <div className="skeleton h-14 w-80 bg-yellow-500 "></div>
      <span className="text-sm text-gray-600 text-center">
        Drag and drop a file here or click
      </span>
      <input
        type="file"
        accept=".csv"
        className="hidden"
        onChange={handleFileChange}
      />
    </label>
  </div>
  {selectedFile && (
    <p className="mt-2 text-sm text-green-600">Selected File: {selectedFile.name}</p>
  )}
</div>

          {error && <p className="text-red-600 text-sm">{error}</p>}
          {successMessage && <p className="text-green-600 text-sm">{successMessage}</p>}

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-gray-400 text-white px-6 py-2 rounded-md hover:bg-gray-700"
            >
              Import Student
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ImportStudent;


