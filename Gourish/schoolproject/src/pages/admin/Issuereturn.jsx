import React, { useState, useEffect } from "react";
import { FaFilePdf, FaFileExcel, FaFileWord, FaPrint, FaCopy, FaColumns, FaArrowRight } from "react-icons/fa";
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
    memberType: "Student",
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

  const handleEdit = (memberId) => {
    const memberToEdit = members.find((member) => member.id === memberId);
    setEditingMember(memberToEdit);
    setNewMemberData({ ...memberToEdit });
  };

  const handleDelete = (memberId) => {
    const updatedMembers = members.filter((member) => member.id !== memberId);
    setMembers(updatedMembers);
  };

  const handleIssueBook = (memberId, bookTitle) => {
    const updatedMembers = members.map((member) => {
      if (member.id === memberId) {
        const book = books.find((book) => book.bookTitle === bookTitle);
        if (book && book.available) {
          const newTransaction = {
            bookTitle: bookTitle,
            status: "Issued",
            date: new Date().toLocaleDateString(),
          };
          member.transactions.push(newTransaction);
          book.available = false; // Mark the book as issued
        }
      }
      return member;
    });

    const updatedBooks = books.map((book) => {
      if (book.bookTitle === bookTitle) {
        book.available = false; // Mark the book as unavailable
      }
      return book;
    });

    setMembers(updatedMembers);
    setBooks(updatedBooks);
  };

  const handleSaveEdit = () => {
    const updatedMembers = members.map((member) => {
      if (member.id === editingMember.id) {
        return { ...member, ...newMemberData };
      }
      return member;
    });
    setMembers(updatedMembers);
    setEditingMember(null);
  };

  const handleArrowClick = (memberId) => {
    // Navigate to the next page when the arrow is clicked for the given member
    navigate(`/next-page/${memberId}`); // This could be any route you want to go to
  };

  const filteredMembers = members.filter((member) =>
    member.name.toLowerCase().includes(criteria.search.toLowerCase()) ||
    member.libraryCardNo.includes(criteria.search)
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 overflow-y-auto dark:bg-gray-800 dark:text-white relative">
      <h1 className="text-2xl font-semibold p-2 bg-white shadow dark:bg-gray-800 dark:text-white">Library System</h1>

      {/* Right top icons */}
      <div className="absolute top-4 right-4 flex space-x-4">
        <FaFilePdf className="text-xl text-red-600 cursor-pointer" title="Download as PDF" />
        <FaFileExcel className="text-xl text-green-600 cursor-pointer" title="Download as Excel" />
        <FaFileWord className="text-xl text-blue-600 cursor-pointer" title="Download as Docs" />
        <FaPrint className="text-xl text-black cursor-pointer" title="Print" />
        <FaCopy className="text-xl text-gray-600 cursor-pointer" title="Copy" />
        <FaColumns className="text-xl text-yellow-600 cursor-pointer" title="Columns View" />
        
        
      </div>

      {/* Search Section */}
      <div className="bg-white p-4 rounded shadow-md mb-6 dark:bg-gray-800 dark:text-white">
        <h2 className="text-xl font-semibold mb-2">Search Members</h2>
        <input
          type="text"
          placeholder="Search by name or library card number"
          value={criteria.search}
          onChange={handleSearchChange}
          className="p-2 border border-gray-300 rounded dark:bg-gray-800 dark:text-white"
        />
      </div>

      {/* Full-Page Scrollable Content */}
      <div className="overflow-y-auto max-h-[300px] border rounded p-2 bg-white shadow-md dark:bg-gray-800 dark:text-white">
        {/* Members Table Section */}
        <div className="bg-white p-2 rounded shadow-md dark:bg-gray-800 dark:text-white">
          <h2 className="text-xl font-semibold mb-2">Members</h2>
          <div className="overflow-y-auto max-h-[400px]">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200 dark:bg-gray-600 dark:text-white">
                  <th className="p-2 border border-gray-300">Member ID</th>
                  <th className="p-2 border border-gray-300">Library Card No.</th>
                  <th className="p-2 border border-gray-300">Admission No.</th>
                  <th className="p-2 border border-gray-300">Name</th>
                  <th className="p-2 border border-gray-300">Class</th>
                  <th className="p-2 border border-gray-300">Section</th>
                  <th className="p-2 border border-gray-300">Member Type</th>
                  <th className="p-2 border border-gray-300">Phone</th>
                  <th className="p-2 border border-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredMembers.map((member) => (
                  <tr key={member.id}>
                    <td className="p-2 border border-gray-300">{member.id}</td>
                    <td className="p-2 border border-gray-300">{member.libraryCardNo}</td>
                    <td className="p-2 border border-gray-300">{member.admissionNo}</td>
                    <td className="p-2 border border-gray-300">{member.name}</td>
                    <td className="p-2 border border-gray-300">{member.className}</td>
                    <td className="p-2 border border-gray-300">{member.section}</td>
                    <td className="p-2 border border-gray-300">{member.memberType}</td>
                    <td className="p-2 border border-gray-300">{member.phone}</td>
                    <td className="p-2 border border-gray-300">
                      
                      <FaArrowRight
                        onClick={() => navigate("/admin/issue-book")} // Click on the arrow to go to a member-specific page
                        className="text-blue-600 ml-2 cursor-pointer"
                        title="Go to Next Page"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Edit Member Section */}
        {editingMember && (
          <div className="bg-white p-4 rounded shadow-md mb-6 overflow-auto max-h-[500px]">
            <h2 className="text-xl font-semibold mb-4">Edit Member</h2>
            <form>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium">Name</label>
                  <input
                    type="text"
                    value={newMemberData.name}
                    onChange={(e) => setNewMemberData({ ...newMemberData, name: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Class</label>
                  <input
                    type="text"
                    value={newMemberData.className}
                    onChange={(e) => setNewMemberData({ ...newMemberData, className: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Section</label>
                  <input
                    type="text"
                    value={newMemberData.section}
                    onChange={(e) => setNewMemberData({ ...newMemberData, section: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Phone</label>
                  <input
                    type="text"
                    value={newMemberData.phone}
                    onChange={(e) => setNewMemberData({ ...newMemberData, phone: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
              </div>

              <div className="mt-4">
                <button
                  type="button"
                  onClick={handleSaveEdit}
                  className="bg-blue-500 text-white p-2 rounded"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Issuereturn;
