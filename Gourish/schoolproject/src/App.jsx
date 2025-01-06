import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Dashboard from './pages/admin/Dashboard';
import AdminLayout from './components/admin/AdminLayout.jsx'
import AdminLoginPage  from './pages/admin/adminloginpage'
import StudentLayout from './components/admin/studentLayout.jsx'







import Dashboardoverview from './pages/admin/Dashboardoverview';
import Usermanagement from './pages/admin/Usermanagement.jsx';
import CourseManagement from './pages/admin/Coursemanagement';
import ReportsAnalytics from './pages/admin/Reports.jsx';
import ExamManagement from './pages/admin/exam';
import Settings from './pages/admin/Settings.jsx';
import Communicate from './pages/admin/Communicate';
import AdmissionApprovals from './pages/admin/Admission';
import AuditLogs from './pages/admin/Auditlogs';
import AdminStudentDetails from './pages/admin/adminstudentDetails.jsx';
import StudentHouse from './pages/admin/Studenthouse.jsx';
import OfflineBankPayments from './pages/admin/OfflineBankPayments';
import SearchFeesPayment from './pages/admin/SearchFeesPayment .jsx';
import AdminOnlineAdmission from './pages/admin/adminonlineadmission';
import SearchdueFees from './pages/admin/Searchduefees.jsx';
import CollectFees from './pages/admin/Collectfees';
import FeesMaster from './pages/admin/Feesmaster';
import FeesDiscount from './pages/admin/Feesdiscount';
import AdminExamResults from './pages/admin/adminexamresult';
import BookList from './pages/admin/Booklist';
import Designadmitcard from './pages/admin/Designadmitcard';
import AdminPrintAdmitCard from './pages/admin/adminprintadmitcard';
import Designmarksheet from './pages/admin/Designmarksheet';
import AdminPrintmarksheet from './pages/admin/adminprintmarksheet';
import Issuereturn from './pages/admin/Issuereturn';
import Generalsettings from './pages/admin/Generalsettings';
import Notificationsetting from './pages/admin/Notificationsetting';
import Emailsetting from './pages/admin/emailsetting.jsx';
import Languages from './pages/admin/Languages';
import Examschedule from './pages/admin/Examschedule';
import Expensehead from './pages/admin/Expensehead';
import Searchexpense from './pages/admin/Searchexpense.jsx';
import Addexpense from './pages/admin/Addexpense';
import Sendemail from './pages/admin/Sendemail.jsx';

