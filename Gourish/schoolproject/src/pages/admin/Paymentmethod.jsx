

import React, { useState } from 'react';

const PaymentMethods = () => {
  const [selectedMethod, setSelectedMethod] = useState(null);

  const paymentMethods = [
    'Paypal', 'Stripe', 'PayU', 'CCAvenue', 'InstaMojo', 'Paystack', 'Razorpay',
    'Paytm', 'Midtrans', 'Pesapal', 'Flutter Wave', 'iPay Africa', 'JazzCash',
    'Billplz', 'SSLCommerz', 'Walkingm', 'Mollie', 'Cashfree', 'Payfast',
    'ToyyibPay', 'Twocheckout', 'Skrill', 'Payhere', 'Onepay',
  ];

  const paymentSettings = {
    Paypal: (
      <div className="mt-4 p-4 border-t flex justify-between items-start">
        <div className="w-3/4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Paypal Username*</label>
            <input
              type="text"
              placeholder="Enter Paypal username"
              className="px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Paypal Password*</label>
            <input
              type="password"
              placeholder="Enter Paypal password"
              className="px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Paypal Signature*</label>
            <input
              type="text"
              placeholder="Enter Paypal signature"
              className="px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
            />
          </div>
          <div className="w-1/2 mt-4">
          <button className=" bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300">
            Save 
          </button>
        </div>
        </div>
        <div className="ml-auto self-start">
          <a
            href="https://www.paypal.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 hover:underline"
          >
            Multinational Payment Gateway
          </a>
        </div>
      </div>
    ),
    Stripe: (
      <div className="mt-4 p-4 border-t flex justify-between items-start">
        <div className="w-3/4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Stripe API Secret Key*</label>
            <input
              type="text"
              placeholder="Enter Stripe API Secret Key"
              className="px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Stripe Publishable Key*</label>
            <input
              type="text"
              placeholder="Enter Stripe Publishable Key"
              className="px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
            />
          </div>
          <div className="w-1/2 mt-4">
          <button className=" bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300">
            Save 
          </button>
        </div>
        </div>
        <div className="ml-auto self-start">
          <a
            href="https://stripe.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 hover:underline"
          >
            Multinational Payment Gateway
          </a>
        </div>
      </div>
    ),
    PayU: (
      <div className="mt-4 p-4 border-t flex justify-between items-start">
        <div className="w-3/4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">PayU Money Key*</label>
            <input
              type="text"
              placeholder="Enter PayU Money Key"
              className="px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">PayU Money Salt*</label>
            <input
              type="text"
              placeholder="Enter PayU Money Salt"
              className="px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
            />
          </div>
          <div className="w-1/2 mt-4">
          <button className=" bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300">
            Save 
          </button>
        </div>
        </div>
        <div className="ml-auto self-start">
          <a
            href="https://www.payumoney.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 hover:underline"
          >
            Payment Gateway For India
          </a>
        </div>
      </div>
    ),
    CCAvenue: (
      <div className="mt-4 p-4 border-t flex justify-between items-start">
        <div className="w-3/4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">CCAvenue Merchant ID*</label>
            <input
              type="text"
              placeholder="Enter Merchant ID"
              className="px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">CCAvenue Working Key*</label>
            <input
              type="text"
              placeholder="Enter Working Key"
              className="px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Access Code*</label>
            <input
              type="text"
              placeholder="Enter Access Code"
              className="px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
            />
          </div>
          <div className="w-1/2 mt-4">
          <button className=" bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300">
            Save 
          </button>
        </div>
        </div>
        <div className="ml-auto self-start">
          <a
            href="https://www.ccavenue.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 hover:underline"
          >
            Payment Gateway For India
          </a>
        </div>
      </div>
    ),
    InstaMojo: (
      <div className="mt-4 p-4 border-t flex justify-between items-start">
        <div className="w-3/4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Private API Key*</label>
            <input
              type="text"
              placeholder="Enter Private API Key"
              className="px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Private Auth Token*</label>
            <input
              type="text"
              placeholder="Enter Private Auth Token"
              className="px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Private Salt*</label>
            <input
              type="text"
              placeholder="Enter Private Salt"
              className="px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
            />
          </div>
          <div className="w-1/2 mt-4">
          <button className=" bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300">
            Save 
          </button>
        </div>
        </div>
        <div className="ml-auto self-start">
          <a
            href="https://www.instamojo.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 hover:underline"
          >
            Payment Gateway For India
          </a>
        </div>
        
      </div>
    ),
    Razorpay: (
      <div className="mt-4 p-4 border-t flex justify-between items-start">
        <div className="w-3/4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Razorpay Key ID*</label>
            <input
              type="text"
              placeholder="Enter Razorpay Key ID"
              className="px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Razorpay Key Secret*</label>
            <input
              type="text"
              placeholder="Enter Razorpay Key Secret"
              className="px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
            />
          </div>
          <div className="w-1/2 mt-4">
          <button className=" bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300">
            Save 
          </button>
        </div>
        </div>
        <div className="ml-auto self-start">
          <a
            href="https://razorpay.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 hover:underline"
          >
            Payment Gateway For India
          </a>
          
        </div>
      </div>
    ),
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <div className="w-3/4 bg-white shadow-md p-6 mt-4 mr-2 ml-4 mb-4">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Payment Methods</h2>
        <div className="flex flex-wrap gap-1">
          {paymentMethods.map((method) => (
            <button
              key={method}
              onClick={() => setSelectedMethod(method)}
              className={`px-4 py-2 rounded-md shadow-sm ${
                selectedMethod === method ? 'bg-indigo-500 text-white' : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {method}
            </button>
          ))}
        </div>
        {selectedMethod && (
          <div>
            <h3 className="text-lg font-bold text-gray-800 mt-6">{selectedMethod} Settings</h3>
            {paymentSettings[selectedMethod] || <p className="mt-4 text-gray-600">Settings not available for this method.</p>}
          </div>
        )}
      </div>

      <div className="w-1/4 bg-white shadow-md p-6 ml-3 mt-4 mb-4 mr-4">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Select Payment Gateway</h2>
        <div className="space-y-4">
          {paymentMethods.map((method) => (
            <label key={method} className="flex items-center space-x-3">
              <input
                type="checkbox"
                className="w-5 h-5 rounded-full border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-gray-800">{method}</span>
            </label>
          ))}
        </div>
        <div className="mt-6">
          <button className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethods;




