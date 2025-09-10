import React, { useState } from "react";
import Sidebar from "../admin/Sidebar";
import ApproveStudents from "../admin/ApproveStudents";
import UsersTable from "../admin/UsersTable";
import theme from "../../theme";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div
      className="flex h-screen"
      style={{ backgroundColor: theme.colors.sectionBg }}
    >
      {/* Sidebar */}
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      {/* Main Dashboard */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        {/* Top Navbar */}
        <header
          className={`flex justify-between items-center p-4 ${theme.shadows.base}`}
          style={{ backgroundColor: theme.colors.background }}
        >
          <h2
            className="text-xl font-bold"
            style={{ color: theme.colors.textDark }}
          >
            Collex Admin Dashboard
          </h2>
          <input
            type="text"
            placeholder="Search..."
            className="px-3 py-2 rounded border focus:outline-none"
            style={{
              borderColor: "#E5E7EB",
              color: theme.colors.textDark,
              backgroundColor: theme.colors.background,
              boxShadow: theme.shadows.base,
            }}
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
