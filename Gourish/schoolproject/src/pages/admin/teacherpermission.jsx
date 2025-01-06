import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Example data for teacher permissions
const saveFeatures = [];
const teacherModules = [

    {
        module: "Student Information",
        moduleId: 1,
        features: [
            {
                featureId: "100",
                featureName: "Student",
                //isChecked: false
                permissions: [
                    {
                        name: "View",
                        isChecked: false
                    },
                    {
                        name: "Add",
                        isChecked: false
                    },
                    {
                        name: "Edit",
                        isChecked: false
                    },
                    {
                        name: "Delete",
                        isChecked: false
                    },

                ]
            },
            {
                featureId: "101",
                featureName: "Import Student",
                permissions: [
                    {
                        name: "View",
                        isChecked: false
                    },
                    {
                        name: "Add",
                        isChecked: false
                    },
                    {
                        name: "Edit",
                        isChecked: false
                    },
                    {
                        name: "Delete",
                        isChecked: false
                    },

                ]

            },
            {
                featureId: "102",
                featureName: "Student Categories",
                permissions: [
                    {
                        name: "View",
                        isChecked: false
                    },
                    {
                        name: "Add",
                        isChecked: false
                    },
                    {
                        name: "Edit",
                        isChecked: false
                    },
                    {
                        name: "Delete",
                        isChecked: false
                    },

                ]

            },
            {
                featureId: "103",
                featureName: "Student Houses",
                permissions: [
                    {
                        name: "View",
                        isChecked: false
                    },
                    {
                        name: "Add",
                        isChecked: false
                    },
                    {
                        name: "Edit",
                        isChecked: false
                    },
                    {
                        name: "Delete",
                        isChecked: false
                    },

                ]

            },
            {
                featureId: "104",
                featureName: "Disable Student",
                permissions: [
                    {
                        name: "View",
                        isChecked: false
                    },
                    {
                        name: "Add",
                        isChecked: false
                    },
                    {
                        name: "Edit",
                        isChecked: false
                    },
                    {
                        name: "Delete",
                        isChecked: false
                    },

                ]
            },
            {
                featureId: "105",
                featureName: "Student Timeline",
                isChecked: false
            },
            {
                featureId: "106",
                featureName: "Disable Reason",
                isChecked: false
            }
        ]
    },

    {
        module: "Fees Collection",
        moduleId: 2,
        features: [
            {
                featureId: "200",
                featureName: "Collect Fees",
                isChecked: false
            },
            {
                featureId: "201",
                featureName: "Fees Carry Forward",
                isChecked: false
            },
            {
                featureId: "202",
                featureName: "Fees Master",
                isChecked: false
            },
            {
                featureId: "203",
                featureName: "Fees Group",
                isChecked: false
            },
            {
                featureId: "204",
                featureName: "Fees Group Assign",
                isChecked: false
            },
            {
                featureId: "205",
                featureName: "Fees Type",
                isChecked: false
            },
            {
                featureId: "206",
                featureName: "Fees Discount",
                isChecked: false
            },
            {
                featureId: "207",
                featureName: "Fees Discount Assign",
                isChecked: false
            },
            {
                featureId: "208",
                featureName: "Search Fees Payment",
                isChecked: false
            },
            {
                featureId: "209",
                featureName: "Search Due Fees",
                isChecked: false
            },
            {
                featureId: "210",
                featureName: "Fees Reminder",
                isChecked: false
            },
            {
                featureId: "211",
                featureName: "Offline Bank Payments",
                isChecked: false
            }
        ]
    },

    {
        module: "Expense",
        moduleId: 3,
        features: [
            {
                featureId: "300",
                featureName: "Expense",
                isChecked: false,
            },
            {
                featureId: "301",
                featureName: "Expense Head",
                isChecked: false,
            },
            {
                featureId: "302",
                featureName: "Search Expense",
                isChecked: false,
            }
        ]
    },
    {
        module: "Student Attendance",
        moduleId: 4,
        features: [
            {
                featureId: "400",
                featureName: "Student / Period Attendance",
                isChecked: false,
            },
            {
                featureId: "401",
                featureName: "Attendance By Date",
                isChecked: false,
            },
            {
                featureId: "402",
                featureName: "Approve Leave",
                isChecked: false,
            }
        ]
    },

    {
        module: "Examination",
        moduleId: 5,
        features: [
            {
                featureId: "500",
                featureName: "Marks Grade",
                isChecked: false,
            },
            {
                featureId: "501",
                featureName: "Exam Group",
                isChecked: false,
            },
            {
                featureId: "502",
                featureName: "Design Admit Card",
                isChecked: false,
            },
            {
                featureId: "503",
                featureName: "Print Admit Card",
                isChecked: false,
            },
            {
                featureId: "504",
                featureName: "Design Marksheet",
                isChecked: false,
            },
            {
                featureId: "505",
                featureName: "Print Marksheet",
                isChecked: false,
            },
            {
                featureId: "506",
                featureName: "Exam Result",
                isChecked: false,
            },
            {
                featureId: "507",
                featureName: "Marks Import",
                isChecked: false,
            },
            {
                featureId: "508",
                featureName: "Exam",
                isChecked: false,
            },
            {
                featureId: "509",
                featureName: "Exam Publish",
                isChecked: false,
            },
            {
                featureId: "510",
                featureName: "Link Exam",
                isChecked: false,
            },
            {
                featureId: "511",
                featureName: "Assign / View student",
                isChecked: false,
            },
            {
                featureId: "512",
                featureName: "Exam Subject",
                isChecked: false,
            },
            {
                featureId: "513",
                featureName: "Exam Marks",
                isChecked: false,
            },
            {
                featureId: "514",
                featureName: "Marks Division",
                isChecked: false,
            },
            {
                featureId: "515",
                featureName: "Exam Schedule",
                isChecked: false,
            },
            {
                featureId: "516",
                featureName: "Generate Rank",
                isChecked: false,
            }
        ]
    },

    {
        module: "Academics",
        moduleId: 6,
        features: [
            {
                featureId: "600",
                featureName: "Class Timetable",
                isChecked: false,
            },
            {
                featureId: "601",
                featureName: "Subject",
                isChecked: false,
            },
            {
                featureId: "602",
                featureName: "Class",
                isChecked: false,
            },
            {
                featureId: "603",
                featureName: "Section",
                isChecked: false,
            },
            {
                featureId: "604",
                featureName: "Promote Student",
                isChecked: false,
            },
            {
                featureId: "605",
                featureName: "Assign Class Teacher",
                isChecked: false,
            },
            {
                featureId: "606",
                featureName: "Teachers Timetable",
                isChecked: false,
            },
            {
                featureId: "607",
                featureName: "Subject Group",
                isChecked: false,
            }
        ]
    },

    {
        module: "Library",
        moduleId: 7,
        features: [
            {
                featureId: "700",
                featureName: "Books List",
                isChecked: false,
            },
            {
                featureId: "701",
                featureName: "Issue Return",
                isChecked: false,
            },
            {
                featureId: "702",
                featureName: "Add Staff Member",
                isChecked: false,
            },
            {
                featureId: "703",
                featureName: "Add Student",
                isChecked: false,
            },
            {
                featureId: "704",
                featureName: "Import Book",
                isChecked: false,
            }
        ]
    },

    {
        module: "Communicate",
        moduleId: 8,
        features: [
            {
                featureId: "800",
                featureName: "Notice Board",
                isChecked: false,
            },
            {
                featureId: "801",
                featureName: "Email",
                isChecked: false,
            },
            {
                featureId: "802",
                featureName: "Email / SMS Log",
                isChecked: false,
            },
            {
                featureId: "803",
                featureName: "SMS",
                isChecked: false,
            },
            {
                featureId: "804",
                featureName: "Schedule Email SMS Log",
                isChecked: false,
            },
            {
                featureId: "805",
                featureName: "Login Credentials Send",
                isChecked: false,
            },
            {
                featureId: "806",
                featureName: "Email Template",
                isChecked: false,
            },
            {
                featureId: "807",
                featureName: "SMS Template",
                isChecked: false,
            }
        ]
    },



    {
        module: "Reports",
        moduleId: 9,
        features: [
            {
                featureId: "900",
                featureName: "Student Report",
                isChecked: false,
            },
            {
                featureId: "901",
                featureName: "Guardian Report",
                isChecked: false,
            },
            {
                featureId: "902",
                featureName: "Student History",
                isChecked: false,
            },
            {
                featureId: "903",
                featureName: "Student Login Credential Report",
                isChecked: false,
            },
            {
                featureId: "904",
                featureName: "Class Subject Report",
                isChecked: false,
            },
            {
                featureId: "905",
                featureName: "Admission Report",
                isChecked: false,
            },
            {
                featureId: "906",
                featureName: "Sibling Report",
                isChecked: false,
            },
            {
                featureId: "907",
                featureName: "Homework Evaluation Report",
                isChecked: false,
            },
            {
                featureId: "908",
                featureName: "Student Profile",
                isChecked: false,
            },
            {
                featureId: "909",
                featureName: "Fees Statement",
                isChecked: false,
            },
            {
                featureId: "910",
                featureName: "Balance Fees Report",
                isChecked: false,
            },
            {
                featureId: "911",
                featureName: "Fees Collection Report",
                isChecked: false,
            },
            {
                featureId: "912",
                featureName: "Online Fees Collection Report",
                isChecked: false,
            },
            {
                featureId: "913",
                featureName: "Income Report",
                isChecked: false,
            },
            {
                featureId: "914",
                featureName: "Expense Report",
                isChecked: false,
            },
            {
                featureId: "915",
                featureName: "PayRoll Report",
                isChecked: false,
            },
            {
                featureId: "916",
                featureName: "Income Group Report",
                isChecked: false,
            },
            {
                featureId: "917",
                featureName: "Expense Group Report",
                isChecked: false,
            },
            {
                featureId: "918",
                featureName: "Attendance Report",
                isChecked: false,
            },
            {
                featureId: "919",
                featureName: "Staff Attendance Report",
                isChecked: false,
            },
            {
                featureId: "920",
                featureName: "Transport Report",
                isChecked: false,
            },
            {
                featureId: "921",
                featureName: "Hostel Report",
                isChecked: false,
            },
            {
                featureId: "922",
                featureName: "Audit Trail Report",
                isChecked: false,
            },
            {
                featureId: "923",
                featureName: "User Log",
                isChecked: false,
            },
            {
                featureId: "924",
                featureName: "Book Issue Report",
                isChecked: false,
            },
            {
                featureId: "925",
                featureName: "Book Due Report",
                isChecked: false,
            },
            {
                featureId: "926",
                featureName: "Book Inventory Report",
                isChecked: false,
            },
            {
                featureId: "927",
                featureName: "Stock Report",
                isChecked: false,
            },
            {
                featureId: "928",
                featureName: "Add Item Report",
                isChecked: false,
            },
            {
                featureId: "929",
                featureName: "Issue Item Report",
                isChecked: false,
            },
            {
                featureId: "930",
                featureName: "Student Attendance Type Report",
                isChecked: false,
            },
            {
                featureId: "931",
                featureName: "Exam Marks Report",
                isChecked: false,
            },
            {
                featureId: "932",
                featureName: "Online Exam Wise Report",
                isChecked: false,
            },
            {
                featureId: "933",
                featureName: "Online Exams Report",
                isChecked: false,
            },
            {
                featureId: "934",
                featureName: "Online Exams Attempt Report",
                isChecked: false,
            },
            {
                featureId: "935",
                featureName: "Online Exams Rank Report",
                isChecked: false,
            },
            {
                featureId: "936",
                featureName: "Staff Report",
                isChecked: false,
            },
            {
                featureId: "937",
                featureName: "Student / Period Attendance Report",
                isChecked: false,
            },
            {
                featureId: "938",
                featureName: "Biometric Attendance Log",
                isChecked: false,
            },
            {
                featureId: "939",
                featureName: "Book Issue Return Report",
                isChecked: false,
            },
            {
                featureId: "940",
                featureName: "Rank Report",
                isChecked: false,
            },
            {
                featureId: "941",
                featureName: "Syllabus Status Report",
                isChecked: false,
            },
            {
                featureId: "942",
                featureName: "Teacher Syllabus Status Report",
                isChecked: false,
            },
            {
                featureId: "943",
                featureName: "Alumni Report",
                isChecked: false,
            },
            {
                featureId: "944",
                featureName: "Student Gender Ratio Report",
                isChecked: false,
            },
            {
                featureId: "945",
                featureName: "Student Teacher Ratio Report",
                isChecked: false,
            },
            {
                featureId: "946",
                featureName: "Daily Attendance Report",
                isChecked: false,
            },
            {
                featureId: "947",
                featureName: "Balance Fees Report With Remark",
                isChecked: false,
            },
            {
                featureId: "948",
                featureName: "Balance Fees Statement",
                isChecked: false,
            },
            {
                featureId: "949",
                featureName: "Daily Collection Report",
                isChecked: false,
            }
        ]
    },


    {
        module: "System Settings",
        moduleId: 10,
        features: [
            {
                featureId: "1000",
                featureName: "Languages",
                isChecked: false,
            },
            {
                featureId: "1001",
                featureName: "General Setting",
                isChecked: false,
            },
            {
                featureId: "1002",
                featureName: "Session Setting",
                isChecked: false,
            },
            {
                featureId: "1003",
                featureName: "Notification Setting",
                isChecked: false,
            },
            {
                featureId: "1004",
                featureName: "SMS Setting",
                isChecked: false,
            },
            {
                featureId: "1005",
                featureName: "Email Setting",
                isChecked: false,
            },
            {
                featureId: "1006",
                featureName: "Front CMS Setting",
                isChecked: false,
            },
            {
                featureId: "1007",
                featureName: "Payment Methods",
                isChecked: false,
            },
            {
                featureId: "1008",
                featureName: "User Status",
                isChecked: false,
            },
            {
                featureId: "1009",
                featureName: "Backup",
                isChecked: false,
            },
            {
                featureId: "1010",
                featureName: "Restore",
                isChecked: false,
            },
            {
                featureId: "1011",
                featureName: "Language Switcher",
                isChecked: false,
            },
            {
                featureId: "1012",
                featureName: "Custom Fields",
                isChecked: false,
            },
            {
                featureId: "1013",
                featureName: "System Fields",
                isChecked: false,
            },
            {
                featureId: "1014",
                featureName: "Print Header Footer",
                isChecked: false,
            },
            {
                featureId: "1015",
                featureName: "Student Profile Update",
                isChecked: false,
            },
            {
                featureId: "1016",
                featureName: "Sidebar Menu",
                isChecked: false,
            },
            {
                featureId: "1017",
                featureName: "Currency",
                isChecked: false,
            },
            {
                featureId: "1018",
                featureName: "Currency Switcher",
                isChecked: false,
            }
        ]
    },


    {
        module: "Front CMS",
        moduleId: 11,
        features: [
            {
                featureId: "1100",
                featureName: "Menus",
                isChecked: false,
            },
            {
                featureId: "1101",
                featureName: "Media Manager",
                isChecked: false,
            },
            {
                featureId: "1102",
                featureName: "Banner Images",
                isChecked: false,
            },
            {
                featureId: "1103",
                featureName: "Pages",
                isChecked: false,
            },
            {
                featureId: "1104",
                featureName: "Gallery",
                isChecked: false,
            },
            {
                featureId: "1105",
                featureName: "Event",
                isChecked: false,
            },
            {
                featureId: "1106",
                featureName: "News",
                isChecked: false,
            }
        ]
    },

    {
        module: "Front Office",
        moduleId: 12,
        features: [
            {
                featureId: "1200",
                featureName: "Admission Enquiry",
                isChecked: false,
            },
            {
                featureId: "1201",
                featureName: "Follow Up Admission Enquiry",
                isChecked: false,
            },
            {
                featureId: "1202",
                featureName: "Visitor Book",
                isChecked: false,
            },
            {
                featureId: "1203",
                featureName: "Phone Call Log",
                isChecked: false,
            },
            {
                featureId: "1204",
                featureName: "Postal Dispatch",
                isChecked: false,
            },
            {
                featureId: "1205",
                featureName: "Postal Receive",
                isChecked: false,
            },
            {
                featureId: "1206",
                featureName: "Complain",
                isChecked: false,
            },
            {
                featureId: "1207",
                featureName: "Setup Front Office",
                isChecked: false,
            }
        ]
    },

    {
        module: "Human Resource",
        moduleId: 13,
        features: [
            {
                featureId: "1300",
                featureName: "Staff",
                isChecked: false,
            },
            {
                featureId: "1301",
                featureName: "Disable Staff",
                isChecked: false,
            },
            {
                featureId: "1302",
                featureName: "Staff Attendance",
                isChecked: false,
            },
            {
                featureId: "1303",
                featureName: "Staff Payroll",
                isChecked: false,
            },
            {
                featureId: "1304",
                featureName: "Approve Leave Request",
                isChecked: false,
            },
            {
                featureId: "1305",
                featureName: "Apply Leave",
                isChecked: false,
            },
            {
                featureId: "1306",
                featureName: "Leave Types",
                isChecked: false,
            },
            {
                featureId: "1307",
                featureName: "Department",
                isChecked: false,
            },
            {
                featureId: "1308",
                featureName: "Designation",
                isChecked: false,
            },
            {
                featureId: "1309",
                featureName: "Can See Other Users Profile",
                isChecked: false,
            },
            {
                featureId: "1310",
                featureName: "Staff Timeline",
                isChecked: false,
            },
            {
                featureId: "1311",
                featureName: "Teachers Rating",
                isChecked: false,
            }
        ]
    },

    {
        module: "Homework",
        moduleId: 14,
        features: [
            {
                featureId: "1400",
                featureName: "Homework",
                isChecked: false,
            },
            {
                featureId: "1401",
                featureName: "Homework Evaluation",
                isChecked: false,
            },
            {
                featureId: "1402",
                featureName: "Daily Assignment",
                isChecked: false,
            }
        ]
    },

    {
        module: "Certificate",
        moduleId: 15,
        features: [
            {
                featureId: "1500",
                featureName: "Student Certificate",
                isChecked: false,
            },
            {
                featureId: "1501",
                featureName: "Generate Certificate",
                isChecked: false,
            },
            {
                featureId: "1502",
                featureName: "Student ID Card",
                isChecked: false,
            },
            {
                featureId: "1503",
                featureName: "Generate ID Card",
                isChecked: false,
            },
            {
                featureId: "1504",
                featureName: "Staff ID Card",
                isChecked: false,
            },
            {
                featureId: "1505",
                featureName: "Generate Staff ID Card",
                isChecked: false,
            }
        ]
    },

    {
        module: "Calendar To Do List",
        moduleId: 16,
        features: [
            {
                featureId: "1600",
                featureName: "Calendar To Do List",
                isChecked: false,
            }
        ]
    },

    {
        module: "Dashboard and Widgets",
        moduleId: 17,
        features: [
            {
                featureId: "1700",
                featureName: "Quick Session Change",
                isChecked: false,
            },
            {
                featureId: "1701",
                featureName: "Fees Collection And Expense Monthly Chart",
                isChecked: false,
            },
            {
                featureId: "1702",
                featureName: "Fees Collection And Expense Yearly Chart",
                isChecked: false,
            },
            {
                featureId: "1703",
                featureName: "Monthly Fees Collection Widget",
                isChecked: false,
            },
            {
                featureId: "1704",
                featureName: "Monthly Expense Widget",
                isChecked: false,
            },
            {
                featureId: "1705",
                featureName: "Student Count Widget",
                isChecked: false,
            },
            {
                featureId: "1706",
                featureName: "Staff Role Count Widget",
                isChecked: false,
            },
            {
                featureId: "1707",
                featureName: "Fees Awaiting Payment Widgets",
                isChecked: false,
            },
            {
                featureId: "1708",
                featureName: "Converted Leads Widgets",
                isChecked: false,
            },
            {
                featureId: "1709",
                featureName: "Fees Overview Widgets",
                isChecked: false,
            },
            {
                featureId: "1710",
                featureName: "Enquiry Overview Widgets",
                isChecked: false,
            },
            {
                featureId: "1711",
                featureName: "Library Overview Widgets",
                isChecked: false,
            },
            {
                featureId: "1712",
                featureName: "Student Today Attendance Widgets",
                isChecked: false,
            },
            {
                featureId: "1713",
                featureName: "Income Donut Graph",
                isChecked: false,
            },
            {
                featureId: "1714",
                featureName: "Expense Donut Graph",
                isChecked: false,
            },
            {
                featureId: "1715",
                featureName: "Staff Present Today Widgets",
                isChecked: false,
            },
            {
                featureId: "1716",
                featureName: "Student Present Today Widgets",
                isChecked: false,
            }
        ]
    },

    {
        module: "Student Information",
        moduleId: 1,
        features: [
            {
                featureId: "1000",
                featureName: "View",
                isChecked: false,
            },
            {
                featureId: "1001",
                featureName: "Edit",
                isChecked: false,
            }
        ]
    },

    {
        module: "Examination",
        moduleId: 2,
        features: [
            {
                featureId: "2000",
                featureName: "View Results",
                isChecked: false,
            },
            {
                featureId: "2001",
                featureName: "Assign Marks",
                isChecked: false,
            }
        ]
    },
    {
        module: "Academics",
        moduleId: 3,
        features: [
            {
                featureId: "3000",
                featureName: "View Timetable",
                isChecked: false,
            },
            {
                featureId: "3001",
                featureName: "Assign Homework",
                isChecked: false,
            }
        ]
    },

    {
        module: "Homework",
        moduleId: 4,
        features: [
            {
                featureId: "4000",
                featureName: "Create Assignment",
                isChecked: false,
            },
            {
                featureId: "4001",
                featureName: "Grade Homework",
                isChecked: false,
            }
        ]
    },

    {
        module: "Online Examination",
        moduleId: 5,
        features: [
            {
                featureId: "5000",
                featureName: "Online Examination",
                isChecked: false,
            },
            {
                featureId: "5001",
                featureName: "Question Bank",
                isChecked: false,
            },
            {
                featureId: "5002",
                featureName: "Add Questions in Exam",
                isChecked: false,
            },
            {
                featureId: "5003",
                featureName: "Assign / View Student",
                isChecked: false,
            },
            {
                featureId: "5004",
                featureName: "Import Question",
                isChecked: false,
            }
        ]
    },

    {
        module: "Chat",
        moduleId: 6,
        features: [
            {
                featureId: "6000",
                featureName: "Chat",
                isChecked: false,
            }
        ]
    },

    {
        module: "Multi Class",
        moduleId: 7,
        features: [
            {
                featureId: "7000",
                featureName: "Multi Class Student",
                isChecked: false,
            }
        ]
    },

    {
        module: "Online Admission",
        moduleId: 8,
        features: [
            {
                featureId: "8000",
                featureName: "Online Admission",
                isChecked: false,
            }
        ]
    },

    {
        module: "Alumni",
        moduleId: 9,
        features: [
            {
                featureId: "9000",
                featureName: "Manage Alumni",
                isChecked: false,
            }
        ]
    },

    {
        module: "Events",
        moduleId: 10,
        features: [
            {
                featureId: "1000",
                featureName: "Events",
                isChecked: false,
            }
        ]
    },

    {
        module: "Lesson Plan",
        moduleId: 11,
        features: [
            {
                featureId: "1100",
                featureName: "Manage Lesson Plan",
                isChecked: false,
            },
            {
                featureId: "1101",
                featureName: "Manage Syllabus Status",
                isChecked: false,
            },
            {
                featureId: "1102",
                featureName: "Lesson",
                isChecked: false,
            },
            {
                featureId: "1103",
                featureName: "Topic",
                isChecked: false,
            },
            {
                featureId: "1104",
                featureName: "Comments",
                isChecked: false,
            },
            {
                
                featureId: "1105",
                featureName: "Copy Old Lessons",
                isChecked: false,
            }
        ]
    },


];
function AssignPermissionTUser(module, feature, isChecked, checkBoxId) {
    // let findModule = this.teacherModules.findIndex(x => x.moduleId == moduleIndex);
    let findModule = teacherModules.find(x => x.moduleId == module.moduleId);
    if (findModule != undefined && findModule != null) {
        let findFeature = findModule.features.find(x => x.featureId == feature.featureId);
        let ele = findFeature.permissions[checkBoxId];
        ele.isChecked = isChecked;

        //Push to saveFeatures here
        if (saveFeatures.length <= 0) {
            saveFeatures.push(findFeature);
        }
        if (saveFeatures.some(ele => ele.featureId == feature.featureId)) {
            let indx = saveFeatures.findIndex(el => el.featureId == feature.featureId);
            saveFeatures[indx] = findFeature;
        }else{
            saveFeatures.push(findFeature);
        }
    }
    console.log('test');
}
function submitPermissions() {
    let getUserLoginInfo = JSON.parse(localStorage.getItem("usersMaster"));
   // let getLoginSessionData = JSON.parse(localStorage.getItem("loginInfo"));
    for (let i = 0; i < getUserLoginInfo.length; i++) {
        if (getUserLoginInfo[i].roleid == '101') { // getLoginSessionData.roleid
            if (getUserLoginInfo[i].permissions.length <= 0) {

                getUserLoginInfo[i].permissions = saveFeatures;
            }

            if (getUserLoginInfo[i].permissions.some(x => x.featureId == '100')) { //getLoginSessionData.roleid
                let indx = getUserLoginInfo[i].permissions.findIndex(e => e.featureId == '100');
                let findIndxinSaceFeatures = saveFeatures.findIndex(ele => ele.featureId == '100');
                getUserLoginInfo[i].permissions[indx] = saveFeatures[findIndxinSaceFeatures];
            }
            if (getUserLoginInfo[i].permissions.some(x => x.featureId == '103')) { //getLoginSessionData.roleid
                let indx = getUserLoginInfo[i].permissions.findIndex(e => e.featureId == '103');
                let findIndxinSaceFeatures = saveFeatures.findIndex(ele => ele.featureId == '103');
                getUserLoginInfo[i].permissions[indx] = saveFeatures[findIndxinSaceFeatures];
            }
            if (getUserLoginInfo[i].permissions.some(x => x.featureId == '104')) { //getLoginSessionData.roleid
                let indx = getUserLoginInfo[i].permissions.findIndex(e => e.featureId == '104');
                let findIndxinSaceFeatures = saveFeatures.findIndex(ele => ele.featureId == '104');
                getUserLoginInfo[i].permissions[indx] = saveFeatures[findIndxinSaceFeatures];
                
            }
          
            else{
                getUserLoginInfo[i].permissions = saveFeatures;
            }
           // break;
        }
    }
    localStorage.setItem("usersMaster", JSON.stringify(getUserLoginInfo));
    //loginInfo
    //sessionStorage.setItem("loginInfo", JSON.stringify(dataToStoreInLoginSession));
    console.log(getUserLoginInfo);
}




