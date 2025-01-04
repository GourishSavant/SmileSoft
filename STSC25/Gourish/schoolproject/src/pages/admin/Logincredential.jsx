import React, { useState, useEffect } from 'react';

const CredentialsManager = () => {
  const [data, setData] = useState(null); // To store the fetched JSON data
  const [selectedRoles, setSelectedRoles] = useState({
    Students: false,
    Teachers: false,
    Guardians: false,
  }); // Track selected roles
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [sentCredentials, setSentCredentials] = useState([]); // Track sent credentials

  // Fetch the JSON data
  useEffect(() => {
    fetch('/admin/credential.json')  // Adjust this path as needed
      .then((response) => response.json())
      .then((jsonData) => setData(jsonData))
      .catch((error) => console.error("Error fetching JSON:", error));
  }, []);

  // Handle role selection
  const handleRoleSelection = (role) => {
    setSelectedRoles((prevState) => ({
      ...prevState,
      [role]: !prevState[role],  // Toggle role selection
    }));
  };

  // Handle Class and Section selection for students
  const handleClassSelection = (event) => {
    setSelectedClass(event.target.value);
    setSelectedSection('');
  };

  const handleSectionSelection = (event) => {
    setSelectedSection(event.target.value);
  };

  // Function to send credentials for a specific user
  const sendUserCredentials = (user, role) => {
    const credentials = `${user.username} - ${user.password}`;
    setSentCredentials((prev) => [...prev, { ...user, role, credentials }]);
    alert(`Credentials sent to ${user.name}: ${credentials}`);
  };

  // Filter students based on selected class and section
  const filteredStudents = data?.Students?.filter(
    (student) =>
      (!selectedClass || student.class === selectedClass) &&
      (!selectedSection || student.section === selectedSection)
  );

  // If data is not yet loaded, show loading message
  if (!data) {
    return <p>Loading...</p>;
  }

  return (
    <div className="mt-4 p-4 overflow-y-auto h-[calc(80vh-4rem)]">
      <div className="p-8 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold mb-6">Credentials Manager</h1>

        {/* Role Selection Checkboxes */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">Select Roles:</label>
          <div className="space-x-4">
            {Object.keys(selectedRoles).map((role) => (
              <label key={role} className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={selectedRoles[role]}
                  onChange={() => handleRoleSelection(role)}
                  className="form-checkbox"
                />
                <span className="ml-2">{role}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Filter by Class and Section for Students */}
        {selectedRoles.Students && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">Select Class:</label>
            <select
              value={selectedClass}
              onChange={handleClassSelection}
              className="form-select mt-1 block w-full"
            >
              <option value="">Select Class</option>
              <option value="8th">8th</option>
              <option value="9th">9th</option>
              <option value="10th">10th</option>
            </select>

            {selectedClass && (
              <>
                <label className="block text-sm font-medium text-gray-700 mt-4">Select Section:</label>
                <select
                  value={selectedSection}
                  onChange={handleSectionSelection}
                  className="form-select mt-1 block w-full"
                >
                  <option value="">Select Section</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                </select>
              </>
            )}
          </div>
        )}

        {/* Displaying Data in Table Format for Students */}
        {selectedRoles.Students && filteredStudents && (
          <div>
            <h2 className="text-lg font-bold">Students List</h2>
            <table className="min-w-full table-auto">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Name</th>
                  <th className="border px-4 py-2">Username</th>
                  <th className="border px-4 py-2">Password</th>
                  <th className="border px-4 py-2">Class</th>
                  <th className="border px-4 py-2">Section</th>
                  <th className="border px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student.id}>
                    <td className="border px-4 py-2">{student.name}</td>
                    <td className="border px-4 py-2">{student.username}</td>
                    <td className="border px-4 py-2">{student.password}</td>
                    <td className="border px-4 py-2">{student.class}</td>
                    <td className="border px-4 py-2">{student.section}</td>
                    <td className="border px-4 py-2">
                      <button
                        onClick={() => sendUserCredentials(student, 'Students')}
                        className="bg-blue-500 text-white py-1 px-3 rounded-md"
                      >
                        Send Credentials
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Displaying Data in Table Format for Teachers */}
        {selectedRoles.Teachers && data.Teachers && (
          <div>
            <h2 className="text-lg font-bold">Teachers List</h2>
            <table className="min-w-full table-auto">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Name</th>
                  <th className="border px-4 py-2">Username</th>
                  <th className="border px-4 py-2">Password</th>
                  <th className="border px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {data.Teachers.map((teacher) => (
                  <tr key={teacher.id}>
                    <td className="border px-4 py-2">{teacher.name}</td>
                    <td className="border px-4 py-2">{teacher.username}</td>
                    <td className="border px-4 py-2">{teacher.password}</td>
                    <td className="border px-4 py-2">
                      <button
                        onClick={() => sendUserCredentials(teacher, 'Teachers')}
                        className="bg-blue-500 text-white py-1 px-3 rounded-md"
                      >
                        Send Credentials
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Displaying Data in Table Format for Guardians */}
        {selectedRoles.Guardians && data.Guardians && (
          <div>
            <h2 className="text-lg font-bold">Guardians List</h2>
            <table className="min-w-full table-auto">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Name</th>
                  <th className="border px-4 py-2">Username</th>
                  <th className="border px-4 py-2">Password</th>
                  <th className="border px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {data.Guardians.map((guardian) => (
                  <tr key={guardian.id}>
                    <td className="border px-4 py-2">{guardian.name}</td>
                    <td className="border px-4 py-2">{guardian.username}</td>
                    <td className="border px-4 py-2">{guardian.password}</td>
                    <td className="border px-4 py-2">
                      <button
                        onClick={() => sendUserCredentials(guardian, 'Guardians')}
                        className="bg-blue-500 text-white py-1 px-3 rounded-md"
                      >
                        Send Credentials
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Displaying Sent Credentials in Table Format */}
        <div className="mt-6">
          <h2 className="text-lg font-bold">Sent Credentials:</h2>
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Role</th>
                <th className="border px-4 py-2">Credentials</th>
                <th className="border px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {sentCredentials.map((entry, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{entry.name}</td>
                  <td className="border px-4 py-2">{entry.role}</td>
                  <td className="border px-4 py-2">{entry.credentials}</td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => alert(`Re-sent credentials to ${entry.name}`)}
                      className="bg-yellow-500 text-white py-1 px-3 rounded-md"
                    >
                      Re-send
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CredentialsManager;
