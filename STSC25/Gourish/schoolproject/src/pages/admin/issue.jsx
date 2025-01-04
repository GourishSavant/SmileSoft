import React, { useState, useEffect } from "react";
import { FaFilePdf, FaFileExcel, FaFileWord, FaPrint, FaCopy, FaColumns } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Updated for React Router v6

const Issuereturn = () => {
  const [members, setMembers] = useState([]);
  const [books, setBooks] = useState([]);
  const [criteria, setCriteria] = useState({ search: "" });
  const [editingMember, setEditingMember] = useState(null);
  const [newMemberData, setNewMemberData] = useState({
    name: "",
    className: "",
    section: "",
    libraryCardNo: "",
    phone: "",
    memberType: "Teacher",
  });

  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const membersResponse = await fetch("/admin/members.json");
        const booksResponse = await fetch("/admin/books.json");

        if (membersResponse.ok && booksResponse.ok) {
          const membersData = await membersResponse.json();
          const booksData = await booksResponse.json();

          setMembers(membersData);
          setBooks(booksData);
        } else {
          console.error("Failed to fetch members or books data.");
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const handleSearchChange = (e) => {
    setCriteria({ ...criteria, search: e.target.value });
  };

  // Filter books by title
  const filteredBooks = books.filter((book) =>
    book.bookTitle.toLowerCase().includes(criteria.search.toLowerCase())
  );

  // Filter members by name or library card number
  const filteredMembers = members.filter((member) =>
    member.name.toLowerCase().includes(criteria.search.toLowerCase()) ||
    member.libraryCardNo.includes(criteria.search)
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 overflow-y-auto dark:bg-gray-800 dark:text-white relative">
      <h1 className="text-2xl font-semibold p-2 bg-white shadow dark:bg-gray-800 dark:text-white">Library System</h1>

      {/* Right top icons for Library System */}
      <div className="absolute top-4 right-4 flex space-x-4">
        <FaFilePdf className="text-xl text-red-600 cursor-pointer" title="Download as PDF" />
        <FaFileExcel className="text-xl text-green-600 cursor-pointer" title="Download as Excel" />
        <FaFileWord className="text-xl text-blue-600 cursor-pointer" title="Download as Docs" />
        <FaPrint className="text-xl text-black cursor-pointer" title="Print" />
        <FaCopy className="text-xl text-gray-600 cursor-pointer" title="Copy" />
        <FaColumns className="text-xl text-yellow-600 cursor-pointer" title="Columns View" />
      </div>

      {/* Layout */}
      <div className="flex p-6 space-x-6">
        {/* Left Section - Super Admin Information */}
        <div className="w-1/3 bg-white p-4 rounded shadow-md dark:bg-gray-800 dark:text-white">
          <h2 className="text-xl font-semibold mb-4">Super Admin</h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-600 dark:text-white">
                <th className="p-2 border border-gray-300">Attribute</th>
                <th className="p-2 border border-gray-300">Details</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border border-gray-300">Staff ID</td>
                <td className="p-2 border border-gray-300">9000</td>
              </tr>
              <tr>
                <td className="p-2 border border-gray-300">Member ID</td>
                <td className="p-2 border border-gray-300">1</td>
              </tr>
              <tr>
                <td className="p-2 border border-gray-300">Library Card No.</td>
                <td className="p-2 border border-gray-300">6678787</td>
              </tr>
              <tr>
                <td className="p-2 border border-gray-300">Email</td>
                <td className="p-2 border border-gray-300">admin@school.com</td>
              </tr>
              <tr>
                <td className="p-2 border border-gray-300">Member Type</td>
                <td className="p-2 border border-gray-300">Teacher</td>
              </tr>
              <tr>
                <td className="p-2 border border-gray-300">Gender</td>
                <td className="p-2 border border-gray-300">Male</td>
              </tr>
              <tr>
                <td className="p-2 border border-gray-300">Phone</td>
                <td className="p-2 border border-gray-300">[Insert Phone]</td>
              </tr>
              <tr>
                <td className="p-2 border border-gray-300">Barcode</td>
                <td className="p-2 border border-gray-300">[Insert Barcode]</td>
              </tr>
              <tr>
                <td className="p-2 border border-gray-300">QR Code</td>
                <td className="p-2 border border-gray-300">[Insert QR Code]</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Right Section - Issue Book */}
        <div className="w-2/3 bg-white p-4 rounded shadow-md dark:bg-gray-800 dark:text-white">
          <h2 className="text-xl font-semibold mb-4">Issue Book</h2>
          <div className="space-y-2">
            <label className="block text-sm font-medium">Books</label>
            <input
              type="text"
              value={criteria.search}
              onChange={handleSearchChange}
              className="w-full p-2 border border-gray-300 rounded dark:bg-gray-800 dark:text-white"
            />
            <label className="block text-sm font-medium mt-4">Due Return Date</label>
            <input
              type="date"
              value="2024-12-20"
              className="w-full p-2 border border-gray-300 rounded dark:bg-gray-800 dark:text-white"
              readOnly
            />
          </div>
          <div className="mt-4">
            <button className="bg-blue-500 text-white p-2 rounded">Save</button>
          </div>
        </div>
      </div>

      {/* Book Issued Section - Below Issue Book Frame */}
      <div className="w-full bg-white p-4 rounded shadow-md mt-6 dark:bg-gray-800 dark:text-white">
        <h2 className="text-xl font-semibold mb-4">Books Issued</h2>

        {/* Book Filter */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">Search Book</label>
          <input
            type="text"
            placeholder="Search Book Title..."
            value={criteria.search}
            onChange={handleSearchChange}
            className="p-2 border border-gray-300 rounded dark:bg-gray-800 dark:text-white"
          />
        </div>

        {/* Books Table */}
        <table className="w-full border-collapse border border-gray-300 mt-4">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-600 dark:text-white">
              <th className="p-2 border border-gray-300">Book Title</th>
              <th className="p-2 border border-gray-300">Book Number</th>
              <th className="p-2 border border-gray-300">Issue Date</th>
              <th className="p-2 border border-gray-300">Due Return Date</th>
              <th className="p-2 border border-gray-300">Return Date</th>
              <th className="p-2 border border-gray-300">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredBooks.length > 0 ? (
              filteredBooks.map((book) => (
                <tr key={book.bookNumber}>
                  <td className="p-2 border border-gray-300">{book.bookTitle}</td>
                  <td className="p-2 border border-gray-300">{book.bookNumber}</td>
                  <td className="p-2 border border-gray-300">{book.issueDate || "Not Issued"}</td>
                  <td className="p-2 border border-gray-300">{book.dueReturnDate || "Not Available"}</td>
                  <td className="p-2 border border-gray-300">{book.returnDate || "-"}</td>
                  <td className="p-2 border border-gray-300">
                    <button className="bg-blue-500 text-white p-1 rounded mr-2">Issue</button>
                    <button className="bg-red-500 text-white p-1 rounded">Return</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-2 border border-gray-300 text-center">No books found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Issuereturn;
