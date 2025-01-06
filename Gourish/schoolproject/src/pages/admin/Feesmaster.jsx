
import React, { useState, useEffect } from "react";
import { FaFilePdf, FaFileWord, FaFileExcel, FaFileCsv, FaPrint, FaCopy } from "react-icons/fa";

const FeesMasterPage = () => {
  const [feesGroup, setFeesGroup] = useState("");
  const [feesType, setFeesType] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [amount, setAmount] = useState("");
  const [fineType, setFineType] = useState("None");
  const [percentage, setPercentage] = useState("");
  const [fixAmount, setFixAmount] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [feesList, setFeesList] = useState([]);

  // Fetch the fees data from JSON
  useEffect(() => {
    fetch("/feesData.json")  // Path to your JSON file
      .then((response) => response.json())
      .then((data) => setFeesList(data))
      .catch((error) => console.error("Error fetching fees data:", error));
  }, []);

  // Handle Form Submit
  const handleAddFees = () => {
    if (!feesGroup || !feesType || !amount) {
      alert("Please fill in all required fields!");
      return;
    }
    const newFee = {
      id: feesList.length + 1,
      feesGroup,
      feesType,
      dueDate,
      amount,
      fineType,
      percentage,
      fixAmount,
    };
    setFeesList([...feesList, newFee]);
    clearForm();
  };

  // Clear Form
  const clearForm = () => {
    setFeesGroup("");
    setFeesType("");
    setDueDate("");
    setAmount("");
    setFineType("None");
    setPercentage("");
    setFixAmount("");
  };

  // Filter Fees List
  const filteredFeesList = feesList.filter(
    (fee) =>
      fee.feesGroup.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fee.feesType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-3">
      <h1 className="text-2xl font-bold mb-4 text-gray-700">Fees Master: 2023-24</h1>

      <div className="grid grid-cols-3 gap-6">
        {/* Left Section: Add Fees Master */}
        <div className="col-span-1 bg-white p-5 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Add Fees Master</h2>

          <div className="space-y-4">
            {/* Fees Group */}
            <div>
              <label className="block text-gray-700 font-medium">Fees Group *</label>
              <select
                value={feesGroup}
                onChange={(e) => setFeesGroup(e.target.value)}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select</option>
                <option value="Admission Fees">Admission Fees</option>
                <option value="Exam Fees">Exam Fees</option>
                <option value="Book Fees">Book Fees</option>
              </select>
            </div>

            {/* Fees Type */}
            <div>
              <label className="block text-gray-700 font-medium">Fees Type *</label>
              <select
                value={feesType}
                onChange={(e) => setFeesType(e.target.value)}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select</option>
                <option value="Tuition">Tuition</option>
                <option value="Library">Library</option>
                <option value="Sports">Sports</option>
              </select>
            </div>

            {/* Due Date */}
            <div>
              <label className="block text-gray-700 font-medium">Due Date</label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Amount */}
            <div>
              <label className="block text-gray-700 font-medium">Amount ($) *</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Fine Type */}
            <div>
              <label className="block text-gray-700 font-medium">Fine Type</label>
              <select
                value={fineType}
                onChange={(e) => setFineType(e.target.value)}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              >
                <option value="None">None</option>
                <option value="Percentage">Percentage</option>
                <option value="Fix Amount">Fix Amount</option>
              </select>
            </div>

            {/* Conditional Fields */}
            {fineType === "Percentage" && (
              <div>
                <label className="block text-gray-700 font-medium">
                  Percentage (%)
                </label>
                <input
                  type="number"
                  value={percentage}
                  onChange={(e) => setPercentage(e.target.value)}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}

            {fineType === "Fix Amount" && (
              <div>
                <label className="block text-gray-700 font-medium">
                  Fix Amount ($)
                </label>
                <input
                  type="number"
                  value={fixAmount}
                  onChange={(e) => setFixAmount(e.target.value)}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                onClick={handleAddFees}
                className="w-auto py-1 px-4 bg-gray-500 text-white font-medium rounded-md hover:bg-blue-600"
              >
                Add Fees
              </button>
            </div>
          </div>
        </div>

        {/* Right Section: Fees Master List */}
        <div className="col-span-2 bg-white p-5 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Fees Master List: 2023-24</h2>

          {/* Search Input */}
          <div className="flex items-center mb-4 justify-between">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex space-x-3">
              <FaFilePdf className="cursor-pointer text-red-600" size={24} />
              <FaFileWord className="cursor-pointer text-blue-600" size={24} />
              <FaFileExcel className="cursor-pointer text-green-600" size={24} />
              <FaCopy className="cursor-pointer text-gray-600" size={24} />
              <FaPrint className="cursor-pointer text-black" size={24} />
              <FaFileCsv className="cursor-pointer text-yellow-600" size={24} />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full border">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2 text-left border">Fees Group</th>
                  <th className="p-2 text-left border">Fees Type</th>
                  <th className="p-2 text-left border">Amount</th>
                  <th className="p-2 text-left border">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredFeesList.length > 0 ? (
                  filteredFeesList.map((fee) => (
                    <tr key={fee.id} className="hover:bg-gray-100">
                      <td className="p-2 border">{fee.feesGroup}</td>
                      <td className="p-2 border">{fee.feesType}</td>
                      <td className="p-2 border">${fee.amount}</td>
                      <td className="p-2 border">
                        <button className="text-red-500 hover:text-red-700">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="p-4 text-center text-gray-500">
                      No data available in table
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeesMasterPage;





