// components/admin/TransactionsPage.jsx

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box, Paper, Typography, Table, TableBody, TableCell,
  TableHead, TableRow, Chip, Stack, useTheme, Grid, FormControl,
  InputLabel, Select, MenuItem
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ReceiptIcon from "@mui/icons-material/Receipt";

import { getTransactionsAdmin } from "@/features/admin/adminSlice";

const TransactionsPage = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { transactions } = useSelector((s) => s.admin);

  // Timeframe filter state: "", "daily", "weekly", "monthly"
  const [filterRange, setFilterRange] = useState("");

  useEffect(() => {
    dispatch(getTransactionsAdmin(filterRange));
  }, [dispatch, filterRange]);

  const handleFilterChange = (e) => {
    setFilterRange(e.target.value);
  };

  // Derived stats
  const totalVolume = transactions?.reduce((sum, tx) => sum + (tx.amount || 0), 0) || 0;
  const totalCount = transactions?.length || 0;
  const averageValue = totalCount > 0 ? Math.round(totalVolume / totalCount) : 0;

  const getStatusColor = (status) => {
    switch (status) {
      case "paid":
        return { bg: alpha(theme.palette.success.main, 0.1), text: theme.palette.success.main };
      case "failed":
        return { bg: alpha(theme.palette.error.main, 0.1), text: theme.palette.error.main };
      default:
        return { bg: alpha(theme.palette.warning.main, 0.1), text: theme.palette.warning.main };
    }
  };

  return (
    <Box p={4}>
      {/* ── KPI cards ── */}
      <Grid container spacing={2.5} sx={{ width: "100%", m: 0, mb: 3 }}>
        <Grid item xs={12} sm={4}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: "14px",
              border: "1.5px solid",
              borderColor: "divider",
              display: "flex",
              alignItems: "center",
              gap: 2,
              bgcolor: "background.paper",
            }}
          >
            <Avatar
              sx={{
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                color: theme.palette.primary.main,
                width: 48,
                height: 48,
              }}
            >
              <AccountBalanceWalletIcon />
            </Avatar>
            <Box>
              <Typography variant="caption" color="text.secondary" fontWeight={600} sx={{ textTransform: "uppercase" }}>
                Total Payment Volume
              </Typography>
              <Typography variant="h5" fontWeight={800} color="primary.main">
                ₹{totalVolume.toLocaleString()}
              </Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: "14px",
              border: "1.5px solid",
              borderColor: "divider",
              display: "flex",
              alignItems: "center",
              gap: 2,
              bgcolor: "background.paper",
            }}
          >
            <Avatar
              sx={{
                bgcolor: alpha(theme.palette.secondary.main, 0.1),
                color: theme.palette.secondary.main,
                width: 48,
                height: 48,
              }}
            >
              <ReceiptIcon />
            </Avatar>
            <Box>
              <Typography variant="caption" color="text.secondary" fontWeight={600} sx={{ textTransform: "uppercase" }}>
                Transactions Count
              </Typography>
              <Typography variant="h5" fontWeight={800} color="text.primary">
                {totalCount}
              </Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: "14px",
              border: "1.5px solid",
              borderColor: "divider",
              display: "flex",
              alignItems: "center",
              gap: 2,
              bgcolor: "background.paper",
            }}
          >
            <Avatar
              sx={{
                bgcolor: alpha(theme.palette.success.main, 0.1),
                color: theme.palette.success.main,
                width: 48,
                height: 48,
              }}
            >
              <TrendingUpIcon />
            </Avatar>
            <Box>
              <Typography variant="caption" color="text.secondary" fontWeight={600} sx={{ textTransform: "uppercase" }}>
                Average Value
              </Typography>
              <Typography variant="h5" fontWeight={800} color="success.main">
                ₹{averageValue.toLocaleString()}
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* ── Transaction table panel ── */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 4,
          border: "1px solid",
          borderColor: "divider",
          overflow: "hidden",
        }}
      >
        {/* HEADER AND FILTERS */}
        <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ sm: "center" }} spacing={2} mb={3}>
          <Box>
            <Typography variant="h6" fontWeight={800}>
              Transaction Ledger
            </Typography>
            <Typography variant="caption" color="text.secondary" fontWeight={600}>
              Comprehensive history of payments on your campus
            </Typography>
          </Box>

          <FormControl size="small" sx={{ minWidth: 160 }}>
            <InputLabel>Timeframe Filter</InputLabel>
            <Select
              value={filterRange}
              label="Timeframe Filter"
              onChange={handleFilterChange}
              sx={{ borderRadius: "10px" }}
            >
              <MenuItem value="">All Transactions</MenuItem>
              <MenuItem value="daily">Daily (Last 24h)</MenuItem>
              <MenuItem value="weekly">Weekly (Last 7d)</MenuItem>
              <MenuItem value="monthly">Monthly (Last 30d)</MenuItem>
            </Select>
          </FormControl>
        </Stack>

        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: alpha(theme.palette.primary.main, 0.02) }}>
              <TableCell sx={{ fontWeight: 700, color: "text.secondary", fontSize: "0.85rem" }}>TRANSACTION ID</TableCell>
              <TableCell sx={{ fontWeight: 700, color: "text.secondary", fontSize: "0.85rem" }}>ORDER ID</TableCell>
              <TableCell sx={{ fontWeight: 700, color: "text.secondary", fontSize: "0.85rem" }}>PARTIES (BUYER / SELLER)</TableCell>
              <TableCell sx={{ fontWeight: 700, color: "text.secondary", fontSize: "0.85rem" }}>PRODUCT</TableCell>
              <TableCell sx={{ fontWeight: 700, color: "text.secondary", fontSize: "0.85rem" }}>AMOUNT</TableCell>
              <TableCell sx={{ fontWeight: 700, color: "text.secondary", fontSize: "0.85rem" }}>STATUS</TableCell>
              <TableCell sx={{ fontWeight: 700, color: "text.secondary", fontSize: "0.85rem", textAlign: "right" }}>DATE</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {transactions && transactions.map((item) => {
              const statusStyle = getStatusColor(item.status);
              return (
                <TableRow key={item._id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  {/* Razorpay Transaction ID */}
                  <TableCell>
                    <Typography variant="body2" fontWeight={700} sx={{ fontFamily: "monospace", fontSize: "0.8rem" }}>
                      {item.razorpayPaymentId || item._id.slice(-10).toUpperCase()}
                    </Typography>
                  </TableCell>

                  {/* Order ID */}
                  <TableCell>
                    <Typography variant="caption" sx={{ fontFamily: "monospace", color: "text.secondary" }}>
                      #{item.orderId?._id?.slice(-6).toUpperCase() || "N/A"}
                    </Typography>
                  </TableCell>

                  {/* Parties (Buyer & Seller) */}
                  <TableCell>
                    <Typography variant="body2" fontWeight={600} color="text.primary">
                      {item.orderId?.buyer?.fullName || "System Buyer"}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: -0.5 }}>
                      to: {item.orderId?.seller?.fullName || "System Seller"}
                    </Typography>
                  </TableCell>

                  {/* Product Details */}
                  <TableCell>
                    <Typography variant="body2" fontWeight={600}>
                      {item.orderId?.listing?.title || "Product Listing"}
                    </Typography>
                  </TableCell>

                  {/* Amount Paid */}
                  <TableCell>
                    <Typography variant="body2" fontWeight={800} color="primary.main">
                      ₹{item.amount?.toLocaleString()}
                    </Typography>
                  </TableCell>

                  {/* Razorpay Status */}
                  <TableCell>
                    <Chip
                      label={item.status}
                      size="small"
                      sx={{
                        fontSize: "10px",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        bgcolor: statusStyle.bg,
                        color: statusStyle.text,
                        borderRadius: 1.5,
                      }}
                    />
                  </TableCell>

                  {/* Date Created */}
                  <TableCell align="right">
                    <Typography variant="caption" color="text.secondary">
                      {new Date(item.createdAt).toLocaleString()}
                    </Typography>
                  </TableCell>
                </TableRow>
              );
            })}

            {(!transactions || transactions.length === 0) && (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 5 }}>
                  <Typography color="text.secondary">No transactions found for the selected timeframe.</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

// Help helper
const Avatar = ({ children, sx }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        width: 44,
        height: 44,
        borderRadius: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        ...sx,
      }}
    >
      {children}
    </Box>
  );
};

export default TransactionsPage;
