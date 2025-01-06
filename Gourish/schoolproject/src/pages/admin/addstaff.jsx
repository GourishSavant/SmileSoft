import React, { useState } from "react";

const AddStaff = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    staffId: "",
    role: "",
    designation: "",
    department: "",
    firstName: "",
    lastName: "",
    fatherName: "",
    motherName: "",
    email: "",
    gender: "",
    dateOfBirth: "",
    dateOfJoining: "",
    phone: "",
    emergencyContact: "",
    maritalStatus: "",
    photo: null,
    address: "",
    permanentAddress: "",
    qualification: "",
    workExperience: "",
    note: "",
    epfNo: "",
    basicSalary: "",
    contractType: "",
    workShift: "",
    workLocation: "",
    leaves: "",
    accountTitle: "",
    bankAccountNumber: "",
    bankName: "",
    ifscCode: "",
    bankBranchName: "",
    facebookUrl: "",
    twitterUrl: "",
    linkedinUrl: "",
    instagramUrl: "",
    documents: {
      resume: null,
      joiningLetter: null,
      resignationLetter: null,
      otherDocuments: null,
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const handleDocumentsChange = (e, documentType) => {
    const { files } = e.target;
    setFormData({
      ...formData,
      documents: { ...formData.documents, [documentType]: files[0] },
    });
  };

  const generatePassword = () => {
    const password = Math.random().toString(36).slice(-8); // Generate an 8-character password
    alert(`Generated Password: ${password}`);
    return password;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const password = generatePassword();
    const submittedData = { ...formData, password }; // Include generated password
    console.log("Form Submitted:", submittedData);
    if (onSubmit) onSubmit(submittedData); // Callback to parent component
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100 dark:bg-gray-800 dark:text-white">
      <h1 className="text-lg font-bold mb-6">Add Staff</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <fieldset>
          <legend className="font-semibold">Basic Information</legend>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <input
              type="text"
              name="staffId"
              value={formData.staffId}
              onChange={handleInputChange}
              placeholder="Staff ID *"
              className="p-2 border rounded"
              required
            />
            <select
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className="p-2 border rounded"
              required
            >
              <option value="">Select Role</option>
              <option value="Admin">Admin</option>
              <option value="Staff">Staff</option>
            </select>
            <input
              type="text"
              name="designation"
              value={formData.designation}
              onChange={handleInputChange}
              placeholder="Designation"
              className="p-2 border rounded"
            />
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleInputChange}
              placeholder="Department"
              className="p-2 border rounded"
            />
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="First Name *"
              className="p-2 border rounded"
              required
            />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder="Last Name"
              className="p-2 border rounded"
            />
            <input
              type="text"
              name="fatherName"
              value={formData.fatherName}
              onChange={handleInputChange}
              placeholder="Father Name"
              className="p-2 border rounded"
            />
            <input
              type="text"
              name="motherName"
              value={formData.motherName}
              onChange={handleInputChange}
              placeholder="Mother Name"
              className="p-2 border rounded"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email (Login Username) *"
              className="p-2 border rounded"
              required
            />
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className="p-2 border rounded"
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              className="p-2 border rounded"
              required
            />
            <input
              type="date"
              name="dateOfJoining"
              value={formData.dateOfJoining}
              onChange={handleInputChange}
              className="p-2 border rounded"
            />
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Phone"
              className="p-2 border rounded"
            />
            <input
              type="text"
              name="emergencyContact"
              value={formData.emergencyContact}
              onChange={handleInputChange}
              placeholder="Emergency Contact Number"
              className="p-2 border rounded"
            />
          </div>
        </fieldset>

        {/* Address */}
        <fieldset>
          <legend className="font-semibold">Address</legend>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="Permanent Address"
            className="p-2 border rounded w-full"
          ></textarea>
        </fieldset>

        {/* Upload Documents */}
        <fieldset>
          <legend className="font-semibold">Upload Documents</legend>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="file"
              name="resume"
              onChange={(e) => handleDocumentsChange(e, "resume")}
              className="p-2 border rounded"
            />
            <input
              type="file"
              name="joiningLetter"
              onChange={(e) => handleDocumentsChange(e, "joiningLetter")}
              className="p-2 border rounded"
            />
            <input
              type="file"
              name="resignationLetter"
              onChange={(e) => handleDocumentsChange(e, "resignationLetter")}
              className="p-2 border rounded"
            />
            <input
              type="file"
              name="otherDocuments"
              onChange={(e) => handleDocumentsChange(e, "otherDocuments")}
              className="p-2 border rounded"
            />
          </div>
        </fieldset>

        {/* Submit Button */}
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default AddStaff;
