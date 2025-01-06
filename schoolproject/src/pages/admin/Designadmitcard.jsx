
import React, { useState } from "react";
import { FaUpload, FaEye, FaEdit, FaTrashAlt } from "react-icons/fa"; // Import Font Awesome icons
import { FaFilePdf, FaFileWord, FaFileExcel, FaCopy, FaPrint, FaColumns } from 'react-icons/fa';

const AdmitCardPage = () => {
  const [formData, setFormData] = useState({
    heading: "",
    title: "",
    examName: "",
    schoolName: "",
    examCenter: "",
    footerText: "",
    leftLogo: null,
    rightLogo: null,
    sign: null,
    backgroundImage: null,
    name: "",
    fatherName: "",
    motherName: "",
    dob: "",
    admissionNo: "",
    rollNo: "",
    address: "",
    gender: "",
    photo: null,
    classSection: "",
  });

  
  const [admitCards, setAdmitCards] = useState([
    { id: 1, name: "Sample Admit Card", image: "broken" },
  
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Calculate pagination
  const totalItems = admitCards.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfFirstItem = (currentPage - 1) * itemsPerPage;
  const indexOfLastItem = Math.min(indexOfFirstItem + itemsPerPage, totalItems);
  const currentAdmitCards = admitCards.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const [selectedAdmitCard, setSelectedAdmitCard] = useState(null); // For the selected admit card
  const [isModalOpen, setIsModalOpen] = useState(false); // For modal visibility
  const [searchTerm, setSearchTerm] = useState("");

  
  const handleFileChange = (e, key) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, [key]: file });
    }
  };

  const handleInputChange = (e, key) => {
    setFormData({ ...formData, [key]: e.target.value });
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
   // Filter the admit cards based on the search term
   const filteredAdmitCards = admitCards.filter(card =>
    card.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const submitForm = (e) => {
    e.preventDefault();
    // Handle the form submission logic here, e.g., save the data to a state or database
    console.log(formData);
    // After submission, you can also add the new admit card to the list
    const newAdmitCard = { id: admitCards.length + 1, name: formData.title, image: "placeholder" };
    setAdmitCards([...admitCards, newAdmitCard]);
  };
  const [toggleFields, setToggleFields] = useState({
    Name: false,
    FatherName: false,
    MotherName: false,
    Dob: false,
    AdmissionNo: false,
    RollNo: false,
    Address: false,
    Gender: false,
    Photo: false,
    ClassSection: false,
  });
  const handleToggleChange = (field) => {
    setToggleFields({ ...toggleFields, [field]: !toggleFields[field] });
  };
  const handleView = (card) => {
    setSelectedAdmitCard(card); // Set the selected card details
    setIsModalOpen(true); // Open the modal
  };
  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
    setSelectedAdmitCard(null); // Clear selected card
  };

  return (
    <div className="flex h-screen bg-white">
      {/* Left Section (Add Admit Card Form) */}
      <div className="w-1/3 p-6 bg-white shadow-md rounded-lg min-h-[350vh] mr-3 ml-3 mt-3  ">
      <h2 className="text-2xl font-bold mb-6">Add Admit Card</h2>
        <form onSubmit={submitForm}>
          
          
          {/* Templtae */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Template <span className="text-red-500">*</span></label>
            <input
              type="text"
              value={formData.heading}
              onChange={(e) => handleInputChange(e, "heading")}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Enter Heading"
            />
          </div>
          {/* Heading */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Heading</label>
            <input
              type="text"
              value={formData.heading}
              onChange={(e) => handleInputChange(e, "heading")}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Enter Heading"
            />
          </div>

          {/* Title */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange(e, "title")}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Enter Title"
            />
          </div>

          {/* Exam Name */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Exam Name</label>
            <input
              type="text"
              value={formData.examName}
              onChange={(e) => handleInputChange(e, "examName")}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Enter Exam Name"
            />
          </div>

          {/* School Name */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">School Name</label>
            <input
              type="text"
              value={formData.schoolName}
              onChange={(e) => handleInputChange(e, "schoolName")}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Enter School Name"
            />
          </div>

          {/* Exam Center */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Exam Center</label>
            <input
              type="text"
              value={formData.examCenter}
              onChange={(e) => handleInputChange(e, "examCenter")}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Enter Exam Center"
            />
          </div>

          {/* Footer Text */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Footer Text</label>
            <input
              type="text"
              value={formData.footerText}
              onChange={(e) => handleInputChange(e, "footerText")}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Enter Footer Text"
            />
          </div>

          {/* File Inputs */}
          {["leftLogo", "rightLogo", "sign", "backgroundImage", "photo"].map((field) => (
            <div key={field} className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">{field.replace(/([A-Z])/g, ' $1').toUpperCase()}</label>
              <input
                type="file"
                onChange={(e) => handleFileChange(e, field)}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
              <p className="text-gray-500 text-sm">No file chosen</p>
            </div>
          ))}


          {/* Toggle Fields */}
          <div className="mb-6">
            {Object.keys(toggleFields).map((field) => (
              <div key={field} className="flex items-center mb-3">
                <label className="mr-4 text-gray-700 font-medium">{field.replace(/([A-Z])/g, ' $1')}</label>
                <button
                  type="button"
                  onClick={() => handleToggleChange(field)}
                  className={`px-4 py-2 text-sm rounded-lg ${
                    toggleFields[field]
                      ? "bg-green-500 text-white"
                      : "bg-gray-300 text-gray-700"
                  }`}
                >
                  {toggleFields[field] ? "On" : "Off"}
                </button>
              </div>
            ))}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Save
          </button>
        </form>
      </div>


      {/*right section*/}
      <div className="w-2/3 p-6 bg-white shadow-md rounded-lg h-full overflow-y-auto mr-3 ml-3 mt-3">
        <h1 className="text-2xl font-semibold mb-4">Admit Card List</h1>

        {/* Search Input and Icons */}
        <div className="flex items-center justify-between space-x-4 mb-6">
          <input 
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search Admit Card..."
            className="p-2 border border-gray-300 rounded-lg w-1/3"
          />
          {/* Downloadable Icons */}
          <div className="flex  space-x-2 ">
            <FaFilePdf className="text-red-500 cursor-pointer hover:text-red-700" title="Download PDF" size={20} />
            <FaFileWord className="text-blue-500 cursor-pointer hover:text-blue-700" title="Download Word" size={20} />
            <FaFileExcel className="text-green-500 cursor-pointer hover:text-green-700" title="Download Excel" size={20} />
            <FaCopy className="text-gray-500 cursor-pointer hover:text-gray-700" title="Copy" size={20} />
            <FaPrint className="text-black cursor-pointer hover:text-gray-700" title="Print" size={20} />
            <FaColumns className="text-gray-500 cursor-pointer hover:text-gray-700" title="Columns View" size={20} />
          </div>
        </div>

        <div className="overflow-x-auto bg-white shadow-md rounded-md">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-3 px-4 font-medium text-gray-700">Certificate Name</th>
                <th className="py-3 px-4 font-medium text-gray-700">Background Image</th>
                <th className="py-3 px-4 font-medium text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody>
  {admitCards.map((card) => (
    <tr key={card.id} className="bg-gray-100">
      <td className="py-3 px-4">{card.name}</td>
      <td className="py-3 px-4">
        <img
          src="https://via.placeholder.com/150"
          alt="Placeholder Icon"
          className="h-5 w-5"
        />
      </td>
      <td className="py-3 px-4 flex space-x-4 items-center">
        <FaEye
          className="text-blue-500 cursor-pointer hover:text-blue-700"
          title="View"
          size={20}
          onClick={() => handleView(card)} // Open the modal with the card details
        />
        <FaEdit
          className="text-yellow-500 cursor-pointer hover:text-yellow-700"
          title="Edit"
          size={20}
        />
        <FaTrashAlt
          className="text-red-500 cursor-pointer hover:text-red-700"
          title="Delete"
          size={20}
        />
      </td>
    </tr>
  ))}
</tbody>
          </table>
        </div>
      </div>
      

      {/* Modal for Viewing Admit Card Details */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-2/3 max-h-screen overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">View Admit Card</h2>
            <p><strong>May-June 2024 Examinations</strong></p>
            <p><strong>School Name:</strong> Mount Carmel School</p>
            <p><strong>Exam Center:</strong> Test Admit Card</p>
            <table className="w-full text-left border-collapse mt-4">
              <thead className="bg-gray-200">
                <tr>
                  <th className="py-3 px-4 font-medium text-gray-700">Date & Time</th>
                  <th className="py-3 px-4 font-medium text-gray-700">Paper Code</th>
                  <th className="py-3 px-4 font-medium text-gray-700">Subject</th>
                  <th className="py-3 px-4 font-medium text-gray-700">Obtained By Student</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-3 px-4">03-Jun-2024 2 P.M. - 5 P.M.</td>
                  <td className="py-3 px-4">7713</td>
                  <td className="py-3 px-4">Mathematics</td>
                  <td className="py-3 px-4">TH</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">03-Jun-2024 2 P.M. - 5 P.M.</td>
                  <td className="py-3 px-4">7714</td>
                  <td className="py-3 px-4">Science</td>
                  <td className="py-3 px-4">TH</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">03-Jun-2024 2 P.M. - 5 P.M.</td>
                  <td className="py-3 px-4">7715</td>
                  <td className="py-3 px-4">English</td>
                  <td className="py-3 px-4">TH</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">03-Jun-2024 2 P.M. - 5 P.M.</td>
                  <td className="py-3 px-4">7716</td>
                  <td className="py-3 px-4">Social Science</td>
                  <td className="py-3 px-4">TH</td>
                </tr>
              </tbody>
            </table>
            <button
              className="mt-6 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
      
    </div>
  );
};

export default AdmitCardPage;


