import React, { useState, useEffect } from "react";

const CourseManagement = () => {
  const [courses, setCourses] = useState([]); // To store courses data
  const [teachers, setTeachers] = useState([]); // To store teachers data
  const [categories, setCategories] = useState([]); // To store categories data
  const [modules, setModules] = useState([]); // To store modules data
  const [academicYears, setAcademicYears] = useState(["2022-2023", "2023-2024", "2024-2025"]); // Add academic years
  const [newCourse, setNewCourse] = useState({
    name: "",
    teacher: "",
    category: "",
    modules: 0,
    academicYear: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editCourseId, setEditCourseId] = useState(null);

  // Load data from Course.json in the public folder using fetch
  useEffect(() => {
    fetch("/admin/Course.json") // The path assumes that Course.json is in the public folder
      .then((response) => response.json()) // Parse the JSON file
      .then((data) => {
        setTeachers(data.teachers);
        setCategories(data.categories);
        setModules(data.modules);
        setCourses(data.courses); // Set courses data
      })
      .catch((error) => {
        console.error("Error loading Course.json:", error);
      });
  }, []);

  // Handle Add or Update Course
  const handleSaveCourse = () => {
    if (newCourse.name && newCourse.teacher && newCourse.category && newCourse.modules && newCourse.academicYear) {
      if (isEditing) {
        // Update Course
        setCourses(courses.map((course) =>
          course.id === editCourseId ? { id: course.id, ...newCourse } : course
        ));
        setIsEditing(false);
      } else {
        // Add New Course
        setCourses([...courses, { id: courses.length + 1, ...newCourse }]);
      }
      setNewCourse({ name: "", teacher: "", category: "", modules: 0, academicYear: "" });
    } else {
      alert("Please fill in all fields!");
    }
  };

  // Handle Edit Course
  const handleEditCourse = (id) => {
    const courseToEdit = courses.find((course) => course.id === id); // Find the course by ID
    setNewCourse(courseToEdit);  // Populate form with the selected course's data
    setIsEditing(true);  // Set edit mode
    setEditCourseId(id);  // Store the ID of the course being edited
  };

  // Handle Delete Course
  const handleDeleteCourse = (id) => {
    setCourses(courses.filter((course) => course.id !== id)); // Remove course by ID
  };

  return (
    <div className="main-content p-6 max-w-7xl mx-auto bg-gray-50 dark:bg-gray-800 dark:text-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-4">Course Management</h1>

      {/* Add or Edit Course Form */}
      <div className="p-4 bg-white dark:bg-gray-800 shadow rounded-lg mb-4">
        <h2 className="text-lg font-semibold mb-4">{isEditing ? "Edit Course" : "Add New Course"}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Course Name Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Course Name</label>
            <select
              value={newCourse.name}
              onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm dark:bg-gray-700 dark:text-white"
            >
              <option value="">Select Course</option>
              {courses.map((course) => (
                <option key={course.id} value={course.name}>
                  {course.name}
                </option>
              ))}
            </select>
          </div>

          {/* Teacher Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Assign Teacher</label>
            <select
              value={newCourse.teacher}
              onChange={(e) => setNewCourse({ ...newCourse, teacher: e.target.value })}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm dark:bg-gray-700 dark:text-white"
            >
              <option value="">Select Teacher</option>
              {teachers.map((teacher, index) => (
                <option key={index} value={teacher}>
                  {teacher}
                </option>
              ))}
            </select>
          </div>

          {/* Category Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
            <select
              value={newCourse.category}
              onChange={(e) => setNewCourse({ ...newCourse, category: e.target.value })}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm dark:bg-gray-700 dark:text-white"
            >
              <option value="">Select Category</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Modules Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Number of Modules</label>
            <select
              value={newCourse.modules}
              onChange={(e) => setNewCourse({ ...newCourse, modules: parseInt(e.target.value) })}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm dark:bg-gray-700 dark:text-white"
            >
              <option value="">Select Modules</option>
              {modules.map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>

          {/* Academic Year Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Academic Year</label>
            <select
              value={newCourse.academicYear}
              onChange={(e) => setNewCourse({ ...newCourse, academicYear: e.target.value })}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm dark:bg-gray-700 dark:text-white"
            >
              <option value="">Select Academic Year</option>
              {academicYears.map((year, index) => (
                <option key={index} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button
          onClick={handleSaveCourse}
          className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md shadow hover:bg-blue-600"
        >
          {isEditing ? "Save Changes" : "Add Course"}
        </button>
      </div>

      {/* Courses List Table */}
      <h2 className="text-lg font-semibold mb-4">Courses</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto bg-white dark:bg-gray-800 shadow-md rounded-lg">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="py-2 px-4 text-left text-gray-700 dark:text-gray-300">Course Name</th>
              <th className="py-2 px-4 text-left text-gray-700 dark:text-gray-300">Teacher</th>
              <th className="py-2 px-4 text-left text-gray-700 dark:text-gray-300">Category</th>
              <th className="py-2 px-4 text-left text-gray-700 dark:text-gray-300">Modules</th>
              <th className="py-2 px-4 text-left text-gray-700 dark:text-gray-300">Academic Year</th>
              <th className="py-2 px-4 text-left text-gray-700 dark:text-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.id} className="border-b dark:border-gray-600">
                <td className="py-2 px-4">{course.name}</td>
                <td className="py-2 px-4">{course.teacher}</td>
                <td className="py-2 px-4">{course.category}</td>
                <td className="py-2 px-4">{course.modules}</td>
                <td className="py-2 px-4">{course.academicYear}</td>
                <td className="py-2 px-4">
                  <button
                    onClick={() => handleEditCourse(course.id)}
                    className="bg-yellow-500 text-white py-1 px-3 rounded-md hover:bg-yellow-600 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteCourse(course.id)}
                    className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CourseManagement;
