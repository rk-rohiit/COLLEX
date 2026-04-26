// components/admin/Dashboard.jsx

import {
  Grid,
  Paper,
  Typography,
  Box,
  Stack,
  Avatar,
  Chip,
  Skeleton,
} from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDashboardStats,
  getRecentOrders,
  getTopCategories,
} from "@/features/admin/adminSlice";

import Inventory2OutlinedIcon    from "@mui/icons-material/Inventory2Outlined";
import PeopleAltOutlinedIcon     from "@mui/icons-material/PeopleAltOutlined";
import PendingActionsOutlinedIcon from "@mui/icons-material/PendingActionsOutlined";
import TaskAltOutlinedIcon       from "@mui/icons-material/TaskAltOutlined";

/* ─── Palette ─────────────────────────────────────────────────
   Each accent maps to a semantic ramp:
   teal = products, blue = students, amber = pending, green = success
───────────────────────────────────────────────────────────────*/
const STAT_CONFIGS = [
  {
    key: "totalProducts",
    label: "Products",
    icon: <Inventory2OutlinedIcon sx={{ fontSize: 15 }} />,
    iconBg: "#E1F5EE",
    iconColor: "#1D9E75",
    accent: "#1D9E75",
  },
  {
    key: "totalStudents",
    label: "Students",
    icon: <PeopleAltOutlinedIcon sx={{ fontSize: 15 }} />,
    iconBg: "#E6F1FB",
    iconColor: "#378ADD",
    accent: "#378ADD",
  },
  {
    key: "pendingOrders",
    label: "Pending",
    icon: <PendingActionsOutlinedIcon sx={{ fontSize: 15 }} />,
    iconBg: "#FAEEDA",
    iconColor: "#EF9F27",
    accent: "#EF9F27",
  },
  {
    key: "successOrders",
    label: "Completed",
    icon: <TaskAltOutlinedIcon sx={{ fontSize: 15 }} />,
    iconBg: "#EAF3DE",
    iconColor: "#639922",
    accent: "#639922",
  },
];

const BAR_COLORS = [
  "#1D9E75", "#378ADD", "#EF9F27", "#639922", "#D4537E", "#D85A30",
];

const STATUS_CHIP = {
  completed: { bgcolor: "#EAF3DE", color: "#3B6D11" },
  cancelled:  { bgcolor: "#FCEBEB", color: "#A32D2D" },
  pending:    { bgcolor: "#FAEEDA", color: "#854F0B" },
};

/* ─── Sub-components ──────────────────────────────────────────*/

/** Stat card with left accent bar + icon box */
const StatCard = ({ label, value, icon, iconBg, iconColor, accent }) => (
  <Paper
    elevation={0}
    sx={{
      p: "1rem 1.1rem",
      borderRadius: 3,
      border: "0.5px solid",
      borderColor: "divider",
      bgcolor: "background.paper",
      position: "relative",
      overflow: "hidden",
      "&::before": {
        content: '""',
        position: "absolute",
        left: 0, top: 0, bottom: 0,
        width: "3px",
        bgcolor: accent,
        borderRadius: "3px 0 0 3px",
      },
    }}
  >
    <Avatar
      sx={{
        width: 32,
        height: 32,
        bgcolor: iconBg,
        color: iconColor,
        borderRadius: "8px",
        mb: 1.25,
      }}
    >
      {icon}
    </Avatar>

    <Typography
      sx={{
        fontSize: "24px",
        fontWeight: 500,
        color: "text.primary",
        fontFamily: "'JetBrains Mono', monospace",
        letterSpacing: "-0.5px",
        lineHeight: 1,
      }}
    >
      {value ?? "—"}
    </Typography>

    <Typography
      sx={{
        fontSize: "10px",
        fontWeight: 600,
        color: "text.secondary",
        textTransform: "uppercase",
        letterSpacing: "0.6px",
        mt: 0.5,
      }}
    >
      {label}
    </Typography>
  </Paper>
);

