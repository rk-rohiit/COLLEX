import { Box, Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import PeopleOutlinedIcon     from "@mui/icons-material/PeopleOutlined";
import HourglassEmptyOutlinedIcon from "@mui/icons-material/HourglassEmptyOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

import StatCard     from "../dashboard/StatCard";
import SectionCard  from "../dashboard/SectionCard";
import OrderRow     from "../dashboard/OrderRow";
import CategoryRow  from "../dashboard/CategoryRow";
import SummaryStrip from "../dashboard/Summarystrip";
import DashSkeleton from "../dashboard/DashSkeleton";

import {
  getDashboardStats,
  getRecentOrders,
  getTopCategories,
} from "@/features/admin/adminSlice";

// ─── KPI config ──────────────────────────────────────────────────────────────
const KPI_CONFIG = [
  {
    key:    "totalProducts",
    label:  "Total Products",
    icon:   <Inventory2OutlinedIcon />,
    accent: "#cc0102",
    footer: "Live from Collex DB",
  },
  {
    key:    "totalStudents",
    label:  "Verified Students",
    icon:   <PeopleOutlinedIcon />,
    accent: "#1D9E75",
    footer: "Verified accounts only",
  },
  {
    key:    "pendingOrders",
    label:  "Pending Orders",
    icon:   <HourglassEmptyOutlinedIcon />,
    accent: "#EF9F27",
    footer: "Awaiting fulfilment",
  },
  {
    key:    "successOrders",
    label:  "Completed Sales",
    icon:   <CheckCircleOutlineIcon />,
    accent: "#378ADD",
    footer: "All-time total",
  },
];

// ─── Dashboard ────────────────────────────────────────────────────────────────
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

  // Summary strip data derived from stats
  const summaryItems = [
    { label: "Revenue (MTD)",    value: stats?.revenueMTD   ?? "—" },
    { label: "Avg. Order Value", value: stats?.avgOrderValue ?? "—" },
    { label: "Active Listings",  value: stats?.activeListings ?? "—" },
  ];

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >

      {/* ── KPI cards ── */}
      <Grid container spacing={1.5}>
        {KPI_CONFIG.map(({ key, label, icon, accent, footer }) => (
          <Grid item xs={12} sm={6} md={3} key={key}>
            <StatCard
              label={label}
              value={stats?.[key]}
              icon={icon}
              accent={accent}
              footer={footer}
            />
          </Grid>
        ))}
      </Grid>

      {/* ── Secondary metrics strip ── */}
      <SummaryStrip items={summaryItems} />

      {/* ── Detail panels ── */}
      <Grid container spacing={1.5}>
        {/* Recent Activity */}
        <Grid item xs={12} md={6} sx={{ display: "flex" }}>
          <SectionCard
            title="Recent Activity"
            tag={`${recentOrders?.length ?? 0} ORDERS`}
          >
            {recentOrders?.length > 0 ? (
              recentOrders.map((o) => <OrderRow key={o._id} order={o} />)
            ) : (
              <Box p={3} textAlign="center">
                <Typography color="text.secondary" fontSize={13}>
                  No recent activity found.
                </Typography>
              </Box>
            )}
          </SectionCard>
        </Grid>

        {/* Top Categories */}
        <Grid item xs={12} md={6} sx={{ display: "flex" }}>
          <SectionCard title="Top Categories" tag="BY VOLUME">
            {categories?.length > 0 ? (
              categories.map((c, i) => (
                <CategoryRow
                  key={c.category}
                  category={c.category}
                  percentage={c.percentage}
                  index={i}
                />
              ))
            ) : (
              <Box p={3} textAlign="center">
                <Typography color="text.secondary" fontSize={13}>
                  No category data.
                </Typography>
              </Box>
            )}
          </SectionCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;