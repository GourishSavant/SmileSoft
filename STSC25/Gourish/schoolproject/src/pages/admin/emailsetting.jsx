
import React, { useState } from 'react';

const EmailSettings = () => {
  const [emailEngine, setEmailEngine] = useState('SMTP'); // Default Email Engine
  const [smtpSettings, setSmtpSettings] = useState({
    email: 'admin@school.com',
    smtpUsername: '',
    smtpPassword: '',
    smtpServer: '',
    smtpPort: '',
    smtpSecurity: 'OFF',
    smtpAuth: 'ON',
    accessKeyId: '',
    secretAccessKey: '',
    region: '',
  });

  const handleEngineChange = (e) => {
    setEmailEngine(e.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSmtpSettings((prevSettings) => ({
      ...prevSettings,
      [name]: value,
    }));
  };

  const handleSave = () => {
    console.log('Email Settings Saved:', smtpSettings);
    alert('Email Settings have been saved successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Email Settings</h2>

        {/* Email Engine */}
        <div className="mb-4">
          <label htmlFor="emailEngine" className="block text-sm font-medium text-gray-600">
            Email Engine
          </label>
          <select
            id="emailEngine"
            value={emailEngine}
            onChange={handleEngineChange}
            className="mt-1 block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="SendMail">SendMail</option>
            <option value="SMTP">SMTP</option>
            <option value="AWSSES">AWS SES</option>
          </select>
        </div>

        {/* SendMail Engine */}
        {emailEngine === 'SendMail' && (
          <div className="text-gray-700 text-sm"> </div>
        )}

        {/* SMTP Engine */}
        {emailEngine === 'SMTP' && (
          <>
            <div className="mb-4">
              <label htmlFor="smtpUsername" className="block text-sm font-medium text-gray-600">
                SMTP Username
              </label>
              <input
                type="email"
                id="smtpUsername"
                name="smtpUsername"
                value={smtpSettings.smtpUsername}
                onChange={handleInputChange}
                className="mt-1 block w-1/2  px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="smtpPassword" className="block text-sm font-medium text-gray-600">
                SMTP Password
              </label>
              <input
                type="password"
                id="smtpPassword"
                name="smtpPassword"
                value={smtpSettings.smtpPassword}
                onChange={handleInputChange}
                className="mt-1 block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="smtpServer" className="block text-sm font-medium text-gray-600">
                SMTP Server
              </label>
              <input
                type="text"
                id="smtpServer"
                name="smtpServer"
                value={smtpSettings.smtpServer}
                onChange={handleInputChange}
                className="mt-1 block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="smtpPort" className="block text-sm font-medium text-gray-600">
                SMTP Port
              </label>
              <input
                type="text"
                id="smtpPort"
                name="smtpPort"
                value={smtpSettings.smtpPort}
                onChange={handleInputChange}
                className="mt-1 block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="smtpSecurity" className="block text-sm font-medium text-gray-600">
                SMTP Security
              </label>
              <select
                id="smtpSecurity"
                name="smtpSecurity"
                value={smtpSettings.smtpSecurity}
                onChange={handleInputChange}
                className="mt-1 block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="OFF">OFF</option>
                <option value="SSL">SSL</option>
                <option value="TLS">TLS</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="smtpAuth" className="block text-sm font-medium text-gray-600">
                SMTP Auth
              </label>
              <select
                id="smtpAuth"
                name="smtpAuth"
                value={smtpSettings.smtpAuth}
                onChange={handleInputChange}
                className="mt-1 block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="ON">ON</option>
                <option value="OFF">OFF</option>
              </select>
            </div>
          </>
        )}

        {/* AWS SES Engine */}
        {emailEngine === 'AWSSES' && (
          <>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={smtpSettings.email}
                onChange={handleInputChange}
                className="mt-1 block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="accessKeyId" className="block text-sm font-medium text-gray-600">
                Access Key ID
              </label>
              <input
                type="text"
                id="accessKeyId"
                name="accessKeyId"
                value={smtpSettings.accessKeyId}
                onChange={handleInputChange}
                className="mt-1 block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="secretAccessKey" className="block text-sm font-medium text-gray-600">
                Secret Access Key
              </label>
              <input
                type="password"
                id="secretAccessKey"
                name="secretAccessKey"
                value={smtpSettings.secretAccessKey}
                onChange={handleInputChange}
                className="mt-1 block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="region" className="block text-sm font-medium text-gray-600">
                Region
              </label>
              <input
                type="text"
                id="region"
                name="region"
                value={smtpSettings.region}
                onChange={handleInputChange}
                className="mt-1 block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </>
        )}

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-6 py-3 rounded-md shadow-lg hover:bg-blue-600"
          >
            Save 
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailSettings;




