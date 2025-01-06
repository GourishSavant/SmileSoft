import React, { useState } from "react";

const ExamManagement = () => {
  const [exams, setExams] = useState([]);  // State for storing exams
  const [newExam, setNewExam] = useState({
    name: "",
    date: "",
    time: "",
    teacher: "",
  });  // State for exam form data
  const [isEditing, setIsEditing] = useState(false);  // Flag for editing
  const [editExamId, setEditExamId] = useState(null);  // Store the ID of the exam being edited
  const [teachers] = useState(["Nishanth", "Sampreeth", "Nandan"]);  // Sample teachers

  // Save new exam or update existing exam
  const handleSaveExam = () => {
    if (newExam.name && newExam.date && newExam.time && newExam.teacher) {
      if (isEditing) {
        setExams(
          exams.map((exam) =>
            exam.id === editExamId ? { ...exam, ...newExam } : exam
          )
        );
        setIsEditing(false);
        setEditExamId(null);
      } else {
        const newExamData = {
          id: Date.now(), // Unique ID using current timestamp
          ...newExam,
          published: false,
        };
        setExams([...exams, newExamData]);  // Add new exam
      }
      setNewExam({ name: "", date: "", time: "", teacher: "" });  // Clear the form after saving
    }
  };

  // Edit an exam
  const handleEditExam = (id) => {
    const examToEdit = exams.find((exam) => exam.id === id);
    setNewExam(examToEdit);  // Set form fields with exam data
    setIsEditing(true);
    setEditExamId(id);
  };

  // Delete an exam
  const handleDeleteExam = (id) => {
    setExams(exams.filter((exam) => exam.id !== id));  // Remove the exam from the list
  };

  // Publish exam result
  const handlePublishResult = (id) => {
    setExams(
      exams.map((exam) =>
        exam.id === id ? { ...exam, published: true } : exam
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 dark:bg-gray-800 dark:text-white">
      <div className="container mx-auto">
        <h1 className="text-3xl font-semibold text-center mb-6 dark:bg-gray-800 dark:text-white">Exam Management</h1>

        {/* Add/Edit Exam Form */}
        <div className="bg-white p-6 rounded-md shadow-md mb-8 dark:bg-gray-800 dark:text-white">
          <h2 className="text-2xl font-medium mb-4">{isEditing ? "Edit Exam" : "Create New Exam"}</h2>

          {/* Exam Name Dropdown */}
          <select
            className="w-full p-3 mb-4 border rounded-md dark:bg-gray-600 dark:text-white"
            value={newExam.name}
            onChange={(e) => setNewExam({ ...newExam, name: e.target.value })}
          >
            <option value="">Select Exam Name</option>
            <option value="Math Midterm">Math Midterm</option>
            <option value="History Final">History Final</option>
            <option value="Physics Test">Physics Test</option>
            <option value="English Exam">English Exam</option>
          </select>

          {/* Exam Date */}
          <input
            type="date"
            className="w-full p-3 mb-4 border rounded-md dark:bg-gray-600 dark:text-white"
            value={newExam.date}
            onChange={(e) => setNewExam({ ...newExam, date: e.target.value })}
          />

          {/* Exam Time Dropdown */}
          <select
            className="w-full p-3 mb-4 border rounded-md dark:bg-gray-600 dark:text-white"
            value={newExam.time}
            onChange={(e) => setNewExam({ ...newExam, time: e.target.value })}
          >
            <option value="">Select Exam Time</option>
            <option value="09:00 AM">09:00 AM</option>
            <option value="12:00 PM">12:00 PM</option>
            <option value="03:00 PM">03:00 PM</option>
          </select>

          {/* Teacher Assignment */}
          <select
            className="w-full p-3 mb-4 border rounded-md dark:bg-gray-600 dark:text-white"
            value={newExam.teacher}
            onChange={(e) => setNewExam({ ...newExam, teacher: e.target.value })}
          >
            <option value="">Assign Teacher</option>
            {teachers.map((teacher, index) => (
              <option key={index} value={teacher}>
                {teacher}
              </option>
            ))}
          </select>

          <button
            onClick={handleSaveExam}
            className="w-full p-3 bg-green-500 text-white rounded-md hover:bg-green-600 dark:bg-blue-800 dark:text-white"
          >
            {isEditing ? "Save Changes" : "Add Exam"}
          </button>
        </div>

        {/* Exam List */}
        <div className="bg-white p-6 rounded-md shadow-md dark:bg-gray-600 dark:text-white">
          <h2 className="text-2xl font-medium mb-4">Exams List</h2>
          
          {/* Exam Grid with Scrolling */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-96 overflow-y-auto">
            {exams.length === 0 ? (
              <p className="text-center text-gray-500 dark:bg-gray-600 dark:text-white">No exams available.</p>
            ) : (
              exams.map((exam) => (
                <div
                  key={exam.id}
                  className="bg-white p-4 rounded-md shadow-md border dark:bg-gray-800 dark:text-white"
                >
                  <h3 className="text-xl font-medium">{exam.name}</h3>
                  <p><strong>Date:</strong> {exam.date}</p>
                  <p><strong>Time:</strong> {exam.time}</p>
                  <p><strong>Teacher:</strong> {exam.teacher}</p>
                  <p><strong>Status:</strong> {exam.published ? "Published" : "Not Published"}</p>
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => handleEditExam(exam.id)}
                      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 dark:bg-gray-800 dark:text-white"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteExam(exam.id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 dark:bg-gray-800 dark:text-white"
                    >
                      Delete
                    </button>
                    {!exam.published && (
                      <button
                        onClick={() => handlePublishResult(exam.id)}
                        className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 dark:bg-gray-800 dark:text-white"
                      >
                        Publish
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamManagement;