const TeacherPermission = () => {
    const { roleName } = useParams(); // Retrieve role name from URL
    const [permissions, setPermissions] = useState([]);

    useEffect(() => {
        // Example logic to set permissions for teacher role
        if (roleName === "Teacher") {
            setPermissions([
                "View Timetable",
                "Assign Homework",
                "View Results",
                "Assign Marks",
                "Create Assignment",
                "Grade Homework"
            ]);
        } else {
            setPermissions([]);
        }
    }, [roleName]);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">{roleName} Assign Permissions (Teacher)</h1>
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
                                    <td className="border border-gray-300 px-4 py-2">{feature.featureName}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">
                                        <input type="checkbox" className="w-4 h-4" onClick={(e) => AssignPermissionTUser(module, feature, e.target.checked, 0)} />
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">
                                        <input type="checkbox" className="w-4 h-4" onClick={(e) => AssignPermissionTUser(module, feature, e.target.checked, 1)} />
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">
                                        <input type="checkbox" className="w-4 h-4" onClick={(e) => AssignPermissionTUser(module, feature, e.target.checked, 2)} />
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">
                                        <input type="checkbox" className="w-4 h-4" onClick={(e) => AssignPermissionTUser(module, feature, e.target.checked, 3)} />
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            <div className="mt-4 flex justify-end">
                <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" onClick={submitPermissions}>
                    Save Permissions
                </button>
            </div>
        </div>
    );
};

export default TeacherPermission;