// components/admin/OrdersPage.jsx

import {
  Table, TableBody, TableCell, TableHead,
  TableRow, Button, Paper, Typography, Chip, Stack, Box, useTheme, Avatar
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrders,
  updateOrderStatus,
} from "@/features/admin/adminSlice";

// Icons
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import BlockIcon from '@mui/icons-material/Block';

const OrdersPage = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { orders } = useSelector((s) => s.admin);

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  const getStatusStyles = (status) => {
    switch (status) {
      case "completed":
        return { color: theme.palette.success.main, bg: alpha(theme.palette.success.main, 0.1) };
      case "cancelled":
        return { color: theme.palette.error.main, bg: alpha(theme.palette.error.main, 0.1) };
      default:
        return { color: theme.palette.secondary.main, bg: alpha(theme.palette.secondary.main, 0.1) };
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
        <Typography variant="h6" fontWeight={800} mb={3}>
          Orders Management
        </Typography>

        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: alpha(theme.palette.primary.main, 0.02) }}>
              <TableCell sx={{ fontWeight: 700, color: "text.secondary", fontSize: "0.85rem" }}>BUYER</TableCell>
              <TableCell sx={{ fontWeight: 700, color: "text.secondary", fontSize: "0.85rem" }}>PRODUCT</TableCell>
              <TableCell sx={{ fontWeight: 700, color: "text.secondary", fontSize: "0.85rem" }}>STATUS</TableCell>
              <TableCell sx={{ fontWeight: 700, color: "text.secondary", fontSize: "0.85rem", textAlign: "right" }}>ACTIONS</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {orders.map((o) => {
              const statusStyle = getStatusStyles(o.status);
              return (
                <TableRow 
                  key={o._id} 
                  hover 
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <Avatar 
                        sx={{ 
                          width: 32, 
                          height: 32, 
                          fontSize: "0.85rem", 
                          bgcolor: alpha(theme.palette.primary.main, 0.1),
                          color: theme.palette.primary.main,
                          fontWeight: 700
                        }}
                      >
                        {o.buyer?.fullName?.[0]}
                      </Avatar>
                      <Typography variant="body2" fontWeight={600}>
                        {o.buyer?.fullName || "Deleted User"}
                      </Typography>
                    </Stack>
                  </TableCell>

                  <TableCell>
                    <Typography variant="body2" fontWeight={500} color="text.primary">
                      {o.listing?.title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ fontFamily: 'monospace' }}>
                      ID: #{o._id.slice(-6).toUpperCase()}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Chip 
                      label={o.status} 
                      size="small"
                      sx={{ 
                        fontWeight: 700, 
                        fontSize: "0.75rem",
                        textTransform: "uppercase",
                        bgcolor: statusStyle.bg,
                        color: statusStyle.color,
                        borderRadius: 1.5
                      }}
                    />
                  </TableCell>

                  <TableCell>
                    <Stack direction="row" spacing={1} justifyContent="flex-end">
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<CheckCircleOutlineIcon />}
                        disabled={o.status === 'completed'}
                        onClick={() =>
                          dispatch(updateOrderStatus({
                            id: o._id,
                            status: "completed"
                          }))
                        }
                        sx={{ 
                          borderRadius: 2, 
                          textTransform: "none", 
                          fontWeight: 700,
                          borderColor: theme.palette.success.main,
                          color: theme.palette.success.main,
                          '&:hover': {
                            borderColor: theme.palette.success.dark,
                            bgcolor: alpha(theme.palette.success.main, 0.05)
                          }
                        }}
                      >
                        Complete
                      </Button>

                      <Button
                        variant="outlined"
                        size="small"
                        color="error"
                        startIcon={<BlockIcon />}
                        disabled={o.status === 'cancelled'}
                        onClick={() =>
                          dispatch(updateOrderStatus({
                            id: o._id,
                            status: "cancelled"
                          }))
                        }
                        sx={{ 
                          borderRadius: 2, 
                          textTransform: "none", 
                          fontWeight: 700,
                          '&:hover': {
                            bgcolor: alpha(theme.palette.error.main, 0.05)
                          }
                        }}
                      >
                        Cancel
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default OrdersPage;