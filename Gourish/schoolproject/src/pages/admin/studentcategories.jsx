
import React, { useState } from "react";
import { FaFilePdf, FaFileExcel, FaFileCsv, FaFileWord, FaCopy,FaPrint } from "react-icons/fa";

const CategoryPage = () => {
  const [categories, setCategories] = useState([
    { id: "1", name: "Electronics" },
    { id: "2", name: "Furniture" },
    { id: "3", name: "Clothing" },
    { id: "4", name: "Books" },
    { id: "5", name: "Toys" },
    { id: "6", name: "Groceries" },
    { id: "7", name: "Automobiles" },
    { id: "8", name: "Music" },
    { id: "9", name: "Sports" },
    { id: "10", name: "Movies" }
  ]);
  const [categoryName, setCategoryName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Handle form submission
  const handleCategorySubmit = (e) => {
    e.preventDefault();
    if (categoryName.trim() && categoryId.trim()) {
      const newCategory = { id: categoryId, name: categoryName };
      setCategories((prev) => [...prev, newCategory]);
      setCategoryName("");
      setCategoryId("");
    } else {
      alert("Please provide a valid category name and category ID");
    }
  };

  // Search functionality
  const handleSearchChange = (e) => setSearch(e.target.value);

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCategories.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Section */}
      <div className="w-1/3 p-5 bg-white shadow-lg rounded-md overflow-y-auto max-h-fit ml-5 mt-5">
        <h2 className="text-xl font-semibold text-left mb-4">Create Category</h2>
        <form onSubmit={handleCategorySubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Category *</label>
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Category ID *</label>
            <input
              type="text"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded text-sm"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="w-1/2 bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>

      {/* Right Section */}
      <div className="w-2/3 p-5 bg-white shadow-lg rounded-md ml-5 flex flex-col mr-5 mt-5 max-h-fit">
        {/* Header and Icons */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Category List</h2>
          <div className="flex gap-2">
            <FaFilePdf className="text-red-600 cursor-pointer" size={24} />
            <FaFileExcel className="text-green-600 cursor-pointer" size={24} />
            <FaFileCsv className="text-yellow-600 cursor-pointer" size={24} />
            <FaCopy className="text-blue-600 cursor-pointer" size={24} />
            <FaFileWord className="text-blue-700 cursor-pointer" size={24} />
            <FaPrint className="text-gray-700 cursor-pointer" size={24} />

          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-4">
          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="Search..."
            className=" border-gray-300 p-2 rounded text-sm"
          />
        </div>

        {/* Table */}
        <div className="overflow-y-auto max-h-[400px]">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr>
                <th className="border-b px-4 py-2 text-left">Category</th>
                <th className="border-b px-4 py-2 text-left">Category ID</th>
                <th className="border-b px-4 py-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((category) => (
                  <tr key={category.id}>
                    <td className="border-b px-4 py-2">{category.name}</td>
                    <td className="border-b px-4 py-2">{category.id}</td>
                    <td className="border-b px-4 py-2">
                      <button className="text-blue-500 text-sm px-2 py-1 hover:underline">
                        Edit
                      </button>
                      <button className="text-red-500 text-sm px-2 py-1 ml-2 hover:underline">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="px-4 py-2 text-center text-gray-500">
                    No data available in table
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-end mt-4">
          <div className="join">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                className={`join-item btn ${currentPage === index + 1 ? "btn-active" : ""}`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;



