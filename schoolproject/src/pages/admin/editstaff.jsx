import React, { useState } from "react";

const StaffFilters = () => {
  const [formData, setFormData] = useState({
    staffId: "9000",
    role: "Super Admin",
    designation: "",
    department: "",
    firstName: "Super Admin",
    lastName: "",
    fatherName: "",
    motherName: "",
    email: "admin@school.com",
    gender: "Male",
    dob: "2020-01-01",
    joiningDate: "",
    phone: "",
    emergencyContact: "",
    maritalStatus: "",
    currentAddress: "",
    permanentAddress: "",
    qualification: "",
    workExperience: "",
    note: "",
    photo: null,
    payrollDetails: {
        epfNo: "",
        contractType: "",
        basicSalary: "",
        workShift: "",
        workLocation: "",
        dateOfLeaving: "",
      },
      bankAccountDetails: {
        accountTitle: "",
        accountNumber: "",
        bankName: "",
        ifscCode: "",
        bankBranchName: "",
      },
      socialMediaLinks: {
        facebookUrl: "",
        twitterUrl: "",
        linkedinUrl: "",
        instagramUrl: "",
      },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, photo: e.target.files[0] }));
  };
  const [showMoreDetails, setShowMoreDetails] = useState(false);

  

  const handlePayrollChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      payrollDetails: { ...prev.payrollDetails, [name]: value },
    }));
  };

  const handleFileUpload = (e, type) => {
    const file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      payrollDetails: {
        ...prev.payrollDetails,
        documents: [...prev.payrollDetails.documents, { type, file }],
      },
    }));
  };

  const toggleMoreDetails = () => setShowMoreDetails(!showMoreDetails);
  const handleBankAccountChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      bankAccountDetails: {
        ...prevState.bankAccountDetails,
        [name]: value,
      },
    }));
  };
  
  const handleSocialMediaChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      socialMediaLinks: {
        ...prevState.socialMediaLinks,
        [name]: value,
      },
    }));
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    // Add API call logic here
  };



  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen p-6">
              <div className="bg-white dark:bg-gray-800 shadow-md p-4 rounded-md">

      <h1 className="text-2xl font-bold mb-6">Edit Staff </h1>
      <p className="border border-blue-500 bg-gray-100 dark:bg-gray-900 text-blue-800 dark:text-blue-300 p-3 rounded hover:shadow-lg mb-2">
       Note:Staff email is their login username, password is generated automatically and sent to staff email. Superadmin can change staff password on their staff profile page.
      </p>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Staff ID */}
        <div>
          <label className="block text-sm font-medium mb-1">Staff ID *</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            name="staffId"
            value={formData.staffId}
            readOnly
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
          <label className="block text-sm font-medium mb-1">Designation</label>
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
          <label className="block text-sm font-medium mb-1">Department</label>
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
          <label className="block text-sm font-medium mb-1">First Name *</label>
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
          <label className="block text-sm font-medium mb-1">Last Name</label>
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
          <label className="block text-sm font-medium mb-1">Father Name</label>
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
          <label className="block text-sm font-medium mb-1">Mother Name</label>
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
          <label className="block text-sm font-medium mb-1">Date Of Birth *</label>
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
          <label className="block text-sm font-medium mb-1">Date Of Joining</label>
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
          <label className="block text-sm font-medium mb-1">Emergency Contact Number</label>
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
          <label className="block text-sm font-medium mb-1">Marital Status</label>
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
          <label className="block text-sm font-medium mb-1">Current Address</label>
          <textarea
            className="w-full border rounded px-3 py-2"
            name="currentAddress"
            value={formData.currentAddress}
            onChange={handleInputChange}
          ></textarea>
        </div>

        {/* Permanent Address */}
        <div>
          <label className="block text-sm font-medium mb-1">Permanent Address</label>
          <textarea
            className="w-full border rounded px-3 py-2"
            name="permanentAddress"
            value={formData.permanentAddress}
            onChange={handleInputChange}
          ></textarea>
        </div>

        {/* Qualification */}
        <div>
          <label className="block text-sm font-medium mb-1">Qualification</label>
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
          <label className="block text-sm font-medium mb-1">Work Experience</label>
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

