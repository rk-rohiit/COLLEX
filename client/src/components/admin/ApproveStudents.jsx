import React, { useState } from "react";

const ApproveStudents = () => {
  const [studentId, setStudentId] = useState("");
  const [message, setMessage] = useState("");

  const handleApprove = () => {
    if (studentId.trim() === "") {
      setMessage("Please enter a valid Student ID");
    } else {
      setMessage(`✅ Student ${studentId} has been approved!`);
      setStudentId("");
    }
  };

  const handleReject = () => {
    if (studentId.trim() === "") {
      setMessage("Please enter a valid Student ID");
    } else {
      setMessage(`❌ Student ${studentId} has been rejected!`);
      setStudentId("");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
      <h2 className="text-xl font-bold mb-4">Approve or Reject Students</h2>
      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Enter Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleApprove}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        >
          Approve
        </button>
        <button
          onClick={handleReject}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Reject
        </button>
      </div>
      {message && (
        <p className="mt-3 text-sm font-medium text-gray-700">{message}</p>
      )}
    </div>
  );
};

export default ApproveStudents;
