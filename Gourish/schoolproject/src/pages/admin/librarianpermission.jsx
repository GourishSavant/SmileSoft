import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Example data for teacher permissions
const teacherModules = [
    {
        module: "Student Information",
        features: ["Student", "Import Student", "Student Categories", "Student Houses", "Disable Student", "Student Timeline", "Disable Reason"],
      },
      {
        module: "Fees Collection",
        features: ["Collect Fees", "Fees Carry Forward", "Fees Master", "Fees Group", "Fees Group Assign", "Fees Type", "Fees Discount", "Fees Discount Assign", "Search Fees Payment", "Search Due Fees", "Fees Reminder", "Offline Bank Payments"],
      },
      {
        module: "Expense",
        features: ["Expense", "Expense Head", "Search Expense"],
      },
      {
        module: "Student Attendance",
        features: ["Student / Period Attendance", "Attendance By Date", "Approve Leave"],
      },
      {
        module: "Examination",
        features: ["Marks Grade", "Exam Group", "Design Admit Card", "Print Admit Card", "Design Marksheet", "Print Marksheet", "Exam Result", "Marks Import", "Exam", "Exam Publish", "Link Exam", "Assign / View student", "Exam Subject", "Exam Marks", "Marks Division", "Exam Schedule", "Generate Rank"],
      },
      {
        module: "Academics",
        features: ["Class Timetable", "Subject", "Class", "Section", "Promote Student", "Assign Class Teacher", "Teachers Timetable", "Subject Group"],
      },
      {
        module: "Library",
        features: ["Books List", "Issue Return", "Add Staff Member", "Add Student", "Import Book"],
      },
       
      {
        module: "Communicate",
        features: ["Notice Board", "Email", "Email / SMS Log", "SMS", "Schedule Email SMS Log", "Login Credentials Send", "Email Template", "SMS Template"],
      },
      {
        module: "Reports",
        features: ["Student Report", "Guardian Report", "Student History", "Student Login Credential Report", "Class Subject Report", "Admission Report", "Sibling Report", "Homework Evaluation Report", "Student Profile", "Fees Statement", "Balance Fees Report", "Fees Collection Report", "Online Fees Collection Report", "Income Report", "Expense Report", "PayRoll Report", "Income Group Report", "Expense Group Report", "Attendance Report", "Staff Attendance Report", "Transport Report", "Hostel Report", "Audit Trail Report", "User Log", "Book Issue Report", "Book Due Report", "Book Inventory Report", "Stock Report", "Add Item Report", "Issue Item Report", "Student Attendance Type Report", "Exam Marks Report", "Online Exam Wise Report", "Online Exams Report", "Online Exams Attempt Report", "Online Exams Rank Report", "Staff Report", "Student / Period Attendance Report", "Biometric Attendance Log", "Book Issue Return Report", "Rank Report", "Syllabus Status Report", "Teacher Syllabus Status Report", "Alumni Report", "Student Gender Ratio Report", "Student Teacher Ratio Report", "Daily Attendance Report", "Balance Fees Report With Remark", "Balance Fees Statement", "Daily Collection Report"],
      },
      {
        module: "System Settings",
        features: ["Languages", "General Setting", "Session Setting", "Notification Setting", "SMS Setting", "Email Setting", "Front CMS Setting", "Payment Methods", "User Status", "Backup", "Restore", "Language Switcher", "Custom Fields", "System Fields", "Print Header Footer", "Student Profile Update", "Sidebar Menu", "Currency", "Currency Switcher"],
      },
      {
        module: "Front CMS",
        features: ["Menus", "Media Manager", "Banner Images", "Pages", "Gallery", "Event", "News"],
      },
  {
    module: "Front Office",
    features: [
      "Admission Enquiry",
      "Follow Up Admission Enquiry",
      "Visitor Book",
      "Phone Call Log",
      "Postal Dispatch",
      "Postal Receive",
      "Complain",
      "Setup Front Office"
    ]
  },
  {
    module: "Human Resource",
    features: [
      "Staff",
      "Disable Staff",
      "Staff Attendance",
      "Staff Payroll",
      "Approve Leave Request",
      "Apply Leave",
      "Leave Types",
      "Department",
      "Designation",
      "Can See Other Users Profile",
      "Staff Timeline",
      "Teachers Rating"
    ]
  },
  {
    module: "Homework",
    features: [
      "Homework",
      "Homework Evaluation",
      "Daily Assignment"
    ]
  },
  {
    module: "Certificate",
    features: [
      "Student Certificate",
      "Generate Certificate",
      "Student ID Card",
      "Generate ID Card",
      "Staff ID Card",
      "Generate Staff ID Card"
    ]
  },
  {
    module: "Calendar To Do List",
    features: [
      "Calendar To Do List"
    ]
  },
  {
    module: "Dashboard and Widgets",
    features: [
      "Quick Session Change",
      "Fees Collection And Expense Monthly Chart",
      "Fees Collection And Expense Yearly Chart",
      "Monthly Fees Collection Widget",
      "Monthly Expense Widget",
      "Student Count Widget",
      "Staff Role Count Widget",
      "Fees Awaiting Payment Widgets",
      "Converted Leads Widgets",
      "Fees Overview Widgets",
      "Enquiry Overview Widgets",
      "Library Overview Widgets",
      "Student Today Attendance Widgets",
      "Income Donut Graph",
      "Expense Donut Graph",
      "Staff Present Today Widgets",
      "Student Present Today Widgets"
    ]
  },
  {
    module: "Student Information",
    features: ["View", "Edit"],
  },
  {
    module: "Examination",
    features: ["View Results", "Assign Marks"],
  },
  {
    module: "Academics",
    features: ["View Timetable", "Assign Homework"],
  },
  {
    module: "Homework",
    features: ["Create Assignment", "Grade Homework"],
  },
  {
    module: "Online Examination",
    features: [
      "Online Examination",
      "Question Bank",
      "Add Questions in Exam",
      "Assign / View Student",
      "Import Question"
    ]
  },
  {
    module: "Chat",
    features: [
      "Chat"
    ]
  },
  {
    module: "Multi Class",
    features: [
      "Multi Class Student"
    ]
  },
  {
    module: "Online Admission",
    features: [
      "Online Admission"
    ]
  },
  {
    module: "Alumni",
    features: [
      "Manage Alumni"
    ]
  },
  {
    module: "Events",
    features: [
      "Events"
    ]
  },
  {
    module: "Lesson Plan",
    features: [
      "Manage Lesson Plan",
      "Manage Syllabus Status",
      "Lesson",
      "Topic",
      "Comments",
      "Copy Old Lessons"
    ]
  },

];

