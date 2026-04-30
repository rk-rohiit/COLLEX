import { Box, Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import StatCard from "../dashboard/StatCard";
import SectionCard from "../dashboard/SectionCard";
import OrderRow from "../dashboard/OrderRow";
import CategoryRow from "../dashboard/CategoryRow";
import DashSkeleton from "../dashboard/DashSkeleton";

import {
  getDashboardStats,
  getRecentOrders,
  getTopCategories,
} from "@/features/admin/adminSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { stats, recentOrders, categories, loading } = useSelector(
    (s) => s.admin
  );

  useEffect(() => {
    dispatch(getDashboardStats());
    dispatch(getRecentOrders());
    dispatch(getTopCategories());
  }, [dispatch]);

  if (loading) return <DashSkeleton />;

  return (
  <Box
    sx={{
      width: "100%",          // 🔥 VERY IMPORTANT
      maxWidth: "100%",
      display: "flex",
      flexDirection: "column",
      gap: 2.5,
    }}
  >

    {/* KPI */}
    <Grid container spacing={2.5} sx={{ width: "100%", m: 0 }}>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard label="Products" value={stats?.totalProducts} />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard label="Students" value={stats?.totalStudents} />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard label="Pending" value={stats?.pendingOrders} />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard label="Completed" value={stats?.successOrders} />
      </Grid>
    </Grid>

    {/* Middle */}
    <Grid container spacing={2.5} sx={{ width: "100%", m: 0 }}>
      <Grid item xs={12} md={8} sx={{ display: "flex" }}>
        <SectionCard
          title="Recent Activity"
          action={<Typography>{recentOrders?.length} orders</Typography>}
        >
          {recentOrders?.map((o) => (
            <OrderRow key={o._id} order={o} />
          ))}
        </SectionCard>
      </Grid>

      <Grid item xs={12} md={4} sx={{ display: "flex" }}>
        <SectionCard title="Top Categories">
          {categories?.map((c, i) => (
            <CategoryRow key={c.category} {...c} index={i} />
          ))}
        </SectionCard>
      </Grid>
    </Grid>

  </Box>
);
};

export default Dashboard;