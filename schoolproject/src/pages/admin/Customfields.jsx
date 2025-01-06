

import React, { useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const CustomFields = () => {
  const [fields, setFields] = useState({ Student: [], Staff: [] });
  const [formData, setFormData] = useState({
    belongsTo: "Student",
    fieldName: "",
    fieldType: "",
    columnSize: "",
    fieldValues: "",
    required: false,
    onTable: false,
    editId: null,  // Added for editing
  });

  const [dropdowns, setDropdowns] = useState({ Student: true, Staff: true });
  const [errors, setErrors] = useState({
    fieldName: "",
    columnSize: "",
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSave = (e) => {
    e.preventDefault();

    if (!formData.fieldName.trim()) {
      alert("Field Name is required!");
      return;
    }

    const belongsTo = formData.belongsTo;

    // If we are editing, update the existing field
    if (formData.editId) {
      setFields((prev) => ({
        ...prev,
        [belongsTo]: prev[belongsTo].map((field) =>
          field.id === formData.editId
            ? {
                ...field,
                name: formData.fieldName,
                fieldType: formData.fieldType,
                columnSize: formData.columnSize,
                fieldValues: formData.fieldValues.split(",").map((value) => value.trim()),
                required: formData.required,
                onTable: formData.onTable,
              }
            : field
        ),
      }));
    } else {
      // Otherwise, add a new field
      setFields((prev) => ({
        ...prev,
        [belongsTo]: [
          ...prev[belongsTo],
          {
            id: Date.now(),
            name: formData.fieldName,
            fieldType: formData.fieldType,
            columnSize: formData.columnSize,
            fieldValues: formData.fieldValues.split(",").map((value) => value.trim()),
            required: formData.required,
            onTable: formData.onTable,
          },
        ],
      }));
    }

    setFormData({
      belongsTo: "Student",
      fieldName: "",
      fieldType: "",
      columnSize: "",
      fieldValues: "",
      required: false,
      onTable: false,
      editId: null,  // Reset editId after saving
    });
  };

  const handleDelete = (belongsTo, id) => {
    setFields((prev) => ({
      ...prev,
      [belongsTo]: prev[belongsTo].filter((field) => field.id !== id),
    }));
  };

  const handleEdit = (belongsTo, id) => {
    const fieldToEdit = fields[belongsTo].find((field) => field.id === id);
    setFormData({
      belongsTo,
      fieldName: fieldToEdit.name,
      fieldType: fieldToEdit.fieldType,
      columnSize: fieldToEdit.columnSize,
      fieldValues: fieldToEdit.fieldValues.join(", "), // Convert array to comma-separated string
      required: fieldToEdit.required,
      onTable: fieldToEdit.onTable,
      editId: fieldToEdit.id,  // Set the id for editing
    });
  };

  const toggleDropdown = (type) => {
    setDropdowns((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-start justify-center p-6 dark:bg-gray-700">
      {/* Left Section */}
      <div className="bg-white p-6 rounded-lg shadow-md w-1/2 mr-4 dark:bg-gray-800 dark:text-white">
        <h2 className="text-xl font-semibold mb-4">{formData.editId ? "Edit Custom Field" : "Add Custom Field"}</h2>
        <form onSubmit={handleSave}>
          {/* Field Belongs To */}
          <div className="mb-4">
            <label className="block mb-1 font-medium">Field Belongs To *</label>
            <select
              name="belongsTo"
              value={formData.belongsTo}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-blue-500 dark:bg-gray-700"
            >
              <option value="Student">Student</option>
              <option value="Staff">Staff</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="fieldType" className="block text-sm font-medium dark:text-white">
              Field Type
            </label>
            <select
              id="fieldType"
              name="fieldType"
              value={formData.fieldType}
              onChange={handleInputChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="">Select</option>
              <option value="Input">Input</option>
              <option value="Dropdown">Dropdown</option>
            </select>
          </div>

          {/* Field Name */}
          <div className="mb-4">
            <label className="block mb-1 font-medium">Field Name *</label>
            <input
              type="text"
              name="fieldName"
              value={formData.fieldName}
              onChange={handleInputChange}
              placeholder="Enter field name"
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-blue-500 dark:bg-gray-700"
            />
          </div>
          
          {/* Column Size */}
          <div className="mb-4">
            <label htmlFor="columnSize" className="block text-sm font-medium dark:text-white">
              Grid (Bootstrap Column e.g., 6) - Max is 12
            </label>
            <input
              type="number"
              id="columnSize"
              name="columnSize"
              value={formData.columnSize}
              onChange={handleInputChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            {errors.columnSize && <p className="text-red-500 text-sm mt-1">{errors.columnSize}</p>}
          </div>

          {/* Field Values */}
          <div className="mb-4">
            <label className="block mb-1 font-medium">Field Values (Separate By Comma)</label>
            <input
              type="text"
              name="fieldValues"
              value={formData.fieldValues}
              onChange={handleInputChange}
              placeholder="Enter values separated by commas"
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-blue-500 dark:bg-gray-700"
            />
          </div>

          {/* Validation */}
          <div className="mb-4">
            <label className="block text-sm font-medium dark:text-white">Validation</label>
            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="required"
                  checked={formData.required}
                  onChange={handleInputChange}
                  className="w-5 h-5 text-blue-600 bg-gray-100 rounded-md border-gray-300 focus:ring-blue-500"
                />
                <span className="dark:text-white">Required</span>
              </label>
            </div>
          </div>

          {/* Visibility */}
          <div className="mb-4">
            <label className="block text-sm font-medium dark:text-white">Visibility</label>
            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="onTable"
                  checked={formData.onTable}
                  onChange={handleInputChange}
                  className="w-5 h-5 text-blue-600 bg-gray-100 rounded-md border-gray-300 focus:ring-blue-500"
                />
                <span className="dark:text-white">On Table</span>
              </label>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="py-2 px-4 bg-gray-500 text-white rounded-md hover:bg-gray-800"
            >
              {formData.editId ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>

      {/* Right Section */}
      <div className="bg-white p-6 rounded-lg shadow-md w-1/2 dark:bg-gray-800 dark:text-white">
        <h2 className="text-xl font-semibold mb-4">Custom Field List</h2>

        {/* Dropdowns for Fields */}
        {["Student", "Staff"].map((type) => (
          <div key={type} className="mb-4">
            {/* Dropdown Header */}
            <div
              onClick={() => toggleDropdown(type)}
              className="cursor-pointer bg-gray-100 p-2 rounded flex justify-between items-center dark:bg-gray-700"
            >
              <span className="font-medium">{type}</span>
              <span>{dropdowns[type] ? "-" : "+"}</span>
            </div>

            {/* Dropdown Content */}
            {dropdowns[type] && (
              <ul className="mt-2 space-y-2">
                {fields[type].map((field) => (
                  <li
                    key={field.id}
                    className="bg-gray-50 p-2 rounded flex justify-between items-center shadow dark:bg-gray-900"
                  >
                    <span>{field.name}</span>
                    <div className="flex items-center space-x-2">
                      <button
                        className="text-blue-500 hover:text-blue-700"
                        onClick={() => handleEdit(type, field.id)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleDelete(type, field.id)}
                      >
                        <FaTrashAlt />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomFields;




