
import React, { useState } from "react";

const CurrenciesPage = () => {
  // Define the currencies state and the setCurrencies function using useState
  const [currencies, setCurrencies] = useState([
    { id: 1, currency: "AED", shortCode: "AED", symbol: "AEDf", conversionRate: "1", baseCurrency: "AED", active: false, enabled: true },
    { id: 2, currency: "AFN", shortCode: "AFN", symbol: "؋", conversionRate: "1", baseCurrency: "AFN", active: false, enabled: true },
    { id: 3, currency: "ALL", shortCode: "ALL", symbol: "ALL", conversionRate: "1", baseCurrency: "ALL", active: false, enabled: true },
    { id: 4, currency: "AMD", shortCode: "AMD", symbol: "AMD", conversionRate: "1", baseCurrency: "AMD", active: false, enabled: false },
    { id: 5, currency: "ANG", shortCode: "ANG", symbol: "ANG", conversionRate: "1", baseCurrency: "ANG", active: false, enabled: true },
    { id: 6, currency: "AOA", shortCode: "AOA", symbol: "AOA", conversionRate: "1", baseCurrency: "AOA", active: false, enabled: false },
    // Add the remaining currencies similarly...
  ]);

  // Handle toggle action for active field
  const handleActiveToggle = (id) => {
    const updatedCurrencies = currencies.map((currency) => {
      if (currency.id === id) {
        return { ...currency, active: !currency.active }; // Toggle active state
      }
      return currency;
    });
    setCurrencies(updatedCurrencies); // Update state
  };

  // Handle toggle action for enabled field
  const handleEnabledToggle = (id) => {
    const updatedCurrencies = currencies.map((currency) => {
      if (currency.id === id) {
        return { ...currency, enabled: !currency.enabled }; // Toggle enabled state
      }
      return currency;
    });
    setCurrencies(updatedCurrencies); // Update state
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 dark:bg-gray-800">
    <h2 className="text-2xl font-bold mb-4">Currency</h2>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="table-auto w-full border-collapse dark:bg-gray-700 dark:text-white">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-800">
              <th className="px-6 py-3 text-left">#</th>
              <th className="px-6 py-3 text-left">Currency</th>
              <th className="px-6 py-3 text-left">Short Code</th>
              <th className="px-6 py-3 text-left">Currency Symbol</th>
              <th className="px-6 py-3 text-left">Conversion Rate</th>
              <th className="px-6 py-3 text-left">Base Currency</th>
              <th className="px-6 py-3 text-left">Active</th>
              <th className="px-6 py-3 text-left">Enabled</th>
            </tr>
          </thead>
          <tbody>
            {currencies.map((currency) => (
              <tr key={currency.id}>
                <td className="px-6 py-3">{currency.id}</td>
                <td className="px-6 py-3">{currency.currency}</td>
                <td className="px-6 py-3">{currency.shortCode}</td>
                <td className="px-6 py-3">{currency.symbol}</td>
                <td className="px-6 py-3">{currency.conversionRate}</td>
                <td className="px-6 py-3">{currency.baseCurrency}</td>
                <td className="px-6 py-3">
                  <button
                    className={`px-3 py-1 rounded-full ${currency.active ? 'bg-green-500 text-white' : 'bg-gray-400 text-white'}`}
                    onClick={() => handleActiveToggle(currency.id)}
                  >
                    {currency.active ? "Active" : "Inactive"}
                  </button>
                </td>
                <td className="px-6 py-3">
                  <input
                    type="checkbox"
                    className="toggle toggle-success"
                    checked={currency.enabled}
                    onChange={() => handleEnabledToggle(currency.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CurrenciesPage;



