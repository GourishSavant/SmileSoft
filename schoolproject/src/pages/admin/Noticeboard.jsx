import React, { useState } from "react";
import ReactQuill from 'react-quill'; // Import ReactQuill
import 'react-quill/dist/quill.snow.css'; // Import the styles for ReactQuill

const NoticeBoard = () => {
  const [messages, setMessages] = useState([]);
  const [showCompose, setShowCompose] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    noticeDate: "",
    publishOn: "",
    attachment: null,
    message: "",
    recipients: [],
  });
  const [editIndex, setEditIndex] = useState(null);

  const handleComposeToggle = () => {
    setShowCompose(!showCompose);
    setEditIndex(null); // Reset edit mode when toggling compose
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, attachment: e.target.files[0] });
  };

  const handleRecipientChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      recipients: checked
        ? [...prevState.recipients, value]
        : prevState.recipients.filter((recipient) => recipient !== value),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      // Update existing message
      const updatedMessages = [...messages];
      updatedMessages[editIndex] = formData;
      setMessages(updatedMessages);
    } else {
      // Add new message
      setMessages([...messages, formData]);
    }

    setShowCompose(false);
    setFormData({
      title: "",
      noticeDate: "",
      publishOn: "",
      attachment: null,
      message: "",
      recipients: [],
    });
    setEditIndex(null);
  };

  const handleEdit = (index) => {
    setFormData(messages[index]);
    setEditIndex(index);
    setShowCompose(true);
  };

  const handleDelete = (index) => {
    const updatedMessages = messages.filter((_, i) => i !== index);
    setMessages(updatedMessages);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen dark:bg-gray-800 dark:text-white">
      <h1 className="text-2xl font-bold mb-4">Notice Board</h1>

      {/* Toggle Compose Form */}
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mb-4 dark:bg-blue-800 dark:text-white dark:hover:bg-blue-700"
        onClick={handleComposeToggle}
      >
        {showCompose ? "Cancel" : "Post New Message"}
      </button>

      {/* Compose Form */}
      {showCompose && (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded shadow-md mb-6 dark:bg-gray-600 dark:text-white"
        >
          <div className="mb-4">
            <label className="block font-bold mb-2 dark:text-white">Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 rounded dark:bg-gray-600 dark:text-white"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block font-bold mb-2 dark:text-white">Notice Date *</label>
            <input
              type="date"
              name="noticeDate"
              value={formData.noticeDate}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 rounded dark:bg-gray-600 dark:text-white"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block font-bold mb-2 dark:text-white">Publish On *</label>
            <input
              type="date"
              name="publishOn"
              value={formData.publishOn}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 rounded dark:bg-gray-600 dark:text-white"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block font-bold mb-2 dark:text-white">Attachment</label>
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full border border-gray-300 p-2 rounded dark:bg-gray-600 dark:text-white"
            />
          </div>

          <div className="mb-4">
            <label className="block font-bold mb-2 dark:text-white">Message *</label>
            {/* ReactQuill editor for message */}
            <ReactQuill
              theme="snow"
              value={formData.message}
              onChange={(value) => setFormData({ ...formData, message: value })}
              placeholder="Start typing your message..."
            />
          </div>

          <div className="mb-4">
            <label className="block font-bold mb-2 dark:text-white">Message To</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                "Student",
                "Parent",
                "Admin",
                "Teacher",
                "Accountant",
                "Librarian",
                "Receptionist",
                "Super Admin",
                "Administrator",
              ].map((role) => (
                <div key={role}>
                  <label className="dark:text-white">
                    <input
                      type="checkbox"
                      value={role}
                      checked={formData.recipients.includes(role)}
                      onChange={handleRecipientChange}
                      className="mr-2"
                    />
                    {role}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 dark:bg-blue-600 dark:text-white dark:hover:bg-blue-500"
          >
            {editIndex !== null ? "Update" : "Send"}
          </button>
        </form>
      )}

      {/* Messages List */}
      <div className="mt-6">
        {messages.length > 0 ? (
          messages.map((msg, index) => (
            <div key={index} className="bg-white p-4 rounded shadow-md mb-4 dark:bg-gray-600 dark:text-white">
              <h2 className="font-bold">{msg.title}</h2>
              <p>{msg.message}</p>
              <small className="text-gray-500">Date: {msg.noticeDate}</small>
              <div className="mt-2 flex gap-2">
                <button
                  className="bg-yellow-500 text-white py-1 px-4 rounded hover:bg-yellow-600"
                  onClick={() => handleEdit(index)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white py-1 px-4 rounded hover:bg-red-600"
                  onClick={() => handleDelete(index)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="bg-white p-4 rounded shadow-md dark:bg-gray-600 dark:text-white">
            No messages available.
          </p>
        )}
      </div>
    </div>
  );
};

export default NoticeBoard;
