
import React, { useState } from 'react';

const menuItems = [
  { id: 'general', label: 'General Setting' },
  { id: 'logo', label: 'Logo' },
  { id: 'login', label: 'Login Page Background' },
  { id: 'backend', label: 'Backend Theme' },
  { id: 'mobile', label: 'Mobile App' },
  { id: 'student', label: 'Student / Guardian Panel' },
  { id: 'fees', label: 'Fees' },
  { id: 'id', label: 'ID Auto Generation' },
  { id: 'attendance', label: 'Attendance Type' },
  { id: 'maintenance', label: 'Maintenance' },
  { id: 'miscellaneous', label: 'Miscellaneous' },
];

const details = {
  general: (
    <div>
      <h2 className="text-xl font-bold mb-4 dark:text-white">General Setting</h2>
      <p className="border border-blue-500 bg-gray-100 dark:bg-gray-900 text-blue-800 dark:text-blue-300 p-3 rounded hover:shadow-lg mb-2">
        Note: After saving General Setting please once logout then relogin so changes will be effective.
      </p>
      <div className="border p-4 mb-4 dark:border-gray-700 dark:bg-gray-900">
        <h3 className="font-semibold mb-2 dark:text-white">School Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium dark:text-white">School Name *</label>
            <input type="text" defaultValue="ST. TERESA'S" className="w-full border rounded p-2 mt-1 dark:bg-gray-800 dark:text-white" />
          </div>
          <div>
            <label className="block font-medium dark:text-white">School Code</label>
            <input type="text" defaultValue="Your School Code" className="w-full border rounded p-2 mt-1 dark:bg-gray-800 dark:text-white" />
          </div>
          <div>
            <label className="block font-medium dark:text-white">Address *</label>
            <input type="text" defaultValue="Your School Address" className="w-full border rounded p-2 mt-1 dark:bg-gray-800 dark:text-white" />
          </div>
          <div>
            <label className="block font-medium dark:text-white">Phone *</label>
            <input type="text" defaultValue="Your School Phone" className="w-full border rounded p-2 mt-1 dark:bg-gray-800 dark:text-white" />
          </div>
          <div>
            <label className="block font-medium dark:text-white">Email *</label>
            <input type="email" defaultValue="yourschoolemail@domain.com" className="w-full border rounded p-2 mt-1 dark:bg-gray-800 dark:text-white" />
          </div>
        </div>
      </div>

      <div className="border p-4 mb-4 dark:border-gray-700 dark:bg-gray-900">
        <h3 className="font-semibold mb-2 dark:text-white">Academic Session</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium dark:text-white">Session *</label>
            <input type="text" defaultValue="2023-24" className="w-full border rounded p-2 mt-1 dark:bg-gray-800 dark:text-white" />
          </div>
          <div>
            <label className="block font-medium dark:text-white">Session Start Month *</label>
            <input type="text" defaultValue="April" className="w-full border rounded p-2 mt-1 dark:bg-gray-800 dark:text-white" />
          </div>
        </div>
      </div>

      <div className="border p-4 mb-4 dark:border-gray-700 dark:bg-gray-900">
        <h3 className="font-semibold mb-2 dark:text-white">Date Time</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium dark:text-white">Date Format *</label>
            <input type="text" defaultValue="mm/dd/yyyy" className="w-full border rounded p-2 mt-1 dark:bg-gray-800 dark:text-white" />
          </div>
          <div>
            <label className="block font-medium dark:text-white">Timezone *</label>
            <input type="text" defaultValue="(GMT) UTC" className="w-full border rounded p-2 mt-1 dark:bg-gray-800 dark:text-white" />
          </div>
          <div>
            <label className="block font-medium dark:text-white">Start Day Of Week *</label>
            <input type="text" defaultValue="Monday" className="w-full border rounded p-2 mt-1 dark:bg-gray-800 dark:text-white" />
          </div>
        </div>
      </div>

      <div className="border p-4 mb-4 dark:border-gray-700 dark:bg-gray-900">
        <h3 className="font-semibold mb-2 dark:text-white">Currency</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium dark:text-white">Currency Format *</label>
            <input type="text" defaultValue="12345678.00" className="w-full border rounded p-2 mt-1 dark:bg-gray-800 dark:text-white" />
          </div>
        </div>
      </div>

      <div className="border p-4 mb-4 dark:border-gray-700 dark:bg-gray-900">
        <h3 className="font-semibold mb-2 dark:text-white">File Upload Path</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium dark:text-white">Base Url *</label>
            <input type="text" defaultValue="https://school.gtechxchange.com/" className="w-full border rounded p-2 mt-1 dark:bg-gray-800 dark:text-white" />
          </div>
          <div>
            <label className="block font-medium dark:text-white">File Upload Path *</label>
            <input type="text" defaultValue="/home/school.gtechxchange.com/public_html/" className="w-full border rounded p-2 mt-1 dark:bg-gray-800 dark:text-white" />
          </div>
        </div>
      </div>

      <button className="bg-blue-500 text-white px-4 py-2 rounded mt-6 float-right">Save</button>
    </div>
  ),
  logo: (
    <div>
      <h2 className="text-xl font-bold mb-4 dark:text-white">Logo</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="border p-4 mb-4 dark:border-gray-700 dark:bg-gray-900">
          <h3 className="font-semibold mb-2 dark:text-white">Print Logo</h3>
          <p className="dark:text-gray-300">(170px X 184px)</p>
          <input type="file" className="border rounded p-2 mt-2 w-full dark:bg-gray-800 dark:text-white" />
          <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2">Update</button>
        </div>
        <div className="border p-4 mb-4 dark:border-gray-700 dark:bg-gray-900">
          <h3 className="font-semibold mb-2 dark:text-white">Admin Logo</h3>
          <p className="dark:text-gray-300">(290px X 51px)</p>
          <input type="file" className="border rounded p-2 mt-2 w-full dark:bg-gray-800 dark:text-white" />
          <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2">Update</button>
        </div>
      </div>
    </div>
  ),
  login: (
    <div>
      <h2 className="text-xl font-bold mb-4 dark:text-white">Login Page Background</h2>
      <p className="dark:text-gray-300">Upload background image for the login page.</p>
      <input type="file" className="border rounded p-2 mt-4 dark:bg-gray-800 dark:text-white" />
    </div>
  ),
  mobile: (
    <div>
      <h2 className="text-xl font-bold mb-4 dark:text-white">Mobile App</h2>
      <div className="border p-4 mb-4 dark:border-gray-700 dark:bg-gray-900">
        <div className="mb-4">
          <label className="block font-medium dark:text-white">User Mobile App (Android App Purchase Code Already Registered)</label>
          <input
            type="text"
            defaultValue=""
            placeholder="Enter Android App Purchase Code"
            className="w-full border rounded p-2 mt-1 dark:bg-gray-800 dark:text-white"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium dark:text-white">User Mobile App API URL</label>
          <input
            type="text"
            defaultValue=""
            placeholder="Enter API URL"
            className="w-full border rounded p-2 mt-1 dark:bg-gray-800 dark:text-white"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium dark:text-white">User Mobile App Primary Color Code</label>
          <input
            type="text"
            defaultValue="#424242"
            placeholder="Enter Primary Color Code"
            className="w-full border rounded p-2 mt-1 dark:bg-gray-800 dark:text-white"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium dark:text-white">User Mobile App Secondary Color Code</label>
          <input
            type="text"
            defaultValue=""
            placeholder="Enter Secondary Color Code"
            className="w-full border rounded p-2 mt-1 dark:bg-gray-800 dark:text-white"
          />
        </div>
      </div>
      <button className="bg-blue-500 text-white px-4 py-2 rounded float-right">Save</button>
    </div>
  ),
  student: (
    <div>
  <h2 className="text-xl font-bold mb-4 dark:text-white">Student / Guardian Panel</h2>
  <div className="grid grid-cols-1 gap-4"> {/* Single column layout */}
    {/* User Login Option Section */}
    <div>
      <label className="block font-medium dark:text-white">User Login Option</label>
      <div className="flex items-center space-x-4 mt-2">
        <label className="inline-flex items-center">
          <input type="radio" name="userLoginOption" value="student" className="mr-2" />
          Student Login
        </label>
        <label className="inline-flex items-center">
          <input type="radio" name="userLoginOption" value="parent" className="mr-2" />
          Parent Login
        </label>
      </div>
    </div>

    {/* Additional Username Option For Student Login */}
    <div>
      <label className="block font-medium dark:text-white">Additional Username Option For Student Login</label>
      <div className="flex items-center space-x-4 mt-2">
        <label className="inline-flex items-center">
          <input type="checkbox" className="mr-2" />
          Admission No
        </label>
        <label className="inline-flex items-center">
          <input type="checkbox" className="mr-2" />
          Mobile Number
        </label>
        <label className="inline-flex items-center">
          <input type="checkbox" className="mr-2" />
          Email
        </label>
      </div>
    </div>

    {/* Additional Username Option For Parent Login */}
    <div>
      <label className="block font-medium dark:text-white">Additional Username Option For Parent Login</label>
      <div className="flex items-center space-x-4 mt-2">
        <label className="inline-flex items-center">
          <input type="checkbox" className="mr-2" />
          Mobile Number
        </label>
        <label className="inline-flex items-center">
          <input type="checkbox" className="mr-2" />
          Email
        </label>
      </div>
    </div>

    {/* Allow Student To Add Timeline */}
    <div>
      <label className="block font-medium dark:text-white">Allow Student To Add Timeline</label>
      <div className="flex items-center space-x-4 mt-2">
        <label className="inline-flex items-center">
          <input type="radio" name="addTimeline" value="disabled" className="mr-2" />
          Disabled
        </label>
        <label className="inline-flex items-center">
          <input type="radio" name="addTimeline" value="enabled" className="mr-2" />
          Enabled
        </label>
      </div>
    </div>
  </div>

  <button className="bg-blue-500 text-white px-4 py-2 rounded mt-6 float-right">Save</button>
</div>

  
  ),
  fees:(
    <div className="mt-6">
  <h3 className="text-lg font-semibold dark:text-white">Fees</h3>

  {/* Offline Bank Payment */}
  <div>
    <label className="block font-medium dark:text-white">Offline Bank Payment In Student Panel</label>
    <div className="flex items-center space-x-4 mt-2">
      <label className="inline-flex items-center">
        <input type="radio" name="offlineBankPayment" value="disabled" className="mr-2" />
        Disabled
      </label>
      <label className="inline-flex items-center">
        <input type="radio" name="offlineBankPayment" value="enabled" className="mr-2" />
        Enabled
      </label>
    </div>
  </div>

  {/* Offline Bank Payment Instruction */}
  <div>
    <label className="block font-medium dark:text-white">Offline Bank Payment Instruction</label>
    <textarea className="w-full mt-2 p-2 border border-gray-300 rounded" rows="4" placeholder="Enter bank payment instructions here"></textarea>
  </div>

  {/* Lock Student Panel If Fees Remaining */}
  <div>
    <label className="block font-medium dark:text-white">Lock Student Panel If Fees Remaining</label>
    <div className="flex items-center space-x-4 mt-2">
      <label className="inline-flex items-center">
        <input type="radio" name="lockStudentPanel" value="disabled" className="mr-2" />
        Disabled
      </label>
      <label className="inline-flex items-center">
        <input type="radio" name="lockStudentPanel" value="enabled" className="mr-2" />
        Enabled
      </label>
    </div>
  </div>

  {/* Print Fees Receipt */}
  <div>
    <label className="block font-medium dark:text-white">Print Fees Receipt For</label>
    <div className="flex items-center space-x-4 mt-2">
      <label className="inline-flex items-center">
        <input type="checkbox" className="mr-2" />
        Office Copy
      </label>
      <label className="inline-flex items-center">
        <input type="checkbox" className="mr-2" />
        Student Copy
      </label>
      <label className="inline-flex items-center">
        <input type="checkbox" className="mr-2" />
        Bank Copy
      </label>
    </div>
  </div>

  {/* Carry Forward Fees Due Days */}
  <div>
    <label className="block font-medium dark:text-white">Carry Forward Fees Due Days *</label>
    <input type="number" className="mt-2 p-2 border border-gray-300 rounded w-full" placeholder="Enter number of days" defaultValue="60" />
  </div>

  {/* Single Page Fees Print */}
  <div>
    <label className="block font-medium dark:text-white">Single Page Fees Print</label>
    <div className="flex items-center space-x-4 mt-2">
      <label className="inline-flex items-center">
        <input type="radio" name="singlePageFeesPrint" value="disabled" className="mr-2" />
        Disabled
      </label>
      <label className="inline-flex items-center">
        <input type="radio" name="singlePageFeesPrint" value="enabled" className="mr-2" />
        Enabled
      </label>
    </div>
  </div>

  {/* Collect Fees In Back Date */}
  <div>
    <label className="block font-medium dark:text-white">Collect Fees In Back Date</label>
    <div className="flex items-center space-x-4 mt-2">
      <label className="inline-flex items-center">
        <input type="radio" name="collectFeesBackDate" value="disabled" className="mr-2" />
        Disabled
      </label>
      <label className="inline-flex items-center">
        <input type="radio" name="collectFeesBackDate" value="enabled" className="mr-2" />
        Enabled
      </label>
    </div>
  </div>
  <button className="bg-blue-500 text-white px-4 py-2 rounded float-right">Save</button>

</div>


  ),
  id:(
    <div className="mt-6">
  <h3 className="text-lg font-semibold dark:text-white">ID Auto Generation</h3>

  {/* Student Admission No. Auto Generation */}
  <div className="border p-4 rounded-md mt-4">
    <div>
      <label className="block font-medium dark:text-white">Student Admission No. Auto Generation</label>
      <div className="flex items-center space-x-4 mt-2">
        <label className="inline-flex items-center">
          <input type="radio" name="studentAdmissionNo" value="disabled" className="mr-2" />
          Disabled
        </label>
        <label className="inline-flex items-center">
          <input type="radio" name="studentAdmissionNo" value="enabled" className="mr-2" />
          Enabled
        </label>
      </div>
    </div>

    {/* Admission No. Prefix */}
    <div>
      <label className="block font-medium dark:text-white">Admission No. Prefix *</label>
      <input 
        type="text" 
        className="mt-2 p-2 border border-gray-300 rounded w-full" 
        placeholder="Enter Admission No. Prefix" 
      />
    </div>

    {/* Admission No. Digit */}
    <div>
      <label className="block font-medium dark:text-white">Admission No. Digit *</label>
      <input 
        type="number" 
        className="mt-2 p-2 border border-gray-300 rounded w-full" 
        placeholder="Enter number of digits" 
      />
    </div>

    {/* Admission Start From */}
    <div>
      <label className="block font-medium dark:text-white">Admission Start From *</label>
      <input 
        type="number" 
        className="mt-2 p-2 border border-gray-300 rounded w-full" 
        placeholder="Enter start number" 
      />
    </div>
  </div>

  {/* Staff ID Auto Generation */}
  <div className="border p-4 rounded-md mt-6">
    <div>
      <label className="block font-medium dark:text-white">Staff ID Auto Generation</label>
      <div className="flex items-center space-x-4 mt-2">
        <label className="inline-flex items-center">
          <input type="radio" name="staffIdAutoGeneration" value="disabled" className="mr-2" />
          Disabled
        </label>
        <label className="inline-flex items-center">
          <input type="radio" name="staffIdAutoGeneration" value="enabled" className="mr-2" />
          Enabled
        </label>
      </div>
    </div>

    {/* Staff ID Prefix */}
    <div>
      <label className="block font-medium dark:text-white">Staff ID Prefix *</label>
      <input 
        type="text" 
        className="mt-2 p-2 border border-gray-300 rounded w-full" 
        placeholder="Enter Staff ID Prefix" 
      />
    </div>

    {/* Staff No. Digit */}
    <div>
      <label className="block font-medium dark:text-white">Staff No. Digit *</label>
      <input 
        type="number" 
        className="mt-2 p-2 border border-gray-300 rounded w-full" 
        placeholder="Enter number of digits" 
      />
    </div>

    {/* Staff ID Start From */}
    <div>
      <label className="block font-medium dark:text-white">Staff ID Start From *</label>
      <input 
        type="number" 
        className="mt-2 p-2 border border-gray-300 rounded w-full" 
        placeholder="Enter start number" 
      />
    </div>
  </div>

  {/* Save Button */}
  <button className="bg-blue-500 text-white px-4 py-2 rounded mt-6 float-right">Save</button>
</div>

  ),
  attendance:(
    <div className="mt-6">
  <h3 className="text-lg font-semibold dark:text-white">Attendance Settings</h3>

  {/* Attendance Type */}
  <div>
    <label className="block font-medium dark:text-white">Attendance Type</label>
    <div className="flex items-center space-x-4 mt-2">
      <label className="inline-flex items-center">
        <input type="radio" name="attendanceType" value="dayWise" className="mr-2" />
        Day Wise
      </label>
      <label className="inline-flex items-center">
        <input type="radio" name="attendanceType" value="periodWise" className="mr-2" />
        Period Wise
      </label>
    </div>
  </div>

  {/* QR Code / Barcode / Biometric Attendance */}
  <div>
    <label className="block font-medium dark:text-white">QR Code / Barcode / Biometric Attendance</label>
    <div className="flex items-center space-x-4 mt-2">
      <label className="inline-flex items-center">
        <input type="radio" name="attendanceMethod" value="disabled" className="mr-2" />
        Disabled
      </label>
      <label className="inline-flex items-center">
        <input type="radio" name="attendanceMethod" value="enabled" className="mr-2" />
        Enabled
      </label>
    </div>
  </div>

  {/* Devices */}
  <div>
    <label className="block font-medium dark:text-white">Devices (Separate By Comma)</label>
    <input 
      type="text" 
      className="mt-2 p-2 border border-gray-300 rounded w-1/2" 
      placeholder="Enter devices, separated by commas" 
    />
  </div>

  {/* Low Attendance Limit */}
  <div>
    <label className="block font-medium dark:text-white">Low Attendance Limit (%)</label>
    <input 
      type="number" 
      className="mt-2 p-2 border border-gray-300 rounded w-1/2 " 
      placeholder="Enter low attendance limit"
    />
  </div>

  {/* Save Button */}
  <button className="bg-blue-500 text-white px-4 py-2 rounded mt-6 float-right">Save</button>
</div>
  ),
  maintenance:(
    <div className="mt-6">
        <h3 className="text-lg font-semibold dark:text-white"> Maintenance</h3>

    {/* Maintenance Mode */}

    <div>
      <div className="flex items-center space-x-4 mt-2">
      <label className="block font-medium dark:text-white">Maintenance Mode</label>

        <label className="inline-flex items-center">
          <input type="radio" name="maintenanceMode" value="disabled" className="mr-2" />
          Disabled
        </label>
        <label className="inline-flex items-center">
          <input type="radio" name="maintenanceMode" value="enabled" className="mr-2" />
          Enabled
        </label>
      </div>
    </div>
  
    {/* Save Button */}
    <button className="bg-blue-500 text-white px-4 py-2 rounded mt-6 float-right">Save</button>
  </div>
  ), 
  
  
  miscellaneous:(
    <div className="mt-6">
    <h3 className="text-lg font-semibold dark:text-white">Miscellaneous</h3>
  
    {/* Online Examination */}
    <div className="border p-4 mt-4 rounded">
      <h3 className="text-lg font-semibold dark:text-white">Online Examination</h3>
      <div className="flex items-center space-x-4 mt-2">
        <label className="block font-medium dark:text-white">Show Me Only My Question</label>
        <label className="inline-flex items-center">
          <input type="radio" name="onlineExamination" value="disabled" className="mr-2" />
          Disabled
        </label>
        <label className="inline-flex items-center">
          <input type="radio" name="onlineExamination" value="enabled" className="mr-2" />
          Enabled
        </label>
      </div>
    </div>
  
    {/* ID Card Scan Code */}
    <div className="border p-4 mt-4 rounded">
      <h3 className="text-lg font-semibold dark:text-white">ID Card Scan Code</h3>
      <div className="flex items-center space-x-4 mt-2">
        <label className="block font-medium dark:text-white">Show Me Only My Question</label>
        <label className="inline-flex items-center">
          <input type="radio" name="scanType" value="barcode" className="mr-2" />
          Barcode
        </label>
        <label className="inline-flex items-center">
          <input type="radio" name="scanType" value="qrCode" className="mr-2" />
          QR Code
        </label>
      </div>
    </div>
  
    {/* Exam Result In Front Site */}
    <div className="border p-4 mt-4 rounded">
      <h3 className="text-lg font-semibold dark:text-white">Exam Result In Front Site</h3>
      <div className="flex items-center space-x-4 mt-2">
        <label className="block font-medium dark:text-white">Exam Result Page In Front Site</label>
        <label className="inline-flex items-center">
          <input type="radio" name="examResultFrontSite" value="disabled" className="mr-2" />
          Disabled
        </label>
        <label className="inline-flex items-center">
          <input type="radio" name="examResultFrontSite" value="enabled" className="mr-2" />
          Enabled
        </label>
      </div>
    </div>
  
    {/* Exam Result Page In Front Site */}
    <div className="border p-4 mt-4 rounded">
      <div className="flex items-center space-x-4 mt-2">
        <label className="block font-medium dark:text-white">Exam Result Page In Front Site</label>
        <label className="inline-flex items-center">
          <input type="radio" name="examResultPageFrontSite" value="disabled" className="mr-2" />
          Disabled
        </label>
        <label className="inline-flex items-center">
          <input type="radio" name="examResultPageFrontSite" value="enabled" className="mr-2" />
          Enabled
        </label>
      </div>
    </div>
  
    {/* Teacher Restricted Mode */}
    <div className="border p-4 mt-4 rounded">
      <div className="flex items-center space-x-4 mt-2">
        <label className="block font-medium dark:text-white">Teacher Restricted Mode</label>
        <label className="inline-flex items-center">
          <input type="radio" name="teacherRestrictedMode" value="disabled" className="mr-2" />
          Disabled
        </label>
        <label className="inline-flex items-center">
          <input type="radio" name="teacherRestrictedMode" value="enabled" className="mr-2" />
          Enabled
        </label>
      </div>
    </div>
  
    {/* Superadmin Visibility */}
    <div className="border p-4 mt-4 rounded">
      <div className="flex items-center space-x-4 mt-2">
        <label className="block font-medium dark:text-white">Superadmin Visibility</label>
        <label className="inline-flex items-center">
          <input type="radio" name="superadminVisibility" value="disabled" className="mr-2" />
          Disabled
        </label>
        <label className="inline-flex items-center">
          <input type="radio" name="superadminVisibility" value="enabled" className="mr-2" />
          Enabled
        </label>
      </div>
    </div>
  
    {/* Event Reminder */}
    <div className="border p-4 mt-4 rounded">
      <div className="flex items-center space-x-4 mt-2">
        <label className="block font-medium dark:text-white">Event Reminder</label>
        <label className="inline-flex items-center">
          <input type="radio" name="eventReminder" value="disabled" className="mr-2" />
          Disabled
        </label>
        <label className="inline-flex items-center">
          <input type="radio" name="eventReminder" value="enabled" className="mr-2" />
          Enabled
        </label>
      </div>
    </div>
  
    
  {/* Staff Apply Leave Notification Email (Text Input) */}
  <div className="border p-4 mt-4 rounded">
    <h3 className="text-lg font-semibold dark:text-white">Staff Apply Leave Notification Email</h3>
    <input
      type="email"
      className="border p-2 w-1/2 mt-2 rounded"
      placeholder="Enter email for notifications"
    />
  </div>

  {/* Save Button */}
  <button className="bg-blue-500 text-white px-4 py-2 rounded mt-6 float-right">Save</button>
</div>

  ),


  
};

const App = () => {
  const [activeMenu, setActiveMenu] = useState('general');

  return (
    <div className="flex h-screen dark:bg-gray-800 dark:text-white">
      {/* Left Frame */}
      <div className=" bg-white dark:bg-gray-900 dark:text-white p-4 mt-3 ml-3 mr-3 mb-3">
        <ul>
          {menuItems.map((item) => (
            <li
              key={item.id}
              className={`p-2 cursor-pointer rounded ${
                activeMenu === item.id
                  ? 'bg-blue-500 text-white'
                  : 'hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
              onClick={() => setActiveMenu(item.id)}
            >
              {item.label}
            </li>
          ))}
        </ul>
      </div>

      {/* Right Frame */}
      <div className="w-3/4 p-6 bg-white dark:bg-gray-900 dark:text-white overflow-auto mt-3 ml-3 mr-3 mb-3">
        {details[activeMenu] || <p>Select a menu item to view details.</p>}
      </div>
    </div>
  );
};

export default App;







