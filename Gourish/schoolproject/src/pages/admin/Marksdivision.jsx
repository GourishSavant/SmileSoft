
import React, { useState } from "react";

const MarksDivisionPage = () => {
  const [division, setDivision] = useState({
    divisionName: "",
    percentFrom: "",
    percentUpto: "",
  });

  const [divisionList, setDivisionList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDivision({ ...division, [name]: value });
  };

  const handleAddDivision = () => {
    if (
      division.divisionName &&
      division.percentFrom &&
      division.percentUpto
    ) {
      setDivisionList([...divisionList, division]);
      setDivision({
        divisionName: "",
        percentFrom: "",
        percentUpto: "",
      });
    } else {
      alert("Please fill in all required fields.");
    }
  };

  const handleDeleteDivision = (index) => {
    setDivisionList(divisionList.filter((_, i) => i !== index));
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(divisionList.length / recordsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;
  const currentRecords = divisionList.slice(startIndex, endIndex);

  return (
    <div className="h-screen bg-gray-100 p-4 flex gap-4">
      {/* Left Section: Add Marks Division */}
      <div className="w-1/3 bg-white p-4 rounded shadow-md">
        <h2 className="text-xl font-semibold mb-4">Add Marks Division</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium">Division Name *</label>
          <input
            type="text"
            name="divisionName"
            value={division.divisionName}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium">Percent From *</label>
            <input
              type="number"
              name="percentFrom"
              value={division.percentFrom}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Percent Upto *</label>
            <input
              type="number"
              name="percentUpto"
              value={division.percentUpto}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <button
            onClick={handleAddDivision}
            className="bg-blue-500 text-white p-3 rounded"
          >
            Save
          </button>
        </div>
      </div>

      {/* Right Section: Division List */}
      <div className="w-2/3 bg-white p-4 rounded shadow-md">
        <h2 className="text-xl font-semibold mb-4">Division List</h2>

        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border border-gray-300">Division Name</th>
              <th className="p-2 border border-gray-300">Percentage From</th>
              <th className="p-2 border border-gray-300">Percentage Upto</th>
              <th className="p-2 border border-gray-300">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentRecords.length > 0 ? (
              currentRecords.map((item, index) => (
                <tr key={startIndex + index}>
                  <td className="p-2 border border-gray-300">
                    {item.divisionName}
                  </td>
                  <td className="p-2 border border-gray-300">
                    {item.percentFrom}
                  </td>
                  <td className="p-2 border border-gray-300">
                    {item.percentUpto}
                  </td>
                  <td className="p-2 border border-gray-300 text-center">
                    <button
                      onClick={() => handleDeleteDivision(startIndex + index)}
                      className="text-red-500"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="p-2 border border-gray-300 text-center"
                >
                  No divisions added yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="flex justify-between items-center mt-4">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="bg-gray-300 p-2 rounded disabled:opacity-50"
          >
            Previous
          </button>

          <span>
            Records {startIndex + 1} to {Math.min(endIndex, divisionList.length)} of {divisionList.length}
          </span>

          <button
            onClick={handleNextPage}
            disabled={currentPage === Math.ceil(divisionList.length / recordsPerPage)}
            className="bg-gray-300 p-2 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default MarksDivisionPage;



