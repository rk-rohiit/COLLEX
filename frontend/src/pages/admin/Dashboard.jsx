import {
  Grid, Paper, Typography, Box, Stack,
  Avatar, Chip, LinearProgress
} from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDashboardStats,
  getRecentOrders,
  getTopCategories,
} from "@/features/admin/adminSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { stats, recentOrders, categories } = useSelector((s) => s.admin);

  useEffect(() => {
    dispatch(getDashboardStats());
    dispatch(getRecentOrders());
    dispatch(getTopCategories());
  }, [dispatch]);

  return (
    <Box p={3}>
      <Grid container spacing={3}>

        {/* 🔥 STATS */}
        {[
          { label: "Products", value: stats?.totalProducts },
          { label: "Students", value: stats?.totalStudents },
          { label: "Pending Orders", value: stats?.pendingOrders },
          { label: "Completed Orders", value: stats?.successOrders },
        ].map((card, i) => (
          <Grid item xs={12} sm={6} md={3} key={i}>
            <Paper sx={{ p: 3, borderRadius: 4 }}>
              <Typography fontSize={14} color="text.secondary">
                {card.label}
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                {card.value || 0}
              </Typography>
            </Paper>
          </Grid>
        ))}

        {/* 🔥 RECENT ORDERS */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, borderRadius: 4 }}>
            <Typography variant="h6" mb={2}>
              Recent Orders
            </Typography>

            {recentOrders?.map((o) => (
              <Stack
                key={o._id}
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
              >
                <Stack direction="row" spacing={2}>
                  <Avatar>
                    {o.buyer?.fullName?.[0]}
                  </Avatar>
                  <Box>
                    <Typography fontWeight="bold">
                      {o.buyer?.fullName}
                    </Typography>
                    <Typography fontSize={12}>
                      {o.listing?.title}
                    </Typography>
                  </Box>
                </Stack>

                <Chip label={o.status} />
              </Stack>
            ))}
          </Paper>
        </Grid>

        {/* 🔥 CATEGORIES */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, borderRadius: 4 }}>
            <Typography variant="h6" mb={2}>
              Top Categories
            </Typography>

            {categories?.map((c) => (
              <Box key={c.category} mb={2}>
                <Stack direction="row" justifyContent="space-between">
                  <Typography>{c.category}</Typography>
                  <Typography>{c.percentage}%</Typography>
                </Stack>

                <LinearProgress
                  variant="determinate"
                  value={Number(c.percentage)}
                />
              </Box>
            ))}
          </Paper>
        </Grid>

      </Grid>
    </Box>
  );
};

export default Dashboard;