import React, { useState, useEffect } from 'react';

const UserManagement = () => {
  const [users, setUsers] = useState({
    students: [],
    teachers: [],
    admins: [],
  });
  const [selectedRole, setSelectedRole] = useState('students');
  const [newUser, setNewUser] = useState({ name: '', email: '', status: 'active' });
  const [searchQuery, setSearchQuery] = useState('');
  const [editUser, setEditUser] = useState(null);

  // Load data from localStorage or data.json
  useEffect(() => {
    const storedData = localStorage.getItem('users');
    if (storedData) {
      setUsers(JSON.parse(storedData));
    } else {
      // Fetch data from data.json if no data in localStorage
      fetch('/admin/data.json')
        .then((response) => response.json())
        .then((data) => {
          setUsers(data);
          localStorage.setItem('users', JSON.stringify(data));  // Save to localStorage
        })
        .catch((error) => console.error('Error loading user data:', error));
    }
  }, []);

  // Save to localStorage whenever users state changes
  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email) {
      alert('Please fill in all fields.');
      return;
    }

    const newUserId = Math.max(...users[selectedRole].map(user => user.id), 0) + 1;
    const updatedUsers = {
      ...users,
      [selectedRole]: [
        ...users[selectedRole],
        { id: newUserId, ...newUser },
      ],
    };

    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    setNewUser({ name: '', email: '', status: 'active' });
  };

  const handleDeleteUser = (id) => {
    const updatedUsers = {
      ...users,
      [selectedRole]: users[selectedRole].filter((user) => user.id !== id),
    };
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  const handleEditUser = (user) => {
    setEditUser(user);
    setNewUser({ name: user.name, email: user.email, status: user.status });
  };

  const handleUpdateUser = () => {
    if (!newUser.name || !newUser.email) {
      alert('Please fill in all fields.');
      return;
    }

    const updatedUsers = users[selectedRole].map((user) =>
      user.id === editUser.id ? { ...user, ...newUser } : user
    );
    setUsers({
      ...users,
      [selectedRole]: updatedUsers,
    });
    localStorage.setItem('users', JSON.stringify({ ...users, [selectedRole]: updatedUsers }));

    setNewUser({ name: '', email: '', status: 'active' });
    setEditUser(null);
  };

  const filteredUsers = users[selectedRole].filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery) ||
      user.email.toLowerCase().includes(searchQuery)
  );

  return (
    <div className="user-management-container p-8 max-w-6xl mx-auto dark:bg-gray-800 dark:text-white">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold">User Management</h1>
      </header>

      <div className="mb-4 flex justify-between dark:bg-gray-800 dark:text-white">
        <select
          value={selectedRole}
          onChange={handleRoleChange}
          className="border border-gray-300 p-2 rounded dark:bg-gray-800 dark:text-white"
        >
          <option value="students">Students</option>
          <option value="teachers">Teachers</option>
          <option value="admins">Admins</option>
        </select>

        <input
          type="text"
          placeholder="Search by name or email"
          onChange={handleSearchChange}
          className="border border-gray-300 p-2 rounded w-1/3 dark:bg-gray-800 dark:text-white"
        />
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold dark:bg-gray-800 dark:text-white">{editUser ? 'Edit User' : 'Add New User'}</h2>
        <div className="mt-4">
          <input
            type="text"
            placeholder="Name"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            className="border border-gray-300 p-2 rounded w-full mb-2 dark:bg-gray-800 dark:text-white"
          />
          <input
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            className="border border-gray-300 p-2 rounded w-full mb-2 dark:bg-gray-800 dark:text-white"
          />
          <select
            value={newUser.status}
            onChange={(e) => setNewUser({ ...newUser, status: e.target.value })}
            className="border border-gray-300 p-2 rounded w-full mb-2 dark:bg-gray-800 dark:text-white"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          {editUser ? (
            <button onClick={handleUpdateUser} className="bg-blue-500 text-white py-2 px-4 rounded dark:bg-gray-800 dark:text-white">
              Update User
            </button>
          ) : (
            <button onClick={handleAddUser} className="bg-green-500 text-white py-2 px-4 rounded dark:bg-gray-800 dark:text-white">
              Add User
            </button>
          )}
        </div>
      </div>

      <div className="overflow-auto max-h-96">
        <h2 className="text-2xl font-semibold mb-4 dark:bg-gray-800 dark:text-white">{selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)} List</h2>
        <div className="space-y-4">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <div key={user.id} className="border p-4 rounded-md shadow-sm dark:bg-gray-800 dark:text-white">
                <h3 className="text-xl font-semibold dark:bg-gray-800 dark:text-white">{user.name}</h3>
                <p>{user.email}</p>
                <p>Status: {user.status}</p>
                <div className="mt-2 space-x-2 dark:bg-gray-800 dark:text-white">
                  <button onClick={() => handleEditUser(user)} className="bg-blue-500 text-white py-1 px-3 rounded dark:bg-gray-800 dark:text-white">
                    Edit
                  </button>
                  <button onClick={() => handleDeleteUser(user.id)} className="bg-red-500 text-white py-1 px-3 rounded dark:bg-gray-800 dark:text-white">
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No users found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
