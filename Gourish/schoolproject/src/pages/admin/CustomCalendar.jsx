import React, { useState, useEffect } from "react";

const App = () => {
  const [view, setView] = useState("month");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    from: "",
    to: "",
    color: "#0000ff",
    type: "Public",
  });
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [taskFormData, setTaskFormData] = useState({
    taskTitle: "",
    taskDate: "",
  });

  const [tasks, setTasks] = useState([]);
  const [events, setEvents] = useState([]);

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`);

  const handleDayClick = (day) => {
    setCurrentDate(new Date(day));
    setModalOpen(true); // Open event form
    const selectedDate = new Date(day);
    setFormData({
      ...formData,
      from: selectedDate.toISOString().slice(0, 16),
      to: selectedDate.toISOString().slice(0, 16),
    });
  };

  const handleAddEvent = (e) => {
    e.preventDefault();
    setEvents([
      ...events,
      {
        ...formData,
        id: Date.now(),
        date: currentDate.toLocaleDateString(),
      },
    ]);
    setModalOpen(false);
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    setTasks([
      ...tasks,
      {
        ...taskFormData,
        id: Date.now(),
      },
    ]);
    setTaskModalOpen(false);
  };

  const changeMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + direction);
    setCurrentDate(newDate);
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

  const getDayData = () => {
    const day = new Date(currentDate);
    return [day];
  };

  const handleSubmitEvent = (e) => {
    e.preventDefault();
    setModalOpen(false);
    console.log("Event Data:", formData);
  };

  const handleSubmitTask = (e) => {
    e.preventDefault();
    setTaskModalOpen(false);
    console.log("Task Data:", taskFormData);
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
    <div className="flex min-h-screen bg-gray-100">
      {/* Left side: Calendar Section */}
      <div className="flex-1 bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Calendar Controls */}
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <button
            onClick={() => changeMonth(-1)}
            className="text-gray-600 hover:bg-gray-200 px-3 py-1 rounded"
          >
            &lt;
          </button>
          <h1 className="text-2xl font-semibold">
            {currentDate.toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </h1>
          <button
            onClick={() => changeMonth(1)}
            className="text-gray-600 hover:bg-gray-200 px-3 py-1 rounded"
          >
            &gt;
          </button>
        </div>

        <div className="flex justify-end px-6 py-2 space-x-2">
          <button
            onClick={() => setView("month")}
            className={`px-4 py-1 rounded ${view === "month" ? "bg-black text-white" : "bg-gray-200"}`}
          >
            Month
          </button>
          <button
            onClick={() => setView("week")}
            className={`px-4 py-1 rounded ${view === "week" ? "bg-black text-white" : "bg-gray-200"}`}
          >
            Week
          </button>
          <button
            onClick={() => setView("day")}
            className={`px-4 py-1 rounded ${view === "day" ? "bg-black text-white" : "bg-gray-200"}`}
          >
            Day
          </button>
        </div>

        {/* Calendar Views */}
        <div className="border-t">
          {/* Month View */}
          {view === "month" && (
            <div className="grid grid-cols-7 border-l">
              {daysOfWeek.map((day, index) => (
                <div key={index} className="text-center font-medium bg-gray-100 border-r border-b py-2">
                  {day}
                </div>
              ))}
              {getMonthDays().map((day, index) => (
                <div
                  key={index}
                  onClick={() => day && handleDayClick(day)}
                  className={`border-r border-b h-24 flex items-start p-2 cursor-pointer hover:bg-gray-100 ${
                    isToday(new Date(currentDate.getFullYear(), currentDate.getMonth(), day)) ? "bg-blue-100" : ""
                  }`}
                >
                  {day && <span className="text-gray-500">{day}</span>}
                  {/* Render events for the day */}
                  {events
                    .filter((event) => new Date(event.date).toLocaleDateString() === new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toLocaleDateString())
                    .map((event) => (
                      <div key={event.id} className="text-xs text-white bg-blue-500 p-1 mt-1 rounded">
                        {event.title}
                      </div>
                    ))}
                </div>
              ))}
            </div>
          )}

          {/* Week View */}
          {view === "week" && (
            <div className="grid grid-cols-8 border-l border-t">
              <div className="border-r bg-gray-100">
                {hours.map((hour, index) => (
                  <div
                    key={index}
                    className="h-16 border-b flex items-center justify-center text-sm text-gray-600"
                  >
                    {hour}
                  </div>
                ))}
              </div>
              {getWeekDays().map((day, dayIndex) => (
                <div key={dayIndex} className="border-r">
                  <div
                    onClick={() => handleDayClick(day)}
                    className="text-center font-medium bg-gray-100 border-b py-2 cursor-pointer"
                  >
                    {day.toDateString()}
                  </div>
                  {hours.map((_, hourIndex) => (
                    <div key={hourIndex} className="h-16 border-b"></div>
                  ))}
                </div>
              ))}
            </div>
          )}

          {/* Daily View */}
          {view === "day" && (
            <div className="flex flex-col">
              {/* Day Header */}
              <div className="text-center font-medium bg-gray-100 border-b py-2">
                {daysOfWeek[new Date().getDay() - 1]} - 18 December 2024
              </div>
              {/* Time Slots */}
              <div className="flex flex-col h-full">
                {hours.map((hour, index) => (
                  <div key={index} className="border-b text-gray-600 text-sm p-4">
                    {hour}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right side: To-Do List Section */}
      <div className="w-96 bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-4">
          <h2 className="text-xl font-semibold">To-Do List</h2>
          <div className="mt-4">
            <ul>
              {tasks.map((task) => (
                <li key={task.id} className="py-2">
                  {task.taskTitle} - {task.taskDate}
                </li>
              ))}
            </ul>
            <button
              onClick={() => setTaskModalOpen(true)}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
            >
              Add Task
            </button>
          </div>
        </div>
      </div>

      {/* Event Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <form
            onSubmit={handleAddEvent}
            className="bg-white p-12 rounded-lg shadow-lg w-96 max-h-[90vh] overflow-y-auto"
          >
            <h2 className="text-xl font-semibold mb-2">Add Event</h2>
            <div className="mb-4">
              <label className="block text-sm">Event Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full border border-gray-300 rounded px-3 py-2"
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block text-sm">From</label>
              <input
                type="datetime-local"
                value={formData.from}
                onChange={(e) => setFormData({ ...formData, from: e.target.value })}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm">To</label>
              <input
                type="datetime-local"
                value={formData.to}
                onChange={(e) => setFormData({ ...formData, to: e.target.value })}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm">Event Color</label>
              <input
                type="color"
                value={formData.color}
                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                className="w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm">Event Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full border border-gray-300 rounded px-3 py-2"
              >
                <option value="Public">Public</option>
                <option value="Private">Private</option>
              </select>
            </div>
            <div className="flex justify-between">
              <button
                onClick={() => setModalOpen(false)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Add Event
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Task Modal */}
      {taskModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <form
            onSubmit={handleAddTask}
            className="bg-white p-6 rounded-lg shadow-lg w-96 max-h-[90vh] overflow-y-auto"
          >
            <h2 className="text-xl font-semibold mb-4">Add Task</h2>
            <div className="mb-4">
              <label className="block text-sm">Task Title</label>
              <input
                type="text"
                value={taskFormData.taskTitle}
                onChange={(e) => setTaskFormData({ ...taskFormData, taskTitle: e.target.value })}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm">Task Date</label>
              <input
                type="date"
                value={taskFormData.taskDate}
                onChange={(e) => setTaskFormData({ ...taskFormData, taskDate: e.target.value })}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div className="flex justify-between">
              <button
                onClick={() => setTaskModalOpen(false)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Add Task
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default App;
