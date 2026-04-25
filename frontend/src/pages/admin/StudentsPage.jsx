// components/admin/StudentsPage.jsx

import {
  Table, TableBody, TableCell, TableHead,
  TableRow, Button, Paper, Typography, Box, Stack, Avatar, useTheme
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllUsers,
  deleteUser,
} from "@/features/admin/adminSlice";

// Icons
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';

const StudentsPage = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { users } = useSelector((s) => s.admin);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <Box p={4}>
      <Paper 
        elevation={0} 
        sx={{ 
          p: 3, 
          borderRadius: 4, 
          border: "1px solid", 
          borderColor: "divider",
          overflow: "hidden" 
        }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
          <Box>
            <Typography variant="h6" fontWeight={800}>
              Student Directory
            </Typography>
            <Typography variant="caption" color="text.secondary" fontWeight={600}>
              Manage and verify campus members
            </Typography>
          </Box>
          <Typography 
            variant="body2" 
            sx={{ 
              bgcolor: alpha(theme.palette.primary.main, 0.05), 
              color: theme.palette.primary.main, 
              px: 2, py: 0.5, borderRadius: 2, fontWeight: 700 
            }}
          >
            Total: {users.length}
          </Typography>
        </Stack>

        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: alpha(theme.palette.primary.main, 0.02) }}>
              <TableCell sx={{ fontWeight: 700, color: "text.secondary", fontSize: "0.85rem" }}>STUDENT</TableCell>
              <TableCell sx={{ fontWeight: 700, color: "text.secondary", fontSize: "0.85rem" }}>EMAIL ADDRESS</TableCell>
              <TableCell sx={{ fontWeight: 700, color: "text.secondary", fontSize: "0.85rem" }}>CAMPUS ID</TableCell>
              <TableCell sx={{ fontWeight: 700, color: "text.secondary", fontSize: "0.85rem", textAlign: "right" }}>MANAGEMENT</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {users.map((u) => (
              <TableRow 
                key={u._id} 
                hover 
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar 
                      sx={{ 
                        width: 36, 
                        height: 36, 
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                        color: theme.palette.primary.main,
                        fontWeight: 800,
                        fontSize: "0.9rem",
                        border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
                      }}
                    >
                      {u.fullName?.charAt(0).toUpperCase()}
                    </Avatar>
                    <Box>
                      <Typography variant="body2" fontWeight={700} color="text.primary">
                        {u.fullName}
                      </Typography>
                      <Stack direction="row" alignItems="center" spacing={0.5}>
                        <VerifiedUserIcon sx={{ fontSize: 12, color: theme.palette.success.main }} />
                        <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 600 }}>
                          Verified Student
                        </Typography>
                      </Stack>
                    </Box>
                  </Stack>
                </TableCell>

                <TableCell>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      fontFamily: "'JetBrains Mono', monospace", 
                      fontSize: "0.8rem",
                      color: "text.secondary"
                    }}
                  >
                    {u.email}
                  </Typography>
                </TableCell>

                <TableCell>
                   <Typography 
                    variant="body2" 
                    sx={{ 
                      fontWeight: 700,
                      color: theme.palette.primary.main,
                      bgcolor: alpha(theme.palette.primary.main, 0.05),
                      display: "inline-block",
                      px: 1, borderRadius: 1,
                      fontSize: "0.75rem"
                    }}
                  >
                    {u.campusId || "LPU-102"}
                  </Typography>
                </TableCell>

                <TableCell sx={{ textAlign: "right" }}>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    startIcon={<DeleteOutlineIcon />}
                    onClick={() => {
                      if(window.confirm(`Delete ${u.fullName}? This action cannot be undone.`)) {
                        dispatch(deleteUser(u._id))
                      }
                    }}
                    sx={{ 
                      borderRadius: 2, 
                      textTransform: "none", 
                      fontWeight: 700,
                      borderWidth: "1px",
                      '&:hover': {
                        borderWidth: "1px",
                        bgcolor: alpha(theme.palette.error.main, 0.05)
                      }
                    }}
                  >
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default StudentsPage;