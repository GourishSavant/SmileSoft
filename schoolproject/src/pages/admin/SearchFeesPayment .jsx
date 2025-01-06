
import React, { useState, useEffect } from "react";

const SearchFeesPayment = () => {
  const [paymentData, setPaymentData] = useState([]); // Store all payment data
  const [searchTerm, setSearchTerm] = useState(""); // State for search input
  const [filteredData, setFilteredData] = useState(null); // State for filtered data based on search

  // Fetch the payment data (assuming it's stored in paymentsData.json)
  useEffect(() => {
    fetch("/admin/searchData.json")
      .then((response) => response.json())
      .then((data) => setPaymentData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Function to handle search
  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      setFilteredData(null); // If the search term is empty, show all data
    } else {
      const result = paymentData.find(
        (payment) =>
          payment.paymentId.toLowerCase() === searchTerm.toLowerCase()
      );
      setFilteredData(result || null); // Set the filtered data, or null if not found
    }
  };

  return (
    <div className="flex items-center justify-center mt-4 ml-4 mr-40 mb-4 bg-gray-100 dark:bg-gray-800">
      {/* Outer Frame */}
      <div className="bg-white dark:bg-gray-700 dark:border-gray-600 p-6 w-full ">
        {/* Page Content */}
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
            Search Fees Payment
          </h2>

          {/* Search bar */}
          <div className="flex items-center mb-6">
            <label htmlFor="paymentId" className="mr-2 text-lg text-gray-700 dark:text-white">
              Payment ID *
            </label>
            <input
              type="text"
              id="paymentId"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Enter Payment ID"
              className="border border-gray-300 p-2 rounded dark:bg-gray-600 dark:text-white"
            />
            <button
              onClick={handleSearch}
              className="ml-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 dark:bg-green-800 dark:text-white"
            >
              Search
            </button>
          </div>

          {/* Display Search Results */}
          {filteredData ? (
            <div className="bg-gray-100 shadow-lg p-4 rounded dark:bg-gray-800 dark:text-white">
              <h3 className="text-xl font-semibold mb-4">Payment Details</h3>
              <table className="table-auto w-full border-collapse border border-gray-300 dark:border-gray-600">
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-bold dark:bg-gray-800 dark:text-white">
                      Payment ID:
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {filteredData.paymentId}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-bold">
                      Student Name:
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {filteredData.studentName}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-bold">
                      Admission No:
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {filteredData.admissionNo}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-bold">
                      Payment Date:
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {filteredData.paymentDate}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-bold">
                      Amount ($):
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {filteredData.amount}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-bold">
                      Payment Status:
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {filteredData.status}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : searchTerm.trim() && !filteredData ? (
            <div className="text-center text-red-500">
              No payment found for this Payment ID.
            </div>
          ) : (
            <div className="text-center text-gray-500 dark:text-white">
              Please enter a Payment ID to search.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchFeesPayment;

