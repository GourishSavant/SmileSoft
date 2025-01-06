
import React, { useState } from "react";
import { FaPrint } from "react-icons/fa"; // Importing the Print icon

const TeacherTimeTable = () => {
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [teachers] = useState([
    {
      id: 1,
      name: "Yashavanth B A (123)",
      class: "Class 1",
      section: "A",
      schedule: {
        Monday: "Math - 9:00 AM",
        Tuesday: "Science - 10:00 AM",
        Wednesday: "History - 11:00 AM",
        Thursday: "Math - 9:00 AM",
        Friday: "English - 1:00 PM",
        Saturday: "Not Scheduled",
        Sunday: "Not Scheduled",
      },
    },
    {
      id: 2,
      name: "Gourish (2)",
      class: "Class 2",
      section: "B",
      schedule: {
        Monday: "Physics - 10:00 AM",
        Tuesday: "Chemistry - 11:00 AM",
        Wednesday: "Biology - 12:00 PM",
        Thursday: "Not Scheduled",
        Friday: "Math - 2:00 PM",
        Saturday: "Not Scheduled",
        Sunday: "Not Scheduled",
      },
    },
  ]);

  const [filteredTeacher, setFilteredTeacher] = useState(null);

  // Handle selecting teacher from dropdown
  const handleTeacherSelect = (e) => {
    setSelectedTeacher(e.target.value);
  };

  // Handle Search button click
  const handleSearch = () => {
    const teacher = teachers.find((teacher) => teacher.name === selectedTeacher);
    setFilteredTeacher(teacher || null);
  };

  // Print the page content
  const handlePrint = () => {
    window.print(); // Triggers the print dialog
  };

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      {/* Frame wrapper */}
      <div className="bg-white p-6 rounded-lg shadow-lg relative">
        {/* Print Icon in the top right */}
        <FaPrint
          onClick={handlePrint}
          className="absolute top-4 right-4 text-2xl text-gray-600 cursor-pointer hover:text-black"
        />
        
        <h2 className="text-2xl font-semibold mb-6">Teacher Time Table</h2>

        {/* Teacher filter with search button */}
        <div className="flex items-center mb-6">
          <select
            value={selectedTeacher}
            onChange={handleTeacherSelect}
            className="p-2 border border-gray-300 rounded-lg mr-4"
          >
            <option value="">Select Teacher</option>
            {teachers.map((teacher) => (
              <option key={teacher.id} value={teacher.name}>
                {teacher.name}
              </option>
            ))}
          </select>
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          >
            Search
          </button>
        </div>
        

        {/* Display timetable of the selected teacher */}
        {filteredTeacher ? (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto bg-white shadow-md rounded-lg">
              <thead>
                <tr className="bg-gray-200">
                  <th className="py-3 px-4 text-sm text-gray-600 font-semibold">Teacher</th>
                  <th className="py-3 px-4 text-sm text-gray-600 font-semibold">Class</th>
                  <th className="py-3 px-4 text-sm text-gray-600 font-semibold">Section</th>
                  <th className="py-3 px-4 text-sm text-gray-600 font-semibold">Monday</th>
                  <th className="py-3 px-4 text-sm text-gray-600 font-semibold">Tuesday</th>
                  <th className="py-3 px-4 text-sm text-gray-600 font-semibold">Wednesday</th>
                  <th className="py-3 px-4 text-sm text-gray-600 font-semibold">Thursday</th>
                  <th className="py-3 px-4 text-sm text-gray-600 font-semibold">Friday</th>
                  <th className="py-3 px-4 text-sm text-gray-600 font-semibold">Saturday</th>
                  <th className="py-3 px-4 text-sm text-gray-600 font-semibold">Sunday</th>
                </tr>
              </thead>
              <tbody>
                <tr key={filteredTeacher.id} className="border-t">
                  <td className="py-3 px-4 text-sm text-gray-700">{filteredTeacher.name}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">{filteredTeacher.class}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">{filteredTeacher.section}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">{filteredTeacher.schedule.Monday}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">{filteredTeacher.schedule.Tuesday}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">{filteredTeacher.schedule.Wednesday}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">{filteredTeacher.schedule.Thursday}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">{filteredTeacher.schedule.Friday}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">{filteredTeacher.schedule.Saturday}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">{filteredTeacher.schedule.Sunday}</td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <p className="mt-4 text-gray-700">Please select a teacher and click Search to view the timetable.</p>
        )}
      </div>
    </div>
  );
};

export default TeacherTimeTable;





