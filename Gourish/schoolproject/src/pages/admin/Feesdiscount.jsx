
import React, { useState } from "react";
import { FaFilePdf, FaFileWord, FaFileExcel, FaFileCsv, FaPrint, FaCopy } from "react-icons/fa";


const FeesDiscountPage = () => {
  const [discountName, setDiscountName] = useState("");
  const [discountCode, setDiscountCode] = useState("");
  const [discountType, setDiscountType] = useState("Percentage");
  const [percentage, setPercentage] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [discountList, setDiscountList] = useState([]);

  // Handle Add Fees Discount
  const handleAddDiscount = () => {
    if (!discountName || !discountCode || (discountType === "Percentage" && !percentage) || (discountType === "Fix Amount" && !amount)) {
      alert("Please fill in all required fields!");
      return;
    }
    const newDiscount = {
      id: discountList.length + 1,
      name: discountName,
      discountCode,
      discountType,
      percentage: discountType === "Percentage" ? percentage : "",
      amount: discountType === "Fix Amount" ? amount : "",
      description,
    };
    setDiscountList([...discountList, newDiscount]);
    clearForm();
  };

  // Handle Delete Fees Discount
  const handleDeleteDiscount = (id) => {
    setDiscountList(discountList.filter((discount) => discount.id !== id));
  };

  // Clear Form
  const clearForm = () => {
    setDiscountName("");
    setDiscountCode("");
    setDiscountType("Percentage");
    setPercentage("");
    setAmount("");
    setDescription("");
  };

  // Filter Discount List
  const filteredDiscountList = discountList.filter(
    (discount) =>
      discount.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      discount.discountCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6">

      <div className="grid grid-cols-3 gap-6">
        {/* Left Section: Add Fees Discount */}
        <div className="col-span-1 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Add Fees Discount</h2>

          <div className="space-y-4">
            {/* Discount Name */}
            <div>
              <label className="block text-gray-700 font-medium">Name *</label>
              <input
                type="text"
                value={discountName}
                onChange={(e) => setDiscountName(e.target.value)}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Discount Code */}
            <div>
              <label className="block text-gray-700 font-medium">Discount Code *</label>
              <input
                type="text"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Discount Type */}
            <div>
              <label className="block text-gray-700 font-medium">Discount Type</label>
              <select
                value={discountType}
                onChange={(e) => setDiscountType(e.target.value)}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              >
                <option value="Percentage">Percentage</option>
                <option value="Fix Amount">Fix Amount</option>
              </select>
            </div>

            {/* Percentage */}
            {discountType === "Percentage" && (
              <div>
                <label className="block text-gray-700 font-medium">Percentage (%) *</label>
                <input
                  type="number"
                  value={percentage}
                  onChange={(e) => setPercentage(e.target.value)}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}

            {/* Amount */}
            {discountType === "Fix Amount" && (
              <div>
                <label className="block text-gray-700 font-medium">Amount ($) *</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}

            {/* Description */}
            <div>
              <label className="block text-gray-700 font-medium">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Add Button */}
            <div className="flex justify-end">
              <button
                onClick={handleAddDiscount}
                className="py-1 px-4 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600"
              >
                Add Discount
              </button>
            </div>
          </div>
        </div>

        {/* Right Section: Fees Discount List */}
        <div className="col-span-2 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Fees Discount List</h2>

         
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
                  <th className="p-2 text-left border">Name</th>
                  <th className="p-2 text-left border">Discount Code</th>
                  <th className="p-2 text-left border">Percentage (%)</th>
                  <th className="p-2 text-left border">Amount ($)</th>
                  <th className="p-2 text-left border">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredDiscountList.length > 0 ? (
                  filteredDiscountList.map((discount) => (
                    <tr key={discount.id} className="hover:bg-gray-100">
                      <td className="p-2 border">{discount.name}</td>
                      <td className="p-2 border">{discount.discountCode}</td>
                      <td className="p-2 border">{discount.discountType === "Percentage" ? discount.percentage : "-"}</td>
                      <td className="p-2 border">{discount.discountType === "Fix Amount" ? discount.amount : "-"}</td>
                      <td className="p-2 border">
                        <button
                          onClick={() => handleDeleteDiscount(discount.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="p-4 text-center text-gray-500">
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

export default FeesDiscountPage;



