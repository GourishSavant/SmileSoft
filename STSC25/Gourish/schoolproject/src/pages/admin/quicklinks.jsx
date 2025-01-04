// import React from "react";
// import { Link } from "react-router-dom";
// import {
//   FaClipboardList,
//   FaHome,
//   FaUserAlt,
//   FaBook,
//   FaFileInvoice,
//   FaCog,
//   FaAngleDoubleRight, // Added arrow icon
// } from "react-icons/fa";

// const QuickLinksPage = () => {
//   const menuSections = [
//     {
//       title: "Academics",
//       icon: <FaBook className="text-blue-500" />, // Section icon
//       links: [
//         "Class Timetable",
//         "Assign Class Teacher",
//         "Teachers Timetable",
//         "Promote Students",
//         "Subject Group",
//         "Subjects",
//         "Class",
//         "Sections",
//       ],
//     },
//     {
//       title: "Download Center",
//       icon: <FaFileInvoice className="text-green-500" />,
//       links: ["Content Type", "Content Share List", "Upload/Share Content", "Video Tutorial"],
//     },
//     {
//       title: "Front Office",
//       icon: <FaClipboardList className="text-orange-500" />,
//       links: [
//         "admission-enquiry",
//         "visitor-book",
//         "phone-calllog",
//         "postal-dispatch",
//         "postal-receive",
//         "complaint",
//         "setup-frontoffice",
//       ],
//     },
//     {
//       title: "Inventory",
//       icon: <FaHome className="text-purple-500" />,
//       links: ["Issue Item", "Add Item Stock", "Add Item", "Item Category", "Item Store", "Item Supplier"],
//     },
//     {
//       title: "Examinations",
//       icon: <FaFileInvoice className="text-red-500" />,
//       links: [
//         "Exam Group",
//         "Exam Schedule",
//         "Exam Result",
//         "Design Admit Card",
//         "Print Admit Card",
//         "Design Marksheet",
//         "Print Marksheet",
//         "Marks Grade",
//         "Marks Division",
//       ],
//     },
//     {
//       title: "Student Information",
//       icon: <FaUserAlt className="text-indigo-500" />,
//       links: [
//         "Student Details",
//         "Student Admission",
//         "Online Admission",
//         "Disabled Students",
//         "Multi Class Student",
//         "Bulk Delete",
//         "Student Categories",
//         "Student House",
//         "Disable Reason",
//       ],
//     },
//     {
//       title: "System Setting",
//       icon: <FaCog className="text-yellow-500" />,
//       links: [
//         "Session Setting",
//         "Notification Setting",
//         "SMS Setting",
//         "Email Setting",
//         "Payment Methods",
//         "General Setting",
//         "Print Header Footer",
//         "Roles Permissions",
//         "Languages",
//         "Backup Restore",
//       ],
//     },
//   ];

//   return (
//     <div className="p-4 bg-gray-50 min-h-screen dark:bg-gray-800 dark:text-white">
//       <h1 className="text-2xl font-bold text-center mb-6">Quick Links</h1>

//       {/* Grid Layout for Table-Like Structure */}
//       <div className="grid grid-cols-6 gap-4 text-sm">
//         {menuSections.map((section, index) => (
//           <div key={index} className="space-y-2">
//             {/* Section Header with Icon */}
//             <h2 className="text-gray-800 dark:bg-gray-800 dark:text-white font-bold text-base flex items-center space-x-2">
//               {section.icon}
//               <span>{section.title}</span>
//             </h2>

//             {/* Links with Arrow Icons */}
//             <ul className="space-y-1">
//               {section.links.map((link, linkIndex) => (
//                 <li key={linkIndex} className="flex items-center">
//                   <FaAngleDoubleRight className="text-gray-400 mr-2 dark:bg-gray-800 dark:text-white" />
//                   <Link
//                     to={`/${link.toLowerCase().replace(/ /g, "-")}`}
//                     className="text-gray-600 dark:bg-gray-800 dark:text-white hover:text-blue-500"
//                   >
//                     {link}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default QuickLinksPage;

import React from "react";
import { Link } from "react-router-dom";
import {
  FaClipboardList,
  FaHome,
  FaUserAlt,
  FaBook,
  FaFileInvoice,
  FaCog,
  FaAngleDoubleRight, // Added arrow icon
} from "react-icons/fa";

const QuickLinksPage = () => {
  const menuSections = [
    {
      title: "Academics",
      icon: <FaBook className="text-blue-500" />, // Section icon
      links: [
        "Class Timetable",
        "Assign Class Teacher",
        "Teachers Timetable",
        "Promote Students",
        "Subject Group",
        "Subjects",
        "Class",
        "Sections",
      ],
    },
    {
      title: "Download Center",
      icon: <FaFileInvoice className="text-green-500" />,
      links: ["Content Type", "Content Share List", "Upload/Share Content", "Video Tutorial"],
    },
    {
      title: "Front Office",
      icon: <FaClipboardList className="text-orange-500" />,
      links: [
        "admission-enquiry",
        "visitor-books",
        "phone-call",
        "postal-dispatch",
        "postal-receive",
        "complaint",
        "setup-frontoffice",
      ],
    },
    {
      title: "Inventory",
      icon: <FaHome className="text-purple-500" />,
      links: ["Issue Item", "Add Item Stock", "Add Item", "Item Category", "Item Store", "Item Supplier"],
    },
    {
      title: "Examinations",
      icon: <FaFileInvoice className="text-red-500" />,
      links: [
        "exam-group",
        "exam-schedule",
        "exam-result",
        "design-admitard",
        "print-admitcard",
        "design-marksheet",
        "print-marksheet",
        "marks-grade",
        "Marks Division",
      ],
    },
    {
      title: "Student Information",
      icon: <FaUserAlt className="text-indigo-500" />,
      links: [
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
    },
    {
      title: "System Setting",
      icon: <FaCog className="text-yellow-500" />,
      links: [
        "session-settings",
        "Notification Setting",
        "SMS Setting",
        "Email Setting",
        "Payment Methods",
        "General Setting",
        "Print Header Footer",
        "Roles Permissions",
        "Languages",
        "Backup Restore",
      ],
    },
  ];

  return (
    <div className="p-4 bg-gray-50 min-h-screen dark:bg-gray-800 dark:text-white">
      <h1 className="text-2xl font-bold text-center mb-6">Quick Links</h1>

      {/* Grid Layout for Table-Like Structure */}
      <div className="grid grid-cols-6 gap-4 text-sm">
        {menuSections.map((section, index) => (
          <div key={index} className="space-y-2">
            {/* Section Header with Icon */}
            <h2 className="text-gray-800 dark:bg-gray-800 dark:text-white font-bold text-base flex items-center space-x-2">
              {section.icon}
              <span>{section.title}</span>
            </h2>

            {/* Links with Arrow Icons */}
            <ul className="space-y-1">
              {section.links.map((link, linkIndex) => (
                <li key={linkIndex} className="flex items-center">
                  <FaAngleDoubleRight className="text-gray-400 mr-2 dark:bg-gray-800 dark:text-white" />
                  <Link
                    to={`/admin/${link.toLowerCase().replace(/ /g, "-")}`} // Prefixed with /admin/
                    className="text-gray-600 dark:bg-gray-800 dark:text-white hover:text-blue-500"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickLinksPage;
