import React, { useState } from "react";
import { Link } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";
import UniversityName from "../../assets/admin/universityName.png";
import { useModuleContext } from "../../Context/ModuleContext"; // Correct relative path



import {
  FaHome,
  FaUserAlt,
  FaCalendarAlt,
  FaUserTie,
  FaBook,
  FaUser,
  FaDollarSign,
  FaFileAlt,
  FaCalendar,
  FaClipboardList,
  FaChalkboardTeacher,
  FaAngleDoubleRight,
  FaCommentDots,
  FaRegFileAlt,
  FaDesktop,
  FaBullhorn,
  FaUserClock,
  FaCog,
  FaChevronDown,
  FaChevronUp,
  FaCogs,
  FaGraduationCap,
  FaMoneyBillWave,
  FaCertificate,
  FaComments,
  FaCloud,
  FaUsers,
  FaMoneyBill,
  FaPen,
  FaEllipsisH,
  FaLink,
  FaGripVertical,
} from "react-icons/fa";


const Sidebar = ({ isOpen }) => {
  const [isQuickLinksOpen, setIsQuickLinksOpen] = useState(false); // State to toggle Quick Links visibility
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const [frontOfficeDropdownOpen, setFrontOfficeDropdownOpen] = useState(false);
  const [adminDropdownOpen, setAdminDropdownOpen] = useState(false);
  const [studentInfoDropdownOpen, setStudentInfoDropdownOpen] = useState(false);
  const [feesCollectionDropdownOpen, setFeesCollectionDropdownOpen] = useState(false);
  const [examinationDropdownOpen, setExaminationDropdownOpen] = useState(false); // Examination dropdown state
  const [libraryDropdownOpen, setLibraryDropdownOpen] = useState(false); // Library dropdown state
  const [systemSettingsDropdownOpen, setSystemSettingsDropdownOpen] = useState(false); // System Settings dropdown state
  const [communicateDropdownOpen, setCommunicateDropdownOpen] = useState(false);
  const [expensesDropdownOpen, setExpensesDropdownOpen] = useState(false);
  const [reportsDropdownOpen, setReportsDropdownOpen] = useState(false);
  const [humanresourceDropdownOpen, setHumanResourceDropdownOpen] = useState(false);
  const [incomeDropdownOpen, setIncomeDropdownOpen] = useState(false);
  const [onlineExaminationDropdownOpen, setOnlineExaminationDropdownOpen] = useState(false);
  const [attendanceDropdownOpen, setAttendanceDropdownOpen] = useState(false);
  const [academicsDropdownOpen, setAcademicsDropdownOpen] = useState(false);

  const { enabledItems } = useModuleContext();

  // State for Current Session
  const [currentSession, setCurrentSession] = useState("2018-19");
  const [editedSession, setEditedSession] = useState(currentSession);
  const [isEditingSession, setIsEditingSession] = useState(false); // Toggle edit mode for session
  const sessionOptions = ['2018-19', '2019-20', '2020-21', '2021-22', '2022-23', '2023-24']; // Available session years

  const iconClasses = "text-lg";

  // Handlers for hover
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  // Handler to toggle mobile sidebar
  const toggleMobileSidebar = () => setIsMobileOpen(!isMobileOpen);

  // Toggle the dropdowns
  const toggleFrontOfficeDropdown = () => setFrontOfficeDropdownOpen(!frontOfficeDropdownOpen);
  const toggleAdminDropdown = () => setAdminDropdownOpen(!adminDropdownOpen);
  const toggleStudentInfoDropdown = () => setStudentInfoDropdownOpen(!studentInfoDropdownOpen);
  const toggleFeesCollectionDropdown = () => setFeesCollectionDropdownOpen(!feesCollectionDropdownOpen);
  const toggleExaminationDropdown = () => setExaminationDropdownOpen(!examinationDropdownOpen);
  const toggleLibraryDropdown = () => setLibraryDropdownOpen(!libraryDropdownOpen);
  const toggleSystemSettingsDropdown = () => setSystemSettingsDropdownOpen(!systemSettingsDropdownOpen);
  const toggleCommunicateDropdown = () => setCommunicateDropdownOpen(!communicateDropdownOpen);
  const toggleExpensesDropdown = () => setExpensesDropdownOpen(!expensesDropdownOpen);
  const toggleReportsDropdown = () => setReportsDropdownOpen(!reportsDropdownOpen);
  const toggleHumanResourceDropdown = () => setHumanResourceDropdownOpen(!humanresourceDropdownOpen);
  const toggleIncomeDropdown = () => setIncomeDropdownOpen(!incomeDropdownOpen);
  const toggleOnlineExaminationDropdown = () => setOnlineExaminationDropdownOpen(!incomeDropdownOpen);
  const toggleAcademicsDropdown = () => setAcademicsDropdownOpen(!academicsDropdownOpen);
  const toggleAttendanceDropdown = () => setAttendanceDropdownOpen(!attendanceDropdownOpen);

  const toggleQuickLinks = () => {
    setIsQuickLinksOpen(!isQuickLinksOpen); // Toggle Quick Links visibility
  };

  const handleSaveSession = () => {
    setCurrentSession(editedSession);
    setIsEditingSession(false); // Stop editing after saving
  };

//   const userLoginInfo = JSON.parse(sessionStorage.getItem("loginInfo"));
//   let showStudent = false;
//   let showStudentHouses = false;
//   let showDisableStudent = false;
//   for (let i = 0; i < userLoginInfo.permissions.length; i++) {
//     if (userLoginInfo.permissions[i].featureId == '100') {
//       let findViewPermission = userLoginInfo.permissions[i].permissions.find(x => x.name == 'View');
//       showStudent = findViewPermission.isChecked;
//       console.log(showStudent)
//     }
//     if (userLoginInfo.permissions[i].featureId == '103') {
//       let findViewPermission = userLoginInfo.permissions[i].permissions.find(x => x.name == 'View');
//       showStudentHouses = findViewPermission.isChecked;
//       console.log( showStudentHouses)
//     }
//     if (userLoginInfo.permissions[i].featureId == '104') {
//       let findViewPermission = userLoginInfo.permissions[i].permissions.find(x => x.name == 'View');
//       showDisableStudent = findViewPermission.isChecked;
//       console.log( showDisableStudent)
//   }
// }


  return (
    <div
      className={`bg-gray-600 text-white transition-all duration-300 h-screen dark:bg-slate-700 ${isOpen || isHovered ? 'w-60' : 'w-16'
        } fixed top-0 left-0 h-screen z-30 overflow-y-auto`}
    >
      <ul className="space-y-1 p-3">

        {/* University Logo */}
        <li className="mb-4">
          <img
            src={UniversityName}
            alt="UniversityName"
            className={`h-15 w-auto transition-all duration-300 ${isOpen || isHovered ? 'mx-auto' : 'mx-auto'}`}
          />
        </li>
        {/* Current Session and Pen Icon */}
        <li className="flex items-center space-x-4 mb-4">
          {/* Current Session or Dropdown */}
          {isEditingSession ? (
            <div className="flex items-center space-x-2 bg-gray-700 p-2 rounded-md">
              <select
                value={currentSession}
                onChange={handleSaveSession}
                className="text-sm text-black-400 border border-gray-500 rounded p-1 bg-gray-600"
              >
                {sessionOptions.map((session) => (
                  <option key={session} value={session}>
                    {session}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <span className="text-sm text-white">
              {isOpen || isHovered ? `Current Session: ${currentSession}` : currentSession}
            </span>
          )}
          {(isOpen || isHovered) && (
            <FaPen
              onClick={() => setIsEditingSession(!isEditingSession)} // Toggle edit mode when clicking pen
              className={`${iconClasses} text-yellow-400 cursor-pointer`}
            />
          )}
        </li>

        <li>
          <Link
            className="flex items-center justify-between w-full p-2 rounded hover:bg-gray-700"
            onClick={() => document.getElementById('overlay').style.display = 'block'} // Open overlay on click
          >
            <div className="flex items-center space-x-2">
              <li className="flex items-center space-x-24 mb-2">
                <span className="text-sm text-white">{isOpen || isHovered ? 'Quick Links' : 'Links'}</span>
                {(isOpen || isHovered) && <FaGripVertical className={`${iconClasses} text-gray-400`} />}
              </li>
            </div>
          </Link>

          {/* Full-Screen Overlay */}
          <div
            id="overlay"
            className="overlay"
            style={{
              display: 'none',
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.7)', // Semi-transparent black background
              zIndex: 999,
              overflow: 'auto', // Allow scrolling when content overflows
            }}
            onClick={() => document.getElementById('overlay').style.display = 'none'} // Close on click anywhere
          >
            {/* Overlay Content */}
            <div
              className="overlay-content bg-white p-6"
              style={{
                maxWidth: '90%', // Customize width as needed
                margin: '40px auto', // Adjust margins as needed (top, bottom, left, right)
                borderRadius: '8px',
                overflowY: 'auto', // Enable vertical scrolling if content exceeds height
                maxHeight: '80vh', // Limit height for scrollable content
                display: 'grid', // Use grid layout
                gridTemplateColumns: 'repeat(4, 1fr)', // Create a 4x4 grid layout (4 sections per row)
                gap: '20px', // Space between columns
              }}
              onClick={(e) => e.stopPropagation()} // Prevent click event from propagating to close overlay
            >

              {/* Section: Front Office */}
              <div className="flex-shrink-0 min-w-[200px]">
                <h4 className="font-semibold text-black mb-3">
                  <FaHome className="inline mr-2 text-black" /> Front Office
                </h4>
                <ul className="space-y-2 text-xs">
                  <li><Link to="/admin/admission-enquiry" className="text-black" onClick={() => document.getElementById('overlay').style.display = 'none'}><FaAngleDoubleRight className="inline mr-2 text-black" /> Admission Enquiry</Link></li>
                  <li><Link to="/admin/visitor-books" className="text-black" onClick={() => document.getElementById('overlay').style.display = 'none'}><FaAngleDoubleRight className="inline mr-2 text-black" /> Visitor Book</Link></li>
                  <li><Link to="/admin/phone-call" className="text-black" onClick={() => document.getElementById('overlay').style.display = 'none'}><FaAngleDoubleRight className="inline mr-2 text-black" /> Phone Call Log</Link></li>
                  <li><Link to="/admin/postal-dispatch" className="text-black" onClick={() => document.getElementById('overlay').style.display = 'none'}><FaAngleDoubleRight className="inline mr-2 text-black" /> Postal Dispatch</Link></li>
                  <li><Link to="/admin/postal-receive" className="text-black" onClick={() => document.getElementById('overlay').style.display = 'none'}><FaAngleDoubleRight className="inline mr-2 text-black" /> Postal Receive</Link></li>
                  <li><Link to="/admin/complaint" className="text-black" onClick={() => document.getElementById('overlay').style.display = 'none'}><FaAngleDoubleRight className="inline mr-2 text-black" /> Complain</Link></li>
                  <li><Link to="/admin/setup-frontoffice" className="text-black" onClick={() => document.getElementById('overlay').style.display = 'none'}><FaAngleDoubleRight className="inline mr-2 text-black" /> Setup Front Office</Link></li>
                </ul>
              </div>

              {/* Section: Student Information */}
              <div className="flex-shrink-0 min-w-[200px]">
                <h4 className="font-semibold text-black mb-3">
                  <FaUser className="inline mr-2 text-black" /> Student Information
                </h4>
                <ul className="space-y-2 text-xs">
                  <li><Link to="/admin/student-details" className="text-black" onClick={() => document.getElementById('overlay').style.display = 'none'}><FaAngleDoubleRight className="inline mr-2 text-black" /> Student Details</Link></li>
                  <li><Link to="/admin/online-admission" className="text-black" onClick={() => document.getElementById('overlay').style.display = 'none'}><FaAngleDoubleRight className="inline mr-2 text-black" /> Online Admission</Link></li>
                  <li><Link to="/admin/online-admission" className="text-black" onClick={() => document.getElementById('overlay').style.display = 'none'}><FaAngleDoubleRight className="inline mr-2 text-black" /> Online Admission</Link></li>
                  <li><Link to="/admin/disabled-students" className="text-black" onClick={() => document.getElementById('overlay').style.display = 'none'}><FaAngleDoubleRight className="inline mr-2 text-black" /> Disabled Students</Link></li>
                  <li><Link to="/admin/multi-class-student" className="text-black" onClick={() => document.getElementById('overlay').style.display = 'none'}><FaAngleDoubleRight className="inline mr-2 text-black" /> Multi Class Student</Link></li>
                  <li><Link to="/admin/bulk-delete" className="text-black" onClick={() => document.getElementById('overlay').style.display = 'none'}><FaAngleDoubleRight className="inline mr-2 text-black" /> Bulk Delete</Link></li>
                  <li><Link to="/admin/student-categories" className="text-black" onClick={() => document.getElementById('overlay').style.display = 'none'}><FaAngleDoubleRight className="inline mr-2 text-black" /> Student Categories</Link></li>
                  <li><Link to="/admin/student-house" className="text-black" onClick={() => document.getElementById('overlay').style.display = 'none'}><FaAngleDoubleRight className="inline mr-2 text-black" /> Student House</Link></li>
                  <li><Link to="/admin/disable-reason" className="text-black" onClick={() => document.getElementById('overlay').style.display = 'none'}><FaAngleDoubleRight className="inline mr-2 text-black" /> Disable Reason</Link></li>
                </ul>
              </div>

              {/* Section: Examinations */}
              <div className="flex-shrink-0 min-w-[200px]">
                <h4 className="font-semibold text-black mb-3">
                  <FaHome className="inline mr-2 text-black" /> Examinations
                </h4>
                <ul className="space-y-2 text-xs">
                  <li><Link to="/admin/exam-group" className="text-black" onClick={() => document.getElementById('overlay').style.display = 'none'}><FaAngleDoubleRight className="inline mr-2 text-black" /> Exam Group</Link></li>
                  <li><Link to="/admin/exam-schedule" className="text-black" onClick={() => document.getElementById('overlay').style.display = 'none'}><FaAngleDoubleRight className="inline mr-2 text-black" /> Exam Schedule</Link></li>
                  <li><Link to="/admin/exam-result" className="text-black" onClick={() => document.getElementById('overlay').style.display = 'none'}><FaAngleDoubleRight className="inline mr-2 text-black" /> Exam Result</Link></li>
                  <li><Link to="/admin/design-admitcard" className="text-black" onClick={() => document.getElementById('overlay').style.display = 'none'}><FaAngleDoubleRight className="inline mr-2 text-black" /> Design Admit Card</Link></li>
                  <li><Link to="/admin/print-admitcard" className="text-black" onClick={() => document.getElementById('overlay').style.display = 'none'}><FaAngleDoubleRight className="inline mr-2 text-black" /> Print Admit Card</Link></li>
                  <li><Link to="/admin/design-marksheet" className="text-black" onClick={() => document.getElementById('overlay').style.display = 'none'}><FaAngleDoubleRight className="inline mr-2 text-black" /> Design Marksheet</Link></li>
                  <li><Link to="/admin/print-marksheet" className="text-black" onClick={() => document.getElementById('overlay').style.display = 'none'}><FaAngleDoubleRight className="inline mr-2 text-black" /> Print Marksheet</Link></li>
                  <li><Link to="/admin/marks-grade" className="text-black" onClick={() => document.getElementById('overlay').style.display = 'none'}><FaAngleDoubleRight className="inline mr-2 text-black" /> Marks Grade</Link></li>
                  <li><Link to="/admin/marks-division" className="text-black" onClick={() => document.getElementById('overlay').style.display = 'none'}><FaAngleDoubleRight className="inline mr-2 text-black" /> Marks Division</Link></li>
                </ul>
              </div>

              {/* Section: Academics */}
              <div className="flex-shrink-0 min-w-[200px]">
                <h4 className="font-semibold text-black mb-3">
                  <FaHome className="inline mr-2 text-black" /> Academics
                </h4>
                <ul className="space-y-2 text-xs">
                  <li><Link to="/admin/class-timetable" className="text-black" onClick={() => document.getElementById('overlay').style.display = 'none'}><FaAngleDoubleRight className="inline mr-2 text-black" /> Class Timetable</Link></li>
                  <li><Link to="/admin/assign-class-teacher" className="text-black" onClick={() => document.getElementById('overlay').style.display = 'none'}><FaAngleDoubleRight className="inline mr-2 text-black" /> Assign Class Teacher</Link></li>
                  <li><Link to="/admin/teachers-timetable" className="text-black" onClick={() => document.getElementById('overlay').style.display = 'none'}><FaAngleDoubleRight className="inline mr-2 text-black" /> Teachers Timetable</Link></li>
                  <li><Link to="/admin/promote-students" className="text-black" onClick={() => document.getElementById('overlay').style.display = 'none'}><FaAngleDoubleRight className="inline mr-2 text-black" /> Promote Students</Link></li>
                  <li><Link to="/admin/subject-group" className="text-black" onClick={() => document.getElementById('overlay').style.display = 'none'}><FaAngleDoubleRight className="inline mr-2 text-black" /> Subject Group</Link></li>
                  <li><Link to="/admin/subjects" className="text-black" onClick={() => document.getElementById('overlay').style.display = 'none'}><FaAngleDoubleRight className="inline mr-2 text-black" /> Subjects</Link></li>
                  <li><Link to="/admin/class" className="text-black" onClick={() => document.getElementById('overlay').style.display = 'none'}><FaAngleDoubleRight className="inline mr-2 text-black" /> Class</Link></li>
                  <li><Link to="/admin/sections" className="text-black" onClick={() => document.getElementById('overlay').style.display = 'none'}><FaAngleDoubleRight className="inline mr-2 text-black" /> Sections</Link></li>
                </ul>
              </div>

              {/* Section: Expenses */}
              <div className="flex-shrink-0 min-w-[200px]">
                <h4 className="font-semibold text-sm text-black mb-3">
                  <FaMoneyBillWave className="inline mr-2 text-black" /> Expenses
                </h4>
                <ul className="space-y-2 text-xs">
                  <li><Link to="/admin/add-expense" className="text-black" onClick={() => document.getElementById('overlay').style.display = 'none'}><FaAngleDoubleRight className="inline mr-2 text-black" /> Add Expenses</Link></li>
                  <li><Link to="/admin/search-expense" className="text-black" onClick={() => document.getElementById('overlay').style.display = 'none'}><FaAngleDoubleRight className="inline mr-2 text-black" /> Search Expenses</Link></li>
                  <li><Link to="/admin/expense-head" className="text-black" onClick={() => document.getElementById('overlay').style.display = 'none'}><FaAngleDoubleRight className="inline mr-2 text-black" /> Expense Head</Link></li>

                </ul>
              </div>

              {/* Section: Fees Collection */}
              <div className="flex-shrink-0 min-w-[200px]">
                <h4 className="font-semibold text-sm text-black mb-3">
                  <FaMoneyBillWave className="inline mr-2 text-black" /> Fees Collection
                </h4>
                <ul className="space-y-2 text-xs">
                  <li><Link to="/admin/collect-fees" className="text-black" onClick={() => document.getElementById('overlay').style.display = 'none'}><FaAngleDoubleRight className="inline mr-2 text-black" /> Collect Fees</Link></li>
                  <li><Link to="/admin/offline-payment" className="text-black" onClick={() => document.getElementById('overlay').style.display = 'none'}><FaAngleDoubleRight className="inline mr-2 text-black" /> Offline Bank Payments</Link></li>
                  <li><Link to="/admin/search-payment" className="text-black" onClick={() => document.getElementById('overlay').style.display = 'none'}><FaAngleDoubleRight className="inline mr-2 text-black" /> Search Fees Payment</Link></li>
                  <li><Link to="/admin/due-fees" className="text-black" onClick={() => document.getElementById('overlay').style.display = 'none'}><FaAngleDoubleRight className="inline mr-2 text-black" /> Search Due Fees</Link></li>
                  <li><Link to="/admin/fees-master" className="text-black" onClick={() => document.getElementById('overlay').style.display = 'none'}><FaAngleDoubleRight className="inline mr-2 text-black" /> Fees Master</Link></li>
                  <li><Link to="/admin/fees-group" className="text-black" onClick={() => document.getElementById('overlay').style.display = 'none'}><FaAngleDoubleRight className="inline mr-2 text-black" /> Fees Group</Link></li>
                  <li><Link to="/admin/fees-type" className="text-black" onClick={() => document.getElementById('overlay').style.display = 'none'}><FaAngleDoubleRight className="inline mr-2 text-black" /> Fees Type</Link></li>
                  <li><Link to="/admin/fees-discount" className="text-black" onClick={() => document.getElementById('overlay').style.display = 'none'}><FaAngleDoubleRight className="inline mr-2 text-black" /> Fees Discount</Link></li>
                  <li><Link to="/admin/fees-carry-forward" className="text-black" onClick={() => document.getElementById('overlay').style.display = 'none'}><FaAngleDoubleRight className="inline mr-2 text-black" /> Fees Carry Forward</Link></li>
                  <li><Link to="/admin/fees-reminder" className="text-black" onClick={() => document.getElementById('overlay').style.display = 'none'}><FaAngleDoubleRight className="inline mr-2 text-black" /> Fees Reminder</Link></li>
                </ul>
              </div>

              {/* Section: Library */}
              <div className="flex-shrink-0 min-w-[200px]">
                <h4 className="font-semibold text-sm text-black mb-3">
                  <FaBook className="inline mr-2 text-black" /> Library
                </h4>
                <ul className="space-y-2 text-xs">
                  <li><Link to="/admin/book-list" className="text-black" onClick={() => document.getElementById('overlay').style.display = 'none'}><FaAngleDoubleRight className="inline mr-2 text-black" /> Book List</Link></li>
                  <li><Link to="/admin/issue-return" className="text-black" onClick={() => document.getElementById('overlay').style.display = 'none'}><FaAngleDoubleRight className="inline mr-2 text-black" /> Issue - Return</Link></li>
                  <li><Link to="/admin/add-student" className="text-black" onClick={() => document.getElementById('overlay').style.display = 'none'}><FaAngleDoubleRight className="inline mr-2 text-black" /> Add Student</Link></li>
                  <li><Link to="/admin/add-staffmember" className="text-black" onClick={() => document.getElementById('overlay').style.display = 'none'}><FaAngleDoubleRight className="inline mr-2 text-black" /> Add Staff Member</Link></li>
                </ul>
              </div>

              {/* Section: Communicate */}
              <div className="flex-shrink-0 min-w-[200px]">
                <h4 className="font-semibold text-sm text-black mb-3">
                  <FaCommentDots className="inline mr-2 text-black" /> Communicate
                </h4>
                <ul className="space-y-2 text-xs">
                  <li><Link to="/admin/notice-board" className="text-black" onClick={() => document.getElementById('overlay').style.display = 'none'}><FaAngleDoubleRight className="inline mr-2 text-black" /> Notice Board</Link></li>
                  <li><Link to="/admin/send-email" className="text-black" onClick={() => document.getElementById('overlay').style.display = 'none'}><FaAngleDoubleRight className="inline mr-2 text-black" /> Send Email</Link></li>
                  <li><Link to="/admin/send-sms" className="text-black" onClick={() => document.getElementById('overlay').style.display = 'none'}><FaAngleDoubleRight className="inline mr-2 text-black" /> Send SMS</Link></li>
                  <li><Link to="/admin/email-sms-log" className="text-black" onClick={() => document.getElementById('overlay').style.display = 'none'}><FaAngleDoubleRight className="inline mr-2 text-black" /> Email / SMS Log</Link></li>
                  <li><Link to="/admin/schedule-email-sms-log" className="text-black" onClick={() => document.getElementById('overlay').style.display = 'none'}><FaAngleDoubleRight className="inline mr-2 text-black" /> Schedule Email SMS Log</Link></li>
                  <li><Link to="/admin/login-credentials-send" className="text-black" onClick={() => document.getElementById('overlay').style.display = 'none'}><FaAngleDoubleRight className="inline mr-2 text-black" /> Login Credentials Send</Link></li>
                  <li><Link to="/admin/email-template" className="text-black" onClick={() => document.getElementById('overlay').style.display = 'none'}><FaAngleDoubleRight className="inline mr-2 text-black" /> Email Template</Link></li>
                  <li><Link to="/admin/sms-template" className="text-black" onClick={() => document.getElementById('overlay').style.display = 'none'}><FaAngleDoubleRight className="inline mr-2 text-black" /> SMS Template</Link></li>
                </ul>
              </div>

              {/* Section: Income */}
              <div className="flex-shrink-0 min-w-[200px]">
                <h4 className="font-semibold text-sm text-black mb-3">
                  <FaDollarSign className="inline mr-2 text-black" /> Income
                </h4>
                <ul className="space-y-2 text-xs">
                  <li><Link to="/admin/add-income" className="text-black" onClick={() => document.getElementById('overlay').style.display = 'none'}><FaAngleDoubleRight className="inline mr-2 text-black" /> Add Income</Link></li>
                  <li><Link to="/admin/search-income" className="text-black" onClick={() => document.getElementById('overlay').style.display = 'none'}><FaAngleDoubleRight className="inline mr-2 text-black" /> Search Income</Link></li>
                  <li><Link to="/admin/income-head" className="text-black" onClick={() => document.getElementById('overlay').style.display = 'none'}><FaAngleDoubleRight className="inline mr-2 text-black" /> Income Head</Link></li>
                </ul>
              </div>

              {/* Section: Human Resource */}
              <div className="flex-shrink-0 min-w-[200px]">
                <h4 className="font-semibold text-sm text-black mb-3">
                  <FaUserTie className="inline mr-2 text-black" /> Human Resource
                </h4>
                <ul className="space-y-2 text-xs">
                  <li><Link to="/admin/staff-directory" className="text-black" onClick={() => document.getElementById('overlay').style.display = 'none'}><FaAngleDoubleRight className="inline mr-2 text-black" /> Staff Directory</Link></li>
                  <li><Link to="/admin/staff-attendance" className="text-black" onClick={() => document.getElementById('overlay').style.display = 'none'}><FaAngleDoubleRight className="inline mr-2 text-black" /> Staff Attendance</Link></li>
                  <li><Link to="/admin/payroll" className="text-black" onClick={() => document.getElementById('overlay').style.display = 'none'}><FaAngleDoubleRight className="inline mr-2 text-black" /> Payroll</Link></li>
                  <li><Link to="/admin/approve-leave-request" className="text-black" onClick={() => document.getElementById('overlay').style.display = 'none'}><FaAngleDoubleRight className="inline mr-2 text-black" /> Approve Leave Request</Link></li>
                  <li><Link to="/admin/apply-leave" className="text-black" onClick={() => document.getElementById('overlay').style.display = 'none'}><FaAngleDoubleRight className="inline mr-2 text-black" /> Apply Leave</Link></li>
                  <li><Link to="/admin/leave-type" className="text-black" onClick={() => document.getElementById('overlay').style.display = 'none'}><FaAngleDoubleRight className="inline mr-2 text-black" /> Leave Type</Link></li>
                  <li><Link to="/admin/teachers-rating" className="text-black" onClick={() => document.getElementById('overlay').style.display = 'none'}><FaAngleDoubleRight className="inline mr-2 text-black" /> Teachers Rating</Link></li>
                  <li><Link to="/admin/department" className="text-black" onClick={() => document.getElementById('overlay').style.display = 'none'}><FaAngleDoubleRight className="inline mr-2 text-black" /> Department</Link></li>
                  <li><Link to="/admin/designation" className="text-black" onClick={() => document.getElementById('overlay').style.display = 'none'}><FaAngleDoubleRight className="inline mr-2 text-black" /> Designation</Link></li>
                  <li><Link to="/admin/disabled-staff" className="text-black" onClick={() => document.getElementById('overlay').style.display = 'none'}><FaAngleDoubleRight className="inline mr-2 text-black" /> Disabled Staff</Link></li>
                </ul>
              </div>

              {/* Section: Attendance */}
              <div className="flex-shrink-0 min-w-[200px]">
                <h4 className="font-semibold text-black mb-3">
                  <FaUserClock className="inline mr-2 text-black" /> Attendance
                </h4>
                <ul className="space-y-2 text-xs">
                  <li><Link to="/admin/student-attendance" className="text-black" onClick={() => document.getElementById('overlay').style.display = 'none'}><FaAngleDoubleRight className="inline mr-2 text-black" /> Student Attendance</Link></li>
                  <li><Link to="/admin/approve-leave" className="text-black" onClick={() => document.getElementById('overlay').style.display = 'none'}><FaAngleDoubleRight className="inline mr-2 text-black" /> Approve Leave</Link></li>
                  <li><Link to="/admin/attendance-by-date" className="text-black" onClick={() => document.getElementById('overlay').style.display = 'none'}><FaAngleDoubleRight className="inline mr-2 text-black" /> Attendance By Date</Link></li>
                </ul>
              </div>

              {/* Section: Certificate */}
              <div className="flex-shrink-0 min-w-[200px]">
                <h4 className="font-semibold text-black mb-3">
                  <FaCertificate className="inline mr-2 text-black" /> Certificate
                </h4>
                <ul className="space-y-2 text-xs">
                  <li><Link to="/admin/student-certificate" className="text-black" onClick={() => document.getElementById('overlay').style.display = 'none'}><FaAngleDoubleRight className="inline mr-2 text-black" /> Student Certificate</Link></li>
                  <li><Link to="/admin/generate-certificate" className="text-black" onClick={() => document.getElementById('overlay').style.display = 'none'}><FaAngleDoubleRight className="inline mr-2 text-black" /> Generate Certificate</Link></li>
                  <li><Link to="/admin/student-id-card" className="text-black" onClick={() => document.getElementById('overlay').style.display = 'none'}><FaAngleDoubleRight className="inline mr-2 text-black" /> Student ID Card</Link></li>
                  <li><Link to="/admin/generate-id-card" className="text-black" onClick={() => document.getElementById('overlay').style.display = 'none'}><FaAngleDoubleRight className="inline mr-2 text-black" /> Generate ID Card</Link></li>
                  <li><Link to="/admin/staff-id-card" className="text-black" onClick={() => document.getElementById('overlay').style.display = 'none'}><FaAngleDoubleRight className="inline mr-2 text-black" /> Staff ID Card</Link></li>
                  <li><Link to="/admin/generate-staff-id-card" className="text-black" onClick={() => document.getElementById('overlay').style.display = 'none'}><FaAngleDoubleRight className="inline mr-2 text-black" /> Generate Staff ID Card</Link></li>
                </ul>
              </div>

              {/* Section: Front CMS */}
              <div className="flex-shrink-0 min-w-[200px]">
                <h4 className="font-semibold text-black mb-3">
                  <FaDesktop className="inline mr-2 text-black" /> Front CMS
                </h4>
                <ul className="space-y-2 text-xs">
                  <li><Link to="/admin/event" className="text-black" onClick={() => document.getElementById('overlay').style.display = 'none'}><FaAngleDoubleRight className="inline mr-2 text-black" /> Event</Link></li>
                  <li><Link to="/admin/gallery" className="text-black" onClick={() => document.getElementById('overlay').style.display = 'none'}><FaAngleDoubleRight className="inline mr-2 text-black" /> Gallery</Link></li>
                  <li><Link to="/admin/news" className="text-black" onClick={() => document.getElementById('overlay').style.display = 'none'}><FaAngleDoubleRight className="inline mr-2 text-black" /> News</Link></li>
                  <li><Link to="/admin/media-manager" className="text-black" onClick={() => document.getElementById('overlay').style.display = 'none'}><FaAngleDoubleRight className="inline mr-2 text-black" /> Media Manager</Link></li>
                  <li><Link to="/admin/pages" className="text-black" onClick={() => document.getElementById('overlay').style.display = 'none'}><FaAngleDoubleRight className="inline mr-2 text-black" /> Pages</Link></li>
                  <li><Link to="/admin/menus" className="text-black" onClick={() => document.getElementById('overlay').style.display = 'none'}><FaAngleDoubleRight className="inline mr-2 text-black" /> Menus</Link></li>
                  <li><Link to="/admin/banner-images" className="text-black" onClick={() => document.getElementById('overlay').style.display = 'none'}><FaAngleDoubleRight className="inline mr-2 text-black" /> Banner Images</Link></li>
                </ul>
              </div>

              {/* Section: Online Examinations */}
              <div className="flex-shrink-0 min-w-[200px]">
                <h4 className="font-semibold text-black mb-3">
                  <FaRegFileAlt className="inline mr-2 text-black" /> Online Examinations
                </h4>
                <ul className="space-y-2 text-xs">
                  <li><Link to="/admin/online-exam" className="text-black" onClick={() => document.getElementById('overlay').style.display = 'none'}><FaAngleDoubleRight className="inline mr-2 text-black" /> Online Exam</Link></li>
                  <li><Link to="/admin/question-bank" className="text-black" onClick={() => document.getElementById('overlay').style.display = 'none'}><FaAngleDoubleRight className="inline mr-2 text-black" /> Question Bank</Link></li>
                </ul>
              </div>

              {/* Section: Lesson Plan */}
              <div className="flex-shrink-0 min-w-[200px]">
                <h4 className="font-semibold text-black mb-3">
                  <FaBook className="inline mr-2 text-black" /> Lesson Plan
                </h4>
                <ul className="space-y-2 text-xs">
                  <li><Link to="/admin/copy-old-lessons" className="text-black" onClick={() => document.getElementById('overlay').style.display = 'none'}><FaAngleDoubleRight className="inline mr-2 text-black" /> Copy Old Lessons</Link></li>
                  <li><Link to="/admin/manage-lesson-plan" className="text-black" onClick={() => document.getElementById('overlay').style.display = 'none'}><FaAngleDoubleRight className="inline mr-2 text-black" /> Manage Lesson Plan</Link></li>
                  <li><Link to="/admin/manage-syllabus-status" className="text-black" onClick={() => document.getElementById('overlay').style.display = 'none'}><FaAngleDoubleRight className="inline mr-2 text-black" /> Manage Syllabus Status</Link></li>
                  <li><Link to="/admin/lesson" className="text-black" onClick={() => document.getElementById('overlay').style.display = 'none'}><FaAngleDoubleRight className="inline mr-2 text-black" /> Lesson</Link></li>
                  <li><Link to="/admin/topic" className="text-black" onClick={() => document.getElementById('overlay').style.display = 'none'}><FaAngleDoubleRight className="inline mr-2 text-black" /> Topic</Link></li>
                </ul>
              </div>

              {/* Section: Reports */}
              <div className="flex-shrink-0 min-w-[200px]">
                <h4 className="font-semibold text-black mb-3">
                  <FaFileAlt className="inline mr-2 text-black" /> Reports
                </h4>
                <ul className="space-y-2 text-xs">
                  <li><Link to="/admin/student-information-report" className="text-black" onClick={() => document.getElementById('overlay').style.display = 'none'}><FaAngleDoubleRight className="inline mr-2 text-black" /> Student Information</Link></li>
                  <li><Link to="/admin/finance-report" className="text-black" onClick={() => document.getElementById('overlay').style.display = 'none'}><FaAngleDoubleRight className="inline mr-2 text-black" /> Finance</Link></li>
                  <li><Link to="/admin/attendance-report" className="text-black" onClick={() => document.getElementById('overlay').style.display = 'none'}><FaAngleDoubleRight className="inline mr-2 text-black" /> Attendance</Link></li>
                  <li><Link to="/admin/examinations-report" className="text-black" onClick={() => document.getElementById('overlay').style.display = 'none'}><FaAngleDoubleRight className="inline mr-2 text-black" /> Examinations</Link></li>
                  <li><Link to="/admin/online-examinations-report" className="text-black" onClick={() => document.getElementById('overlay').style.display = 'none'}><FaAngleDoubleRight className="inline mr-2 text-black" /> Online Examinations</Link></li>
                  <li><Link to="/admin/lesson-plan-report" className="text-black" onClick={() => document.getElementById('overlay').style.display = 'none'}><FaAngleDoubleRight className="inline mr-2 text-black" /> Lesson Plan</Link></li>
                  <li><Link to="/admin/human-resource-report" className="text-black" onClick={() => document.getElementById('overlay').style.display = 'none'}><FaAngleDoubleRight className="inline mr-2 text-black" /> Human Resource</Link></li>
                  <li><Link to="/admin/homework-report" className="text-black" onClick={() => document.getElementById('overlay').style.display = 'none'}><FaAngleDoubleRight className="inline mr-2 text-black" /> Homework</Link></li>
                  <li><Link to="/admin/library-report" className="text-black" onClick={() => document.getElementById('overlay').style.display = 'none'}><FaAngleDoubleRight className="inline mr-2 text-black" /> Library</Link></li>
                  <li><Link to="/admin/inventory-report" className="text-black" onClick={() => document.getElementById('overlay').style.display = 'none'}><FaAngleDoubleRight className="inline mr-2 text-black" /> Inventory</Link></li>
                  <li><Link to="/admin/transport-report" className="text-black" onClick={() => document.getElementById('overlay').style.display = 'none'}><FaAngleDoubleRight className="inline mr-2 text-black" /> Transport</Link></li>
                  <li><Link to="/admin/hostel-report" className="text-black" onClick={() => document.getElementById('overlay').style.display = 'none'}><FaAngleDoubleRight className="inline mr-2 text-black" /> Hostel</Link></li>
                  <li><Link to="/admin/alumni-report" className="text-black" onClick={() => document.getElementById('overlay').style.display = 'none'}><FaAngleDoubleRight className="inline mr-2 text-black" /> Alumni</Link></li>
                  <li><Link to="/admin/user-log-report" className="text-black" onClick={() => document.getElementById('overlay').style.display = 'none'}><FaAngleDoubleRight className="inline mr-2 text-black" /> User Log</Link></li>
                  <li><Link to="/admin/audit-trail-report" className="text-black" onClick={() => document.getElementById('overlay').style.display = 'none'}><FaAngleDoubleRight className="inline mr-2 text-black" /> Audit Trail Report</Link></li>
                </ul>
              </div>

              {/* Section: System Setting */}
              <div className="flex-shrink-0 min-w-[200px]">
                <h4 className="font-semibold text-black mb-3">
                  <FaCog className="inline mr-2 text-black" /> System Setting
                </h4>
                <ul className="space-y-2 text-xs">
                  <li><Link to="/admin/session-setting" className="text-black" onClick={() => document.getElementById('overlay').style.display = 'none'}><FaAngleDoubleRight className="inline mr-2 text-black" /> Session Setting</Link></li>
                  <li><Link to="/admin/notification-setting" className="text-black" onClick={() => document.getElementById('overlay').style.display = 'none'}><FaAngleDoubleRight className="inline mr-2 text-black" /> Notification Setting</Link></li>
                  <li><Link to="/admin/sms-setting" className="text-black" onClick={() => document.getElementById('overlay').style.display = 'none'}><FaAngleDoubleRight className="inline mr-2 text-black" /> SMS Setting</Link></li>
                  <li><Link to="/admin/email-setting" className="text-black" onClick={() => document.getElementById('overlay').style.display = 'none'}><FaAngleDoubleRight className="inline mr-2 text-black" /> Email Setting</Link></li>
                  <li><Link to="/admin/payment-methods" className="text-black" onClick={() => document.getElementById('overlay').style.display = 'none'}><FaAngleDoubleRight className="inline mr-2 text-black" /> Payment Methods</Link></li>
                  <li><Link to="/admin/general-setting" className="text-black" onClick={() => document.getElementById('overlay').style.display = 'none'}><FaAngleDoubleRight className="inline mr-2 text-black" /> General Setting</Link></li>
                  <li><Link to="/admin/print-header-footer" className="text-black" onClick={() => document.getElementById('overlay').style.display = 'none'}><FaAngleDoubleRight className="inline mr-2 text-black" /> Print Header Footer</Link></li>
                  <li><Link to="/admin/front-cms-setting" className="text-black" onClick={() => document.getElementById('overlay').style.display = 'none'}><FaAngleDoubleRight className="inline mr-2 text-black" /> Front CMS Setting</Link></li>
                  <li><Link to="/admin/roles-permissions" className="text-black" onClick={() => document.getElementById('overlay').style.display = 'none'}><FaAngleDoubleRight className="inline mr-2 text-black" /> Roles Permissions</Link></li>
                  <li><Link to="/admin/backup-restore" className="text-black" onClick={() => document.getElementById('overlay').style.display = 'none'}><FaAngleDoubleRight className="inline mr-2 text-black" /> Backup Restore</Link></li>
                  <li><Link to="/admin/languages" className="text-black" onClick={() => document.getElementById('overlay').style.display = 'none'}><FaAngleDoubleRight className="inline mr-2 text-black" /> Languages</Link></li>
                  <li><Link to="/admin/currency" className="text-black" onClick={() => document.getElementById('overlay').style.display = 'none'}><FaAngleDoubleRight className="inline mr-2 text-black" /> Currency</Link></li>
                  <li><Link to="/admin/users" className="text-black" onClick={() => document.getElementById('overlay').style.display = 'none'}><FaAngleDoubleRight className="inline mr-2 text-black" /> Users</Link></li>
                  <li><Link to="/admin/modules" className="text-black" onClick={() => document.getElementById('overlay').style.display = 'none'}><FaAngleDoubleRight className="inline mr-2 text-black" /> Modules</Link></li>
                  <li><Link to="/admin/custom-fields" className="text-black" onClick={() => document.getElementById('overlay').style.display = 'none'}><FaAngleDoubleRight className="inline mr-2 text-black" /> Custom Fields</Link></li>
                  <li><Link to="/admin/captcha-setting" className="text-black" onClick={() => document.getElementById('overlay').style.display = 'none'}><FaAngleDoubleRight className="inline mr-2 text-black" /> Captcha Setting</Link></li>
                  <li><Link to="/admin/system-fields" className="text-black" onClick={() => document.getElementById('overlay').style.display = 'none'}><FaAngleDoubleRight className="inline mr-2 text-black" /> System Fields</Link></li>
                  <li><Link to="/admin/student-profile-update" className="text-black" onClick={() => document.getElementById('overlay').style.display = 'none'}><FaAngleDoubleRight className="inline mr-2 text-black" /> Student Profile Update</Link></li>
                  <li><Link to="/admin/online-admission" className="text-black" onClick={() => document.getElementById('overlay').style.display = 'none'}><FaAngleDoubleRight className="inline mr-2 text-black" /> Online Admission</Link></li>
                  <li><Link to="/admin/file-types" className="text-black" onClick={() => document.getElementById('overlay').style.display = 'none'}><FaAngleDoubleRight className="inline mr-2 text-black" /> File Types</Link></li>
                  <li><Link to="/admin/sidebar-menu" className="text-black" onClick={() => document.getElementById('overlay').style.display = 'none'}><FaAngleDoubleRight className="inline mr-2 text-black" /> Sidebar Menu</Link></li>
                  <li><Link to="/admin/system-update" className="text-black" onClick={() => document.getElementById('overlay').style.display = 'none'}><FaAngleDoubleRight className="inline mr-2 text-black" /> System Update</Link></li>
                </ul>
              </div>



            </div>
          </div>
        </li>





        {/* Front Office Dropdown */}

        <li>
          <button
            onClick={() => setFrontOfficeDropdownOpen(!frontOfficeDropdownOpen)}
            className="flex items-center justify-between w-full p-2 rounded hover:bg-gray-700"
          >
            <div className="flex items-center space-x-2">
              <FaClipboardList className={`${iconClasses} text-blue-400`} />
              {(isOpen || isHovered) && (
                <span className="font-medium text-sm">Front Office</span>
              )}
            </div>
            {(isOpen || isHovered) &&
              (frontOfficeDropdownOpen ? <FaChevronUp /> : <FaChevronDown />)}
          </button>
          {frontOfficeDropdownOpen && (
            <ul className="ml-8 mt-1 space-y-1">
              <li>
                <Link
                  to="/admin/admission-enquiry"
                  className="block p-2 text-sm rounded hover:bg-gray-700"
                >
                  Admission Enquiry
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/visitor-books"
                  className="block p-2 text-sm rounded hover:bg-gray-700"
                >
                  Visitor Books
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/phone-call"
                  className="block p-2 text-sm rounded hover:bg-gray-700"
                >
                  Phone Call Log
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/postal-dispatch"
                  className="block p-2 text-sm rounded hover:bg-gray-700"
                >
                  postal Dispatch
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/postal-receive"
                  className="block p-2 text-sm rounded hover:bg-gray-700"
                >
                  Postal Receive
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/complaint"
                  className="block p-2 text-sm rounded hover:bg-gray-700"
                >
                  Complaint
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/setup-frontoffice"
                  className="block p-2 text-sm rounded hover:bg-gray-700"
                >
                  Setup Front Office
                </Link>
              </li>
            </ul>
          )}
        </li>



        {/* Student Information Dropdown */}

        <li>
          <button
            onClick={toggleStudentInfoDropdown}
            className="flex items-center justify-between w-full p-2 rounded hover:bg-gray-700"
          >
            <div className="flex items-center space-x-2">
              <FaUserAlt className={`${iconClasses} text-blue-400`} />
              {(isOpen || isHovered) && <span className="font-medium text-sm">Student Information</span>}
            </div>
            {(isOpen || isHovered) &&
              (studentInfoDropdownOpen ? <FaChevronUp /> : <FaChevronDown />)}
          </button>
          {studentInfoDropdownOpen && (
            <ul className="ml-8 mt-1 space-y-1">
              {showStudent &&
                <li>
                  <Link
                    to="/admin/student-details"
                    className="block p-2 text-sm rounded hover:bg-gray-700"
                  >
                    Student Details
                  </Link>
                </li>
              }
              <li>
                <Link
                  to="/admin/student-admission"
                  className="block p-2 text-sm rounded hover:bg-gray-700"
                >
                  Student Admission
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/online-admission"
                  className="block p-2 text-sm rounded hover:bg-gray-700"
                >
                  Online Admission
                </Link>
              </li>
              {showDisableStudent &&
              <li>
                <Link
                  to="/admin/disable-student"
                  className="block p-2 text-sm rounded hover:bg-gray-700"
                >
                  Disable Student
                </Link>
              </li>
  }
              <li>
                <Link
                  to="/admin/multiclass-student"
                  className="block p-2 text-sm rounded hover:bg-gray-700"
                >
                  Multi Class Student
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/bulk-delete"
                  className="block p-2 text-sm rounded hover:bg-gray-700"
                >
                  Bulk Delete
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/student-categories"
                  className="block p-2 text-sm rounded hover:bg-gray-700"
                >
                  Student Categories
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/disable-reason"
                  className="block p-2 text-sm rounded hover:bg-gray-700"
                >
                  Disable Reason
                </Link>
              </li>
              {showStudentHouses &&
                <li>
                  <Link
                    to="/admin/student-house"
                    className="block p-2 text-sm rounded hover:bg-gray-700"
                  >
                    Student House
                  </Link>
                </li>
              }
            </ul>
          )}
        </li>

        {/* Fees Collection Dropdown */}
        {enabledItems.System["Fees Collection"] &&

          <li>
            <button
              onClick={toggleFeesCollectionDropdown}
              className="flex items-center justify-between w-full p-2 rounded hover:bg-gray-700"
            >
              <div className="flex items-center space-x-2">
                <FaUserAlt className={`${iconClasses} text-blue-400`} />
                {(isOpen || isHovered) && <span className="font-medium text-sm">Fees Collection</span>}
              </div>
              {(isOpen || isHovered) &&
                (feesCollectionDropdownOpen ? <FaChevronUp /> : <FaChevronDown />)}
            </button>
            {feesCollectionDropdownOpen && (
              <ul className="ml-8 mt-1 space-y-1">
                <li>
                  <Link
                    to="/admin/collect-fees"
                    className="block p-2 text-sm rounded hover:bg-gray-700"
                  >
                    Collect Fees
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/offline-payment"
                    className="block p-2 text-sm rounded hover:bg-gray-700"
                  >
                    Offline Bank Payments
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/search-payment"
                    className="block p-2 text-sm rounded hover:bg-gray-700"
                  >
                    Search Fees Payment
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/due-fees"
                    className="block p-2 text-sm rounded hover:bg-gray-700"
                  >
                    Search Due Fees
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/fee-group"
                    className="block p-2 text-sm rounded hover:bg-gray-700"
                  >
                    Fees Group
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/fees-master"
                    className="block p-2 text-sm rounded hover:bg-gray-700"
                  >
                    Fees Master
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/fee-type"
                    className="block p-2 text-sm rounded hover:bg-gray-700"
                  >
                    Fees Type
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/fees-discount"
                    className="block p-2 text-sm rounded hover:bg-gray-700"
                  >
                    Fees Discount
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/fees-reminder"
                    className="block p-2 text-sm rounded hover:bg-gray-700"
                  >
                    Fees reminder
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/fees-carry"
                    className="block p-2 text-sm rounded hover:bg-gray-700"
                  >
                    Fees Carry Forward
                  </Link>
                </li>
              </ul>
            )}
          </li>
        }
        {/* income dropdown */}

        <li>
          <button
            onClick={toggleIncomeDropdown}
            className="flex items-center justify-between w-full p-2 rounded hover:bg-gray-700"
          >
            <div className="flex items-center space-x-2">
              <FaDollarSign className={`${iconClasses} text-blue-400`} />
              {(isOpen || isHovered) && <span className="font-medium text-sm">Income</span>}
            </div>
            {(isOpen || isHovered) &&
              (incomeDropdownOpen ? <FaChevronUp /> : <FaChevronDown />)}
          </button>
          {incomeDropdownOpen && (
            <ul className="ml-8 mt-1 space-y-1">
              <li>
                <Link
                  to="/admin/add-income"
                  className="block p-2 text-sm rounded hover:bg-gray-700"
                >
                  Add Income
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/search-income"
                  className="block p-2 text-sm rounded hover:bg-gray-700"
                >
                  Search Income
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/income-head"
                  className="block p-2 text-sm rounded hover:bg-gray-700"
                >
                  Income Head
                </Link>
              </li>
            </ul>
          )}
        </li>


        {/* Academics Dropdown */}

        <li>
          <button
            onClick={toggleAcademicsDropdown}
            className="flex items-center justify-between w-full p-2 rounded hover:bg-gray-700"
          >
            <div className="flex items-center space-x-2">
              <FaChalkboardTeacher className={`${iconClasses} text-blue-400`} />
              {(isOpen || isHovered) && <span className="font-medium text-sm">Academics</span>}
            </div>
            {(isOpen || isHovered) &&
              (academicsDropdownOpen ? <FaChevronUp /> : <FaChevronDown />)}
          </button>
          {academicsDropdownOpen && (
            <ul className="ml-8 mt-1 space-y-1">
              <li>
                <Link
                  to="/admin/class-timetable"
                  className="block p-2 text-sm rounded hover:bg-gray-700"
                >
                  Class Timetable
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/assign-classteacher"
                  className="block p-2 text-sm rounded hover:bg-gray-700"
                >
                  Assign Class Teacher
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/teacher-timetable"
                  className="block p-2 text-sm rounded hover:bg-gray-700"
                >
                  Teacher Timetable
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/promote-students"
                  className="block p-2 text-sm rounded hover:bg-gray-700"
                >
                  Promote Students
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/Subject-group"
                  className="block p-2 text-sm rounded hover:bg-gray-700"
                >
                  Subject Group
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/subjects"
                  className="block p-2 text-sm rounded hover:bg-gray-700"
                >
                  Subjects
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/class"
                  className="block p-2 text-sm rounded hover:bg-gray-700"
                >
                  Class
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/Sections"
                  className="block p-2 text-sm rounded hover:bg-gray-700"
                >
                  Sections
                </Link>
              </li>
            </ul>
          )}
        </li>

        {/* Attendance Dropdown */}

        <li>
          <button
            onClick={toggleAttendanceDropdown}
            className="flex items-center justify-between w-full p-2 rounded hover:bg-gray-700"
          >
            <div className="flex items-center space-x-2">
              <FaCalendarAlt className={`${iconClasses} text-blue-400`} />
              {(isOpen || isHovered) && <span className="font-medium text-sm">Attendance</span>}
            </div>
            {(isOpen || isHovered) &&
              (attendanceDropdownOpen ? <FaChevronUp /> : <FaChevronDown />)}
          </button>
          {attendanceDropdownOpen && (
            <ul className="ml-8 mt-1 space-y-1">
              <li>
                <Link
                  to="/admin/student-attendance"
                  className="block p-2 text-sm rounded hover:bg-gray-700"
                >
                  Student Attendance
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/approve-leaves"
                  className="block p-2 text-sm rounded hover:bg-gray-700"
                >
                  Approve Leave
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/attendence-bydate"
                  className="block p-2 text-sm rounded hover:bg-gray-700"
                >
                  Attendence By date
                </Link>
              </li>
            </ul>
          )}
        </li>

        {/* Examination Dropdown */}

        <li>
          <button
            onClick={toggleExaminationDropdown} // Toggle the Examination dropdown
            className="flex items-center justify-between w-full p-2 rounded hover:bg-gray-700"
          >
            <div className="flex items-center space-x-2">
              <FaChalkboardTeacher className={`${iconClasses} text-blue-400`} />
              {(isOpen || isHovered) && <span className="font-medium text-sm">Examination</span>}
            </div>
            {(isOpen || isHovered) &&
              (examinationDropdownOpen ? <FaChevronUp /> : <FaChevronDown />)}
          </button>
          {examinationDropdownOpen && (
            <ul className="ml-8 mt-1 space-y-1">
              <li>
                <Link
                  to="/admin/exam-group"
                  className="block p-2 text-sm rounded hover:bg-gray-700"
                >
                  Exam Group
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/exam-schedule"
                  className="block p-2 text-sm rounded hover:bg-gray-700"
                >
                  Exam Schedule
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/exam-result"
                  className="block p-2 text-sm rounded hover:bg-gray-700"
                >
                  Exam Result
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/design-admitcard"
                  className="block p-2 text-sm rounded hover:bg-gray-700"
                >
                  Design Admit Card
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/print-admitcard"
                  className="block p-2 text-sm rounded hover:bg-gray-700"
                >
                  Print Admit Card
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/design-marksheet"
                  className="block p-2 text-sm rounded hover:bg-gray-700"
                >
                  Design Marksheet
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/print-marksheet"
                  className="block p-2 text-sm rounded hover:bg-gray-700"
                >
                  Print Marksheet
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/marks-grade"
                  className="block p-2 text-sm rounded hover:bg-gray-700"
                >
                  Marks Grade
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/marks-division"
                  className="block p-2 text-sm rounded hover:bg-gray-700"
                >
                  Marks Division
                </Link>
              </li>
            </ul>
          )}
        </li>

        {/* Library Dropdown */}

        <li>
          <button
            onClick={toggleLibraryDropdown}
            className="flex items-center justify-between w-full p-2 rounded hover:bg-gray-700"
          >
            <div className="flex items-center space-x-2">
              <FaBook className={`${iconClasses} text-blue-400`} />
              {(isOpen || isHovered) && <span className="font-medium text-sm">Library</span>}
            </div>
            {(isOpen || isHovered) &&
              (libraryDropdownOpen ? <FaChevronUp /> : <FaChevronDown />)}
          </button>
          {libraryDropdownOpen && (
            <ul className="ml-6 mt-1 space-y-1">
              <li>
                <Link
                  to="/admin/book-list"
                  className="block p-2 text-sm rounded hover:bg-gray-700"
                >
                  Book List
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/issue-return"
                  className="block p-2 text-sm rounded hover:bg-gray-700"
                >
                  Issue-Return
                </Link>
                <li>
                  <Link
                    to="/admin/add-student"
                    className="block p-2 text-sm rounded hover:bg-gray-700"
                  >
                    Add Student
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/add-staffmember"
                    className="block p-2 text-sm rounded hover:bg-gray-700"
                  >
                    Add staff Member
                  </Link>
                </li>
              </li>
            </ul>
          )}
        </li>

        {/* Communicate Dropdown */}

        <li>
          <button
            onClick={toggleCommunicateDropdown}
            className="flex items-center justify-between w-full p-2 rounded hover:bg-gray-700"
          >
            <div className="flex items-center space-x-2">
              <FaComments className={`${iconClasses} text-blue-400`} />
              {(isOpen || isHovered) && <span className="font-medium text-sm">Communicate</span>}
            </div>
            {(isOpen || isHovered) &&
              (communicateDropdownOpen ? <FaChevronUp /> : <FaChevronDown />)}
          </button>
          {communicateDropdownOpen && (
            <ul className="ml-8 mt-1 space-y-1">
              <li>
                <Link to="/admin/compose" className="block p-2 text-sm rounded hover:bg-gray-700">
                  Notice Board
                </Link>
              </li>
              <li>
                <Link to="/admin/send-email" className="block p-2 text-sm rounded hover:bg-gray-700">
                  Send Email
                </Link>
              </li>
              <li>
                <Link to="/admin/send-sms" className="block p-2 text-sm rounded hover:bg-gray-700">
                  Send SMS
                </Link>
              </li>
              <li>
                <Link to="/admin/login-credential" className="block p-2 text-sm rounded hover:bg-gray-700">
                  Login Credentials Send
                </Link>
              </li>
              <li>
                <Link to="/admin/email-sms" className="block p-2 text-sm rounded hover:bg-gray-700">
                  Email / SMS Log
                </Link>
              </li>
              <li>
                <Link to="/admin/schedule-emailsms" className="block p-2 text-sm rounded hover:bg-gray-700">
                  Schedule Email SMS Log
                </Link>
              </li>
              <li>
                <Link to="/admin/email-template" className="block p-2 text-sm rounded hover:bg-gray-700">
                  Email Template
                </Link>
              </li>
              <li>
                <Link to="/admin/sms-template" className="block p-2 text-sm rounded hover:bg-gray-700">
                  SMS Template
                </Link>
              </li>
            </ul>
          )}
        </li>


        {/* Expenses Dropdown */}

        <li>
          <button
            onClick={toggleExpensesDropdown}
            className="flex items-center justify-between w-full p-2 rounded hover:bg-gray-700"
          >
            <div className="flex items-center space-x-2">
              <FaMoneyBill className={`${iconClasses} text-blue-400`} />
              {(isOpen || isHovered) && <span className="font-medium text-sm">Expenses</span>}
            </div>
            {(isOpen || isHovered) &&
              (expensesDropdownOpen ? <FaChevronUp /> : <FaChevronDown />)}
          </button>
          {expensesDropdownOpen && (
            <ul className="ml-8 mt-1 space-y-1">
              <li>
                <Link to="/admin/add-expense" className="block p-2 text-sm rounded hover:bg-gray-700">
                  Add Expense
                </Link>
              </li>
              <li>
                <Link to="/admin/search-expense" className="block p-2 text-sm rounded hover:bg-gray-700">
                  Search Expense
                </Link>
              </li>
              <li>
                <Link to="/admin/expense-head" className="block p-2 text-sm rounded hover:bg-gray-700">
                  Expense Head
                </Link>
              </li>
            </ul>
          )}
        </li>




        {/* Online Exam Dropdown */}

        <li>
          <button
            onClick={() => setOnlineExaminationDropdownOpen(!onlineExaminationDropdownOpen)} // Toggle dropdown visibility
            className="flex items-center justify-between w-full p-2 rounded hover:bg-gray-700"
          >
            <div className="flex items-center space-x-2">
              <FaClipboardList className={`${iconClasses} text-blue-400`} /> {/* Icon for Online Exams */}
              <span className="font-medium text-sm">Online Examinations</span> {/* Title */}
            </div>
            {onlineExaminationDropdownOpen ? <FaChevronUp /> : <FaChevronDown />} {/* Toggle icon */}
          </button>

          {/* Dropdown content */}
          {onlineExaminationDropdownOpen && (
            <ul className="ml-8 mt-1 space-y-1">
              <li>
                <Link to="/admin/online-exams" className="block p-2 text-sm rounded hover:bg-gray-700">
                  Online Exams {/* Link for Online Exams */}
                </Link>
              </li>
              <li>
                <Link to="/admin/question-bank" className="block p-2 text-sm rounded hover:bg-gray-700">
                  Question Bank {/* Link for Question Bank */}
                </Link>
              </li>
            </ul>
          )}
        </li>


        {/* Human Resource dropdown */}


        <li>
          <button
            onClick={() => setHumanResourceDropdownOpen(!humanresourceDropdownOpen)}
            className="flex items-center justify-between w-full p-2 rounded hover:bg-gray-700"
          >
            <div className="flex items-center space-x-2">
              <FaUsers className={`${iconClasses} text-blue-400`} />
              {(isOpen || isHovered) && <span className="font-medium text-sm">Human Resource</span>}
            </div>
            {(isOpen || isHovered) &&
              (humanresourceDropdownOpen ? <FaChevronUp /> : <FaChevronDown />)}
          </button>
          {humanresourceDropdownOpen && (
            <ul className="ml-8 mt-1 space-y-1">
              <li>
                <Link to="/admin/staff-directory" className="block p-2 text-sm rounded hover:bg-gray-700">
                  Staff Directory
                </Link>
              </li>
              <li>
                <Link to="/admin/staff-attendence" className="block p-2 text-sm rounded hover:bg-gray-700">
                  Staff Attendence
                </Link>

              </li>
              <li>
                <Link to="/admin/payroll" className="block p-2 text-sm rounded hover:bg-gray-700">
                  Payroll
                </Link>

              </li>
              <li>
                <Link to="/admin/aprove-leave" className="block p-2 text-sm rounded hover:bg-gray-700">
                  Approve Leave Request
                </Link>

              </li>
              <li>
                <Link to="/admin/apply-leave" className="block p-2 text-sm rounded hover:bg-gray-700">
                  Apply Leave
                </Link>

              </li>
              <li>
                <Link to="/admin/leave-type" className="block p-2 text-sm rounded hover:bg-gray-700">
                  Leave Type
                </Link>

              </li>
              <li>
                <Link to="/admin/teachers-rating" className="block p-2 text-sm rounded hover:bg-gray-700">
                  Teachers Rating
                </Link>

              </li>
              <li>
                <Link to="/admin/department" className="block p-2 text-sm rounded hover:bg-gray-700">
                  Department
                </Link>

              </li>
              <li>
                <Link to="/admin/designation" className="block p-2 text-sm rounded hover:bg-gray-700">
                  Designation
                </Link>

              </li>
              <li>
                <Link to="/admin/disabled-staff" className="block p-2 text-sm rounded hover:bg-gray-700">
                  Disabled Staff
                </Link>

              </li>
            </ul>
          )}
        </li>

        {/* Reports Dropdown */}

        <li>
          <button
            onClick={() => setReportsDropdownOpen(!reportsDropdownOpen)} // Toggle the Reports dropdown
            className="flex items-center justify-between w-full p-2 rounded hover:bg-gray-700"
          >
            <div className="flex items-center space-x-2">
              <FaClipboardList className={`${iconClasses} text-blue-400`} />
              {(isOpen || isHovered) && <span className="font-medium text-sm">Reports</span>}
            </div>
            {(isOpen || isHovered) &&
              (reportsDropdownOpen ? <FaChevronUp /> : <FaChevronDown />)}
          </button>
          {reportsDropdownOpen && (
            <ul className="ml-8 mt-1 space-y-1">
              <li>
                <Link to="/admin/student-reports" className="block p-2 text-sm rounded hover:bg-gray-700">
                  Student Information
                </Link>
              </li>
              <li>
                <Link to="/admin/finance-reports" className="block p-2 text-sm rounded hover:bg-gray-700">
                  Finance
                </Link>
              </li>
              <li>
                <Link to="/admin/attendance-reports" className="block p-2 text-sm rounded hover:bg-gray-700">
                  Attendance
                </Link>
              </li>
              <li>
                <Link to="/admin/examinations-reports" className="block p-2 text-sm rounded hover:bg-gray-700">
                  Examinations
                </Link>
              </li>
              <li>
                <Link to="/admin/onlineexam-reports" className="block p-2 text-sm rounded hover:bg-gray-700">
                  Online Examinations
                </Link>
              </li>
              <li>
                <Link to="/admin/humanresource-reports" className="block p-2 text-sm rounded hover:bg-gray-700">
                  Human Resource
                </Link>
              </li>
              <li>
                <Link to="/admin/homework-reports" className="block p-2 text-sm rounded hover:bg-gray-700">
                  Homework
                </Link>
              </li>
              <li>
                <Link to="/admin/library-reports" className="block p-2 text-sm rounded hover:bg-gray-700">
                  Library
                </Link>
              </li>
              <li>
                <Link to="/admin/alumni-reports" className="block p-2 text-sm rounded hover:bg-gray-700">
                  Alumni
                </Link>
              </li>
              <li>
                <Link to="/admin/user-log" className="block p-2 text-sm rounded hover:bg-gray-700">
                  User Log
                </Link>
              </li>
            </ul>
          )}
        </li>


        {/* System Settings Dropdown */}

        <li>
          <button
            onClick={toggleSystemSettingsDropdown}
            className="flex items-center justify-between w-full p-2 rounded hover:bg-gray-700"
          >
            <div className="flex items-center space-x-2">
              <FaCogs className={`${iconClasses} text-blue-400`} />
              {(isOpen || isHovered) && <span className="font-medium text-sm">System Settings</span>}
            </div>
            {(isOpen || isHovered) &&
              (systemSettingsDropdownOpen ? <FaChevronUp /> : <FaChevronDown />)}
          </button>
          {systemSettingsDropdownOpen && (
            <ul className="ml-8 mt-1 space-y-1">
              <li>
                <Link
                  to="/admin/General-settings"
                  className="block p-2 text-sm rounded hover:bg-gray-700"
                >
                  General Settings
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/session-settings"
                  className="block p-2 text-sm rounded hover:bg-gray-700"
                >
                  Session setting
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/notification-setting"
                  className="block p-2 text-sm rounded hover:bg-gray-700"
                >
                  Notification Setting
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/email-setting"
                  className="block p-2 text-sm rounded hover:bg-gray-700"
                >
                  Email Setting
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/sms-setting"
                  className="block p-2 text-sm rounded hover:bg-gray-700"
                >
                  SMS Setting
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/payment-method"
                  className="block p-2 text-sm rounded hover:bg-gray-700"
                >
                  Payment Methods
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/print-header"
                  className="block p-2 text-sm rounded hover:bg-gray-700"
                >
                  Print Header Footer
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/email-setting"
                  className="block p-2 text-sm rounded hover:bg-gray-700"
                >
                  Front CMS Setting
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/langu-ages"
                  className="block p-2 text-sm rounded hover:bg-gray-700"
                >
                  Language
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/roles-permission"
                  className="block p-2 text-sm rounded hover:bg-gray-700"
                >
                  Roles Permssion
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/us-ers"
                  className="block p-2 text-sm rounded hover:bg-gray-700"
                >
                  Users
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/backup-restore"
                  className="block p-2 text-sm rounded hover:bg-gray-700"
                >
                  Backup Restore
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/currency"
                  className="block p-2 text-sm rounded hover:bg-gray-700"
                >
                  Currency
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/modules"
                  className="block p-2 text-sm rounded hover:bg-gray-700"
                >
                  Modules
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/custom-field"
                  className="block p-2 text-sm rounded hover:bg-gray-700"
                >
                  Custom fields
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/system-fields"
                  className="block p-2 text-sm rounded hover:bg-gray-700"
                >
                  System fields
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/captcha-setting"
                  className="block p-2 text-sm rounded hover:bg-gray-700"
                >
                  Captcha Setting
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/system-fields"
                  className="block p-2 text-sm rounded hover:bg-gray-700"
                >
                  Users
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/profile-update"
                  className="block p-2 text-sm rounded hover:bg-gray-700"
                >
                  Student profile Update
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/online-admissions"
                  className="block p-2 text-sm rounded hover:bg-gray-700"
                >
                  Online Admission
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/files-types"
                  className="block p-2 text-sm rounded hover:bg-gray-700"
                >
                  Files Types
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/sidebar-menu"
                  className="block p-2 text-sm rounded hover:bg-gray-700"
                >
                  Sidebar Menu
                </Link>
              </li>
            </ul>
          )}
        </li>

        {/* Other Sidebar Items */}
        {[

        ].map(({ to, label, icon }) => (
          <li key={to}>
            <Link
              to={to}
              className="flex items-center space-x-2 p-2 text-sm rounded hover:bg-gray-700"
            >
              <span className={`${iconClasses} text-green-800`}>{icon}</span>
              {(isOpen || isHovered) && <span className="font-medium text-sm">{label}</span>}
            </Link>
          </li>


        ))}

      </ul>
    </div>



  );
};

export default Sidebar;

