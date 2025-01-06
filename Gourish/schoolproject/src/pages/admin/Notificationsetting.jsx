
import React, { useState } from 'react';

const NotificationSettings = () => {
  const [notifications, setNotifications] = useState([
    {
      event: "Student Admission",
      destination: ["Email", "SMS"],
      recipient: ["Student", "Guardian"],
      templateID: "1707163291685208209",
      sampleMessage:
      "Dear {{student_name}} your admission is confirm in Class: {{class}} Section: {{section}} for Session: {{current_session_name}} for more detail contact System Admin {{class}} {{section}} {{admission_no}} {{roll_no}} {{admission_date}} {{mobileno}} {{email}} {{dob}} {{guardian_name}} {{guardian_relation}} {{guardian_phone}} {{father_name}} {{father_phone}} {{blood_group}} {{mother_name}} {{gender}} {{guardian_email}}"
    },
    {
      event: "Exam Result",
      destination: ["Email", "SMS", "Mobile App"],
      recipient: ["Student", "Guardian"],
      templateID: "1707163291685208210",
      sampleMessage:
        "Dear {{student_name}} - {{exam_roll_no}}, your {{exam}} result has been published.",
    },
    {
      event: "Fee Submission",
      destination: ["Email", "SMS", "Mobile App"],
      recipient: ["Student", "Guardian"],
      templateID: "1707163291685208211",
      sampleMessage:
        "Dear parents, we have received Fees Amount {{fee_amount}} for {{student_name}} by Your School Name {{class}} {{section}} {{fine_type}} {{fine_percentage}} {{fine_amount}} {{fee_group_name}} {{type}} {{code}} {{email}} {{contact_no}} {{invoice_id}} {{sub_invoice_id}} {{due_date}} {{amount}} {{fee_amount}}",
    },
    {
      event: "Absent Attendance",
      destination: ["Email", "SMS", "Mobile App"],
      recipient: ["Student", "Guardian"],
      templateID: "1707163291685208212",
      sampleMessage:
        "Absent Notice: {{student_name}} was absent on date {{date}} in period {{subject_name}} {{subject_code}} {{subject_type}} from Your School Name",
    },
    {
      event: "Homework",
      destination: ["Email", "SMS", "Mobile App"],
      recipient: ["Student", "Guardian"],
      templateID: "1707163291685208213",
      sampleMessage:
        "New Homework has been created for {{student_name}} at {{homework_date}} for the class {{class}} {{section}} {{subject}}. Kindly submit your homework before {{submit_date}}. Thank you",
    },
    {
      event: "Fees Reminder",
      destination: ["Email", "SMS", "Mobile App"],
      recipient: ["Student", "Guardian"],
      templateID: "1707163291685208214",
      sampleMessage:
        "Dear parents, please pay fee amount Rs.{{due_amount}} of {{fee_type}} before {{due_date}} for {{student_name}} from smart school (ignore if you already paid)",
    },
    {
      event: "Forgot Password",
      destination: ["Email"],
      recipient: ["Student", "Guardian", "Staff"],
      templateID: "1707163291685208215",
      sampleMessage:
        "Dear {{name}}, Recently a request was submitted to reset the password for your account. If you didn't make the request, just ignore this email. Otherwise, you can reset your password using this link. Click here to reset your password, if you're having trouble clicking the password reset button, copy and paste the URL below into your web browser. Your username: {{username}}. Reset Password Link: {{resetPassLink}}. Regards, {{school_name}}",
    },
    {
      event: "Online Examination Publish Exam",
      destination: ["Email", "SMS", "Mobile App"],
      recipient: ["Student", "Guardian"],
      templateID: "1707163291685208216",
      sampleMessage:
        "A new exam {{exam_title}} has been created for duration: {{time_duration}} min, which will be available from: {{exam_from}} to {{exam_to}}.",
    },
    {
      event: "Online Examination Publish Result",
      destination: ["Email", "SMS", "Mobile App"],
      recipient: ["Student", "Guardian"],
      templateID: "1707163291685208217",
      sampleMessage:
        "Exam {{exam_title}} result has been declared which was conducted between {{exam_from}} to {{exam_to}}, for more details, please check your student portal.",
    },
    {
      event: "Online Admission Form Submission",
      destination: ["Email", "SMS", "Mobile App"],
      recipient: ["Student", "Guardian"],
      templateID: "1707163291685208218",
      sampleMessage:
        "Dear {{firstname}} {{lastname}}, your online admission form is submitted successfully on date {{date}}. Your Reference number is {{reference_no}}. Please remember your reference number for further process.",
    },
    {
      event: "Online Admission Fees Submission",
      destination: ["Email", "SMS", "Mobile App"],
      recipient: ["Student", "Guardian"],
      templateID: "1707163291685208219",
      sampleMessage:
        "Dear {{firstname}} {{lastname}}, your online admission form is submitted successfully and the payment of {{paid_amount}} has been received successfully on date {{date}}. Your Reference number is {{reference_no}}. Please remember your reference number for further process.",
    },
    {
      event: "Student Login Credential",
      destination: ["Email", "SMS"],
      recipient: ["Student", "Guardian"],
      templateID: "1707163291685208220",
      sampleMessage:
        "Hello {{display_name}}, your login details for URL: {{url}} Username: {{username}} Password: {{password}} Admission No: {{admission_no}}",
    },
    {
      event: "Staff Login Credential",
      destination: ["Email", "SMS"],
      recipient: ["Staff"],
      templateID: "1707163291685208221",
      sampleMessage:
        "Hello {{first_name}} {{last_name}}, your login details for URL: {{url}} Username: {{username}} Password: {{password}} Employee ID: {{employee_id}}",
    },
    {
      event: "Fee Processing",
      destination: ["Email", "SMS", "Mobile App"],
      recipient: ["Student", "Guardian"],
      templateID: "1707163291685208222",
      sampleMessage:
        "Dear parents, we have received Fees Amount {{fee_amount}} for {{student_name}} by Your School Name {{class}} {{section}} {{email}} {{contact_no}} transaction_id: {{transaction_id}} {{fee_amount}}",
    },
    {
      event: "Online Admission Fees Processing",
      destination: ["Email", "SMS", "Mobile App"],
      recipient: ["Student", "Guardian"],
      templateID: "1707163291685208223",
      sampleMessage:
        "Dear {{firstname}} {{lastname}}, your online admission form is submitted successfully and the payment of {{paid_amount}} is processing on date {{date}}. Your Reference number is {{reference_no}} and your transaction id is {{transaction_id}}. Please remember your reference number for further process.",
    },
    {
      event: "Student Apply Leave",
      destination: ["Email", "SMS"],
      recipient: ["Guardian", "Staff"],
      templateID: "1707163291685208224",
      sampleMessage:
        "My Name is {{student_name}}, Class {{class}} Section {{section}}. I have to apply leave on {{apply_date}} and from {{from_date}} to {{to_date}}. {{message}} Please provide.",
    },
    {
      event: "Email PDF Exam Marksheet",
      destination: ["Email"],
      recipient: ["Student", "Guardian"],
      templateID: "1707163291685208225",
      sampleMessage:
        "Dear {{student_name}} ({{admission_no}}) {{class}} Section {{section}}, we have mailed you the marksheet of Exam {{exam}} Roll no.{{roll_no}}.",
    },
    
  ]);

  const [editingIndex, setEditingIndex] = useState(null);
  const [editedNotification, setEditedNotification] = useState({
    event: "",
    destination: [],
    recipient: [],
    templateID: "",
    sampleMessage: "",
  });

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditedNotification({ ...notifications[index] }); // Copy notification data into form
  };

  const handleSaveEdit = () => {
    if (editingIndex !== null) {
      const updatedNotifications = [...notifications];
      updatedNotifications[editingIndex] = { ...editedNotification }; // Update the notification
      setNotifications(updatedNotifications);
      setEditingIndex(null);
    }
  };

  const handleChangeSampleMessage = (event) => {
    setEditedNotification({
      ...editedNotification,
      sampleMessage: event.target.value,
    });
  };

  const handleChangeEvent = (event) => {
    setEditedNotification({
      ...editedNotification,
      event: event.target.value,
    });
  };

  const handleChangeTemplateID = (event) => {
    setEditedNotification({
      ...editedNotification,
      templateID: event.target.value,
    });
  };

  const handleSave = () => {
    console.log("Notifications saved", notifications);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto bg-white shadow-md rounded p-6">
        <h1 className="text-2xl font-bold mb-4">Notification Settings</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">Event</th>
                <th className="border border-gray-300 px-4 py-2">Destination</th>
                <th className="border border-gray-300 px-4 py-2">Recipient</th>
                <th className="border border-gray-300 px-4 py-2">Template ID</th>
                <th className="border border-gray-300 px-4 py-2">Sample Message</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {notifications.map((notification, index) => (
                <tr key={index} className="odd:bg-white even:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">{notification.event}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {notification.destination.map((dest, i) => (
                      <label key={i} className="block">
                        <input type="checkbox" className="mr-2" defaultChecked />
                        {dest}
                      </label>
                    ))}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {notification.recipient.length > 3 ? (
                      <div className="relative group">
                        <span>{notification.recipient.slice(0, 3).join(", ")}...</span>
                        <div className="absolute hidden group-hover:block bg-gray-700 text-white text-sm p-2 rounded shadow-lg">
                          {notification.recipient.join(", ")}
                        </div>
                      </div>
                    ) : (
                      notification.recipient.map((rec, i) => (
                        <label key={i} className="block">
                          <input type="checkbox" className="mr-2" defaultChecked />
                          {rec}
                        </label>
                      ))
                    )}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">{notification.templateID}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <pre className="whitespace-pre-wrap text-sm text-gray-700">{notification.sampleMessage}</pre>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      onClick={() => handleEdit(index)}
                      className="bg-gray-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-gray-600"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end mt-4">
          <button
            onClick={handleSave}
            className="bg-gray-500 text-white px-6 py-3 rounded-md shadow-lg hover:bg-gray-600"
          >
            Save 
          </button>
        </div>
      </div>

      {/* Modal for Editing Template */}
      {editingIndex !== null && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md shadow-lg w-3/4 max-w-4xl overflow-auto max-h-[80vh]">
            <h2 className="text-xl font-semibold mb-4">Edit Template</h2>

            <div className="mb-4">
              <label className="block font-medium">Template</label>
              <input
                type="text"
                value={editedNotification.event}
                onChange={handleChangeEvent}
                className="w-full p-2 border border-gray-300 rounded-md mt-2"
              />
            </div>

            <div className="mb-4">
              <label className="block font-medium">Subject</label>
              <input
                type="text"
                value="Student Admission" // Hardcoded for now, can be dynamic if needed
                className="w-full p-2 border border-gray-300 rounded-md mt-2"
                disabled
              />
            </div>

            <div className="mb-4">
              <label className="block font-medium">Template ID (Only for Indian SMS Gateway)</label>
              <input
                type="text"
                value={editedNotification.templateID}
                onChange={handleChangeTemplateID}
                className="w-full p-2 border border-gray-300 rounded-md mt-2"
              />
            </div>

            <div className="mb-4">
              <label className="block font-medium">Template *</label>
              <textarea
                value={editedNotification.sampleMessage}
                onChange={handleChangeSampleMessage}
                className="w-full p-2 border border-gray-300 rounded-md mt-2"
                rows="6"
              />
            </div>

            <div className="mb-4">
              <label className="block font-medium">You Can Use Variables</label>
              <pre className="bg-gray-100 p-2 rounded-md text-sm">{`{{student_name}} {{class}} {{section}} {{admission_no}} {{roll_no}} {{admission_date}} {{mobileno}} {{email}} {{dob}} {{guardian_name}} {{guardian_relation}} {{guardian_phone}} {{father_name}} {{father_phone}} {{blood_group}} {{mother_name}} {{gender}} {{guardian_email}} {{current_session_name}}`}</pre>
            </div>

            <div className="flex justify-end mt-4">
              <button
                onClick={handleSaveEdit}
                className="bg-blue-500 text-white px-6 py-3 rounded-md shadow-lg hover:bg-blue-600"
              >
                Save Changes
              </button>
              <button
                onClick={() => setEditingIndex(null)}
                className="bg-red-500 text-white px-6 py-3 rounded-md shadow-lg hover:bg-red-600 ml-4"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationSettings;




