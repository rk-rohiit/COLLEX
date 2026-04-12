import {
  Grid, Paper, Typography, Box, LinearProgress,
  Stack, Avatar, Chip, Divider,
  Table, TableBody, TableCell, TableHead, TableRow,
} from "@mui/material";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import PeopleIcon from "@mui/icons-material/People";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import PersonIcon from "@mui/icons-material/Person";
import InventoryIcon from "@mui/icons-material/Inventory";

// ─── STAT CARD ───────────────────────────────────────────────
const StatCard = ({ icon, iconBg, value, label, badge, badgeColor, sub }) => (
  <Paper
    elevation={0}
    sx={{
      p: 2.5,
      borderRadius: "16px",
      border: "0.5px solid",
      borderColor: "divider",
      bgcolor: "background.paper",
      height: "100%",
    }}
  >
    <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
      <Box
        sx={{
          width: 40, height: 40,
          borderRadius: "10px",
          bgcolor: iconBg,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}
      >
        {icon}
      </Box>
      {badge && (
        <Typography
          variant="caption"
          fontWeight={700}
          fontSize="0.72rem"
          sx={{ color: badgeColor || "success.main" }}
        >
          {badge}
        </Typography>
      )}
    </Box>

    <Typography fontWeight={800} fontSize="1.6rem" lineHeight={1} mb={0.5} color="text.primary">
      {value}
    </Typography>
    <Typography variant="body2" color="text.secondary" fontWeight={500} mb={1.5} fontSize="0.82rem">
      {label}
    </Typography>

    {sub && (
      <>
        <Divider sx={{ mb: 1.25, opacity: 0.5 }} />
        <Typography variant="caption" color="text.disabled" fontSize="0.72rem">
          {sub}
        </Typography>
      </>
    )}
  </Paper>
);

// ─── STATUS CHIP ─────────────────────────────────────────────
const StatusChip = ({ status }) => {
  const map = {
    Pending:    { bg: "rgba(237,108,2,0.1)",  color: "#e65100", filled: false },
    Completed:  { bg: "primary.main",         color: "white",   filled: true  },
    Processing: { bg: "rgba(0,0,0,0.06)",     color: "#555",    filled: false },
  };
  const s = map[status] || map["Processing"];
  return (
    <Chip
      label={status}
      size="small"
      sx={{
        bgcolor: s.filled ? "primary.main" : s.bg,
        color: s.filled ? "white" : s.color,
        fontWeight: 700,
        fontSize: "0.7rem",
        height: 24,
        borderRadius: "6px",
      }}
    />
  );
};

// ─── ACTIVITY ITEM ───────────────────────────────────────────
const ActivityItem = ({ icon, iconBg, iconColor, text, time }) => (
  <Stack direction="row" spacing={1.5} alignItems="flex-start">
    <Box
      sx={{
        width: 28, height: 28, flexShrink: 0,
        borderRadius: "8px",
        bgcolor: iconBg,
        display: "flex", alignItems: "center", justifyContent: "center",
        color: iconColor,
      }}
    >
      {icon}
    </Box>
    <Box>
      <Typography fontSize="0.82rem" fontWeight={600} color="text.primary" lineHeight={1.3}>
        {text}
      </Typography>
      <Typography fontSize="0.7rem" color="text.disabled" mt={0.25}>
        {time}
      </Typography>
    </Box>
  </Stack>
);

// ─── DASHBOARD ───────────────────────────────────────────────
const Dashboard = () => {
  const orders = [
    { id: "#ORD-1024", student: "Sarah Johnson",  avatar: "S", product: "Calculus Textbook",     status: "Pending",    amount: "$45.00" },
    { id: "#ORD-1023", student: "Michael Chen",   avatar: "M", product: "Lab Coat",              status: "Completed",  amount: "$28.50" },
    { id: "#ORD-1022", student: "Emily Davis",    avatar: "E", product: "Laptop Stand",          status: "Completed",  amount: "$35.00" },
    { id: "#ORD-1021", student: "James Wilson",   avatar: "J", product: "Scientific Calculator", status: "Processing", amount: "$89.99" },
  ];

  const categories = [
    { label: "Textbooks",     pct: 42 },
    { label: "Electronics",   pct: 28 },
    { label: "Stationery",    pct: 18 },
    { label: "Lab Equipment", pct: 12 },
  ];

  const activities = [
    { icon: <AddIcon sx={{ fontSize: 13 }} />,       iconBg: "rgba(46,125,50,0.1)",  iconColor: "#2e7d32", text: "New product added",     time: "5 minutes ago"  },
    { icon: <CheckIcon sx={{ fontSize: 13 }} />,     iconBg: "rgba(26,35,126,0.08)", iconColor: "#1a237e", text: "Order #1023 completed",  time: "12 minutes ago" },
    { icon: <PersonIcon sx={{ fontSize: 13 }} />,    iconBg: "rgba(0,0,0,0.06)",     iconColor: "#555",    text: "New student registered", time: "1 hour ago"     },
    { icon: <InventoryIcon sx={{ fontSize: 13 }} />, iconBg: "rgba(237,108,2,0.1)",  iconColor: "#e65100", text: "Product out of stock",   time: "2 hours ago"    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={2.5}>

        {/* ── STAT CARDS ── */}
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard
            icon={<ShoppingBagIcon sx={{ fontSize: 18, color: "#1a237e" }} />}
            iconBg="rgba(26,35,126,0.08)"
            value="1,247"
            label="Total Active Products"
            badge="+12%"
            badgeColor="success.main"
            sub="Last updated: 2 min ago"
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard
            icon={<PeopleIcon sx={{ fontSize: 18, color: "#1a237e" }} />}
            iconBg="rgba(26,35,126,0.08)"
            value="3,542"
            label="Total Number of Students"
            badge="+8%"
            badgeColor="success.main"
            sub="Active users this month"
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard
            icon={<AccessTimeIcon sx={{ fontSize: 18, color: "#e65100" }} />}
            iconBg="rgba(237,108,2,0.08)"
            value="156"
            label="Total Pending Orders"
            badge="23"
            badgeColor="warning.main"
            sub="Requires attention"
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard
            icon={<CheckCircleIcon sx={{ fontSize: 18, color: "#2e7d32" }} />}
            iconBg="rgba(46,125,50,0.08)"
            value="8,924"
            label="Total Successful Orders"
            badge="+18%"
            badgeColor="success.main"
            sub="All time completed"
          />
        </Grid>

        {/* ── RECENT ORDERS ── */}
        <Grid item xs={12} lg={8}>
          <Paper
            elevation={0}
            sx={{
              borderRadius: "16px",
              border: "0.5px solid",
              borderColor: "divider",
              bgcolor: "background.paper",
              overflow: "hidden",
            }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              px={2.5}
              py={2}
              sx={{ borderBottom: "0.5px solid", borderColor: "divider" }}
            >
              <Typography fontWeight={800} fontSize="0.95rem">
                Recent Orders
              </Typography>
              <Typography
                variant="caption"
                color="primary.main"
                fontWeight={700}
                sx={{ cursor: "pointer", fontSize: "0.78rem" }}
              >
                View All
              </Typography>
            </Box>

            <Table>
              <TableHead>
                <TableRow>
                  {["Order ID", "Student", "Product", "Status", "Amount"].map((h) => (
                    <TableCell
                      key={h}
                      sx={{
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        color: "text.secondary",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        py: 1.25,
                        bgcolor: "background.default",
                        borderBottom: "0.5px solid",
                        borderColor: "divider",
                      }}
                    >
                      {h}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{
                      "&:last-child td": { border: 0 },
                      "&:hover": { bgcolor: "rgba(0,0,0,0.02)" },
                    }}
                  >
                    <TableCell sx={{ fontSize: "0.82rem", fontWeight: 600, color: "text.secondary", py: 1.5 }}>
                      {row.id}
                    </TableCell>
                    <TableCell sx={{ py: 1.5 }}>
                      <Stack direction="row" alignItems="center" spacing={1.25}>
                        <Avatar
                          sx={{
                            width: 28, height: 28,
                            fontSize: "0.72rem", fontWeight: 700,
                            bgcolor: "rgba(26,35,126,0.1)",
                            color: "primary.main",
                          }}
                        >
                          {row.avatar}
                        </Avatar>
                        <Typography fontSize="0.83rem" fontWeight={600}>
                          {row.student}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell sx={{ fontSize: "0.83rem", color: "text.secondary", py: 1.5 }}>
                      {row.product}
                    </TableCell>
                    <TableCell sx={{ py: 1.5 }}>
                      <StatusChip status={row.status} />
                    </TableCell>
                    <TableCell sx={{ fontSize: "0.85rem", fontWeight: 700, py: 1.5 }}>
                      {row.amount}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>

        {/* ── RIGHT COLUMN ── */}
        <Grid item xs={12} lg={4}>
          <Stack spacing={2.5}>

            {/* TOP CATEGORIES */}
            <Paper
              elevation={0}
              sx={{
                p: 2.5,
                borderRadius: "16px",
                border: "0.5px solid",
                borderColor: "divider",
                bgcolor: "background.paper",
              }}
            >
              <Typography fontWeight={800} fontSize="0.95rem" mb={2}>
                Top Categories
              </Typography>
              <Stack spacing={1.75}>
                {categories.map((cat) => (
                  <Box key={cat.label}>
                    <Box display="flex" justifyContent="space-between" mb={0.6}>
                      <Typography fontSize="0.83rem" fontWeight={500} color="text.primary">
                        {cat.label}
                      </Typography>
                      <Typography fontSize="0.78rem" fontWeight={700} color="text.secondary">
                        {cat.pct}%
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={cat.pct}
                      sx={{
                        height: 6,
                        borderRadius: 3,
                        bgcolor: "rgba(0,0,0,0.06)",
                        "& .MuiLinearProgress-bar": {
                          borderRadius: 3,
                          bgcolor: "primary.main",
                        },
                      }}
                    />
                  </Box>
                ))}
              </Stack>
            </Paper>

            {/* RECENT ACTIVITY */}
            <Paper
              elevation={0}
              sx={{
                p: 2.5,
                borderRadius: "16px",
                border: "0.5px solid",
                borderColor: "divider",
                bgcolor: "background.paper",
              }}
            >
              <Typography fontWeight={800} fontSize="0.95rem" mb={2}>
                Recent Activity
              </Typography>
              <Stack spacing={1.75}>
                {activities.map((a, i) => (
                  <ActivityItem key={i} {...a} />
                ))}
              </Stack>
            </Paper>

          </Stack>
        </Grid>

      </Grid>
    </Box>
  );
};

export default Dashboard;