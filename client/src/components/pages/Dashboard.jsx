import React, { useState } from "react";
import Sidebar from "../admin/Sidebar";
import ApproveStudents from "../admin/ApproveStudents";
import UsersTable from "../admin/UsersTable";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      {/* Main Dashboard */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        {/* Top Navbar */}
        <header className="flex justify-between items-center p-4 bg-white shadow">
          <h2 className="text-xl font-bold">Collex Admin Dashboard</h2>
          <input
            type="text"
            placeholder="Search..."
            className="px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring focus:ring-blue-400"
          />
        </header>

        {/* Dashboard Content */}
        <main className="p-6 space-y-6">
          <ApproveStudents />
          <UsersTable />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
