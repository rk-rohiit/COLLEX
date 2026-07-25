// components/admin/StudentsPage.jsx

import {
  Table, TableBody, TableCell, TableHead,
  TableRow, Button, Paper, Typography, Box, Stack, Avatar, useTheme,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem,
  FormControl, InputLabel, Select
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import {
  getAllUsers,
  deleteUser,
  updateUserAdmin,
} from "@/features/admin/adminSlice";

// Icons
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';

const StudentsPage = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { users } = useSelector((s) => s.admin);

  // Edit Modal State
  const [editOpen, setEditOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    course: "btech",
    year: 1,
    hostelBlock: "",
    role: "student",
  });

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const handleOpenEdit = (user) => {
    setSelectedUser(user);
    setForm({
      fullName: user.fullName || "",
      email: user.email || "",
      phone: user.phone || "",
      course: user.course || "btech",
      year: user.year || 1,
      hostelBlock: user.hostelBlock || "",
      role: user.role || "student",
    });
    setEditOpen(true);
  };

  const handleCloseEdit = () => {
    setEditOpen(false);
    setSelectedUser(null);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!form.fullName || !form.email || !form.phone || !form.course || !form.year) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      const dataToSave = {
        ...form,
        hostelBlock: form.hostelBlock || null,
      };

      await dispatch(updateUserAdmin({ id: selectedUser._id, data: dataToSave })).unwrap();
      toast.success("Student updated successfully! 🎉");
      handleCloseEdit();
    } catch (err) {
      toast.error(err || "Failed to update student");
    }
  };

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
                          Verified Student ({u.role})
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
                    {u.campusId || "LPU"}
                  </Typography>
                </TableCell>

                <TableCell sx={{ textAlign: "right" }}>
                  <Stack direction="row" spacing={1} justifyContent="flex-end">
                    <Button
                      variant="outlined"
                      color="primary"
                      size="small"
                      startIcon={<EditOutlinedIcon />}
                      onClick={() => handleOpenEdit(u)}
                      sx={{ 
                        borderRadius: 2, 
                        textTransform: "none", 
                        fontWeight: 700,
                      }}
                    >
                      Edit
                    </Button>
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
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/* EDIT STUDENT DIALOG */}
      <Dialog 
        open={editOpen} 
        onClose={handleCloseEdit}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            borderRadius: 4,
            p: 1.5,
          }
        }}
      >
        <DialogTitle sx={{ fontWeight: 800, pb: 1 }}>
          Edit Student Details
        </DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, mt: 1.5 }}>
            <TextField
              name="fullName"
              label="Full Name"
              value={form.fullName}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              name="email"
              label="Email Address"
              value={form.email}
              onChange={handleChange}
              fullWidth
              required
              type="email"
            />
            <TextField
              name="phone"
              label="Phone Number"
              value={form.phone}
              onChange={handleChange}
              fullWidth
              required
            />
            
            <Stack direction="row" spacing={2}>
              <FormControl fullWidth required>
                <InputLabel>Course</InputLabel>
                <Select
                  name="course"
                  value={form.course}
                  onChange={handleChange}
                  label="Course"
                >
                  <MenuItem value="btech">B.Tech</MenuItem>
                  <MenuItem value="mtech">M.Tech</MenuItem>
                  <MenuItem value="bba">BBA</MenuItem>
                  <MenuItem value="mba">MBA</MenuItem>
                  <MenuItem value="bca">BCA</MenuItem>
                  <MenuItem value="mca">MCA</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth required>
                <InputLabel>Year</InputLabel>
                <Select
                  name="year"
                  value={form.year}
                  onChange={handleChange}
                  label="Year"
                >
                  <MenuItem value={1}>1st Year</MenuItem>
                  <MenuItem value={2}>2nd Year</MenuItem>
                  <MenuItem value={3}>3rd Year</MenuItem>
                  <MenuItem value={4}>4th Year</MenuItem>
                  <MenuItem value={5}>5th Year</MenuItem>
                </Select>
              </FormControl>
            </Stack>

            <FormControl fullWidth>
              <InputLabel>Hostel Block</InputLabel>
              <Select
                name="hostelBlock"
                value={form.hostelBlock}
                onChange={handleChange}
                label="Hostel Block"
              >
                <MenuItem value=""><em>None / Day Scholar</em></MenuItem>
                <MenuItem value="block-a">Block A</MenuItem>
                <MenuItem value="block-b">Block B</MenuItem>
                <MenuItem value="block-c">Block C</MenuItem>
                <MenuItem value="block-d">Block D</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth required>
              <InputLabel>Role</InputLabel>
              <Select
                name="role"
                value={form.role}
                onChange={handleChange}
                label="Role"
              >
                <MenuItem value="student">Student</MenuItem>
                <MenuItem value="admin">Administrator</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
          <Button 
            onClick={handleCloseEdit} 
            variant="outlined" 
            sx={{ borderRadius: 2, textTransform: "none", fontWeight: 700 }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSave} 
            variant="contained" 
            color="primary"
            sx={{ borderRadius: 2, textTransform: "none", fontWeight: 700 }}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default StudentsPage;