/** Mini metric card for the bottom summary row */
const MiniStat = ({ label, value, sub }) => (
  <Box
    sx={{
      bgcolor: "background.default",
      borderRadius: 2,
      p: "14px 16px",
      border: "0.5px solid",
      borderColor: "divider",
    }}
  >
    <Typography sx={{ fontSize: "11px", color: "text.secondary", mb: 0.5 }}>
      {label}
    </Typography>
    <Typography
      sx={{
        fontSize: "20px",
        fontWeight: 500,
        color: "text.primary",
        fontFamily: "'JetBrains Mono', monospace",
      }}
    >
      {value}
    </Typography>
    <Typography sx={{ fontSize: "10px", color: "text.secondary", mt: 0.375 }}>
      {sub}
    </Typography>
  </Box>
);

/** Section card wrapper */
const SectionCard = ({ title, action, children, sx }) => (
  <Paper
    elevation={0}
    sx={{
      borderRadius: 3,
      border: "0.5px solid",
      borderColor: "divider",
      bgcolor: "background.paper",
      overflow: "hidden",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      ...sx,
    }}
  >
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{ px: 2, py: 1.375, borderBottom: "0.5px solid", borderColor: "divider" }}
    >
      <Typography sx={{ fontSize: "13px", fontWeight: 500, color: "text.primary" }}>
        {title}
      </Typography>
      {action}
    </Stack>
    <Box sx={{ px: 2, py: 0.75, flex: 1, overflow: "auto" }}>{children}</Box>
  </Paper>
);

