
import React, { useState } from "react";
import { FaFilePdf, FaFileCsv, FaFileWord, FaFileExcel, FaCopy, FaPrint } from "react-icons/fa";

const SchoolHousePage = () => {
  // Sample data for initial houses
  const initialHouses = [
    { id: 1, name: "Red House", description: "The red house is for the bold and brave students." },
    { id: 2, name: "Blue House", description: "The blue house represents calm and wisdom." },
    { id: 3, name: "Green House", description: "The green house symbolizes nature and growth." },
    { id: 4, name: "Yellow House", description: "The yellow house stands for energy and positivity." },
    { id: 5, name: "Orange House", description: "The orange house is a symbol of creativity and enthusiasm." },
    { id: 6, name: "Purple House", description: "The purple house represents royalty and ambition." },
    { id: 7, name: "Pink House", description: "The pink house stands for compassion and friendship." },
    { id: 8, name: "Gray House", description: "The gray house symbolizes neutrality and balance." },
    // More sample houses...
  ];

  const [houses, setHouses] = useState(initialHouses);
  const [houseName, setHouseName] = useState("");
  const [houseDescription, setHouseDescription] = useState("");
  const [search, setSearch] = useState("");
  const [filteredHouses, setFilteredHouses] = useState(initialHouses);
  const [editingHouse, setEditingHouse] = useState(null); // Track the house being edited

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // Adjust this number to control how many items per page

  // Handle form submission for adding or updating a house
  const handleHouseSubmit = (e) => {
    e.preventDefault();

    if (houseName.trim() && houseDescription.trim()) {
      if (editingHouse) {
        // If editing, update the house
        const updatedHouses = houses.map((house) =>
          house.id === editingHouse.id ? { ...house, name: houseName, description: houseDescription } : house
        );
        setHouses(updatedHouses);
        setFilteredHouses(updatedHouses);
        setEditingHouse(null); // Reset editing state
      } else {
        // If not editing, add a new house
        const newHouse = {
          id: houses.length + 1,
          name: houseName,
          description: houseDescription,
        };
        setHouses((prev) => [...prev, newHouse]);
        setFilteredHouses((prev) => [...prev, newHouse]); // Update filtered houses
      }

      setHouseName("");
      setHouseDescription("");
    } else {
      alert("Please provide a valid house name and description.");
    }
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  // Handle search functionality
  const handleSearch = () => {
    const filtered = houses.filter((house) =>
      house.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredHouses(filtered);
    setCurrentPage(1); // Reset to first page after search
  };

  // Delete house by id
  const handleDelete = (id) => {
    const updatedHouses = houses.filter((house) => house.id !== id);
    setHouses(updatedHouses);
    setFilteredHouses(updatedHouses);
  };

  // Edit house by id
  const handleEdit = (house) => {
    setEditingHouse(house);
    setHouseName(house.name);
    setHouseDescription(house.description);
  };

  // Pagination logic
  const indexOfLastHouse = currentPage * itemsPerPage;
  const indexOfFirstHouse = indexOfLastHouse - itemsPerPage;
  const currentHouses = filteredHouses.slice(indexOfFirstHouse, indexOfLastHouse);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate total pages
  const totalPages = Math.ceil(filteredHouses.length / itemsPerPage);

  // Record range for display (e.g., Records: 1 to 3 of 8)
  const recordStart = indexOfFirstHouse + 1;
  const recordEnd = Math.min(indexOfLastHouse, filteredHouses.length);

  return (
    <div className="flex w-full h-full bg-gray-100">
      {/* Left Section: Add/Update School House Form */}
      <div className="w-1/3 p-5 bg-white shadow-lg rounded-md mix-h-fit max-h-fit ml-5 mt-5">
        <h2 className="text-xl font-semibold text-left mb-4">{editingHouse ? "Edit School House" : "Add School House"}</h2>
        <form onSubmit={handleHouseSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="houseName">
              Name *
            </label>
            <input
              type="text"
              id="houseName"
              value={houseName}
              onChange={(e) => setHouseName(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="houseDescription">
              Description
            </label>
            <textarea
              id="houseDescription"
              value={houseDescription}
              onChange={(e) => setHouseDescription(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded text-sm"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="w-1/2 bg-gray-500 text-white py-2 rounded hover:bg-gary-800"
            >
              {editingHouse ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>

      {/* Right Section: School House List */}
      <div className="w-2/3 p-5 bg-white shadow-lg rounded-md ml-5 max-h-fit mr-5 mt-5 mb-5 relative">
        <h1 className="text-xl font-semibold mb-4">School House List</h1>

        {/* Icons Section at Top Right */}
        <div className="absolute top-0 right-0 flex gap-1 mb-5 ">
          <FaFilePdf className="text-red-600 cursor-pointer mt-2" size={24} />
          <FaFileExcel className="text-green-600 cursor-pointer mt-2" size={24} />
          <FaFileCsv className="text-yellow-600 cursor-pointer mt-2" size={24} />
          <FaCopy className="text-blue-600 cursor-pointer mt-2" size={24} />
          <FaFileWord className="text-blue-700 cursor-pointer mt-2" size={24} />
          <FaPrint className="text-gray-600 cursor-pointer mt-2" size={24} />
        </div>

        {/* Search Input and Button */}
        <div className="mb-4 flex items-center">
          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="Search..."
            className=" border-gray-300 p-2 rounded text-sm w-1/2"
          />
          <button
            onClick={handleSearch}
            className="bg-gray-400 text-white py-2 px-4 rounded hover:bg-gray-600 ml-1"
          >
            Search
          </button>
        </div>

        {/* School House Table */}
        <div className="overflow-x-auto mb-4">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr>
                <th className="border-b px-4 py-2 text-left">Name</th>
                <th className="border-b px-4 py-2 text-left">Description</th>
                <th className="border-b px-4 py-2 text-left">House ID</th>
                <th className="border-b px-4 py-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentHouses.length > 0 ? (
                currentHouses.map((house) => (
                  <tr key={house.id}>
                    <td className="border-b px-4 py-2">{house.name}</td>
                    <td className="border-b px-4 py-2">{house.description}</td>
                    <td className="border-b px-4 py-2">{house.id}</td>
                    <td className="border-b px-4 py-2">
                      <div className="flex justify-between">
                        {/* Edit Button */}
                        <button
                          className="text-blue-500 text-sm px-3 py-1 border border-blue-500 rounded hover:bg-blue-100"
                          onClick={() => handleEdit(house)} // Open house for editing
                        >
                          Edit
                        </button>
                        {/* Delete Button */}
                        <button
                          className="text-red-500 text-sm px-3 py-1 ml-2 border border-red-500 rounded hover:bg-red-100"
                          onClick={() => handleDelete(house.id)} // Delete house
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-4">
                    No houses found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Section */}
        <div className="flex justify-between items-center">
          <div className="text-sm">
            {/* Record range: e.g., Records: 1 to 3 of 8 */}
            Records: {recordStart} to {recordEnd} of {filteredHouses.length}
          </div>
          <div className="flex gap-2">
            {/* Pagination buttons */}
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="bg-gray-400 text-white py-2 px-3 rounded hover:bg-gray-600 disabled:bg-gray-200"
            >
              &lt;
            </button>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="bg-gray-400 text-white py-2 px-3 rounded hover:bg-gray-600 disabled:bg-gray-200"
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolHousePage;
