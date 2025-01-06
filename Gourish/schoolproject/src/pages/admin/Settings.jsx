import React, { useState, useEffect } from "react";

const SystemSettings = () => {
  const [academicYears, setAcademicYears] = useState(["2022-2023", "2023-2024", "2024-2025"]);
  const [notificationPreferences, setNotificationPreferences] = useState({
    email: false,
    sms: false,
    push: false,
  });
  const [theme, setTheme] = useState("light"); // Options: "light", "dark"

  // Handle academic year selection
  const handleAcademicYearChange = (e) => {
    // Update academic year settings
    console.log("Selected Academic Year: ", e.target.value);
  };

  // Handle notification preference toggles
  const handleNotificationChange = (e) => {
    setNotificationPreferences({
      ...notificationPreferences,
      [e.target.name]: e.target.checked,
    });
  };

  // Handle theme change
  const handleThemeChange = (e) => {
    setTheme(e.target.value);
  };

  return (
    <div className="main-content p-6 max-w-7xl mx-auto bg-gray-50 shadow-md rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-4">System Settings</h1>

      {/* Academic Year Configuration */}
      <div className="p-4 bg-white shadow rounded-lg mb-4">
        <h2 className="text-lg font-semibold mb-4">Academic Year Configuration</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Select Academic Year</label>
            <select
              onChange={handleAcademicYearChange}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm"
            >
              {academicYears.map((year, index) => (
                <option key={index} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="p-4 bg-white shadow rounded-lg mb-4">
        <h2 className="text-lg font-semibold mb-4">Notification Preferences</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="email"
              name="email"
              checked={notificationPreferences.email}
              onChange={handleNotificationChange}
              className="mr-2"
            />
            <label htmlFor="email" className="text-sm font-medium text-gray-700">Email Notifications</label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="sms"
              name="sms"
              checked={notificationPreferences.sms}
              onChange={handleNotificationChange}
              className="mr-2"
            />
            <label htmlFor="sms" className="text-sm font-medium text-gray-700">SMS Notifications</label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="push"
              name="push"
              checked={notificationPreferences.push}
              onChange={handleNotificationChange}
              className="mr-2"
            />
            <label htmlFor="push" className="text-sm font-medium text-gray-700">Push Notifications</label>
          </div>
        </div>
      </div>

      {/* Theme Customization */}
      <div className="p-4 bg-white shadow rounded-lg mb-4">
        <h2 className="text-lg font-semibold mb-4">Theme Customization</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Select Theme</label>
            <select
              value={theme}
              onChange={handleThemeChange}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="text-center mt-6">
        <button
          onClick={() => alert("Settings Saved!")}
          className="bg-blue-500 text-white py-2 px-6 rounded-md shadow hover:bg-blue-600"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default SystemSettings;
