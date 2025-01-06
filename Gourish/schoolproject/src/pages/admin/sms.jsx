import React, { useState } from "react";

const SendEmail = () => {
  const [formData, setFormData] = useState({
    emailTemplate: "",
    title: "",
    attachment: null,
    message: "",
    group: [],
    individual: "",
    class: "",
    section: "",
    birthday: false,
    addedEmails: [],
  });

  const [emailInput, setEmailInput] = useState("");
  const [activeTab, setActiveTab] = useState("group");

  // Data for groups and individuals
  const groups = [
    "Students",
    "Guardians",
    "Admin",
    "Teacher",
    "Accountant",
    "Librarian",
    "Receptionist",
    "Super Admin",
    "Administrator",
    "Parent",
  ];

  const individuals = {
    Students: ["Student 1", "Student 2", "Student 3"],
    Guardians: ["Guardian 1", "Guardian 2", "Guardian 3"],
    Admin: ["Admin 1", "Admin 2", "Admin 3"],
    Teacher: ["Teacher 1", "Teacher 2", "Teacher 3"],
    Accountant: ["Accountant 1", "Accountant 2", "Accountant 3"],
    Librarian: ["Librarian 1", "Librarian 2", "Librarian 3"],
    Receptionist: ["Receptionist 1", "Receptionist 2", "Receptionist 3"],
    "Super Admin": ["Super Admin 1", "Super Admin 2", "Super Admin 3"],
    Administrator: ["Administrator 1", "Administrator 2", "Administrator 3"],
    Parent: ["Parent 1", "Parent 2", "Parent 3"],
  };

  const classes = ["Class 1", "Class 2", "Class 3"];
  const sections = ["A", "B", "C"];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "group") {
      setFormData((prevState) => ({
        ...prevState,
        [name]: checked
          ? [...prevState.group, value]
          : prevState.group.filter((group) => group !== value),
      }));
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, attachment: e.target.files[0] });
  };

  const handleAddEmail = () => {
    if (emailInput.trim() !== "") {
      setFormData((prevState) => ({
        ...prevState,
        addedEmails: [...prevState.addedEmails, emailInput.trim()],
      }));
      setEmailInput(""); // Clear email input after adding
    }
  };

  const handleRemoveEmail = (index) => {
    setFormData((prevState) => ({
      ...prevState,
      addedEmails: prevState.addedEmails.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    alert("Email sent successfully!");
    setFormData({
      emailTemplate: "",
      title: "",
      attachment: null,
      message: "",
      group: [],
      individual: "",
      class: "",
      section: "",
      birthday: false,
      addedEmails: [],
    });
    setEmailInput(""); // Clear email input on submit
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen dark:bg-gray-800 dark:text-white">
      <h1 className="text-2xl font-bold mb-6">Send SMS</h1>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-white dark:bg-gray-800 dark:text-white p-6 rounded shadow-md"
      >
        {/* Left Section */}
        <div>
          <div className="mb-4">
            <label className="block font-bold mb-2">SMS Template</label>
            <select
              name="emailTemplate"
              value={formData.emailTemplate}
              onChange={handleInputChange}
              className="w-full border border-gray-300 dark:bg-gray-800 dark:text-white p-2 rounded"
            >
              <option value="">Select Template</option>
              <option value="Template 1">Template 1</option>
              <option value="Template 2">Template 2</option>
              <option value="Template 3">Template 3</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block font-bold mb-2">Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full border border-gray-300 dark:bg-gray-800 dark:text-white p-2 rounded"
              placeholder="Enter title"
            />
          </div>

          <div className="mb-4">
            <label className="block font-bold mb-2">Attachment</label>
            <input
              type="file"
              name="attachment"
              onChange={handleFileChange}
              className="w-full border border-gray-300 dark:bg-gray-800 dark:text-white p-2 rounded"
            />
            {formData.attachment && (
              <p className="text-sm text-green-500 mt-2">
                {formData.attachment.name} selected.
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block font-bold mb-2">Message *</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              className="w-full border border-gray-300 dark:bg-gray-800 dark:text-white p-2 rounded"
              placeholder="Write your message here..."
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Send Now
          </button>
        </div>

        {/* Right Section (Group, Individual, Class, Today's Birthday) */}
        <div className="lg:col-span-1">
          <div className="mb-6 flex gap-4">
            <button
              type="button"
              onClick={() => setActiveTab("group")}
              className={`px-4 py-2 rounded ${
                activeTab === "group" ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              Group
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("individual")}
              className={`px-4 py-2 rounded ${
                activeTab === "individual" ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              Individual
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("class")}
              className={`px-4 py-2 rounded ${
                activeTab === "class" ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              Class
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("birthday")}
              className={`px-4 py-2 rounded ${
                activeTab === "birthday" ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              Today's Birthday
            </button>
          </div>

          {/* Group Section */}
          {activeTab === "group" && (
            <div className="mb-6">
              <label className="block font-bold mb-2">Message To *</label>
              <div>
                {groups.map((group) => (
                  <div key={group} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      name="group"
                      value={group}
                      checked={formData.group.includes(group)}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    <label className="text-sm">{group}</label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Individual Section */}
          {activeTab === "individual" && (
            <div className="mb-6">
              <label className="block font-bold mb-2">Select Individual</label>
              <select
                name="individual"
                value={formData.individual}
                onChange={handleInputChange}
                className="w-full border border-gray-300 dark:bg-gray-800 dark:text-white p-2 rounded"
              >
                <option value="">Select Individual</option>
                {formData.group.length > 0 &&
                  formData.group
                    .map((group) => individuals[group] || [])
                    .flat()
                    .map((individual) => (
                      <option key={individual} value={individual}>
                        {individual}
                      </option>
                    ))}
              </select>
            </div>
          )}

          {/* Class Section */}
          {activeTab === "class" && (
            <div className="mb-6">
              <label className="block font-bold mb-2">Select Class</label>
              <select
                name="class"
                value={formData.class}
                onChange={handleInputChange}
                className="w-full border border-gray-300 dark:bg-gray-800 dark:text-white p-2 rounded"
              >
                <option value="">Select Class</option>
                {classes.map((classItem) => (
                  <option key={classItem} value={classItem}>
                    {classItem}
                  </option>
                ))}
              </select>
              <label className="block font-bold mt-4 mb-2">Select Section</label>
              <select
                name="section"
                value={formData.section}
                onChange={handleInputChange}
                className="w-full border border-gray-300 dark:bg-gray-800 dark:text-white p-2 rounded"
              >
                <option value="">Select Section</option>
                {sections.map((section) => (
                  <option key={section} value={section}>
                    {section}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Today's Birthday Section */}
          {activeTab === "birthday" && (
            <div className="mb-6">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="birthday"
                  checked={formData.birthday}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <label className="text-sm">Send to today's birthday</label>
              </div>
            </div>
          )}

          {/* Emails Section */}
          <div className="mb-6">
            <label className="block font-bold mb-2">Add Emails</label>
            <div className="flex">
              <input
                type="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="border border-gray-300 dark:bg-gray-800 dark:text-white p-2 rounded w-full mr-2"
                placeholder="Enter email"
              />
              <button
                type="button"
                onClick={handleAddEmail}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Add
              </button>
            </div>
            <div className="mt-2">
              {formData.addedEmails.map((email, index) => (
                <div key={index} className="flex items-center mb-2">
                  <span className="mr-2">{email}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveEmail(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SendEmail;
