import React, { useState } from 'react';
import { FaCheckCircle, FaTimesCircle, FaPencilAlt, FaToggleOn, FaToggleOff } from 'react-icons/fa';

const Languages = () => {
  const [languages, setLanguages] = useState([
    { language: 'Afrikaans', shortCode: 'af', countryCode: 'af', status: 'Active', rtl: false, enabled: true },
    { language: 'Albanian', shortCode: 'sq', countryCode: 'al', status: 'Active', rtl: false, enabled: true },
    { language: 'Arabic', shortCode: 'ar', countryCode: 'sa', status: 'Active', rtl: true, enabled: true },
    { language: 'Chinese', shortCode: 'zh', countryCode: 'cn', status: 'Active', rtl: false, enabled: true },
    { language: 'English', shortCode: 'en', countryCode: 'us', status: 'Active', rtl: false, enabled: true },
    // Add more languages as needed...
  ]);

  const handleCountryCodeChange = (index, value) => {
    const updatedLanguages = [...languages];
    updatedLanguages[index].countryCode = value;
    setLanguages(updatedLanguages);
  };

  const handleEnableToggle = (index) => {
    const updatedLanguages = [...languages];
    updatedLanguages[index].enabled = !updatedLanguages[index].enabled;
    setLanguages(updatedLanguages);
  };

  return (
    <div className="min-h-screen flex flex-col overflow-y-auto bg-gray-100 dark:bg-gray-800 dark:text-white">
      {/* Header Section */}
      <header className="bg-blue-500 text-white p-4 text-center dark:bg-green-800 dark:text-white">
        <h1 className="text-2xl font-bold">Language Management</h1>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 dark:bg-gray-800 dark:text-white">
        <h2 className="text-xl font-semibold mb-4">Language List</h2>
        <div className="overflow-x-auto bg-white rounded-lg shadow-lg dark:bg-gray-600 dark:text-white">
          <table className="min-w-full">
            <thead className="bg-gray-200 dark:bg-gray-800 dark:text-white">
              <tr>
                <th className="py-3 px-4 text-left">#</th>
                <th className="py-3 px-4 text-left">Language</th>
                <th className="py-3 px-4 text-left">Short Code</th>
                <th className="py-3 px-4 text-left">Country Code</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">RTL</th>
                <th className="py-3 px-4 text-left">Actions</th>
                <th className="py-3 px-4 text-left">Enable/Disable</th>
              </tr>
            </thead>
            <tbody>
              {languages.map((lang, index) => (
                <tr key={index} className="border-b">
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4">{lang.language}</td>
                  <td className="py-3 px-4">{lang.shortCode}</td>
                  <td className="py-3 px-4">
                    <input
                      type="text"
                      value={lang.countryCode}
                      onChange={(e) => handleCountryCodeChange(index, e.target.value)}
                      className="px-2 py-1 border rounded-md w-full dark:bg-gray-600 dark:text-white"
                    />
                  </td>
                  <td className="py-3 px-4">{lang.status}</td>
                  <td className="py-3 px-4">
                    {lang.rtl ? (
                      <FaCheckCircle className="text-green-500" />
                    ) : (
                      <FaTimesCircle className="text-red-500" />
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <button className="text-blue-500">
                      <FaPencilAlt />
                    </button>
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleEnableToggle(index)}
                      className={`flex items-center ${lang.enabled ? 'text-green-500' : 'text-red-500'}`}
                    >
                      {lang.enabled ? <FaToggleOn className="text-2xl" /> : <FaToggleOff className="text-2xl" />}
                      <span className="ml-2">{lang.enabled ? 'Enabled' : 'Disabled'}</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center p-4">
        <p>&copy; 2024 Language Management System</p>
      </footer>
    </div>
  );
};

export default Languages;

