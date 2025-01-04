import React, { useState } from "react";
import { FaFilePdf, FaFileExcel, FaFileCsv, FaPrint, FaCopy, FaFileWord, FaColumns,FaPen,FaPhone,FaTrash } from 'react-icons/fa';


const AdmissionEnquiry = () => {
  const [enquiries, setEnquiries] = useState([
    {
      name: "Gourish Savant",
      phone: "09591166883",
      source: "source1",
      enquiryDate: "12/23/2024",
      lastFollowUpDate: "",
      nextFollowUpDate: "12/23/2024",
      status: "Active",
      email: "abcd@gmail.com",
      address: "Bangalore",
      createdBy: "Super Admin (9000)",
    },
  ]);

  const [classFilter, setClassFilter] = useState("Select");
  const [sourceFilter, setSourceFilter] = useState("Select");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [statusFilter, setStatusFilter] = useState("Passive");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [selectedFollowUpEnquiry, setSelectedFollowUpEnquiry] = useState(null);
  const [selectedEditEnquiry, setSelectedEditEnquiry] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);


  const handleAddClick = () => {
    setIsAddModalOpen(true);
  };

  const handleAddModalClose = () => {
    // Close the modal and reset the newEnquiry state
    setIsAddModalOpen(false);
    setNewEnquiry({
      name: "",
      phone: "",
      email: "",
      address: "",
      description: "",
      note: "",
      enquiryDate: "",
      nextFollowUpDate: "",
      assigned: "",
      reference: "",
      source: "",
      class: "",
      numberOfChild: "",
    });
  };
  
  const handleAddSave = (event) => {
    event.preventDefault();
    // Add the new enquiry to the list and close the modal
    setEnquiries([...enquiries, newEnquiry]);
    handleAddModalClose(); // Reuse cancel logic to reset modal state
  };
  const [newEnquiry, setNewEnquiry] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    description: "",
    note: "",
    enquiryDate: "",
    nextFollowUpDate: "",
    assigned: "",
    reference: "",
    source: "",
    class: "",
    numberOfChild: "",
  });

  const handleNewEnquiryChange = (field, value) => {
    setNewEnquiry({ ...newEnquiry, [field]: value });
  };

  const handleSearch = () => {
    // Implement search functionality
    alert("Search functionality not implemented yet!");
  };
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handlePhoneClick = (enquiry) => {
    setSelectedEnquiry(enquiry);
  };

  const handleCloseModal = () => {
    setSelectedEnquiry(null);
  };
  

  const handleEditClick = (enquiry) => {
    setSelectedEditEnquiry(enquiry);
  };
  const handleSave = (event) => {
    event.preventDefault(); // Prevent default form submission
    const updatedEnquiry = {
      ...selectedEditEnquiry,
      name: event.target.name.value,
      phone: event.target.phone.value,
      email: event.target.email.value,
      address: event.target.address.value,
      description: event.target.description.value,
      note: event.target.note.value,
      enquiryDate: event.target.enquiryDate.value,
      nextFollowUpDate: event.target.nextFollowUpDate.value,
      assigned: event.target.assigned.value,
      reference: event.target.reference.value,
      source: event.target.source.value,
      class: event.target.class.value,
      numberOfChild: event.target.numberOfChild.value,
    };
  
    setEnquiries((prevEnquiries) =>
      prevEnquiries.map((enquiry) =>
        enquiry === selectedEditEnquiry ? updatedEnquiry : enquiry
      )
    );
  
    setSelectedEditEnquiry(null); // Close the modal
  };
  

  return (
    <div className="container mx-auto p-6 bg-gray-50 dark:bg-gray-800 dark:text-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Select Criteria</h1>
      
      {/* Filters Section */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div className="flex flex-col w-1/7">
          <label className="block font-medium mb-1">Class</label>
          <select
            className="p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            value={classFilter}
            onChange={(e) => setClassFilter(e.target.value)}
          >
            <option value="Select">Select</option>
            <option value="Class 1">Class 1</option>
            <option value="Class 2">Class 2</option>
          </select>
        </div>

        <div className="flex flex-col w-1/6">
          <label className="block font-medium mb-1">Source</label>
          <select
            className="p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value)}
          >
            <option value="Select">Select</option>
            <option value="Source 1">Source 1</option>
            <option value="Source 2">Source 2</option>
          </select>
        </div>

        <div className="flex flex-col w-1/5">
          <label className="block font-medium mb-1">Enquiry From Date *</label>
          <input
            type="date"
            className="p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
        </div>

        <div className="flex flex-col w-1/5">
          <label className="block font-medium mb-1">Enquiry To Date *</label>
          <input
            type="date"
            className="p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </div>

        <div className="flex flex-col w-1/6">
          <label className="block font-medium mb-1">Status</label>
          <select
            className="p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="Passive">Passive</option>
            <option value="Active">Active</option>
          </select>
        </div>

        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 mt-7 flex-justify-end"
        >
          Search
        </button>
      </div>
      <h1 className="text-2xl font-bold mb-6 flex items-center justify-between">
  Admission Enquiry
  <button
          className="bg-gray-500 text-white px-2 py-1 rounded-md hover:bg-gray-600 "
          onClick={handleAddClick}
        >
          +Add
  </button>
</h1>     

 {/* Add Modal */}
 {isAddModalOpen && (
   <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
   <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-[1200px] h-[500px] overflow-y-auto z-60">
     <h2 className="text-xl font-bold mb-6">Edit Admission Enquiry</h2>
     <form>
       <div className="grid grid-cols-2 gap-4">
         <div>
           <label className="block font-medium mb-1">Name *</label>
           <input
             type="text"
             className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600"
             defaultValue={selectedEditEnquiry.name}
           />
         </div>
         <div>
           <label className="block font-medium mb-1">Phone *</label>
           <input
             type="text"
             className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600"
             defaultValue={selectedEditEnquiry.phone}
           />
         </div>
         <div>
           <label className="block font-medium mb-1">Email</label>
           <input
             type="email"
             className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600"
             defaultValue={selectedEditEnquiry.email}
           />
         </div>
         <div>
           <label className="block font-medium mb-1">Address</label>
           <input
             type="text"
             className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600"
             defaultValue={selectedEditEnquiry.address}
           />
         </div>
         <div>
           <label className="block font-medium mb-1">Description</label>
           <textarea
             className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600"
             defaultValue={selectedEditEnquiry.description}
           ></textarea>
         </div>
         <div>
           <label className="block font-medium mb-1">Note</label>
           <textarea
             className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600"
             defaultValue={selectedEditEnquiry.note}
           ></textarea>
         </div>
         <div>
           <label className="block font-medium mb-1">Date *</label>
           <input
             type="date"
             className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600"
             defaultValue={selectedEditEnquiry.enquiryDate}
           />
         </div>
         <div>
           <label className="block font-medium mb-1">Next Follow Up Date *</label>
           <input
             type="date"
             className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600"
             defaultValue={selectedEditEnquiry.nextFollowUpDate}
           />
         </div>
         <div>
           <label className="block font-medium mb-1">Assigned</label>
           <select
             className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600"
             defaultValue={selectedEditEnquiry.assigned}
           >
             <option>Select</option>
             <option>Admin</option>
           </select>
         </div>
         <div>
           <label className="block font-medium mb-1">Reference</label>
           <select
             className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600"
             defaultValue={selectedEditEnquiry.reference}
           >
             <option>Select</option>
             <option>Friend</option>
           </select>
         </div>
         <div>
           <label className="block font-medium mb-1">Source *</label>
           <input
             type="text"
             className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600"
             defaultValue={selectedEditEnquiry.source}
           />
         </div>
         <div>
           <label className="block font-medium mb-1">Class</label>
           <select
             className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600"
             defaultValue={selectedEditEnquiry.class}
           >
             <option>Select</option>
             <option>Class 1</option>
             <option>Class 2</option>
           </select>
         </div>
         <div>
           <label className="block font-medium mb-1">Number Of Child</label>
           <input
             type="number"
             className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600"
             defaultValue={selectedEditEnquiry.numberOfChild}
           />
         </div>
       </div>
       <div className="flex justify-end space-x-4">
         <button
           type="button"
           className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
           onClick={handleCloseModal}
         >
           Cancel
         </button>
         <button
           type="submit"
           className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
         >
           Save
         </button>
       </div>
     </form>
   </div>
 </div>
)}

  {/* Search Input and Icons */}
              <div className="flex items-center justify-between space-x-4 mb-6">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  placeholder="Search teacher"
                  className="p-2 border border-gray-300 rounded-lg w-1/3"
                />
                {/* Downloadable Icons */}
                <div className="flex space-x-2">
                  <FaFilePdf className="text-red-500 cursor-pointer hover:text-red-700" title="Download PDF" size={20} />
                  <FaFileWord className="text-blue-500 cursor-pointer hover:text-blue-700" title="Download Word" size={20} />
                  <FaFileExcel className="text-green-500 cursor-pointer hover:text-green-700" title="Download Excel" size={20} />
                  <FaCopy className="text-gray-500 cursor-pointer hover:text-gray-700" title="Copy" size={20} />
                  <FaPrint className="text-black cursor-pointer hover:text-gray-700" title="Print" size={20} />
                  <FaColumns className="text-gray-500 cursor-pointer hover:text-gray-700" title="Columns View" size={20} />
                </div>
              </div>

      {/* Enquiry Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-600">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700">
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Name</th>
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Phone</th>
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Source</th>
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Enquiry Date</th>
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Last Follow Up Date</th>
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Next Follow Up Date</th>
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Status</th>
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
  {enquiries.map((enquiry, index) => (
    <tr key={index} className="odd:bg-gray-100 dark:odd:bg-gray-800">
      <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{enquiry.name}</td>
      <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{enquiry.phone}</td>
      <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{enquiry.source}</td>
      <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{enquiry.enquiryDate}</td>
      <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{enquiry.lastFollowUpDate}</td>
      <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{enquiry.nextFollowUpDate}</td>
      <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{enquiry.status}</td>
      <td className="mt-1 border-gray-300 dark:border-gray-600 px-4 py-2 flex items-center space-x-4">
      <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => handlePhoneClick(enquiry)}
                  >
                    <FaPhone title="Call" />
        </button>
        <FaPen
                    className="text-blue-500 cursor-pointer hover:text-blue-700"
                    title="Edit"
                    size={18}
                    onClick={() => handleEditClick(enquiry)}
                  />
        <button className="text-red-500 hover:text-red-700">
          <FaTrash title="Delete" />
        </button>
      </td>
    </tr>
  ))}
</tbody>

        </table>
      </div>
    

  
      {/* Follow-Up Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 w-full z-50">
<div
      className="bg-white dark:bg-gray-800 p-10 rounded-lg shadow-lg w-[1200px] h-[500px] overflow-y-auto z-60" 
    >            <h2 className="text-xl font-bold mb-4">Follow Up Admission Enquiry</h2>
            <form>
            <div className="grid grid-cols-2 gap-4">
            <label className="block font-medium mb-1">Follow Up Date *</label>
                <input
                  type="date"
                  className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium mb-1">Next Follow Up Date *</label>
                <input
                  type="date"
                  className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium mb-1">Response *</label>
                <textarea
                  className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600"
                  rows="4"
                ></textarea>
              </div>
              <h3 className="text-lg font-bold mb-2">Follow Up ({selectedEnquiry.name})</h3>
              <p className="text-sm mb-2">
                Status: <strong>{selectedEnquiry.status}</strong>
              </p>
              <p className="text-sm mb-2">Enquiry Date: {selectedEnquiry.enquiryDate}</p>
              <p className="text-sm mb-2">Phone: {selectedEnquiry.phone}</p>
              <p className="text-sm mb-4">Source: {selectedEnquiry.source}</p>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
        
      )}

      
{/* Edit Modal */}
{selectedEditEnquiry && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-[1200px] h-[500px] overflow-y-auto z-60">
            <h2 className="text-xl font-bold mb-6">Edit Admission Enquiry</h2>
            <form>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium mb-1">Name *</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600"
                    defaultValue={selectedEditEnquiry.name}
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1">Phone *</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600"
                    defaultValue={selectedEditEnquiry.phone}
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1">Email</label>
                  <input
                    type="email"
                    className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600"
                    defaultValue={selectedEditEnquiry.email}
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1">Address</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600"
                    defaultValue={selectedEditEnquiry.address}
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1">Description</label>
                  <textarea
                    className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600"
                    defaultValue={selectedEditEnquiry.description}
                  ></textarea>
                </div>
                <div>
                  <label className="block font-medium mb-1">Note</label>
                  <textarea
                    className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600"
                    defaultValue={selectedEditEnquiry.note}
                  ></textarea>
                </div>
                <div>
                  <label className="block font-medium mb-1">Date *</label>
                  <input
                    type="date"
                    className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600"
                    defaultValue={selectedEditEnquiry.enquiryDate}
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1">Next Follow Up Date *</label>
                  <input
                    type="date"
                    className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600"
                    defaultValue={selectedEditEnquiry.nextFollowUpDate}
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1">Assigned</label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600"
                    defaultValue={selectedEditEnquiry.assigned}
                  >
                    <option>Select</option>
                    <option>Admin</option>
                  </select>
                </div>
                <div>
                  <label className="block font-medium mb-1">Reference</label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600"
                    defaultValue={selectedEditEnquiry.reference}
                  >
                    <option>Select</option>
                    <option>Friend</option>
                  </select>
                </div>
                <div>
                  <label className="block font-medium mb-1">Source *</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600"
                    defaultValue={selectedEditEnquiry.source}
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1">Class</label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600"
                    defaultValue={selectedEditEnquiry.class}
                  >
                    <option>Select</option>
                    <option>Class 1</option>
                    <option>Class 2</option>
                  </select>
                </div>
                <div>
                  <label className="block font-medium mb-1">Number Of Child</label>
                  <input
                    type="number"
                    className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600"
                    defaultValue={selectedEditEnquiry.numberOfChild}
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdmissionEnquiry;