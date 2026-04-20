import {
  Table, TableBody, TableCell, TableHead,
  TableRow, Button, Paper, Typography
} from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllUsers,
  deleteUser,
} from "@/features/admin/adminSlice";

const StudentsPage = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((s) => s.admin);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <Paper sx={{ p: 3, borderRadius: 4 }}>
      <Typography variant="h6" mb={2}>
        Students
      </Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {users.map((u) => (
            <TableRow key={u._id}>
              <TableCell>{u.fullName}</TableCell>
              <TableCell>{u.email}</TableCell>

              <TableCell>
                <Button
                  color="error"
                  onClick={() => dispatch(deleteUser(u._id))}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default StudentsPage;