import Logincredential from './pages/admin/Logincredential';
import DarkModeToggle from './components/admin/DarkModeToggle';
import Studentreports from './pages/admin/Studentreports.jsx';
import Financereports from './pages/admin/Financereports';
import Attendancereports from './pages/admin/Attendancereports';
import Examinationsreports from './pages/admin/Examinationsreports';
import HumanResourceReport from './pages/admin/humanresource';
import HomeworkReport from './pages/admin/homework';
import Libraryreports from './pages/admin/libraryreports';
import Alumnireports from './pages/admin/alumnireports';
import OnlineExamReports from './pages/admin/onlineexamreports';
import UserLogReports from './pages/admin/userlogreports.jsx';
import Sessionsetting from './pages/admin/Sessionsetting.jsx';
import Users from './pages/admin/user.jsx';
import Modules from './pages/admin/modules';
import Profileupdate from './pages/admin/profileupdate.jsx';
import Aproveleave from './pages/admin/aproveleave';
import Staffattendence from './pages/admin/staffattendece.jsx';
import Visitor from './pages/admin/visitor.jsx';
import PhoneCall from './pages/admin/phonecall.jsx';
import Postaldispatch from './pages/admin/postaldispatch';
import Postalrecieve from './pages/admin/postalreceive.jsx';
import Complaint from './pages/admin/complaint.jsx';
import Setupfrontoffice from './pages/admin/setupfrontoffice.jsx';
import Admissionenquiry from './pages/admin/admissionenquiry';
import CustomCalendar from './pages/admin/CustomCalendar';
import Issue from './pages/admin/issue'
import AddStudent from'./pages/admin/addstudent';
import AddStaffmember from'./pages/admin/addstaffmember';
import NoticeBoard from './pages/admin/Noticeboard';
import Sms from './pages/admin/sms.jsx';
import EmailSms from './pages/admin/emailsms';
import ScheduleEmailSms from './pages/admin/scheduleemailsms.jsx';
import EmailTemplate from './pages/admin/emailtemplate';
import SmsTemplate from './pages/admin/smstemplate.jsx';
import Addincome from './pages/admin/addincome';
import Searchincome from './pages/admin/searchincome.jsx';
import Incomehead from './pages/admin/incomehead';
import Staffdirectory from './pages/admin/staffdirectory.jsx';
import DisabledStaff from './pages/admin/disabledstaff';
import Designation from './pages/admin/designation';
import Department from './pages/admin/department';
import TeacherRatingList from './pages/admin/teacherratinglist.jsx';
import Leavetype from './pages/admin/leavetype';
import ApplyLeave from './pages/admin/applyleave';
import Payroll from './pages/admin/payroll';
import OnlineExam from './pages/admin/onlineexam';
import RolesPermission from './pages/admin/Rolepermission.jsx';
import AdminPermission from './pages/admin/adminpermission';
import TeacherPermission from './pages/admin/teacherpermission.jsx';
import LibrarianPermission from './pages/admin/librarianpermission';
import AccountantPermission from './pages/admin/accountantpermission';
import ReceptionalistPermission from './pages/admin/receptionalistpermission.jsx';
import Studentadmission from './pages/admin/Studentadmission.jsx'
import DisabledStudent from './pages/admin/disablestudent'
import MulticlassStudent from './pages/admin/multiclassstudent'
import Bulkdelete from './pages/admin/bulkdelete'
import Studentcategories from './pages/admin/studentcategories.jsx'
import DisableReasonPage from './pages/admin/disablereason';
import Questionbank from './pages/admin/questionbank.jsx';
import Feegroup from './pages/admin/Feegroup'
import Feetype from './pages/admin/Feetype'
import FeesReminder from './pages/admin/Feereminder';
import Feecarry from './pages/admin/Feecarryforward'
import ExamGroupPage from './pages/admin/Examgroup.jsx';
import MarksDivisionPage from './pages/admin/Marksdivision.jsx';
import Marksgrade from './pages/admin/Marksgrade.jsx'
import SmsSettings from './pages/admin/smssetting.jsx';
import PaymentMethods from './pages/admin/Paymentmethod.jsx';
import Currency from './pages/admin/Currency'
import Frontcms from './pages/admin/frontcms'
import Backup from './pages/admin/backuprestore'
import Printheader from './pages/admin/Printheader.jsx'
import Classtimetable from './pages/admin/Classtiemtable'
import AssignClassTeacher from './pages/admin/assignclassteacher';
import TeacherTimeTable from './pages/admin/teachertiemrable.jsx';
import Subjectgroup from './pages/admin/subjectgroup.jsx'
import Promotestudent from './pages/admin/promotestudents.jsx'
import Subjects from './pages/admin/subjects.jsx'
import Class from './pages/admin/Class'
import Section from './pages/admin/sections.jsx'
import Attendance from './pages/admin/attendance'
import ApproveLeave from './pages/admin/approveleave';
import Attendancebydate from './pages/admin/attendancebydate.jsx'
import CustomFields from './pages/admin/Customfields.jsx';
import Onlineadmissioin from './pages/admin/onlineadmission.jsx'
import Sidebarmenu from './pages/admin/sidebarmenu.jsx'
import Filestypes from './pages/admin/filestype.jsx'
import Systemfields from './pages/admin/systemfields.jsx'
import CaptchaSettings from './pages/admin/Captchasetting.jsx';
import ImportStudent from './pages/admin/ImportStudent.jsx';

import { ModuleProvider } from './Context/ModuleContext.jsx';
import AdmissionEnquiry from './pages/admin/admissionenquiry';

import StaffProfile from './pages/admin/staffprofile';
import EditStaff from './pages/admin/editstaff';;
import CreateStaff from './pages/admin/createstaff';
import ImportStaff from './pages/admin/importstaff';





