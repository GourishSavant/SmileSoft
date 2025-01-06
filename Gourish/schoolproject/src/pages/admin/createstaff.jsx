// import React, { useState } from "react";

// const StaffFilters = () => {
//   const [formData, setFormData] = useState({
//     staffId: "",
//     role: "",
//     designation: "",
//     department: "",
//     firstName: " ",
//     lastName: "",
//     fatherName: "",
//     motherName: "",
//     email: " ",
//     gender: "",
//     dob: " ",
//     joiningDate: "",
//     phone: "",
//     emergencyContact: "",
//     maritalStatus: "",
//     currentAddress: "",
//     permanentAddress: "",
//     qualification: "",
//     workExperience: "",
//     note: "",
//     photo: null,
//     payrollDetails: {
//         epfNo: "",
//         contractType: "",
//         basicSalary: "",
//         workShift: "",
//         workLocation: "",
//         dateOfLeaving: "",
//       },
//       bankAccountDetails: {
//         accountTitle: "",
//         accountNumber: "",
//         bankName: "",
//         ifscCode: "",
//         bankBranchName: "",
//       },
//       socialMediaLinks: {
//         facebookUrl: "",
//         twitterUrl: "",
//         linkedinUrl: "",
//         instagramUrl: "",
//       },
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleFileChange = (e) => {
//     setFormData((prev) => ({ ...prev, photo: e.target.files[0] }));
//   };
//   const [showMoreDetails, setShowMoreDetails] = useState(false);

//   const handlePayrollChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       payrollDetails: { ...prev.payrollDetails, [name]: value },
//     }));
//   };

//   const handleFileUpload = (e, type) => {
//     const file = e.target.files[0];
//     setFormData((prev) => ({
//       ...prev,
//       payrollDetails: {
//         ...prev.payrollDetails,
//         documents: [...prev.payrollDetails.documents, { type, file }],
//       },
//     }));
//   };

//   const toggleMoreDetails = () => setShowMoreDetails(!showMoreDetails);
//   const handleBankAccountChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       bankAccountDetails: {
//         ...prevState.bankAccountDetails,
//         [name]: value,
//       },
//     }));
//   };

//   const handleSocialMediaChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       socialMediaLinks: {
//         ...prevState.socialMediaLinks,
//         [name]: value,
//       },
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Form Data Submitted:", formData);
//     // Add API call logic here
//   };

// //   return (
// //     <div className="bg-gray-100 dark:bg-gray-900 min-h-screen p-6">
// //               <div className="bg-white dark:bg-gray-800 shadow-md p-4 rounded-md">

// //       <h1 className="text-2xl font-bold mb-6">Create Staff  {formData.staffId}</h1>
// //        {/* +Import Button */}
// //        <button
// //           type="button"
// //           className="absolute top-4 right-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
// //         >
// //           +Import
// //         </button>

// //       <p className="border border-blue-500 bg-gray-100 dark:bg-gray-900 text-blue-800 dark:text-blue-300 p-3 rounded hover:shadow-lg mb-2">
// //        Note:Staff email is their login username, password is generated automatically and sent to staff email. Superadmin can change staff password on their staff profile page.
// //       </p>

//       <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
//         {/* Staff ID */}
//         <div>
//           <label className="block text-sm font-medium mb-1">Staff ID *</label>
//           <input
//             type="text"
//             className="w-full border rounded px-3 py-2"
//             name="staffId"
//             value={formData.staffId}
//             readOnly
//           />
//         </div>

//         {/* Role */}
//         <div>
//           <label className="block text-sm font-medium mb-1">Role *</label>
//           <select
//             className="w-full border rounded px-3 py-2"
//             name="role"
//             value={formData.role}
//             onChange={handleInputChange}
//           >
//             <option value="Super Admin">Super Admin</option>
//             <option value="Teacher">Teacher</option>
//             <option value="Admin">Admin</option>
//           </select>
//         </div>

//         {/* Designation */}
//         <div>
//           <label className="block text-sm font-medium mb-1">Designation</label>
//           <select
//             className="w-full border rounded px-3 py-2"
//             name="designation"
//             value={formData.designation}
//             onChange={handleInputChange}
//           >
//             <option value="">Select</option>
//             <option value="Principal">Principal</option>
//             <option value="Vice Principal">Vice Principal</option>
//             <option value="Teacher">Teacher</option>
//             <option value="Clerk">Clerk</option>
//           </select>
//         </div>

//         {/* Department */}
//         <div>
//           <label className="block text-sm font-medium mb-1">Department</label>
//           <select
//             className="w-full border rounded px-3 py-2"
//             name="department"
//             value={formData.department}
//             onChange={handleInputChange}
//           >
//             <option value="">Select</option>
//             <option value="Mathematics">Mathematics</option>
//             <option value="Science">Science</option>
//             <option value="Humanities">Humanities</option>
//             <option value="Administration">Administration</option>
//           </select>
//         </div>

//         {/* First Name */}
//         <div>
//           <label className="block text-sm font-medium mb-1">First Name *</label>
//           <input
//             type="text"
//             className="w-full border rounded px-3 py-2"
//             name="firstName"
//             value={formData.firstName}
//             onChange={handleInputChange}
//           />
//         </div>

//         {/* Last Name */}
//         <div>
//           <label className="block text-sm font-medium mb-1">Last Name</label>
//           <input
//             type="text"
//             className="w-full border rounded px-3 py-2"
//             name="lastName"
//             value={formData.lastName}
//             onChange={handleInputChange}
//           />
//         </div>

//         {/* Father Name */}
//         <div>
//           <label className="block text-sm font-medium mb-1">Father Name</label>
//           <input
//             type="text"
//             className="w-full border rounded px-3 py-2"
//             name="fatherName"
//             value={formData.fatherName}
//             onChange={handleInputChange}
//           />
//         </div>

//         {/* Mother Name */}
//         <div>
//           <label className="block text-sm font-medium mb-1">Mother Name</label>
//           <input
//             type="text"
//             className="w-full border rounded px-3 py-2"
//             name="motherName"
//             value={formData.motherName}
//             onChange={handleInputChange}
//           />
//         </div>

//         {/* Email */}
//         <div>
//           <label className="block text-sm font-medium mb-1">Email *</label>
//           <input
//             type="email"
//             className="w-full border rounded px-3 py-2"
//             name="email"
//             value={formData.email}
//             onChange={handleInputChange}
//           />
//         </div>

//         {/* Gender */}
//         <div>
//           <label className="block text-sm font-medium mb-1">Gender *</label>
//           <select
//             className="w-full border rounded px-3 py-2"
//             name="gender"
//             value={formData.gender}
//             onChange={handleInputChange}
//           >
//             <option value="Male">Male</option>
//             <option value="Female">Female</option>
//           </select>
//         </div>

//         {/* Date Of Birth */}
//         <div>
//           <label className="block text-sm font-medium mb-1">Date Of Birth *</label>
//           <input
//             type="date"
//             className="w-full border rounded px-3 py-2"
//             name="dob"
//             value={formData.dob}
//             onChange={handleInputChange}
//           />
//         </div>

//         {/* Date Of Joining */}
//         <div>
//           <label className="block text-sm font-medium mb-1">Date Of Joining</label>
//           <input
//             type="date"
//             className="w-full border rounded px-3 py-2"
//             name="joiningDate"
//             value={formData.joiningDate}
//             onChange={handleInputChange}
//           />
//         </div>

//         {/* Phone */}
//         <div>
//           <label className="block text-sm font-medium mb-1">Phone</label>
//           <input
//             type="tel"
//             className="w-full border rounded px-3 py-2"
//             name="phone"
//             value={formData.phone}
//             onChange={handleInputChange}
//           />
//         </div>

//         {/* Emergency Contact Number */}
//         <div>
//           <label className="block text-sm font-medium mb-1">Emergency Contact Number</label>
//           <input
//             type="tel"
//             className="w-full border rounded px-3 py-2"
//             name="emergencyContact"
//             value={formData.emergencyContact}
//             onChange={handleInputChange}
//           />
//         </div>

//         {/* Marital Status */}
//         <div>
//           <label className="block text-sm font-medium mb-1">Marital Status</label>
//           <select
//             className="w-full border rounded px-3 py-2"
//             name="maritalStatus"
//             value={formData.maritalStatus}
//             onChange={handleInputChange}
//           >
//             <option value="">Select</option>
//             <option value="Single">Single</option>
//             <option value="Married">Married</option>
//           </select>
//         </div>

//         {/* Photo */}
//         <div>
//           <label className="block text-sm font-medium mb-1">Photo</label>
//           <input
//             type="file"
//             className="w-full border rounded px-3 py-2"
//             onChange={handleFileChange}
//           />
//         </div>

//         {/* Current Address */}
//         <div>
//           <label className="block text-sm font-medium mb-1">Current Address</label>
//           <textarea
//             className="w-full border rounded px-3 py-2"
//             name="currentAddress"
//             value={formData.currentAddress}
//             onChange={handleInputChange}
//           ></textarea>
//         </div>

//         {/* Permanent Address */}
//         <div>
//           <label className="block text-sm font-medium mb-1">Permanent Address</label>
//           <textarea
//             className="w-full border rounded px-3 py-2"
//             name="permanentAddress"
//             value={formData.permanentAddress}
//             onChange={handleInputChange}
//           ></textarea>
//         </div>

//         {/* Qualification */}
//         <div>
//           <label className="block text-sm font-medium mb-1">Qualification</label>
//           <input
//             type="text"
//             className="w-full border rounded px-3 py-2"
//             name="qualification"
//             value={formData.qualification}
//             onChange={handleInputChange}
//           />
//         </div>

//         {/* Work Experience */}
//         <div>
//           <label className="block text-sm font-medium mb-1">Work Experience</label>
//           <input
//             type="text"
//             className="w-full border rounded px-3 py-2"
//             name="workExperience"
//             value={formData.workExperience}
//             onChange={handleInputChange}
//           />
//         </div>

//         {/* Note */}
//         <div className="col-span-1 md:col-span-2 lg:col-span-4">
//           <label className="block text-sm font-medium mb-1">Note</label>
//           <textarea
//             className="w-full border rounded px-3 py-2"
//             name="note"
//             value={formData.note}
//             onChange={handleInputChange}
//           ></textarea>
//         </div>
//         <div className="col-span-1 md:col-span-2 lg:col-span-4 flex justify-between items-center">
//   <h2 className="text-xl font-bold">Add More Details</h2>
//   <button
//     type="button"
//     className="text-white bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
//     onClick={toggleMoreDetails}
//   >
//     {showMoreDetails ? "-" : "+"}
//   </button>
// </div>

// {showMoreDetails && (
//   <div className="col-span-1 md:col-span-2 lg:col-span-4 flex flex-col gap-4">

//     {/* Payroll Details Section */}
//     <div className="border p-4 rounded">
//       <h3 className="text-lg font-bold mb-2">Payroll Details</h3>
//       <div>
//         <label className="block text-sm font-medium mb-1">EPF No.</label>
//         <input
//           type="text"
//           className="w-full border rounded px-3 py-2"
//           name="epfNo"
//           value={formData.payrollDetails.epfNo}
//           onChange={handlePayrollChange}
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium mb-1">Contract Type</label>
//         <select
//           className="w-full border rounded px-3 py-2"
//           name="contractType"
//           value={formData.payrollDetails.contractType}
//           onChange={handlePayrollChange}
//         >
//           <option value="">Select</option>
//           <option value="Permanent">Permanent</option>
//           <option value="Contractual">Contractual</option>
//         </select>
//       </div>

//       <div>
//         <label className="block text-sm font-medium mb-1">Basic Salary</label>
//         <input
//           type="number"
//           className="w-full border rounded px-3 py-2"
//           name="basicSalary"
//           value={formData.payrollDetails.basicSalary}
//           onChange={handlePayrollChange}
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium mb-1">Work Shift</label>
//         <input
//           type="text"
//           className="w-full border rounded px-3 py-2"
//           name="workShift"
//           value={formData.payrollDetails.workShift}
//           onChange={handlePayrollChange}
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium mb-1">Work Location</label>
//         <input
//           type="text"
//           className="w-full border rounded px-3 py-2"
//           name="workLocation"
//           value={formData.payrollDetails.workLocation}
//           onChange={handlePayrollChange}
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium mb-1">Date Of Leaving</label>
//         <input
//           type="date"
//           className="w-full border rounded px-3 py-2"
//           name="dateOfLeaving"
//           value={formData.payrollDetails.dateOfLeaving}
//           onChange={handlePayrollChange}
//         />
//       </div>
//     </div>

//     {/* Bank Account Details Section */}
//     <div className="border p-4 rounded">
//       <h3 className="text-lg font-bold mb-2">Bank Account Details</h3>
//       <div>
//         <label className="block text-sm font-medium mb-1">Account Title</label>
//         <input
//           type="text"
//           className="w-full border rounded px-3 py-2"
//           name="accountTitle"
//           value={formData.bankAccountDetails.accountTitle}
//           onChange={handleBankAccountChange}
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium mb-1">Bank Account Number</label>
//         <input
//           type="number"
//           className="w-full border rounded px-3 py-2"
//           name="accountNumber"
//           value={formData.bankAccountDetails.accountNumber}
//           onChange={handleBankAccountChange}
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium mb-1">Bank Name</label>
//         <input
//           type="text"
//           className="w-full border rounded px-3 py-2"
//           name="bankName"
//           value={formData.bankAccountDetails.bankName}
//           onChange={handleBankAccountChange}
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium mb-1">IFSC Code</label>
//         <input
//           type="text"
//           className="w-full border rounded px-3 py-2"
//           name="ifscCode"
//           value={formData.bankAccountDetails.ifscCode}
//           onChange={handleBankAccountChange}
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium mb-1">Bank Branch Name</label>
//         <input
//           type="text"
//           className="w-full border rounded px-3 py-2"
//           name="bankBranchName"
//           value={formData.bankAccountDetails.bankBranchName}
//           onChange={handleBankAccountChange}
//         />
//       </div>
//     </div>

//     {/* Social Media Links Section */}
//     <div className="border p-4 rounded">
//       <h3 className="text-lg font-bold mb-2">Social Media Links</h3>
//       <div>
//         <label className="block text-sm font-medium mb-1">Facebook URL</label>
//         <input
//           type="url"
//           className="w-full border rounded px-3 py-2"
//           name="facebookUrl"
//           value={formData.socialMediaLinks.facebookUrl}
//           onChange={handleSocialMediaChange}
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium mb-1">Twitter URL</label>
//         <input
//           type="url"
//           className="w-full border rounded px-3 py-2"
//           name="twitterUrl"
//           value={formData.socialMediaLinks.twitterUrl}
//           onChange={handleSocialMediaChange}
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium mb-1">LinkedIn URL</label>
//         <input
//           type="url"
//           className="w-full border rounded px-3 py-2"
//           name="linkedinUrl"
//           value={formData.socialMediaLinks.linkedinUrl}
//           onChange={handleSocialMediaChange}
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium mb-1">Instagram URL</label>
//         <input
//           type="url"
//           className="w-full border rounded px-3 py-2"
//           name="instagramUrl"
//           value={formData.socialMediaLinks.instagramUrl}
//           onChange={handleSocialMediaChange}
//         />
//       </div>
//     </div>

//     {/* Upload Documents Section */}
//     <div className="border p-4 rounded col-span-1 md:col-span-2">
//       <h3 className="text-lg font-bold mb-2">Upload Documents</h3>
//       {["Resume", "Joining Letter", "Resignation Letter", "Other Documents"].map((title, index) => (
//         <div key={index} className="mb-4">
//           <label className="block text-sm font-medium mb-1">{title}</label>
//           <input
//             type="file"
//             className="w-full border rounded px-3 py-2"
//             onChange={(e) => handleFileUpload(e, title)}
//           />
//         </div>
//       ))}
//     </div>

//     {/* Save Button */}
//     <div className="col-span-1 md:col-span-2 lg:col-span-4 flex justify-end">
//       <button
//         type="submit"
//         className="px-6 py-2 bg-green-500 text-white font-semibold rounded shadow hover:bg-green-600 transition"
//       >
//         Save Details
//       </button>
//     </div>
//   </div>
// )}

// //       </form>
// //     </div>
// //     </div>
// //   );
// // };

// // export default StaffFilters;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosApi from "../../api/axiosApi";

const StaffFilters = () => {
  // const [formData, setFormData] = useState({
  //   staff_id: "null",
  //   role: "",
  //   designation: "",
  //   department: "",
  //   firstName: "",
  //   lastName: "",
  //   fatherName: "",
  //   motherName: "",
  //   email: "",
  //   gender: "",
  //   dob: "",
  //   joiningDate: "",
  //   phone: "",
  //   emergencyContact: "",
  //   maritalStatus: "",
  //   currentAddress: "",
  //   permanentAddress: "",
  //   qualification: "",
  //   workExperience: "",
  //   note: "",
  //   photo: null,
  //   payrollDetails: {
  //     epfNo: "",
  //     contractType: "",
  //     basicSalary: "",
  //     workShift: "",
  //     workLocation: "",
  //     dateOfLeaving: "",
  //   },
  //   bankAccountDetails: {
  //     accountTitle: "",
  //     accountNumber: "",
  //     bankName: "",
  //     ifscCode: "",
  //     bankBranchName: "",
  //   },
  //   socialMediaLinks: {
  //     facebookUrl: "",
  //     twitterUrl: "",
  //     linkedinUrl: "",
  //     instagramUrl: "",
  //   },
  // });
  const [formData, setFormData] = useState({
     staff_id: null,
  role: null,
  designation: null,
  department: null,
  firstName: null,
  lastName: null,
  fatherName: null,
  motherName: null,
  email: null,
  gender: null,
  dob: null,
  joiningDate: null,
  phone: null,
  emergencyContact: null,
  maritalStatus: null,
  currentAddress: null,
  permanentAddress: null,
  qualification: null,
  workExperience: null,
  note: null,
  photo: null,
  payrollDetails: {
    epfNo: null,
    contractType: null,
    basicSalary: null,
    workShift: null,
    workLocation: null,
    dateOfLeaving: null,
  },
  bankAccountDetails: {
    accountTitle: null,
    accountNumber: null,
    bankName: null,
    ifscCode: null,
    bankBranchName: null,
  },
  socialMediaLinks: {
    facebookUrl: null,
    twitterUrl: null,
    linkedinUrl: null,
    instagramUrl: null,
  },
  });

  const [showMoreDetails, setShowMoreDetails] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // Handle Input Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Payroll Details Change
  const handlePayrollChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      payrollDetails: { ...prev.payrollDetails, [name]: value },
    }));
  };

  // Handle Bank Account Details Change
  const handleBankAccountChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      bankAccountDetails: { ...prev.bankAccountDetails, [name]: value },
    }));
  };

  // Handle Social Media Links Change
  const handleSocialMediaChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      socialMediaLinks: { ...prev.socialMediaLinks, [name]: value },
    }));
  };

  // Handle File Upload
  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, photo: e.target.files[0] }));
  };

  // Toggle More Details
  const toggleMoreDetails = () => setShowMoreDetails(!showMoreDetails);

  // Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const payload = {
        staff_id: formData.staff_id,
        role: formData.role,
        designation: formData.designation,
        department: formData.department,
        first_name: formData.firstName,
        last_name: formData.lastName,
        father_name: formData.fatherName,
        mother_name: formData.motherName,
        email: formData.email,
        gender: formData.gender,
        dob: formData.dob,
        doj: formData.joiningDate,
        phone_no: formData.phone,
        emergency_contact_no: formData.emergencyContact,
        marital_status: formData.maritalStatus,
        photo: formData.photo,
        address: formData.currentAddress,
        permanent_address: formData.permanentAddress,
        qualification: formData.qualification,
        work_exp: formData.workExperience,
        note: formData.note,
        epf_no: formData.payrollDetails.epfNo,
        basic_salary: formData.payrollDetails.basicSalary,
        contract_type: formData.payrollDetails.contractType,
        work_shift: formData.payrollDetails.workShift,
        work_location: formData.payrollDetails.workLocation,
        account_title: formData.bankAccountDetails.accountTitle,
        account_no: formData.bankAccountDetails.accountNumber,
        bank_name: formData.bankAccountDetails.bankName,
        ifsc_code: formData.bankAccountDetails.ifscCode,
        bank_branch: formData.bankAccountDetails.bankBranchName,
        facebook_url: formData.socialMediaLinks.facebookUrl,
        twitter_url: formData.socialMediaLinks.twitterUrl,
        linkedin_url: formData.socialMediaLinks.linkedinUrl,
        instagram_url: formData.socialMediaLinks.instagramUrl,
      };

      console.log(formData.gender)
      const formDataToSend = new FormData();
      for (const key in payload) {
        console.log(key,payload[key])
        console.log("----------")
        
          formDataToSend.append(key, payload[key]);
          
        
      }

      console.log("FormData contents:");
      for (let pair of formDataToSend.entries()) {
        console.log(pair[0] + ": " + pair[1]);
      }
      // formDataToSend.staff_id =1
      console.log(formDataToSend.staff_id)
      console.log('hello this front end code ')
      console.log(formDataToSend);
      const response = await axiosApi.post(
        "/auth/createStaff",
        formDataToSend,
        // {
        //   headers: { "Content-Type": "multipart/form-data" },
        // }
      );

      setSuccessMessage("Staff created successfully!");
      console.log("Success:", response.data);
      navigate("/admin/dashboard");
    } catch (error) {
      console.error("Error creating staff:", error);
      setErrorMessage(
        error.response?.data?.message ||
          "Failed to create staff. Please try again."
      );
    }
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen p-6">
      <div className="bg-white dark:bg-gray-800 shadow-md p-4 rounded-md relative">
        {/* +Import Button */}
        <button
          type="button"
          className="absolute top-4 right-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => navigate("/admin/import")}
        >
          + Import Staff
        </button>

        <h1 className="text-2xl font-bold mb-6">Create Staff </h1>

        <p className="border border-blue-500 bg-gray-100 dark:bg-gray-900 text-blue-800 dark:text-blue-300 p-3 rounded hover:shadow-lg mb-2">
          Note: Staff email is their login username, password is generated
          automatically and sent to the staff email. Superadmin can change staff
          password on their staff profile page.
        </p>

        <form
          onSubmit={handleSubmit}
         
        >
          {/* Staff ID */}

          <div  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium mb-1">
                Staff ID *
              </label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2"
                name="staff_id"
                value={formData.staff_id}
                onChange={handleInputChange}
              />
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-medium mb-1">Role *</label>
              <select
                className="w-full border rounded px-3 py-2"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
              >
                <option value="Super Admin">Super Admin</option>
                <option value="Teacher">Teacher</option>
                <option value="Admin">Admin</option>
              </select>
            </div>

            {/* Designation */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Designation
              </label>
              <select
                className="w-full border rounded px-3 py-2"
                name="designation"
                value={formData.designation}
                onChange={handleInputChange}
              >
                <option value="">Select</option>
                <option value="Principal">Principal</option>
                <option value="Vice Principal">Vice Principal</option>
                <option value="Teacher">Teacher</option>
                <option value="Clerk">Clerk</option>
              </select>
            </div>

            {/* Department */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Department
              </label>
              <select
                className="w-full border rounded px-3 py-2"
                name="department"
                value={formData.department}
                onChange={handleInputChange}
              >
                <option value="">Select</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Science">Science</option>
                <option value="Humanities">Humanities</option>
                <option value="Administration">Administration</option>
              </select>
            </div>

            {/* First Name */}
            <div>
              <label className="block text-sm font-medium mb-1">
                First Name *
              </label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Last Name
              </label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
              />
            </div>

            {/* Father Name */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Father Name
              </label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2"
                name="fatherName"
                value={formData.fatherName}
                onChange={handleInputChange}
              />
            </div>

            {/* Mother Name */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Mother Name
              </label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2"
                name="motherName"
                value={formData.motherName}
                onChange={handleInputChange}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-1">Email *</label>
              <input
                type="email"
                className="w-full border rounded px-3 py-2"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-medium mb-1">Gender *</label>
              <select
                className="w-full border rounded px-3 py-2"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            {/* Date Of Birth */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Date Of Birth *
              </label>
              <input
                type="date"
                className="w-full border rounded px-3 py-2"
                name="dob"
                value={formData.dob}
                onChange={handleInputChange}
              />
            </div>

            {/* Date Of Joining */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Date Of Joining
              </label>
              <input
                type="date"
                className="w-full border rounded px-3 py-2"
                name="joiningDate"
                value={formData.joiningDate}
                onChange={handleInputChange}
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              <input
                type="tel"
                className="w-full border rounded px-3 py-2"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>

            {/* Emergency Contact Number */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Emergency Contact Number
              </label>
              <input
                type="tel"
                className="w-full border rounded px-3 py-2"
                name="emergencyContact"
                value={formData.emergencyContact}
                onChange={handleInputChange}
              />
            </div>

            {/* Marital Status */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Marital Status
              </label>
              <select
                className="w-full border rounded px-3 py-2"
                name="maritalStatus"
                value={formData.maritalStatus}
                onChange={handleInputChange}
              >
                <option value="">Select</option>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
              </select>
            </div>

            {/* Photo */}
            <div>
              <label className="block text-sm font-medium mb-1">Photo</label>
              <input
                type="file"
                className="w-full border rounded px-3 py-2"
                onChange={handleFileChange}
              />
            </div>

            {/* Current Address */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Current Address
              </label>
              <textarea
                className="w-full border rounded px-3 py-2"
                name="currentAddress"
                value={formData.currentAddress}
                onChange={handleInputChange}
              ></textarea>
            </div>

            {/* Permanent Address */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Permanent Address
              </label>
              <textarea
                className="w-full border rounded px-3 py-2"
                name="permanentAddress"
                value={formData.permanentAddress}
                onChange={handleInputChange}
              ></textarea>
            </div>

            {/* Qualification */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Qualification
              </label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2"
                name="qualification"
                value={formData.qualification}
                onChange={handleInputChange}
              />
            </div>

            {/* Work Experience */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Work Experience
              </label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2"
                name="workExperience"
                value={formData.workExperience}
                onChange={handleInputChange}
              />
            </div>

            {/* Note */}
            <div className="col-span-1 md:col-span-2 lg:col-span-4">
              <label className="block text-sm font-medium mb-1">Note</label>
              <textarea
                className="w-full border rounded px-3 py-2"
                name="note"
                value={formData.note}
                onChange={handleInputChange}
              ></textarea>
            </div>
            <div className="container2 "></div>
            <div className="col-span-1 md:col-span-2 lg:col-span-4 flex justify-between items-center">
              <h2 className="text-xl font-bold">Add More Details</h2>
              <button
                type="button"
                className="text-white bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
                onClick={toggleMoreDetails}
              >
                {showMoreDetails ? "-" : "+"}
              </button>
            </div>
          </div>

          {showMoreDetails && (
            <div className="col-span-1 md:col-span-2 lg:col-span-4 flex flex-col gap-4">
              {/* Payroll Details Section */}
              <div className="border p-4 rounded">
                <h3 className="text-lg font-bold mb-2">Payroll Details</h3>
                <div  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    EPF No.
                  </label>
                  <input
                    type="text"
                    className="w-full border rounded px-3 py-2"
                    name="epfNo"
                    value={formData.payrollDetails.epfNo}
                    onChange={handlePayrollChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Contract Type
                  </label>
                  <select
                    className="w-full border rounded px-3 py-2"
                    name="contractType"
                    value={formData.payrollDetails.contractType}
                    onChange={handlePayrollChange}
                  >
                    <option value="">Select</option>
                    <option value="Permanent">Permanent</option>
                    <option value="Contractual">Contractual</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Basic Salary
                  </label>
                  <input
                    type="number"
                    className="w-full border rounded px-3 py-2"
                    name="basicSalary"
                    value={formData.payrollDetails.basicSalary}
                    onChange={handlePayrollChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Work Shift
                  </label>
                  <input
                    type="text"
                    className="w-full border rounded px-3 py-2"
                    name="workShift"
                    value={formData.payrollDetails.workShift}
                    onChange={handlePayrollChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Work Location
                  </label>
                  <input
                    type="text"
                    className="w-full border rounded px-3 py-2"
                    name="workLocation"
                    value={formData.payrollDetails.workLocation}
                    onChange={handlePayrollChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Date Of Leaving
                  </label>
                  <input
                    type="date"
                    className="w-full border rounded px-3 py-2"
                    name="dateOfLeaving"
                    value={formData.payrollDetails.dateOfLeaving}
                    onChange={handlePayrollChange}
                  />
                </div>
                </div>
              </div>

              {/* Bank Account Details Section */}
              <div className="border p-4 rounded">
                <h3 className="text-lg font-bold mb-2">Bank Account Details</h3>
                <div  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Account Title
                  </label>
                  <input
                    type="text"
                    className="w-full border rounded px-3 py-2"
                    name="accountTitle"
                    value={formData.bankAccountDetails.accountTitle}
                    onChange={handleBankAccountChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Bank Account Number
                  </label>
                  <input
                    type="number"
                    className="w-full border rounded px-3 py-2"
                    name="accountNumber"
                    value={formData.bankAccountDetails.accountNumber}
                    onChange={handleBankAccountChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Bank Name
                  </label>
                  <input
                    type="text"
                    className="w-full border rounded px-3 py-2"
                    name="bankName"
                    value={formData.bankAccountDetails.bankName}
                    onChange={handleBankAccountChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    IFSC Code
                  </label>
                  <input
                    type="text"
                    className="w-full border rounded px-3 py-2"
                    name="ifscCode"
                    value={formData.bankAccountDetails.ifscCode}
                    onChange={handleBankAccountChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Bank Branch Name
                  </label>
                  <input
                    type="text"
                    className="w-full border rounded px-3 py-2"
                    name="bankBranchName"
                    value={formData.bankAccountDetails.bankBranchName}
                    onChange={handleBankAccountChange}
                  />
                </div>
                </div>
              </div>

              {/* Social Media Links Section */}
              <div className="border p-4 rounded">
                <h3 className="text-lg font-bold mb-2">Social Media Links</h3>
                
                <div  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Facebook URL
                  </label>
                  <input
                    type="url"
                    className="w-full border rounded px-3 py-2"
                    name="facebookUrl"
                    value={formData.socialMediaLinks.facebookUrl}
                    onChange={handleSocialMediaChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Twitter URL
                  </label>
                  <input
                    type="url"
                    className="w-full border rounded px-3 py-2"
                    name="twitterUrl"
                    value={formData.socialMediaLinks.twitterUrl}
                    onChange={handleSocialMediaChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    LinkedIn URL
                  </label>
                  <input
                    type="url"
                    className="w-full border rounded px-3 py-2"
                    name="linkedinUrl"
                    value={formData.socialMediaLinks.linkedinUrl}
                    onChange={handleSocialMediaChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Instagram URL
                  </label>
                  <input
                    type="url"
                    className="w-full border rounded px-3 py-2"
                    name="instagramUrl"
                    value={formData.socialMediaLinks.instagramUrl}
                    onChange={handleSocialMediaChange}
                  />
                </div>
                </div>
              </div>

              {/* Upload Documents Section */}
              <div className="border p-4 rounded col-span-1 md:col-span-2">
                <h3 className="text-lg font-bold mb-2">Upload Documents</h3>
                
                <div  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {[
                  "Resume",
                  "Joining Letter",
                  "Resignation Letter",
                  "Other Documents",
                ].map((title, index) => (
                  <div key={index} className="mb-4">
                    <label className="block text-sm font-medium mb-1">
                      {title}
                    </label>
                    <input
                      type="file"
                      className="w-full border rounded px-3 py-2"
                      onChange={(e) => handleFileUpload(e, title)}
                    />
                  </div>
                ))}
                </div>
              </div>

              {/* Save Button */}
              {/* <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"> */}
              {/* Form fields go here */}

              <div className="col-span-1 md:col-span-2 lg:col-span-4 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2 bg-green-500 text-white font-semibold rounded shadow hover:bg-green-600 transition"
                >
                  Save Details
                </button>
              </div>
              {/* </form> */}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default StaffFilters;
