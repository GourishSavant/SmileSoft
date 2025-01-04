import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { FaUser, FaChalkboardTeacher, FaBook, FaCalendarCheck, FaUserPlus } from 'react-icons/fa';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const AdminDashboard = () => {
  // States for data
  const [studentsCount, setStudentsCount] = useState(0);
  const [teachersCount, setTeachersCount] = useState(0);
  const [coursesCount, setCoursesCount] = useState(0);
  const [events, setEvents] = useState([]);
  const [recentUsers, setRecentUsers] = useState([]);

  useEffect(() => {
    // Fetch data from API or mock data
    setStudentsCount(120);
    setTeachersCount(15);
    setCoursesCount(30);
    setEvents([
      { name: 'Math Exam', date: '2024-12-10' },
      { name: 'History Exam', date: '2024-12-15' },
      { name: 'Physics Midterm', date: '2024-12-20' },
      { name: 'English Essay Deadline', date: '2024-12-18' },
      { name: 'Chemistry Lab Exam', date: '2024-12-22' },
      { name: 'Computer Science Final', date: '2024-12-25' },
      { name: 'Biology Field Trip', date: '2024-12-28' },
      { name: 'Geography Project Due', date: '2024-12-30' },
      { name: 'Art Final Submission', date: '2024-12-05' },
      { name: 'Philosophy Lecture Series', date: '2024-12-08' },
    ]);
    setRecentUsers([
      { name: 'John Doe', type: 'Student', date: '2024-11-28' },
      { name: 'Alice Smith', type: 'Teacher', date: '2024-11-27' },
    ]);
  }, []);

  // Chart Data for a simple example (Total Students Over Time)
  const chartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Total Students',
        data: [100, 105, 110, 120, 125, 130],
        fill: false,
        borderColor: '#4CAF50',
        tension: 0.1,
      },
    ],
  };

  // Chart Options
  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Student Enrollment Over Time',
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 overflow-auto dark:bg-gray-800 dark:text-white">
      <div className="container mx-auto">
        <h1 className="text-3xl font-semibold text-center mb-6 dark:bg-gray-800 dark:text-white">Admin Dashboard</h1>

        {/* Total Counts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-600 dark:text-white p-6 rounded-md shadow-md flex items-center justify-between">
            <div>
              <h3 className="text-xl font-medium">Total Students</h3>
              <p className="text-3xl font-semibold">{studentsCount}</p>
            </div>
            <FaUser className="text-blue-500 text-4xl dark:bg-gray-600 dark:text-white" />
          </div>
          <div className="bg-white dark:bg-gray-600 dark:text-white p-6 rounded-md shadow-md flex items-center justify-between">
            <div>
              <h3 className="text-xl font-medium">Total Teachers</h3>
              <p className="text-3xl font-semibold">{teachersCount}</p>
            </div>
            <FaChalkboardTeacher className="text-green-500 dark:bg-gray-600 dark:text-white text-4xl" />
          </div>
          <div className="bg-white dark:bg-gray-600 dark:text-white p-6 rounded-md shadow-md flex items-center justify-between">
            <div>
              <h3 className="text-xl dark:bg-gray-600 dark:text-white font-medium">Total Courses</h3>
              <p className="text-3xl dark:bg-gray-600 dark:text-white font-semibold">{coursesCount}</p>
            </div>
            <FaBook className="text-red-500 text-4xl" />
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white p-6 rounded-md shadow-md mb-8 h-80 overflow-y-auto dark:bg-gray-800 dark:text-white">
          <h2 className="text-2xl font-medium mb-4 dark:bg-gray-800 dark:text-white">Upcoming Events</h2>
          <div className="space-y-4">
            {events.map((event, index) => (
              <div key={index} className="flex justify-between items-center border-b py-2 dark:bg-gray-800 dark:text-white">
                <p className="font-medium">{event.name}</p>
                <p>{event.date}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recently Added Users */}
        <div className="bg-white p-6 rounded-md shadow-md mb-8 dark:bg-gray-800 dark:text-white">
          <h2 className="text-2xl font-medium mb-4 dark:bg-gray-800 dark:text-white">Recently Added Users</h2>
          <div className="space-y-4">
            {recentUsers.map((user, index) => (
              <div key={index} className="flex justify-between items-center border-b py-2 dark:bg-gray-800 dark:text-white">
                <div className="flex items-center">
                  <FaUserPlus className="mr-2 text-gray-500 dark:bg-gray-800 dark:text-white" />
                  <p className="font-medium">{user.name}</p>
                </div>
                <p>{user.type}</p>
                <p>{user.date}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Chart */}
        <div className="bg-white p-6 rounded-md shadow-md mb-8 dark:bg-gray-800 dark:text-white">
          <h2 className="text-2xl font-medium mb-4 dark:bg-gray-800 dark:text-white">Student Enrollment Chart</h2>
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
