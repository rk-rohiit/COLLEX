import React from 'react'
import Topbar from '../components/common/Topbar';
import Sidebar from '../components/common/Sidebar';
import { Box } from '@mui/material';

const AdminLayout = ({ children }) => {
  return (
    <>
     <Box display="flex">
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN */}
      <Box flex={1}>
        <Topbar />

        <Box sx={{ p: 3, bgcolor: "#F8FAFC", minHeight: "100vh" }}>
          {children}
        </Box>
      </Box>
    </Box>
    </>
  )
}

export default AdminLayout