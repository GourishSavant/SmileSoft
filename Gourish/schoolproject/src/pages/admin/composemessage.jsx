import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ComposeMessage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    noticeDate: '',
    publishDate: '',
    message: '',
    recipients: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would handle adding the new notice to your system or state
    // For now, just navigate back to the NoticeBoard
    navigate('/');
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100 dark:bg-gray-800">
      <h1 className="text-2xl font-semibold mb-6">Compose New Message</h1>
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-700 p-6 rounded shadow">
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Notice Date *</label>
          <input
            type="date"
            name="noticeDate"
            value={formData.noticeDate}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Publish Date *</label>
          <input
            type="date"
            name="publishDate"
            value={formData.publishDate}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Message *</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Recipients</label>
          <select
            name="recipients"
            multiple
            value={formData.recipients}
            onChange={(e) =>
              setFormData({
                ...formData,
                recipients: Array.from(e.target.selectedOptions, (option) => option.value)
              })
            }
            className="w-full p-2 border rounded"
          >
            <option value="Student">Student</option>
            <option value="Parent">Parent</option>
            <option value="Teacher">Teacher</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ComposeMessage;
