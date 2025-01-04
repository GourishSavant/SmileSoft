
import React, { useState } from 'react';

const SmsSettings = () => {
  const [activeTab, setActiveTab] = useState('Clickatell');

  const smsGateways = [
    'Clickatell Sms Gateway',
    'Twilio SMS Gateway',
    'MSG91',
    'Text Local',
    'SMS Country',
    'Bulk SMS',
    'Mobi Reach',
    'Nexmo',
    'AfricasTalking',
    'SMS Egypt',
    'Custom SMS Gateway',
  ];

  const gatewayDetails = {
    'Clickatell Sms Gateway': (
      <div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Clickatell Username*
          </label>
          <input type="text" className="w-full p-2 border border-gray-300 rounded" placeholder="Enter Username" />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Clickatell Password*
          </label>
          <input type="password" className="w-full p-2 border border-gray-300 rounded" placeholder="Enter Password" />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Api Key*
          </label>
          <input type="text" className="w-full p-2 border border-gray-300 rounded" placeholder="Enter API Key" />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Status*
          </label>
          <select className="w-full p-2 border border-gray-300 rounded">
            <option value="">Select</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <div className="flex justify-between items-center mt-4">
          <a href="https://www.clickatell.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
            https://www.clickatell.com
          </a>
          <button className="bg-black text-white px-4 py-2 rounded">Save</button>
        </div>
      </div>
    ),
    'Twilio SMS Gateway': (
      <div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Twilio Account SID*
          </label>
          <input type="text" className="w-full p-2 border border-gray-300 rounded" placeholder="Enter Account SID" />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Authentication Token*
          </label>
          <input type="password" className="w-full p-2 border border-gray-300 rounded" placeholder="Enter Authentication Token" />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Registered Phone Number*
          </label>
          <input type="text" className="w-full p-2 border border-gray-300 rounded" placeholder="Enter Phone Number" />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Status*
          </label>
          <select className="w-full p-2 border border-gray-300 rounded">
            <option value="">Select</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <div className="flex justify-between items-center mt-4">
          <a href="https://www.twilio.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
            https://www.twilio.com
          </a>
          <button className="bg-black text-white px-4 py-2 rounded">Save</button>
        </div>
      </div>
    ),
    'MSG91': (
      <div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Auth Key*
          </label>
          <input type="text" className="w-full p-2 border border-gray-300 rounded" placeholder="Enter Auth Key" />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Sender ID*
          </label>
          <input type="text" className="w-full p-2 border border-gray-300 rounded" placeholder="Enter Sender ID" />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Status*
          </label>
          <select className="w-full p-2 border border-gray-300 rounded">
            <option value="">Select</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <div className="flex justify-between items-center mt-4">
          <a href="https://msg91.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
            https://msg91.com
          </a>
          <button className="bg-black text-white px-4 py-2 rounded">Save</button>
        </div>
      </div>
    ),
    'Text Local': (
      <div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Username
          </label>
          <input type="text" className="w-full p-2 border border-gray-300 rounded" placeholder="Enter Username" />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Hashkey
          </label>
          <input type="text" className="w-full p-2 border border-gray-300 rounded" placeholder="Enter Hashkey" />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Sender ID
          </label>
          <input type="text" className="w-full p-2 border border-gray-300 rounded" placeholder="Enter Sender ID" />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Status*
          </label>
          <select className="w-full p-2 border border-gray-300 rounded">
            <option value="">Select</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <div className="flex justify-between items-center mt-4">
          <a href="https://www.textlocal.in" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
            https://www.textlocal.in
          </a>
          <button className="bg-black text-white px-4 py-2 rounded">Save</button>
        </div>
      </div>
    ),
    'SMS Country': (
      <div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Username*
          </label>
          <input type="text" className="w-full p-2 border border-gray-300 rounded" placeholder="Enter Username" />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Auth Key*
          </label>
          <input type="text" className="w-full p-2 border border-gray-300 rounded" placeholder="Enter Auth Key" />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Authentication Token*
          </label>
          <input type="text" className="w-full p-2 border border-gray-300 rounded" placeholder="Enter Authentication Token" />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Sender ID*
          </label>
          <input type="text" className="w-full p-2 border border-gray-300 rounded" placeholder="Enter Sender ID" />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Password*
          </label>
          <input type="password" className="w-full p-2 border border-gray-300 rounded" placeholder="Enter Password" />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Status*
          </label>
          <select className="w-full p-2 border border-gray-300 rounded">
            <option value="">Select</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <div className="flex justify-between items-center mt-4">
          <a href="https://www.smscountry.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
            https://www.smscountry.com
          </a>
          <button className="bg-black text-white px-4 py-2 rounded">Save</button>
        </div>
      </div>
    ),
    'Bulk SMS': (
      <div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Username*
          </label>
          <input type="text" className="w-full p-2 border border-gray-300 rounded" placeholder="Enter Username" />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Password*
          </label>
          <input type="password" className="w-full p-2 border border-gray-300 rounded" placeholder="Enter Password" />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Status*
          </label>
          <select className="w-full p-2 border border-gray-300 rounded">
            <option value="">Select</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <div className="flex justify-between items-center mt-4">
          <a href="https://www.bulksms.com/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
            https://www.bulksms.com/
          </a>
          <button className="bg-black text-white px-4 py-2 rounded">Save</button>
        </div>
      </div>
    ),
    'Mobi Reach': (
      <div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Auth Key*
          </label>
          <input type="text" className="w-full p-2 border border-gray-300 rounded" placeholder="Enter Auth Key" />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Sender ID*
          </label>
          <input type="text" className="w-full p-2 border border-gray-300 rounded" placeholder="Enter Sender ID" />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Route ID*
          </label>
          <input type="text" className="w-full p-2 border border-gray-300 rounded" placeholder="Enter Route ID" />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Status*
          </label>
          <select className="w-full p-2 border border-gray-300 rounded">
            <option value="">Select</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <div className="flex justify-between items-center mt-4">
          <a href="https://user.mobireach.com.bd/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
            https://user.mobireach.com.bd/
          </a>
          <button className="bg-black text-white px-4 py-2 rounded">Save</button>
        </div>
      </div>
    ),
    'Nexmo': (
      <div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Nexmo Api Key*
          </label>
          <input type="text" className="w-full p-2 border border-gray-300 rounded" placeholder="Enter Nexmo Api Key" />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Nexmo Api Secret*
          </label>
          <input type="text" className="w-full p-2 border border-gray-300 rounded" placeholder="Enter Nexmo Api Secret" />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Registered / From Number*
          </label>
          <input type="text" className="w-full p-2 border border-gray-300 rounded" placeholder="Enter Registered / From Number" />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Status*
          </label>
          <select className="w-full p-2 border border-gray-300 rounded">
            <option value="">Select</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <div className="flex justify-between items-center mt-4">
          <a href="https://dashboard.nexmo.com/sign-up" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
            https://dashboard.nexmo.com/sign-up
          </a>
          <button className="bg-black text-white px-4 py-2 rounded">Save</button>
        </div>
      </div>
    ),
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">SMS Setting</h1>

      <div className="grid grid-cols-6 gap-4 border-b border-gray-300 mb-6">
        {smsGateways.map((gateway) => (
          <button
            key={gateway}
            className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 hover:text-yellow-500 text-left truncate ${
              activeTab === gateway
                ? 'border-yellow-500 text-yellow-500'
                : 'border-transparent text-gray-600'
            }`}
            onClick={() => setActiveTab(gateway)}
          >
            {gateway}
          </button>
        ))}
      </div>

      <div className="bg-white p-6 shadow rounded">
        {gatewayDetails[activeTab] || <p>No settings available for {activeTab}.</p>}
      </div>
    </div>
  );
};

export default SmsSettings;