{showMoreDetails && (
  <div className="col-span-1 md:col-span-2 lg:col-span-4 flex flex-col gap-4">

    {/* Payroll Details Section */}
    <div className="border p-4 rounded">
      <h3 className="text-lg font-bold mb-2">Payroll Details</h3>
      <div>
        <label className="block text-sm font-medium mb-1">EPF No.</label>
        <input
          type="text"
          className="w-full border rounded px-3 py-2"
          name="epfNo"
          value={formData.payrollDetails.epfNo}
          onChange={handlePayrollChange}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Contract Type</label>
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
        <label className="block text-sm font-medium mb-1">Basic Salary</label>
        <input
          type="number"
          className="w-full border rounded px-3 py-2"
          name="basicSalary"
          value={formData.payrollDetails.basicSalary}
          onChange={handlePayrollChange}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Work Shift</label>
        <input
          type="text"
          className="w-full border rounded px-3 py-2"
          name="workShift"
          value={formData.payrollDetails.workShift}
          onChange={handlePayrollChange}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Work Location</label>
        <input
          type="text"
          className="w-full border rounded px-3 py-2"
          name="workLocation"
          value={formData.payrollDetails.workLocation}
          onChange={handlePayrollChange}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Date Of Leaving</label>
        <input
          type="date"
          className="w-full border rounded px-3 py-2"
          name="dateOfLeaving"
          value={formData.payrollDetails.dateOfLeaving}
          onChange={handlePayrollChange}
        />
      </div>
    </div>

    {/* Bank Account Details Section */}
    <div className="border p-4 rounded">
      <h3 className="text-lg font-bold mb-2">Bank Account Details</h3>
      <div>
        <label className="block text-sm font-medium mb-1">Account Title</label>
        <input
          type="text"
          className="w-full border rounded px-3 py-2"
          name="accountTitle"
          value={formData.bankAccountDetails.accountTitle}
          onChange={handleBankAccountChange}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Bank Account Number</label>
        <input
          type="number"
          className="w-full border rounded px-3 py-2"
          name="accountNumber"
          value={formData.bankAccountDetails.accountNumber}
          onChange={handleBankAccountChange}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Bank Name</label>
        <input
          type="text"
          className="w-full border rounded px-3 py-2"
          name="bankName"
          value={formData.bankAccountDetails.bankName}
          onChange={handleBankAccountChange}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">IFSC Code</label>
        <input
          type="text"
          className="w-full border rounded px-3 py-2"
          name="ifscCode"
          value={formData.bankAccountDetails.ifscCode}
          onChange={handleBankAccountChange}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Bank Branch Name</label>
        <input
          type="text"
          className="w-full border rounded px-3 py-2"
          name="bankBranchName"
          value={formData.bankAccountDetails.bankBranchName}
          onChange={handleBankAccountChange}
        />
      </div>
    </div>

    {/* Social Media Links Section */}
    <div className="border p-4 rounded">
      <h3 className="text-lg font-bold mb-2">Social Media Links</h3>
      <div>
        <label className="block text-sm font-medium mb-1">Facebook URL</label>
        <input
          type="url"
          className="w-full border rounded px-3 py-2"
          name="facebookUrl"
          value={formData.socialMediaLinks.facebookUrl}
          onChange={handleSocialMediaChange}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Twitter URL</label>
        <input
          type="url"
          className="w-full border rounded px-3 py-2"
          name="twitterUrl"
          value={formData.socialMediaLinks.twitterUrl}
          onChange={handleSocialMediaChange}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">LinkedIn URL</label>
        <input
          type="url"
          className="w-full border rounded px-3 py-2"
          name="linkedinUrl"
          value={formData.socialMediaLinks.linkedinUrl}
          onChange={handleSocialMediaChange}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Instagram URL</label>
        <input
          type="url"
          className="w-full border rounded px-3 py-2"
          name="instagramUrl"
          value={formData.socialMediaLinks.instagramUrl}
          onChange={handleSocialMediaChange}
        />
      </div>
    </div>

    {/* Upload Documents Section */}
    <div className="border p-4 rounded col-span-1 md:col-span-2">
      <h3 className="text-lg font-bold mb-2">Upload Documents</h3>
      {["Resume", "Joining Letter", "Resignation Letter", "Other Documents"].map((title, index) => (
        <div key={index} className="mb-4">
          <label className="block text-sm font-medium mb-1">{title}</label>
          <input
            type="file"
            className="w-full border rounded px-3 py-2"
            onChange={(e) => handleFileUpload(e, title)}
          />
        </div>
      ))}
    </div>

    {/* Save Button */}
    <div className="col-span-1 md:col-span-2 lg:col-span-4 flex justify-end">
      <button
        type="submit"
        className="px-6 py-2 bg-green-500 text-white font-semibold rounded shadow hover:bg-green-600 transition"
      >
        Save Details
      </button>
    </div>
  </div>
)}

        
      </form>
    </div>
    </div>
  );
};

export default StaffFilters;
