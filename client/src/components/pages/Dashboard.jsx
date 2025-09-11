import React, { useState } from "react";
import Sidebar from "../admin/Sidebar";
import AdminHeader from "../admin/AdminHeader";
import ProductsContent from "../admin/ProductsContent";
import UsersContent from "../admin/UsersContent";
import ApproveStudents from "../admin/ApproveStudents";
import DashboardContent from "../admin/DashboardContent";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState("dashboard");

  // ✅ Function to switch components
  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardContent />;
      case "users":
        return <UsersContent />;
      case "products":
        return <ProductsContent />;
      case "approve":
        return <ApproveStudents />;
      case "settings":
        return <div className="p-6">⚙️ Settings Page</div>;
      default:
        return <DashboardContent />;
    }
  };

  const handleLogout = () => {
    console.log("Logout clicked");
    // you can call logout() from your AuthContext here
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        onLogout={handleLogout}
      />

      {/* Main area */}
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        <main className="flex-1 p-6 overflow-y-auto">{renderContent()}</main>
      </div>
    </div>
  );
};

export default Dashboard;
