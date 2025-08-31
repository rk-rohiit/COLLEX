import React from "react";
import { useAuth } from "../../context/AuthContext";

const Dashboard = () => {
  const { logout } = useAuth();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Welcome to Dashboard 🎉</h1>
      <button
        onClick={logout}
        className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