const TeacherPermission = () => {
  const { roleName } = useParams(); // Retrieve role name from URL
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    // Example logic to set permissions for teacher role
    if (roleName === "Librarian") {
      setPermissions([
        "View Timetable",
        "Assign Homework",
        "View Results",
        "Assign Marks",
        "Create Assignment",
        "Grade Homework",
      ]);
    } else {
      setPermissions([]);
    }
  }, [roleName]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{roleName} Assign Permissions(Librarian)</h1>
      <div className="overflow-x-auto max-h-[500px] overflow-y-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200 sticky top-0 z-10">
              <th className="border border-gray-300 px-4 py-2">Module</th>
              <th className="border border-gray-300 px-4 py-2">Feature</th>
              <th className="border border-gray-300 px-4 py-2">View</th>
              <th className="border border-gray-300 px-4 py-2">Add</th>
              <th className="border border-gray-300 px-4 py-2">Edit</th>
              <th className="border border-gray-300 px-4 py-2">Delete</th>
            </tr>
          </thead>
          <tbody>
            {teacherModules.map((module, moduleIndex) =>
              module.features.map((feature, featureIndex) => (
                <tr key={`${moduleIndex}-${featureIndex}`} className="odd:bg-gray-100">
                  {featureIndex === 0 && (
                    <td
                      className="border border-gray-300 px-4 py-2 font-bold"
                      rowSpan={module.features.length}
                    >
                      {module.module}
                    </td>
                  )}
                  <td className="border border-gray-300 px-4 py-2">{feature}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <input type="checkbox" className="w-4 h-4" />
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <input type="checkbox" className="w-4 h-4" />
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <input type="checkbox" className="w-4 h-4" />
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <input type="checkbox" className="w-4 h-4" />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-end">
        <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          Save Permissions
        </button>
      </div>
    </div>
  );
};

export default TeacherPermission;
