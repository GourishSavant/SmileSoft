import React, { useState, useEffect } from "react";

const AdmissionApprovals = () => {
  const [admissions, setAdmissions] = useState([]); // State for admission requests
  const [historyLog, setHistoryLog] = useState([]); // History log state

  // Fetching admission data from the local JSON file
  useEffect(() => {
    fetch("/admin/admissions.json")
      .then((response) => response.json())
      .then((data) => setAdmissions(data.admissions))
      .catch((error) => console.error("Error loading admissions data:", error));
  }, []);

  // Approve or Reject an admission request
  const handleAdmissionDecision = (id, decision) => {
    const updatedAdmissions = admissions.map((admission) =>
      admission.id === id
        ? { ...admission, status: decision }
        : admission
    );
    setAdmissions(updatedAdmissions);

    // Add a log entry for the action
    const currentDate = new Date().toLocaleString();
    const action = decision === "Approved" ? "approved" : "rejected";
    setHistoryLog([
      ...historyLog,
      { id, action, timestamp: currentDate },
    ]);
  };

  return (
    <div className="main-content p-6 max-w-7xl mx-auto bg-gray-50 shadow-md rounded-lg dark:bg-gray-800 dark:text-white">
      <h1 className="text-2xl font-bold text-center mb-4">Admission Approvals</h1>

      {/* Admission Requests Table */}
      <div className="p-4 bg-white shadow rounded-lg mb-6 dark:bg-gray-900 dark:text-gray-300">
        <h2 className="text-lg font-semibold mb-4">Pending Admission Requests</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Applied Date</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {admissions.map((admission) => (
                <tr key={admission.id} className="border-b dark:border-gray-700">
                  <td className="px-4 py-2">{admission.name}</td>
                  <td className="px-4 py-2">{admission.email}</td>
                  <td className="px-4 py-2">{admission.appliedDate}</td>
                  <td className="px-4 py-2">{admission.status}</td>
                  <td className="px-4 py-2">
                    {admission.status === "Pending" && (
                      <>
                        <button
                          onClick={() => handleAdmissionDecision(admission.id, "Approved")}
                          className="bg-green-500 text-white py-1 px-3 rounded-md mr-2 hover:bg-green-600"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleAdmissionDecision(admission.id, "Rejected")}
                          className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600"
                        >
                          Reject
                        </button>
                      </>
                    )}
                    {admission.status !== "Pending" && (
                      <span
                        className={`text-${admission.status === "Approved" ? "green" : "red"}-500`}
                      >
                        {admission.status}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* History Log */}
      <div className="p-4 bg-white shadow rounded-lg dark:bg-gray-900 dark:text-gray-300">
        <h2 className="text-lg font-semibold mb-4">Approval/Rejection History</h2>
        <div className="overflow-y-auto max-h-60">
          <ul className="list-none">
            {historyLog.length === 0 ? (
              <li className="text-gray-500 dark:text-gray-400">No history yet.</li>
            ) : (
              historyLog.map((log, index) => (
                <li key={index} className="px-4 py-2 border-b dark:border-gray-700">
                  {log.action === "approved" ? (
                    <span className="text-green-500">Approved</span>
                  ) : (
                    <span className="text-red-500">Rejected</span>
                  )}{" "}
                  student ID {log.id} on {log.timestamp}
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdmissionApprovals;
