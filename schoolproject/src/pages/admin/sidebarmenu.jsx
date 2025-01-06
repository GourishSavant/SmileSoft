

import React, { useState } from "react";
import { FiMove } from "react-icons/fi";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const App = () => {
  const menuItems = [
    "Front Office",
    "Student Information",
    "Fees Collection",
    "Income",
    "Expenses",
    "Examinations",
    "Attendance",
    "Online Examinations",
    "Academics",
    "Lesson Plan",
    "Human Resource",
    "Communicate",
    "Download Center",
    "Homework",
    "Library",
    "Inventory",
    "Transport",
    "Hostel",
    "Certificate",
    "Front CMS",
    "Alumni",
    "Reports",
    "System Setting",
  ];

  const initialSubMenus = {
    "Front Office": [
      "Admission Enquiry",
      "Visitor Book",
      "Phone Call Log",
      "Postal Dispatch",
      "Postal Receive",
      "Complain",
      "Setup Front Office",
    ],
    "Student Information": [
      "Student Details",
      "Student Admission",
      "Online Admission",
      "Disabled Students",
      "Multi Class Student",
      "Bulk Delete",
      "Student Categories",
      "Student House",
      "Disable Reason",
    ],
    "Fees Collection": [
      "Collect Fees",
      "Offline Bank Payments",
      "Search Fees Payment",
      "Search Due Fees",
      "Fees Master",
      "Fees Group",
      "Fees Type",
      "Fees Discount",
      "Fees Carry Forward",
      "Fees Reminder",
    ],
    Income: ["Add Income", "Search Income", "Income Head"],
  };

  const [activeMenu, setActiveMenu] = useState(null);
  const [subMenus, setSubMenus] = useState(initialSubMenus);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    const menu = activeMenu;
    const items = Array.from(subMenus[menu]);

    const [reorderedItem] = items.splice(source.index, 1);
    items.splice(destination.index, 0, reorderedItem);

    setSubMenus((prev) => ({ ...prev, [menu]: items }));
  };

  return (
    <div className="flex h-screen bg-white dark:bg-gray-800 dark:text-white">
      {/* Left Section */}
      <div className="flex-1 p-2">
        <div className="bg-white border border-gray-200 rounded-lg p-6 dark:bg-gray-800 dark:border-gray-700">
          <h2 className="text-2xl font-bold mb-6">Menu List</h2>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-1/2 bg-white p-4 shadow-md dark:bg-gray-800 dark:border-gray-700">
        <h2 className="text-lg font-semibold mb-4">Selected Sidebar Menus</h2>
        <ul className="space-y-2">
          {menuItems.map((menu, index) => (
            <li key={index}>
              <button
                onClick={() => setActiveMenu(activeMenu === menu ? null : menu)}
                className="w-full text-left px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md shadow-md dark:bg-gray-700 dark:hover:bg-gray-600"
              >
                {menu}
              </button>
              {activeMenu === menu && subMenus[menu] && (
                <DragDropContext onDragEnd={handleDragEnd}>
                  <Droppable droppableId={menu}>
                    {(provided) => (
                      <ul
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="pl-6 mt-2 space-y-1"
                      >
                        {subMenus[menu].map((subMenu, subIndex) => (
                          <Draggable
                            key={subMenu}
                            draggableId={subMenu}
                            index={subIndex}
                          >
                            {(provided) => (
                              <li
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="text-sm flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-md shadow-sm dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                              >
                                <FiMove className="text-gray-500 dark:text-gray-400" />
                                <span>{subMenu}</span>
                              </li>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </ul>
                    )}
                  </Droppable>
                </DragDropContext>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;










