
import React, { useState } from "react";
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

import * as XLSX from "xlsx";  // For Excel export
import jsPDF from "jspdf"; // For PDF export
import { Document, Packer, Paragraph, TextRun } from "docx"; // For Word export
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";  // FontAwesome import
import {  faFilePdf, faFileWord, faPen, faFileExcel,faKey } from "@fortawesome/free-solid-svg-icons";  // Specific icons for Excel, PDF, and Word
import { FaFilePdf, FaFileExcel,FaTimes, FaFileCsv, FaPrint, FaCopy, FaFileWord, FaColumns } from 'react-icons/fa';
import {  faTimes } from "@fortawesome/free-solid-svg-icons";
import { useParams } from 'react-router-dom';
import axiosApi from "../../api/axiosApi.jsx";
const ProfilePage = () => {
  // Static Profile Data
  const profileData = {
    name: "Gourish Savanth",
    staffId: "9000",
    role: "Teacher",
    designation: "Maths Teacher",
    department: "Faculty",
    epfNo: "12345678",
    basicSalary: "₹ 50,000",
    contactDetails: {
      phone: "+91-9876543210",
      emergencyContact: "+91-9123456789",
      email: "admin@school.com",
    },
    personalDetails: {
      gender: "Male",
      dob: "01/01/2020",
      maritalStatus: "Single",
      fatherName: "xyz",
      motherName: "xyz",
    },
    education: {
      qualification: "MBA in Education Management",
    },
    experience: {
      workExperience: "10 Years",
      note: "Expert in school administration and management.",
    },
    payrollSummary: {
      totalNetSalary: "$0.00",
      totalGrossSalary: "$0.00",
      totalEarning: "$0.00",
      totalDeduction: "$0.00",
    },
    payrollRecords: [
      {
        payslipNo: "1234",
        monthYear: "December 2024",
        date: "2024-12-09",
        mode: "Bank Transfer",
        status: "Paid",
        netSalary: "$5000",
      },
      {
        payslipNo: "1235",
        monthYear: "November 2024",
        date: "2024-11-09",
        mode: "Cheque",
        status: "Paid",
        netSalary: "$4800",
      },
    ],
    leaves: [
        {
          leaveType: "Sick Leave",
          leaveDate: "2024-12-05",
          days: "2",
          applyDate: "2024-12-03",
          status: "Approved",
        },
        {
          leaveType: "Casual Leave",
          leaveDate: "2024-11-15",
          days: "1",
          applyDate: "2024-11-10",
          status: "Pending",
        },
      ]
  };
  const { staff_emp_id } = useParams(); 
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [new_password, setNewPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
   // Toggle the form visibility
   const toggleForm = () => setIsFormOpen(!isFormOpen);

   const updateStaffPassword = async ( new_password, confirm_password) => {
    try {
      const response = await axiosApi.put(`/auth/addStaffPassword/${staff_emp_id}`, {
        
        new_password,
        confirm_password,
      });
      return response.data;
    } catch (error) {
      console.error('Error updating password:', error.response?.data?.message || error.message);
      throw error;
    }
  };
  console.log( "satfffid", staff_emp_id)
  
   // Handle the form submit (you can add your submit logic here)
   const handleSubmit = async(e) => {
     e.preventDefault();
     if (new_password === confirm_password) {
       const response = await axiosApi.put(`/auth/addStaffPassword/${staff_emp_id}`, {new_password,
        confirm_password,
      })
       console.log("Password changed successfully.", response.data);
       // Add your password change logic here
     } else {
       console.log("Passwords do not match.");
     }
   };
  
  const handleAttendanceDetailClick = (month, day) => {
    alert(`Showing attendance details for ${month} ${day}`);
    // You can replace this with more detailed logic, such as showing a modal or updating a state with more details.
  };
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState("2025"); // default year
  const handleYearChange = (event) => {
    setSelectedYear(event.target.value); // Update the selected year
  };

  
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const [isCollapsed, setIsCollapsed] = useState({
    contact: false,
    personal: false,
    education: false,
    experience: false,
  });

  const [activeTab, setActiveTab] = useState("profile");

  const toggleCollapse = (section) => {
    setIsCollapsed((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };
  

  return (
    <div className="bg-gray-100 min-h-screen" >
      {/* Profile Container */}
      <div className="bg-white dark:bg-gray-800 shadow-md p-4 rounded-md">

        <div className="flex flex-col md:flex-row space-x-6 bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Left Section - Profile Overview */}
          <div className="w-full md:w-1/4 bg-white-200 p-6 border rounded-lg shadow-md">
            <div className="flex flex-col items-center text-center">
              {/* Profile Icon */}
              <div className="bg-gray-300 rounded-full h-24 w-24 mb-4 flex items-center justify-center">
                <span className="text-4xl text-gray-600">👤</span>
              </div>
              <h2 className="text-xl font-bold mb-2 text-Black">{profileData.name}</h2>
              <p className="text-sm text-gray-600">Staff ID: {profileData.staffId}</p>
              <p className="text-blue-600 hover:underline cursor-pointer">{profileData.role}</p>
            </div>
            <div className="mt-6">
              <p className="text-gray-600 mb-1">Designation: {profileData.designation}</p>
              <p className="text-gray-600 mb-1">Department: {profileData.department}</p>
              <p className="text-gray-600 mb-1">EPF No: {profileData.epfNo}</p>
              <p className="text-gray-600 mb-1">Basic Salary: {profileData.basicSalary}</p>
            </div>
          </div>

          {/* Right Section - Profile Details & Payroll */}
          <div className="w-full md:w-3/4 p-6 border rounded-lg shadow-md">
          {/* Tabs */}
<div className="flex space-x-6 border-b mb-6">
  <span
    className={`cursor-pointer pb-2 font-semibold ${
      activeTab === "profile" ? "border-b-2 border-orange-400" : "text-gray-400"
    }`}
    onClick={() => setActiveTab("profile")}
  >
    Profile
  </span>
  <span
    className={`cursor-pointer pb-2 font-semibold ${
      activeTab === "payroll" ? "border-b-2 border-orange-400" : "text-gray-400"
    }`}
    onClick={() => setActiveTab("payroll")}
  >
    Payroll
  </span>
  <span
    className={`cursor-pointer pb-2 font-semibold ${
      activeTab === "leaves" ? "border-b-2 border-orange-400" : "text-gray-400"
    }`}
    onClick={() => setActiveTab("leaves")}
  >
    Leaves
  </span>
  <span
    className={`cursor-pointer pb-2 font-semibold ${
      activeTab === "attendance" ? "border-b-2 border-orange-400" : "text-gray-400"
    }`}
    onClick={() => setActiveTab("attendance")}
  >
    Attendance
  </span>
  <span
    className={`cursor-pointer pb-2 font-semibold ${
      activeTab === "documents" ? "border-b-2 border-orange-400" : "text-gray-400"
    }`}
    onClick={() => setActiveTab("documents")}
  >
    Documents
  </span>
  <span
    className={`cursor-pointer pb-2 font-semibold ${
      activeTab === "timeline" ? "border-b-2 border-orange-400" : "text-gray-400"
    }`}
    onClick={() => setActiveTab("timeline")}
  >
    Timeline
  </span>

  {/* Edit Pen Icon */}
  <span className="text-black-600 pb-2 cursor-pointer ">
    <Link to="/admin/staff/${staff.id}/edit">
      <FontAwesomeIcon icon={faPen} title="Edit Profile" />
    </Link>
  </span>

  {/* Change Password Icon */}
 
   {/* Change Password Icon */}
   <span className="text-Green-600 pb-2 cursor-pointer" onClick={toggleForm}>
        <FontAwesomeIcon icon={faKey} title="Change Password" />
      </span>

      {/* Modal for Change Password Form */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">Change Password</h3>
              <span
                className="text-red-600 cursor-pointer"
                onClick={toggleForm}
              >
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </div>

            <form onSubmit={handleSubmit} className="mt-4">
              <div className="mb-4">
                <label className="block text-gray-700">New Password *</label>
                <input
                  type="password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  value={new_password}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Confirm Password *</label>
                <input
                  type="password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  value={confirm_password}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
z
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
</div>

          

            {/* Profile Tab */}
            {activeTab === "profile" && (
              <div>
                {/* Contact Details */}
                <div className="border-b py-4">
                  <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => toggleCollapse("contact")}
                  >
                    <h3 className="text-lg font-semibold text-gray-700">Contact Details</h3>
                    <span>{isCollapsed.contact ? "▲" : "▼"}</span>
                  </div>
                  {!isCollapsed.contact && (
                    <ul className="pl-4 mt-2 text-gray-600">
                      <li className="hover:bg-gray-200 px-4 py-2 rounded">Phone: {profileData.contactDetails.phone}</li>
                      <li className="hover:bg-gray-200 px-4 py-2 rounded">Emergency Contact: {profileData.contactDetails.emergencyContact}</li>
                      <li className="hover:bg-gray-200 px-4 py-2 rounded">Email: {profileData.contactDetails.email}</li>
                    </ul>
                  )}
                </div>

                {/* Personal Details */}
                <div className="border-b py-4">
                  <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => toggleCollapse("personal")}
                  >
                    <h3 className="text-lg font-semibold text-gray-700">Personal Details</h3>
                    <span>{isCollapsed.personal ? "▲" : "▼"}</span>
                  </div>
                  {!isCollapsed.personal && (
                    <ul className="pl-4 mt-2 text-gray-600">
                      <li className="hover:bg-gray-200 px-4 py-2 rounded">Gender: {profileData.personalDetails.gender}</li>
                      <li className="hover:bg-gray-200 px-4 py-2 rounded">Date of Birth: {profileData.personalDetails.dob}</li>
                      <li className="hover:bg-gray-200 px-4 py-2 rounded">Marital Status: {profileData.personalDetails.maritalStatus}</li>
                      <li className="hover:bg-gray-200 px-4 py-2 rounded">Father's Name: {profileData.personalDetails.fatherName}</li>
                      <li className="hover:bg-gray-200 px-4 py-2 rounded">Mother's Name: {profileData.personalDetails.motherName}</li>
                    </ul>
                  )}
                </div>

                {/* Education */}
                <div className="border-b py-4">
                  <h3 className="text-lg font-semibold text-gray-700">Education</h3>
                  <p className="pl-4 mt-2 text-gray-600">{profileData.education.qualification}</p>
                </div>

                {/* Work Experience */}
                <div className="border-b py-4">
                  <h3 className="text-lg font-semibold text-gray-700">Experience</h3>
                  <ul className="pl-4 mt-2 text-gray-600">
                    <li className="hover:bg-gray-200 px-4 py-2 rounded">Work Experience: {profileData.experience.workExperience}</li>
                    <li className="hover:bg-gray-200 px-4 py-2 rounded">Note: {profileData.experience.note}</li>
                  </ul>
                </div>

                {/* Address Details */}
                <div className="border-b py-4">
                  <h3 className="text-lg font-semibold text-gray-700">Address Details</h3>
                  <ul className="pl-4 mt-2 text-gray-600">
                    <li className="hover:bg-gray-200 px-4 py-2 rounded">Current Address: [Add here]</li>
                    <li className="hover:bg-gray-200 px-4 py-2 rounded">Permanent Address: [Add here]</li>
                  </ul>
                </div>

                {/* Bank Account Details */}
                <div className="border-b py-4">
                  <h3 className="text-lg font-semibold text-gray-700">Bank Account Details</h3>
                  <ul className="pl-4 mt-2 text-gray-600">
                    <li className="hover:bg-gray-200 px-4 py-2 rounded">Account Title: [Add here]</li>
                    <li className="hover:bg-gray-200 px-4 py-2 rounded">Bank Name: [Add here]</li>
                    <li className="hover:bg-gray-200 px-4 py-2 rounded">Branch Name: [Add here]</li>
                    <li className="hover:bg-gray-200 px-4 py-2 rounded">Account Number: [Add here]</li>
                    <li className="hover:bg-gray-200 px-4 py-2 rounded">IFSC Code: [Add here]</li>
                  </ul>
                </div>

                {/* Social Media Links */}
                <div className="border-b py-4">
                  <h3 className="text-lg font-semibold text-gray-700">Social Media Links</h3>
                  <ul className="pl-4 mt-2 text-gray-600">
                    <li className="hover:bg-gray-200 px-4 py-2 rounded">Facebook URL: [Add here]</li>
                    <li className="hover:bg-gray-200 px-4 py-2 rounded">Twitter URL: [Add here]</li>
                    <li className="hover:bg-gray-200 px-4 py-2 rounded">LinkedIn URL: [Add here]</li>
                    <li className="hover:bg-gray-200 px-4 py-2 rounded">Instagram URL: [Add here]</li>
                  </ul>
                </div>
              </div>
            )}
            
          {/* Payroll Tab */}
          {activeTab === "payroll" && (
            <div>
              {/* Payroll Summary */}
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Payroll Summary</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-green-100 p-4 rounded-lg text-center">
                  <p className="text-gray-500 text-sm">Total Net Salary Paid</p>
                  <p className="text-xl font-semibold text-green-600">
                    {profileData.payrollSummary.totalNetSalary}
                  </p>
                </div>
                <div className="bg-yellow-100 p-4 rounded-lg text-center">
                  <p className="text-gray-500 text-sm">Total Gross Salary</p>
                  <p className="text-xl font-semibold text-yellow-600">
                    {profileData.payrollSummary.totalGrossSalary}
                  </p>
                </div>
                <div className="bg-blue-100 p-4 rounded-lg text-center">
                  <p className="text-gray-500 text-sm">Total Earning</p>
                  <p className="text-xl font-semibold text-blue-600">
                    {profileData.payrollSummary.totalEarning}
                  </p>
                </div>
                <div className="bg-red-100 p-4 rounded-lg text-center">
                  <p className="text-gray-500 text-sm">Total Deduction</p>
                  <p className="text-xl font-semibold text-red-600">
                    {profileData.payrollSummary.totalDeduction}
                  </p>
                </div>
              </div>
               
                  {/* Search Input and Icons */}
                        <div className="flex items-center justify-between space-x-4 mb-6">
                          <input
                            type="text"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            placeholder="Search"
                            className="p-2 border border-gray-300 rounded-lg w-1/3"
                          />
                          {/* Downloadable Icons */}
                          <div className="flex space-x-2">
                            <FaFilePdf className="text-red-500 cursor-pointer hover:text-red-700" title="Download PDF" size={20} />
                            <FaFileWord className="text-blue-500 cursor-pointer hover:text-blue-700" title="Download Word" size={20} />
                            <FaFileExcel className="text-green-500 cursor-pointer hover:text-green-700" title="Download Excel" size={20} />
                            <FaCopy className="text-gray-500 cursor-pointer hover:text-gray-700" title="Copy" size={20} />
                            <FaPrint className="text-black cursor-pointer hover:text-gray-700" title="Print" size={20} />
                            <FaColumns className="text-gray-500 cursor-pointer hover:text-gray-700" title="Columns View" size={20} />
                          </div>
                        </div>

              {/* Payroll Table */}
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Payroll Records</h3>
              {profileData.payrollRecords.length === 0 ? (
                <p className="text-gray-500">No data available in table.</p>
              ) : (
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-200 text-left">
                      <th className="p-2 border">Payslip #</th>
                      <th className="p-2 border">Month - Year</th>
                      <th className="p-2 border">Date</th>
                      <th className="p-2 border">Mode</th>
                      <th className="p-2 border">Status</th>
                      <th className="p-2 border">Net Salary ($)</th>
                      <th className="p-2 border">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {profileData.payrollRecords.map((record, index) => (
                      <tr key={index} className="hover:bg-gray-100">
                        <td className="p-2 border">{record.payslipNo}</td>
                        <td className="p-2 border">{record.monthYear}</td>
                        <td className="p-2 border">{record.date}</td>
                        <td className="p-2 border">{record.mode}</td>
                        <td className="p-2 border">{record.status}</td>
                        <td className="p-2 border">{record.netSalary}</td>
                        <td className="p-2 border">
                          <button className="bg-blue-500 text-white px-2 py-1 rounded">
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
           

           {activeTab === "leaves" && (
  <div>
    {/* Leave Records */}
    <div className="py-4">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Leave Records</h3>
        {/* Search Input and Icons */}
        <div className="flex items-center justify-between space-x-4 mb-6">
                          <input
                            type="text"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            placeholder="Search "
                            className="p-2 border border-gray-300 rounded-lg w-1/3"
                          />
                          {/* Downloadable Icons */}
                          <div className="flex space-x-2">
                            <FaFilePdf className="text-red-500 cursor-pointer hover:text-red-700" title="Download PDF" size={20} />
                            <FaFileWord className="text-blue-500 cursor-pointer hover:text-blue-700" title="Download Word" size={20} />
                            <FaFileExcel className="text-green-500 cursor-pointer hover:text-green-700" title="Download Excel" size={20} />
                            <FaCopy className="text-gray-500 cursor-pointer hover:text-gray-700" title="Copy" size={20} />
                            <FaPrint className="text-black cursor-pointer hover:text-gray-700" title="Print" size={20} />
                            <FaColumns className="text-gray-500 cursor-pointer hover:text-gray-700" title="Columns View" size={20} />
                          </div>
                        </div>

      <table className="min-w-full mt-4 bg-white shadow-md rounded-lg border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-b">Leave Type</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-b">Leave Date</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-b">Days</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-b">Apply Date</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-b">Status</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-b">Action</th>
          </tr>
        </thead>
        <tbody className="text-sm text-gray-600">
          {profileData.leaves.map((leave, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-6 py-3 border-b">{leave.leaveType}</td>
              <td className="px-6 py-3 border-b">{leave.leaveDate}</td>
              <td className="px-6 py-3 border-b">{leave.days}</td>
              <td className="px-6 py-3 border-b">{leave.applyDate}</td>
              <td className="px-6 py-3 border-b">{leave.status}</td>
              <td className="px-6 py-3 border-b">
                <button className="text-blue-600 hover:text-blue-800 font-semibold">
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)}
{activeTab === "attendance" && (
  <div>
    {/* Attendance Summary with Cards */}
    <div className="py-4">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Attendance Summary</h3>

      {/* Grid for all attendance cards */}
      <div className="grid grid-cols-5 gap-4 mb-4">
        {/* Total Present Card */}
        <div className="bg-green-100 p-4 rounded-lg shadow-md">
          <h4 className="text-sm font-semibold text-gray-600">Total Present</h4>
          <p className="text-2xl font-bold text-green-600">0</p>
        </div>

        {/* Total Late Card */}
        <div className="bg-yellow-100 p-4 rounded-lg shadow-md">
          <h4 className="text-sm font-semibold text-gray-600">Total Late</h4>
          <p className="text-2xl font-bold text-yellow-600">0</p>
        </div>

        {/* Total Absent Card */}
        <div className="bg-red-100 p-4 rounded-lg shadow-md">
          <h4 className="text-sm font-semibold text-gray-600">Total Absent</h4>
          <p className="text-2xl font-bold text-red-600">0</p>
        </div>

        {/* Total Half Day Card */}
        <div className="bg-blue-100 p-4 rounded-lg shadow-md">
          <h4 className="text-sm font-semibold text-gray-600">Total Half Day</h4>
          <p className="text-2xl font-bold text-blue-600">0</p>
        </div>

        {/* Total Holiday Card */}
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <h4 className="text-sm font-semibold text-gray-600">Total Holiday</h4>
          <p className="text-2xl font-bold text-gray-600">0</p>
        </div>
      </div>

      {/* Year Filter and Attendance Key in the Same Line */}
      <div className="flex justify-between items-center mb-4">
        {/* Year Filter */}
        <div className="flex items-center space-x-2">
          <label htmlFor="year" className="font-medium text-gray-700">Year</label>
          <select
            id="year"
            className="px-3 py-2 border rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleYearChange}
          >
            <option value="2025">2025</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            {/* Add more years as needed */}
          </select>
        </div>
        

        {/* Attendance Key (Present: P, Late: L, etc.) */}
        <div className="text-sm text-gray-600">
          <span className="mr-4">Present: <span className="font-semibold">P</span></span>
          <span className="mr-4">Late: <span className="font-semibold">L</span></span>
          <span className="mr-4">Absent: <span className="font-semibold">A</span></span>
          <span className="mr-4">Half Day: <span className="font-semibold">F</span></span>
          <span>Holiday: <span className="font-semibold">H</span></span>
        </div>
      </div>
       {/* Search Input and Icons */}
       <div className="flex items-center justify-between space-x-4 mb-6">
                          <input
                            type="text"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            placeholder="Search"
                            className="p-2 border border-gray-300 rounded-lg w-1/3"
                          />
                          {/* Downloadable Icons */}
                          <div className="flex space-x-2">
                            <FaFilePdf className="text-red-500 cursor-pointer hover:text-red-700" title="Download PDF" size={20} />
                            <FaFileWord className="text-blue-500 cursor-pointer hover:text-blue-700" title="Download Word" size={20} />
                            <FaFileExcel className="text-green-500 cursor-pointer hover:text-green-700" title="Download Excel" size={20} />
                            <FaCopy className="text-gray-500 cursor-pointer hover:text-gray-700" title="Copy" size={20} />
                            <FaPrint className="text-black cursor-pointer hover:text-gray-700" title="Print" size={20} />
                            <FaColumns className="text-gray-500 cursor-pointer hover:text-gray-700" title="Columns View" size={20} />
                          </div>
                        </div>

      {/* Table for Attendance Data */}
      <table className="min-w-full mt-4 bg-white shadow-md rounded-lg border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-b">Date</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-b">January</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-b">February</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-b">March</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-b">April</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-b">May</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-b">June</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-b">July</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-b">August</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-b">September</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-b">October</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-b">November</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-b">December</th>
          </tr>
        </thead>
        <tbody className="text-sm text-gray-600">
          {Array.from({ length: 31 }).map((_, index) => {
            const day = index + 1;
            return (
              <tr key={day} className="hover:bg-gray-50">
                <td className="px-6 py-3 border-b">{day}</td>
                {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((month) => (
                  <td key={month} className="px-6 py-3 border-b">
                    <button 
                      className="text-blue-600 hover:text-blue-800 font-semibold" 
                      onClick={() => handleAttendanceDetailClick(month, day)}
                    >
                      P
                    </button> {/* P stands for Present, can be changed dynamically */}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </div>
)}



          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
