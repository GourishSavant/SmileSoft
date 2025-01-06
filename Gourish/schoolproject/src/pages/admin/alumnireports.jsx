import React, { useState, useEffect } from 'react';

const Alumnireports = () => {
  const [activeModule, setActiveModule] = useState('students');
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSession, setSelectedSession] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Fetch data for all modules (students)
    fetch('/admin/alumni.json') // Use the actual path to your JSON file
      .then((response) => response.json())
      .then((jsonData) => {
        setData(jsonData);
        setFilteredData(jsonData);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    const filtered = data.filter((item) => {
      const matchSearch =
        (item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.fatherName && item.fatherName.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.passOutSession && item.passOutSession.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchSession = selectedSession ? item.passOutSession === selectedSession : true;
      const matchClass = selectedClass ? item.class === selectedClass : true;
      const matchSection = selectedSection ? item.section === selectedSection : true;

      return matchSearch && matchSession && matchClass && matchSection;
    });
    setFilteredData(filtered);
  }, [searchTerm, selectedSession, selectedClass, selectedSection, data]);

  const renderTable = () => {
    if (filteredData.length === 0) {
      return (
        <tr>
          <td colSpan="8" className="text-center py-4 dark:text-white dark:bg-gray-800">
            No data available in table
            <br />
            Add new record or search with different criteria.
          </td>
        </tr>
      );
    }

    return filteredData.map((item, index) => (
      <tr key={index} className="hover:bg-gray-100 dark:text-white dark:bg-gray-800">
        <td className="border p-2">{item.admissionNo}</td>
        <td className="border p-2">{item.name}</td>
        <td className="border p-2">{item.username}</td>
        <td className="border p-2">{item.class}</td>
        <td className="border p-2">{item.fatherName}</td>
        <td className="border p-2">{item.mobileNumber}</td>
        <td className="border p-2">{item.passOutSession}</td> {/* Pass Out Session Column */}
        <td className="border p-2">
          <button className="text-blue-500">Edit</button>
        </td>
      </tr>
    ));
  };

  return (
    <div className="mt-4 p-4 dark:bg-gray-600 dark:text-white overflow-y-auto h-[calc(80vh-4rem)]">

    <div className={`${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-800'} min-h-screen dark:bg-gray-800 dark:text-white p-6 transition-colors duration-300`}>
      <div className="bg-gray-200 min-h-screen dark:bg-gray-800 dark:text-white">
        <div className="p-6">
          {/* Filter Section */}
          <div className="flex gap-4 mb-4 dark:bg-gray-800">
            <div className="flex items-center gap-2 dark:bg-gray-800 dark:text-white">
              <label htmlFor="session" className="mr-2">Pass Out Session</label>
              <select
                id="session"
                value={selectedSession}
                onChange={(e) => setSelectedSession(e.target.value)}
                className="border p-2 rounded dark:bg-gray-800 dark:text-white"
              >
                <option value="">Select Session</option>
                <option value="2016-17">2016-17</option>
                <option value="2017-18">2017-18</option>
                <option value="2018-19">2018-19</option>
                <option value="2019-20">2019-20</option>
                <option value="2020-21">2020-21</option>
              </select>
            </div>

            <div className="flex items-center gap-2 dark:bg-gray-800 dark:text-white">
              <label htmlFor="class" className="mr-2">Class</label>
              <select
                id="class"
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="border p-2 rounded dark:bg-gray-800 dark:text-white"
              >
                <option value="">Select Class</option>
                <option value="Class 8">Class 8</option>
                <option value="Class 9">Class 9</option>
                <option value="Class 10">Class 10</option>
                <option value="Class 11">Class 11</option>
                <option value="Class 12">Class 12</option>
              </select>
            </div>

            <div className="flex items-center gap-2 dark:bg-gray-800 dark:text-white">
              <label htmlFor="section" className="mr-2">Section</label>
              <select
                id="section"
                value={selectedSection}
                onChange={(e) => setSelectedSection(e.target.value)}
                className="border p-2 rounded dark:bg-gray-800 dark:text-white"
              >
                <option value="">Select Section</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
              </select>
            </div>

            <input
              type="text"
              placeholder="Search..."
              className="border p-2 rounded w-1/3 dark:bg-gray-800 dark:text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Table Section */}
          <div className="overflow-auto bg-white shadow-md rounded dark:text-white dark:bg-gray-800">
            <table className="min-w-full border-collapse border dark:text-white border-gray-300 dark:border border-gray-800">
              <thead className="bg-gray-200 dark:bg-gray-800 dark:text-white">
                <tr>
                  <th className="border p-2">Admission No</th>
                  <th className="border p-2">Student Name</th>
                  <th className="border p-2">Username</th>
                  <th className="border p-2">Class</th>
                  <th className="border p-2">Father Name</th>
                  <th className="border p-2">Mobile Number</th>
                  <th className="border p-2">Pass Out Session</th>
                  <th className="border p-2">Action</th>
                </tr>
              </thead>
              <tbody>{renderTable()}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Alumnireports;
