import React, { useState } from "react";
import { Bar, Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, ArcElement);

const Dashboard = () => {
  // State for current date and view
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState("month"); // Default view is month

  // Chart Data
  const barChartData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Fees Collection",
        data: [5000, 7000, 8000, 9000],
        backgroundColor: "rgba(245, 247, 248, 0.6)",
        borderColor: "rgb(166, 169, 172)",
        borderWidth: 1,
      },
      {
        label: "Expenses",
        data: [2000, 4000, 3000, 5000],
        backgroundColor: "rgba(242, 237, 238, 0.6)",
        borderColor: "rgb(172, 170, 171)",
        borderWidth: 0.5,
      },
    ],
  };

  const doughnutData = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        label: "Session 2023-24 Overview",
        data: [70, 30],
        backgroundColor: ["rgba(26, 19, 52, 0.46)", "#FF6384"],
        hoverOffset: 4,
      },
    ],
  };

  // Functions for Calendar
  const changeMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const getMonthName = (date) => {
    return date.toLocaleString("default", { month: "long", year: "numeric" });
  };

  const getWeekDays = () => {
    const weekStart = new Date(currentDate);
    weekStart.setDate(weekStart.getDate() - weekStart.getDay()); // Get the first day of the current week (Sunday)

    const weekData = Array.from({ length: 7 }, (_, i) => {
      const day = new Date(weekStart);
      day.setDate(day.getDate() + i); // Get each day of the week
      return day;
    });

    return weekData;
  };

  const getMonthDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const blankDays = Array.from({ length: firstDay }, () => null);
    const monthDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    return [...blankDays, ...monthDays];
  };

  const isToday = (date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-slate-900 text-gray-700 dark:text-white">
      {/* Top Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
        {[{ title: "Fees Awaiting Payment", value: "0/0" },
          { title: "Converted Leads", value: "0/0" },
          { title: "Staff Present Today", value: "0/6" },
          { title: "Student Present Today", value: "0/0" },
        ].map((card, idx) => (
          <div key={idx} className="bg-white dark:bg-slate-800 p-4 rounded shadow-md text-center">
            <h3 className="text-sm font-semibold">{card.title}</h3>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Fees & Expenses Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4">
        <div className="bg-white dark:bg-slate-800 p-4 rounded shadow-md">
          <h3 className="font-semibold mb-2">Fees Collection & Expenses For December 2024</h3>
          <Bar data={barChartData} options={{ responsive: true }} />
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded shadow-md">
          <h3 className="font-semibold mb-2">Income - December 2024</h3>
          <Line
            data={{
              labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
              datasets: [
                {
                  label: "Income",
                  data: [6000, 7000, 8500, 10000],
                  borderColor: "rgb(5, 63, 63)",
                  backgroundColor: "rgba(2, 7, 20, 0.2)",
                  fill: true,
                },
              ],
            }}
            options={{ responsive: true }}
          />
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded shadow-md">
          <h3 className="font-semibold mb-2">Fees Collection & Expenses For Session 2023-24</h3>
          <Doughnut data={doughnutData} />
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded shadow-md">
          <h3 className="font-semibold mb-2">Expense - December 2024</h3>
          <Line
            data={{
              labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
              datasets: [
                {
                  label: "Expenses",
                  data: [2000, 3000, 4000, 5000],
                  borderColor: "rgb(7, 4, 21)",
                  backgroundColor: "rgba(17, 25, 78, 0.2)",
                  fill: true,
                },
              ],
            }}
            options={{ responsive: true }}
          />
        </div>
      </div>

      {/* Role Counts */}
      <div className="p-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[
          { role: "Admin", count: 2 },
          { role: "Teacher", count: 15 },
          { role: "Accountant", count: 2 },
          { role: "Librarian", count: 3 },
          { role: "Receptionist", count: 1 },
          { role: "Super Admin", count: 1 },
          { role: "Student", count: 400 },
          { role: "Administrator", count: 2 },
          { role: "     ", count:   0 },
          { role: "      ", count:   0 },
        ].map((item, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-slate-800 p-4 rounded shadow-md text-center flex flex-col items-center hover:bg-gray-200 dark:hover:bg-gray-600 transition duration-200 ease-in-out"
          >
            <h3 className="font-bold text-lg">{item.role}</h3>
            <p className="text-3xl font-semibold">{item.count}</p>
          </div>
        ))}
      </div>

      {/* Calendar Section */}
      <div className="bg-white dark:bg-slate-800 p-4 rounded shadow-md">
        <h3 className="text-lg font-semibold mb-4 text-center">{getMonthName(currentDate)}</h3>
        <div className="flex justify-between items-center mb-4">
          <button onClick={() => changeMonth(-1)} className="text-gray-600 hover:bg-gray-200 px-3 py-1 rounded">
            &lt;
          </button>
          <button onClick={() => changeMonth(1)} className="text-gray-600 hover:bg-gray-200 px-3 py-1 rounded">
            &gt;
          </button>
        </div>
        <div className="grid grid-cols-7 gap-2 text-center text-gray-700 dark:text-white">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, idx) => (
            <div key={idx} className="font-semibold">{day}</div>
          ))}
          {getMonthDays().map((day, idx) => (
            <div
              key={idx}
              className={`p-2 border rounded ${
                day ? (isToday(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))
                  ? "bg-blue-300 dark:bg-blue-700"
                  : "hover:bg-gray-200 dark:hover:bg-gray-600")
                : ""
              }`}
            >
              {day || ""}
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 text-center text-gray-500 dark:text-gray-400">
        <p>© 2024 ST. TERESA'S</p>
      </div>
    </div>
  );
};

export default Dashboard;