/** Single order row */
const OrderRow = ({ order }) => {
  const name  = order?.buyer?.fullName || "Unknown";
  const chip  = STATUS_CHIP[order?.status] || STATUS_CHIP.pending;

  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={1.25}
      sx={{
        py: 0.875,
        borderBottom: "0.5px solid",
        borderColor: "divider",
        "&:last-child": { borderBottom: "none" },
      }}
    >
      <Avatar
        sx={{
          width: 32,
          height: 32,
          fontSize: "12px",
          fontWeight: 500,
          bgcolor: "#E1F5EE",
          color: "#0F6E56",
          fontFamily: "'JetBrains Mono', monospace",
          flexShrink: 0,
        }}
      >
        {name.charAt(0).toUpperCase()}
      </Avatar>

      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography
          sx={{ fontSize: "12px", fontWeight: 500, color: "text.primary", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}
        >
          {name}
        </Typography>
        <Typography
          sx={{ fontSize: "11px", color: "text.secondary", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", mt: 0.125 }}
        >
          {order?.listing?.title || "Untitled"}
        </Typography>
      </Box>

      <Chip
        label={order?.status || "pending"}
        size="small"
        sx={{
          height: 20,
          fontSize: "10px",
          fontWeight: 500,
          bgcolor: chip.bgcolor,
          color: chip.color,
          border: "none",
          flexShrink: 0,
          "& .MuiChip-label": { px: 1 },
        }}
      />
    </Stack>
  );
};

/** Category bar row */
const CategoryRow = ({ category, percentage, colorIndex }) => {
  const pct   = Math.round(Number(percentage) || 0);
  const color = BAR_COLORS[colorIndex % BAR_COLORS.length];

  return (
    <Box
      sx={{
        py: 0.875,
        borderBottom: "0.5px solid",
        borderColor: "divider",
        "&:last-child": { borderBottom: "none" },
      }}
    >
      <Stack direction="row" justifyContent="space-between" mb={0.625}>
        <Typography sx={{ fontSize: "12px", fontWeight: 500, color: "text.primary" }}>
          {category}
        </Typography>
        <Typography
          sx={{ fontSize: "11px", fontWeight: 500, color: "text.secondary", fontFamily: "'JetBrains Mono', monospace" }}
        >
          {pct}%
        </Typography>
      </Stack>

      <Box sx={{ height: "4px", bgcolor: "action.hover", borderRadius: "4px", overflow: "hidden" }}>
        <Box sx={{ width: `${pct}%`, height: "100%", bgcolor: color, borderRadius: "4px", transition: "width 0.6s ease" }} />
      </Box>
    </Box>
  );
};

/* ─── Loading skeleton ────────────────────────────────────────*/
const DashSkeleton = () => (
  <Box sx={{ p: { xs: 2, md: 3 } }}>
    <Grid container spacing={1.5} mb={1.75}>
      {[1, 2, 3, 4].map((i) => (
        <Grid item xs={6} sm={3} key={i}>
          <Skeleton variant="rounded" height={106} sx={{ borderRadius: 3 }} />
        </Grid>
      ))}
    </Grid>
    <Grid container spacing={1.75} mb={1.75}>
      <Grid item xs={12} md={7}>
        <Skeleton variant="rounded" height={340} sx={{ borderRadius: 3 }} />
      </Grid>
      <Grid item xs={12} md={5}>
        <Skeleton variant="rounded" height={340} sx={{ borderRadius: 3 }} />
      </Grid>
    </Grid>
    <Grid container spacing={1.5}>
      {[1, 2, 3].map((i) => (
        <Grid item xs={12} sm={4} key={i}>
          <Skeleton variant="rounded" height={80} sx={{ borderRadius: 2 }} />
        </Grid>
      ))}
    </Grid>
  </Box>
);

/* ─── Main Dashboard ──────────────────────────────────────────*/
const Dashboard = () => {
  const dispatch = useDispatch();
  const { stats, recentOrders, categories, loading } = useSelector((s) => s.admin);

  useEffect(() => {
    dispatch(getDashboardStats());
    dispatch(getRecentOrders());
    dispatch(getTopCategories());
  }, [dispatch]);

  if (loading) return <DashSkeleton />;

  /* Derived mini-stats */
  const total      = (stats?.pendingOrders || 0) + (stats?.successOrders || 0);
  const completion = total > 0 ? Math.round((stats.successOrders / total) * 100) : 0;

  return (
    <Box sx={{ p: { xs: 2, md: 3 }, bgcolor: "background.default", minHeight: "100%" }}>

      {/* ── ROW 1: KPI stat cards ── */}
      <Grid container spacing={1.5} mb={1.75}>
        {STAT_CONFIGS.map((cfg) => (
          <Grid item xs={6} sm={3} key={cfg.key}>
            <StatCard
              label={cfg.label}
              value={stats?.[cfg.key]}
              icon={cfg.icon}
              iconBg={cfg.iconBg}
              iconColor={cfg.iconColor}
              accent={cfg.accent}
            />
          </Grid>
        ))}
      </Grid>

      {/* ── ROW 2: Activity + Categories ── */}
      <Grid container spacing={1.75} mb={1.75} alignItems="stretch">

        {/* Recent orders */}
        <Grid item xs={12} md={7}>
          <SectionCard
            title="Recent activity"
            action={
              <Typography
                sx={{
                  fontSize: "11px",
                  color: "text.secondary",
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                {recentOrders?.length ?? 0} orders
              </Typography>
            }
          >
            {recentOrders?.length > 0 ? (
              recentOrders.map((o) => <OrderRow key={o._id} order={o} />)
            ) : (
              <Typography
                sx={{ fontSize: "12px", color: "text.secondary", py: 3, textAlign: "center" }}
              >
                No recent orders
              </Typography>
            )}
          </SectionCard>
        </Grid>

        {/* Top categories */}
        <Grid item xs={12} md={5}>
          <SectionCard title="Top categories">
            {categories?.length > 0 ? (
              categories.map((c, i) => (
                <CategoryRow
                  key={c.category}
                  category={c.category}
                  percentage={c.percentage}
                  colorIndex={i}
                />
              ))
            ) : (
              <Typography
                sx={{ fontSize: "12px", color: "text.secondary", py: 3, textAlign: "center" }}
              >
                No category data
              </Typography>
            )}
          </SectionCard>
        </Grid>
      </Grid>

      {/* ── ROW 3: Summary mini-stats ── */}
      <Grid container spacing={1.5}>
        <Grid item xs={12} sm={4}>
          <MiniStat
            label="Avg. order value"
            value={stats?.avgOrderValue ? `₹${Math.round(stats.avgOrderValue)}` : "₹—"}
            sub="across all orders"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <MiniStat
            label="Completion rate"
            value={`${completion}%`}
            sub="of total orders"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <MiniStat
            label="Active listings"
            value={stats?.activeListings ?? "—"}
            sub="currently live"
          />
        </Grid>
      </Grid>

    </Box>
  );
};

export default Dashboard;