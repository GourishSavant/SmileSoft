import React, { useState } from "react";
import {
  FaFilePdf,
  FaFileWord,
  FaPrint,
  FaFileExcel,
  FaCopy,
  FaColumns,
} from "react-icons/fa";
import QRCode from "react-qr-code"; // Import QRCode component

const BookListPage = () => {
  const [isAddBookModalOpen, setIsAddBookModalOpen] = useState(false);
  const [books, setBooks] = useState([]); // State to store books
  const [formData, setFormData] = useState({
    title: "",
    bookNumber: "",
    isbn: "",
    publisher: "",
    author: "",
    subject: "",
    rackNumber: "",
    qty: "",
    price: "",
    postDate: "2024-12-20",
    description: "",
  });

  // Open modal
  const openAddBookModal = () => {
    setIsAddBookModalOpen(true);
  };

  // Close modal
  const closeAddBookModal = () => {
    setIsAddBookModalOpen(false);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setBooks([...books, formData]); // Add the book data to the list
    setIsAddBookModalOpen(false); // Close the modal
    setFormData({ // Reset the form
      title: "",
      bookNumber: "",
      isbn: "",
      publisher: "",
      author: "",
      subject: "",
      rackNumber: "",
      qty: "",
      price: "",
      postDate: "2024-12-20",
      description: "",
    });
  };

  return (
    <div className="p-4 dark:bg-gray-800 dark:text-white">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Search..."
            className="border px-2 py-1 rounded text-sm focus:outline-none dark:bg-gray-700 dark:border-gray-600"
          />
          <select
            className="border px-2 py-1 rounded text-sm focus:outline-none dark:bg-gray-700 dark:border-gray-600"
          >
            <option>100</option>
            <option>50</option>
            <option>25</option>
            <option>All</option>

          </select>
        </div>
        <div className="flex items-center space-x-2">
          <FaFilePdf
            className="text-base text-red-600 cursor-pointer"
            title="Export to PDF"
          />
          <FaFileWord
            className="text-base text-blue-600 cursor-pointer"
            title="Export to Word"
          />
          <FaPrint
            className="text-base text-gray-600 cursor-pointer"
            title="Print"
          />
          <FaFileExcel
            className="text-base text-green-600 cursor-pointer"
            title="Export to Excel"
          />
          <FaCopy
            className="text-base text-gray-600 cursor-pointer"
            title="Copy"
          />
          <FaColumns
            className="text-base text-gray-600 cursor-pointer"
            title="Column Visibility"
          />
          <button
            className="bg-blue-500 text-white text-sm px-3 py-1 rounded hover:bg-blue-600"
            onClick={openAddBookModal}
          >
            + Add Book
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-auto border rounded-lg shadow-md">
        <table className="w-full text-left table-auto text-xs dark:bg-gray-800 dark:text-white">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="px-3 py-2 border">Book Title</th>
              <th className="px-3 py-2 border">Description</th>
              <th className="px-3 py-2 border">Book Number</th>
              <th className="px-3 py-2 border">ISBN Number</th>
              <th className="px-3 py-2 border">Publisher</th>
              <th className="px-3 py-2 border">Author</th>
              <th className="px-3 py-2 border">Subject</th>
              <th className="px-3 py-2 border">Rack Number</th>
              <th className="px-3 py-2 border">Qty</th>
              <th className="px-3 py-2 border">Book Price</th>
              <th className="px-3 py-2 border">Post Date</th>
              <th className="px-3 py-2 border">QR Code</th>
              <th className="px-3 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {books.length > 0 ? (
              books.map((book, index) => (
                <tr key={index}>
                  <td className="px-3 py-2 border">{book.title}</td>
                  <td className="px-3 py-2 border">{book.description}</td>
                  <td className="px-3 py-2 border">{book.bookNumber}</td>
                  <td className="px-3 py-2 border">{book.isbn}</td>
                  <td className="px-3 py-2 border">{book.publisher}</td>
                  <td className="px-3 py-2 border">{book.author}</td>
                  <td className="px-3 py-2 border">{book.subject}</td>
                  <td className="px-3 py-2 border">{book.rackNumber}</td>
                  <td className="px-3 py-2 border">{book.qty}</td>
                  <td className="px-3 py-2 border">${book.price}</td>
                  <td className="px-3 py-2 border">{book.postDate}</td>
                  <td className="px-3 py-2 border">
                    <QRCode value={book.isbn} size={50} />
                  </td>
                  <td className="px-3 py-2 border">
                    <button className="text-blue-500 text-xs">Edit</button>
                    <button className="text-red-500 text-xs ml-2">Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="14" className="px-3 py-2 border text-center">
                  No data available in table. Add new record or search with different criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Book Modal */}
      {isAddBookModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-96 h-auto max-h-[80vh] overflow-y-auto rounded-lg dark:bg-gray-700">
            <div className="flex justify-between items-center px-4 py-2 border-b dark:border-gray-600">
              <h2 className="text-xs font-bold">Add Book</h2>
              <button
                className="text-gray-600 hover:text-red-500 text-xs"
                onClick={closeAddBookModal}
              >
                &times;
              </button>
            </div>
            <div className="p-4">
              <form onSubmit={handleSubmit} className="space-y-2">
                <div>
                  <label className="block font-bold text-xs">Book Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-2 py-1 border rounded text-xs focus:outline-none dark:bg-gray-600 dark:border-gray-500"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold text-xs">Book Number</label>
                  <input
                    type="text"
                    name="bookNumber"
                    value={formData.bookNumber}
                    onChange={handleInputChange}
                    className="w-full px-2 py-1 border rounded text-xs focus:outline-none dark:bg-gray-600 dark:border-gray-500"
                  />
                </div>
                <div>
                  <label className="block font-bold text-xs">ISBN Number</label>
                  <input
                    type="text"
                    name="isbn"
                    value={formData.isbn}
                    onChange={handleInputChange}
                    className="w-full px-2 py-1 border rounded text-xs focus:outline-none dark:bg-gray-600 dark:border-gray-500"
                  />
                </div>
                <div>
                  <label className="block font-bold text-xs">Publisher</label>
                  <input
                    type="text"
                    name="publisher"
                    value={formData.publisher}
                    onChange={handleInputChange}
                    className="w-full px-2 py-1 border rounded text-xs focus:outline-none dark:bg-gray-600 dark:border-gray-500"
                  />
                </div>
                <div>
                  <label className="block font-bold text-xs">Author</label>
                  <input
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleInputChange}
                    className="w-full px-2 py-1 border rounded text-xs focus:outline-none dark:bg-gray-600 dark:border-gray-500"
                  />
                </div>
                <div>
                  <label className="block font-bold text-xs">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-2 py-1 border rounded text-xs focus:outline-none dark:bg-gray-600 dark:border-gray-500"
                  />
                </div>
                <div>
                  <label className="block font-bold text-xs">Rack Number</label>
                  <input
                    type="text"
                    name="rackNumber"
                    value={formData.rackNumber}
                    onChange={handleInputChange}
                    className="w-full px-2 py-1 border rounded text-xs focus:outline-none dark:bg-gray-600 dark:border-gray-500"
                  />
                </div>
                <div>
                  <label className="block font-bold text-xs">Qty</label>
                  <input
                    type="number"
                    name="qty"
                    value={formData.qty}
                    onChange={handleInputChange}
                    className="w-full px-2 py-1 border rounded text-xs focus:outline-none dark:bg-gray-600 dark:border-gray-500"
                  />
                </div>
                <div>
                  <label className="block font-bold text-xs">Book Price ($)</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="w-full px-2 py-1 border rounded text-xs focus:outline-none dark:bg-gray-600 dark:border-gray-500"
                  />
                </div>
                <div>
                  <label className="block font-bold text-xs">Post Date</label>
                  <input
                    type="date"
                    name="postDate"
                    value={formData.postDate}
                    onChange={handleInputChange}
                    className="w-full px-2 py-1 border rounded text-xs focus:outline-none dark:bg-gray-600 dark:border-gray-500"
                  />
                </div>
                <div>
                  <label className="block font-bold text-xs">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full px-2 py-1 border rounded text-xs focus:outline-none dark:bg-gray-600 dark:border-gray-500"
                    rows="3"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white px-3 py-1 rounded text-xs hover:bg-blue-600"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookListPage;
