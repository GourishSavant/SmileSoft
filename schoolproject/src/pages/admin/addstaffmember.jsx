import React, { useState, useEffect } from "react";
import { FaFilePdf, FaFileExcel, FaFileWord, FaPrint, FaCopy, FaColumns } from "react-icons/fa"; // Importing icons

const StaffMemberList = () => {
  const [staffMembers, setStaffMembers] = useState([]); // State to store staff members (from JSON)
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage the visibility of the modal
  const [selectedMember, setSelectedMember] = useState(null); // State to hold the selected member for editing

  // Fetch staff members from the external JSON file using the fetch API
  useEffect(() => {
    fetch("/admin/addstaffmember.json") // Adjust path to where your JSON file is located
      .then((response) => response.json()) // Parse the JSON file
      .then((data) => {
        setStaffMembers(data); // Store the results in state
      })
      .catch((error) => {
        console.error("Error fetching the JSON data:", error); // Handle errors
      });
  }, []); // Empty array means this effect runs only once when the component is mounted

  // Handle input changes for library card number
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedMember((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission to update the member
  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedMembers = staffMembers.map((member) =>
      member.memberId === selectedMember.memberId
        ? { ...member, libraryCardNo: selectedMember.libraryCardNo }
        : member
    );
    setStaffMembers(updatedMembers); // Update the staff members list with the new library card number
    setIsModalOpen(false); // Close the modal
    setSelectedMember(null); // Reset selected member
  };

  // Placeholder function for PDF export
  const handlePdfExport = () => {
    alert("Exporting as PDF..."); // Replace this with actual PDF export logic
  };

  // Placeholder function for Excel export
  const handleExcelExport = () => {
    alert("Exporting as Excel..."); // Replace this with actual Excel export logic
  };

  // Placeholder function for Word export
  const handleWordExport = () => {
    alert("Exporting as Docs..."); // Replace this with actual Word export logic
  };

  // Placeholder function for printing
  const handlePrint = () => {
    alert("Printing..."); // Replace this with actual print logic
  };

  // Placeholder function for copy
  const handleCopy = () => {
    alert("Copying..."); // Replace this with actual copy logic
  };

  // Placeholder function for columns view
  const handleColumnsView = () => {
    alert("Changing column view..."); // Replace this with actual column view logic
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 dark:text-white p-6">
      <h1 className="text-2xl font-semibold mb-6">Staff Member List</h1>

      {/* Right top icons */}
      <div className="flex justify-end space-x-4 mb-4">
        <FaFilePdf
          onClick={handlePdfExport}
          className="text-xl text-red-600 cursor-pointer"
          title="Download as PDF"
        />
        <FaFileExcel
          onClick={handleExcelExport}
          className="text-xl text-green-600 cursor-pointer"
          title="Download as Excel"
        />
        <FaFileWord
          onClick={handleWordExport}
          className="text-xl text-blue-600 cursor-pointer"
          title="Download as Docs"
        />
        <FaPrint
          onClick={handlePrint}
          className="text-xl text-black cursor-pointer"
          title="Print"
        />
        <FaCopy
          onClick={handleCopy}
          className="text-xl text-gray-600 cursor-pointer"
          title="Copy"
        />
        <FaColumns
          onClick={handleColumnsView}
          className="text-xl text-yellow-600 cursor-pointer"
          title="Columns View"
        />
      </div>

      {/* Staff Member Table */}
      <div className="bg-white dark:bg-gray-800 shadow-md p-4 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-2">
            <input
              type="text"
              className="p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-white text-sm"
              placeholder="Search..."
            />
          </div>
        </div>

        {/* Staff Member Table */}
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-600 dark:text-white">
              <th className="p-2 border border-gray-300">Member ID</th>
              <th className="p-2 border border-gray-300">Library Card No.</th>
              <th className="p-2 border border-gray-300">Staff Name</th>
              <th className="p-2 border border-gray-300">Email</th>
              <th className="p-2 border border-gray-300">Date Of Birth</th>
              <th className="p-2 border border-gray-300">Phone</th>
              <th className="p-2 border border-gray-300">Action</th>
            </tr>
          </thead>
          <tbody>
            {staffMembers.length > 0 ? (
              staffMembers.map((member, index) => (
                <tr key={index}>
                  <td className="p-2 border border-gray-300">{member.memberId}</td>
                  <td className="p-2 border border-gray-300">
                    {/* Display Library Card No. or Input field for editing */}
                    {selectedMember && selectedMember.memberId === member.memberId ? (
                      <input
                        type="text"
                        name="libraryCardNo"
                        value={selectedMember.libraryCardNo}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-white"
                      />
                    ) : (
                      member.libraryCardNo
                    )}
                  </td>
                  <td className="p-2 border border-gray-300">{member.staffName}</td>
                  <td className="p-2 border border-gray-300">{member.email}</td>
                  <td className="p-2 border border-gray-300">{member.dateOfBirth}</td>
                  <td className="p-2 border border-gray-300">{member.phone}</td>
                  <td className="p-2 border border-gray-300">
                    <button
                      onClick={() => {
                        setSelectedMember(member); // Set the selected member to be edited
                        setIsModalOpen(true); // Open the form modal
                      }}
                      className="bg-blue-500 text-white p-2 rounded-full"
                    >
                      +
                    </button>
                    {/* + Symbol as Action */}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="p-2 text-center border border-gray-300">
                  No members found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal for Adding/Editing Member */}
      {isModalOpen && selectedMember && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-96">
            <h2 className="text-xl font-semibold mb-4 text-center text-gray-800 dark:text-white">
              Edit Member
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm text-gray-700 dark:text-white">Library Card No.</label>
                <input
                  type="text"
                  name="libraryCardNo"
                  value={selectedMember.libraryCardNo}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)} // Close the modal without submitting
                  className="bg-gray-500 text-white p-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white p-2 rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffMemberList;
