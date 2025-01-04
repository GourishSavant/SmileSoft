
import React, { useState } from "react";
import {
    FaFilePdf,
    FaFileWord,
    FaFileExcel,
    FaCopy,
    FaPrint,
    FaColumns,
} from "react-icons/fa";

const CaptchaSettings = () => {
    const [settings, setSettings] = useState({
        userLogin: false,
        login: false,
        admission: false,
        complain: false,
        contactUs: false,
    });

    const [searchTerm, setSearchTerm] = useState("");
    const [showColumnOptions, setShowColumnOptions] = useState(false);

    // State to manage column visibility
    const [visibleColumns, setVisibleColumns] = useState({
        name: true,
        action: true,
    });

    const handleToggle = (key) => {
        setSettings((prevSettings) => ({
            ...prevSettings,
            [key]: !prevSettings[key],
        }));
    };

    const toggleColumnVisibility = (column) => {
        setVisibleColumns((prevColumns) => ({
            ...prevColumns,
            [column]: !prevColumns[column],
        }));
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-2xl font-bold mb-6">Captcha Settings</h1>
            <div className="flex items-center mb-4 justify-between">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="p-2 w-1/2 rounded-md border focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
                <div className="flex space-x-3">
                    <FaFilePdf className="cursor-pointer text-red-600" size={24} />
                    <FaFileWord className="cursor-pointer text-blue-600" size={24} />
                    <FaFileExcel className="cursor-pointer text-green-600" size={24} />
                    <FaCopy className="cursor-pointer text-gray-600" size={24} />
                    <FaPrint className="cursor-pointer text-black" size={24} />
                    <FaColumns
                        className="cursor-pointer text-gray-500 hover:text-gray-700"
                        title="Columns View"
                        size={20}
                        onClick={() => setShowColumnOptions(!showColumnOptions)}
                    />
                </div>
            </div>

            {showColumnOptions && (
                <div className="absolute right-0 mt-2 rounded-lg shadow-md bg-gray-100 dark:bg-gray-700 p-4 w-full sm:w-64">
                    <h2 className="text-lg font-semibold mb-2">Select Columns to Show</h2>
                    <div className="flex flex-col space-y-2">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={visibleColumns.name}
                                onChange={() => toggleColumnVisibility("name")}
                                className="mr-2"
                            />
                            Name
                        </label>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={visibleColumns.action}
                                onChange={() => toggleColumnVisibility("action")}
                                className="mr-2"
                            />
                            Action
                        </label>
                    </div>
                </div>
            )}

            <div className="overflow-x-auto">
                <table className="table-auto w-full bg-white border border-gray-200 rounded shadow">
                    <thead>
                        <tr className="bg-gray-50">
                            {visibleColumns.name && (
                                <th className="px-4 py-2 border-b flex justify-left">Name</th>
                            )}
                            {visibleColumns.action && (
                                <th className="px-4 py-2 border-b text-end">Action</th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(settings).map((key) => (
                            <tr key={key} className="text-end">
                                {visibleColumns.name && (
                                    <td className="px-4 py-2 border-b capitalize text-left">
                                        {key.replace(/([A-Z])/g, " $1").trim()}
                                    </td>
                                )}
                                {visibleColumns.action && (
                                    <td className="px-4 py-2 border-b">
                                        <input
                                            type="checkbox"
                                            className="toggle toggle-success"
                                            checked={settings[key]}
                                            onChange={() => handleToggle(key)}
                                        />
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CaptchaSettings;