const App = () => {
  return (
    <>
    <ModuleProvider>
      <Router>
        <Routes>
          {/* Default route */}
          {/* Login Route */}
        <Route path="/admin/login" element={<AdminLoginPage />} />


{/* Admin Layout with nested routes */}
<Route path="/admin" element={<AdminLayout />}>

  <Route path="dashboard" element={<Dashboard />} />


        

          <Route path="dashboard-overview" element={<Dashboardoverview />} />
          <Route path="user-management" element={<Usermanagement />} />
          <Route path="student-details" element={<AdminStudentDetails />} />
          <Route path="student-admission" element={<Studentadmission />} />
          <Route path="disable-student" element={<DisabledStudent />} />
          <Route path="multiclass-student" element={<MulticlassStudent />} />
          <Route path="bulk-delete" element={<Bulkdelete />} />
          <Route path="student-categories" element={<Studentcategories />} />
          <Route path="disable-reason" element={<DisableReasonPage />} />
          <Route path="fee-group" element={<Feegroup/>} />
          <Route path="fee-type" element={<Feetype/>} />
          <Route path="fees-reminder" element={<FeesReminder/>} />
          <Route path="fees-carry" element={<Feecarry/>} />
          <Route path="exam-group" element={<ExamGroupPage/>} />
          <Route path="fee-carry" element={<Feecarry/>} />
          <Route path="marks-grade" element={<Marksgrade/>} />
          <Route path="/admin/staff/:id/edit" element={<EditStaff />} />
          <Route path="/admin/staff/create" element={<CreateStaff />} />
          <Route path="import" element={<ImportStaff />} />
          <Route path="staff-directory" element={<Staffdirectory />} />
          <Route path="staff/:staff_emp_id" element={<StaffProfile />} /> {/* Staff profile route */}


          <Route path="marks-division" element={<MarksDivisionPage/>} />
          <Route path="sms-setting" element={<SmsSettings/>} />
          <Route path="payment-method" element={<PaymentMethods/>} />
          <Route path="currency" element={<Currency/>} />
          <Route path="front-cms" element={<Frontcms/>} />
          <Route path="backup-restore" element={<Backup/>} />
          <Route path="print-header" element={<Printheader/>} />
          <Route path="class-timetable" element={<Classtimetable/>} />
          <Route path="assign-classteacher" element={<AssignClassTeacher/>} />
          <Route path="teacher-timetable" element={<TeacherTimeTable/>} />
          <Route path="subject-group" element={<Subjectgroup/>} />
          <Route path="promote-students" element={<Promotestudent/>} />
          <Route path="subjects" element={<Subjects/>} />
          <Route path="class" element={<Class/>} />
          <Route path="sections" element={<Section/>} />
          <Route path="student-attendance" element={<Attendance/>} />
          <Route path="approve-leaves" element={<ApproveLeave/>} />
          <Route path="attendence-bydate" element={<Attendancebydate/>} />
          <Route path="custom-field" element={<CustomFields/>} />
          <Route path="online-admissions" element={<Onlineadmissioin/>} />
          <Route path="sidebar-menu" element={<Sidebarmenu/>} />
          <Route path="files-types" element={<Filestypes/>} />
          <Route path="system-fields" element={<Systemfields/>} />
          <Route path="captcha-setting" element={<CaptchaSettings/>} />



          <Route path="student-house" element={<StudentHouse />} />
          <Route path="online-admission" element={<AdminOnlineAdmission />} />
          <Route path="course-management" element={<CourseManagement />} />
          <Route path="reports-and-analytics" element={<ReportsAnalytics />} />
          <Route path="exam-management" element={<ExamManagement />} />
          <Route path="system-settings" element={<Settings />} />
          <Route path="us-ers" element={<Users />} />
          <Route path="communication-management" element={<Communicate />} />
          <Route path="admission-approvals" element={<AdmissionApprovals />} />
          <Route path="audit-logs" element={<AuditLogs />} />
          <Route path="collect-fees" element={<CollectFees />} />
          <Route path="offline-payment" element={<OfflineBankPayments />} />
          <Route path="search-payment" element={<SearchFeesPayment />} />
          <Route path="admission-enquiry" element={<AdmissionEnquiry />} />

          <Route path="due-fees" element={<SearchdueFees />} />
          <Route path="fees-master" element={<FeesMaster />} />
          <Route path="fees-discount" element={<FeesDiscount />} />
          <Route path="exam-schedule" element={<Examschedule />} />
          <Route path="exam-result" element={<AdminExamResults />} />
          <Route path="design-admitcard" element={<Designadmitcard />} />
          <Route path="print-admitcard" element={<AdminPrintAdmitCard />} />
          <Route path="design-marksheet" element={<Designmarksheet />} />
          <Route path="print-marksheet" element={<AdminPrintmarksheet />} />
          <Route path="book-list" element={<BookList />} />
          <Route path="issue-return" element={<Issuereturn />} />
          <Route path="general-settings" element={<Generalsettings />} />
          <Route path="session-settings" element={<Sessionsetting />} />
          <Route path="notification-setting" element={<Notificationsetting />} />
          <Route path="email-setting" element={<Emailsetting />} />
          <Route path="langu-ages" element={<Languages />} />
          <Route path="expense-head" element={<Expensehead />} />
          <Route path="search-expense" element={<Searchexpense />} />
          <Route path="add-expense" element={<Addexpense />} />
          <Route path="send-email" element={<Sendemail />} />
          <Route path="login-credential" element={<Logincredential />} />
          <Route path="student-reports" element={<Studentreports />} />
          <Route path="finance-reports" element={<Financereports />} />
          <Route path="attendance-reports" element={<Attendancereports />} />
          <Route path="examinations-reports" element={<Examinationsreports />} />
          <Route path="onlineexam-reports" element={<OnlineExamReports />} />
          <Route path="humanresource-reports" element={<HumanResourceReport />} />
          <Route path="homework-reports" element={<HomeworkReport />} />
          <Route path="library-reports" element={<Libraryreports />} />
          <Route path="alumni-reports" element={<Alumnireports />} />
          <Route path="user-log" element={<UserLogReports />} />
          <Route path="modules" element={<Modules />} />
          <Route path="profile-update" element={<Profileupdate />} />
          <Route path="aprove-leave" element={<Aproveleave />} />
          <Route path="staff-attendence" element={<Staffattendence />} />
          <Route path="visitor-books" element={<Visitor />} />
          <Route path="phone-call" element={<PhoneCall />} />
          <Route path="postal-dispatch" element={<Postaldispatch />} />
          <Route path="postal-receive" element={<Postalrecieve />} />
          <Route path="complaint" element={<Complaint />} />
          <Route path="setup-frontoffice" element={<Setupfrontoffice />} />
          <Route path="issue-book" element={<Issue />} />
          <Route path="add-student" element={<AddStudent />} />
          <Route path="add-staffmember" element={<AddStaffmember />} />
          <Route path="compose" element={<NoticeBoard />} />
          <Route path="send-sms" element={<Sms />} />
          <Route path="email-sms" element={<EmailSms />} />
          <Route path="schedule-emailsms" element={<ScheduleEmailSms />} />
          <Route path="email-template" element={<EmailTemplate />} />
          <Route path="sms-template" element={<SmsTemplate />} />
          <Route path="add-income" element={<Addincome />} />
          <Route path="search-income" element={<Searchincome />} />
          <Route path="income-head" element={<Incomehead />} />
          <Route path="staff-directory" element={<Staffdirectory />} />
          <Route path="disabled-staff" element={<DisabledStaff />} />
          <Route path="designation" element={<Designation />} />
          <Route path="department" element={<Department />} />
          <Route path="teachers-rating" element={<TeacherRatingList />} />
          <Route path="leave-type" element={<Leavetype />} />
          <Route path="apply-leave" element={<ApplyLeave />} />
          <Route path="payroll" element={<Payroll />} />
          <Route path="online-exams" element={<OnlineExam />} />
          <Route path="question-bank" element={<Questionbank />} />
          <Route path="import" element={<ImportStudent />} />


          <Route path="roles-permission" element={<RolesPermission />} />
          <Route path="admin-permission" element={<AdminPermission />} />
          <Route path="receptionist-permission" element={<ReceptionalistPermission />} />
          <Route path="accountant-permission" element={<AccountantPermission />} />
          <Route path="librarian-permission" element={<LibrarianPermission />} />
          <Route path="teacher-permission" element={<TeacherPermission />} />


          <Route path="student" element={<StudentLayout />}>



          </Route>


          </Route>
          {/* Redirecting to home if no route matches */}
          {/* <Route path="*" element={<Navigate to="/" />} /> */}

        </Routes>
      </Router>
      </ModuleProvider>
    </>
  );
};

export default App;
