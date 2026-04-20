import {
  Table, TableBody, TableCell, TableHead,
  TableRow, Button, Paper, Typography, Chip, Stack
} from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrders,
  updateOrderStatus,
} from "@/features/admin/adminSlice";

const OrdersPage = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((s) => s.admin);

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  return (
    <Paper sx={{ p: 3, borderRadius: 4 }}>
      <Typography variant="h6" mb={2}>
        Orders Management
      </Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>User</TableCell>
            <TableCell>Product</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {orders.map((o) => (
            <TableRow key={o._id}>
              <TableCell>{o.buyer?.fullName}</TableCell>
              <TableCell>{o.listing?.title}</TableCell>

              <TableCell>
                <Chip label={o.status} />
              </TableCell>

              <TableCell>
                <Stack direction="row" spacing={1}>
                  <Button
                    variant="contained"
                    onClick={() =>
                      dispatch(updateOrderStatus({
                        id: o._id,
                        status: "completed"
                      }))
                    }
                  >
                    Complete
                  </Button>

                  <Button
                    color="error"
                    onClick={() =>
                      dispatch(updateOrderStatus({
                        id: o._id,
                        status: "cancelled"
                      }))
                    }
                  >
                    Cancel
                  </Button>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default OrdersPage;