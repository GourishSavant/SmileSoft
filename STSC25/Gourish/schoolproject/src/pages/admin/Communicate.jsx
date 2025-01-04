import React, { useState } from "react";

const CommunicationManagement = () => {
  const [announcement, setAnnouncement] = useState("");
  const [selectedAudience, setSelectedAudience] = useState("Students");

  // Function to handle sending announcements
  const handleSendAnnouncement = () => {
    if (announcement.trim() === "") {
      alert("Announcement content cannot be empty.");
      return;
    }
    alert(`Announcement sent to ${selectedAudience}: \n\n${announcement}`);
    setAnnouncement(""); // Clear the announcement field after sending
  };

  return (
    <div className="h-screen overflow-y-auto bg-gray-100 dark:bg-gray-800 p-6">
      {/* Header */}
      <header className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Communication Management</h1>
      </header>

      {/* Create and Send Announcements */}
      <div className="bg-white dark:bg-gray-900 shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Create and Send Announcements</h2>
        <textarea
          value={announcement}
          onChange={(e) => setAnnouncement(e.target.value)}
          placeholder="Write your announcement here..."
          className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg mb-4 dark:bg-gray-800 dark:text-white"
        />
        <select
          value={selectedAudience}
          onChange={(e) => setSelectedAudience(e.target.value)}
          className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg mb-4 dark:bg-gray-800 dark:text-white"
        >
          <option value="Students">Students</option>
          <option value="Teachers">Teachers</option>
        </select>
        <button
          onClick={handleSendAnnouncement}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          Send Announcement
        </button>
      </div>
    </div>
  );
};

export default CommunicationManagement;
