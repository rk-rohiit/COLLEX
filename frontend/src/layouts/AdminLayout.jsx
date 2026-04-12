import React from "react";
import Topbar from "../components/common/Topbar";
import Sidebar from "../components/common/Sidebar";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>

        {/* TOPBAR */}
        <Topbar />

        {/* PAGE CONTENT */}
        <Box
          sx={{
            flexGrow: 1,
            p: { xs: 2, md: 4 }, // Increased padding for that "airy" dashboard look
            bgcolor: "#F4F7F9", // The specific grey from your design
            overflowY: "auto",
            height: "calc(100vh - 64px)", // Adjust 64px to match your Topbar height
          }}
        >
          <Outlet />
        </Box>

      </Box>
    </Box>
  );
};

export default AdminLayout;