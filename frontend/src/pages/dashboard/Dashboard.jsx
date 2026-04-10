import { useSelector } from "react-redux";
import {
  Container, Grid, Box, Typography, Button, Paper, 
  Stack, Avatar, Chip, IconButton, Divider, LinearProgress, InputBase
} from "@mui/material";
import { useTheme, alpha } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

// Icons
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import PersonIcon from "@mui/icons-material/Person";
import CategoryIcon from "@mui/icons-material/Category";
import AssessmentIcon from "@mui/icons-material/Assessment";
import SettingsIcon from "@mui/icons-material/Settings";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import MoreVertIcon from '@mui/icons-material/MoreVert';

// ─── HELPER COMPONENTS ─────────────────────────────

// Sidebar Link
const SidebarItem = ({ icon, label, active, theme, colors }) => (
  <Button
    fullWidth
    startIcon={icon}
    sx={{
      justifyContent: "flex-start",
      color: active ? colors.accent : "#FFFFFF", // Use Hex
      bgcolor: active ? alpha(colors.accent, 0.1) : "transparent",
      py: 1.5, px: 3,
      borderRadius: 0,
      borderLeft: active ? `3px solid ${colors.accent}` : "none",
      textTransform: "none",
      "&:hover": { 
        // 🔥 Fix here: Change "white" to "#FFFFFF"
        bgcolor: alpha("#FFFFFF", 0.05) 
      }
    }}
  >
    {label}
  </Button>
);

// Summary Card
const SummaryCard = ({ title, value, growth, icon, theme, colors }) => (
  <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: "1px solid #edf2f7" }}>
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Box>
        <Typography variant="overline" color="text.secondary" fontWeight="700">{title}</Typography>
        <Typography variant="h4" fontWeight="900" color={colors.primary}>{value}</Typography>
        <Stack direction="row" spacing={1} alignItems="center">
          <TrendingUpIcon sx={{ fontSize: 16, color: colors.verified }} />
          <Typography variant="caption" color={colors.verified} fontWeight="bold">{growth}% this month</Typography>
        </Stack>
      </Box>
      <Avatar sx={{ width: 60, height: 60, bgcolor: alpha(colors.primary, 0.1), color: colors.primary }}>
        {icon}
      </Avatar>
    </Stack>
  </Paper>
);

// Order Row (as list item)
const OrderRow = ({ order, theme, colors }) => (
  <Paper variant="outlined" sx={{ p: 2, mb: 1, borderRadius: 2 }}>
    <Grid container alignItems="center" spacing={1}>
      <Grid item xs={2}><Typography variant="body2" color="text.secondary">{order.id}</Typography></Grid>
      <Grid item xs={3}>
        <Stack direction="row" spacing={1} alignItems="center">
          <Avatar sx={{ width: 24, height: 24, fontSize: '0.7rem' }}>{order.studentName.charAt(0)}</Avatar>
          <Typography variant="body2">{order.studentName}</Typography>
        </Stack>
      </Grid>
      <Grid item xs={3}><Typography variant="body2">{order.productTitle}</Typography></Grid>
      <Grid item xs={2}>
        <Chip 
          label={order.status} 
          size="small" 
          color={order.status === "Pending" ? "warning" : "success"}
          sx={{ fontWeight: 'bold', fontSize: '0.6rem' }}
        />
      </Grid>
      <Grid item xs={2} textAlign="right"><Typography variant="body2" fontWeight="bold">₹{order.price}</Typography></Grid>
    </Grid>
  </Paper>
);

// Activity Item
const ActivityItem = ({ time, action, user }) => (
  <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1.5 }}>
    <CheckCircleIcon sx={{ color: '#DDD', fontSize: 18 }} />
    <Box>
      <Typography variant="body2" color="text.secondary">{time}</Typography>
      <Typography variant="body2">{action} <Box component="span" fontWeight="bold">{user}</Box></Typography>
    </Box>
  </Stack>
);

// Category Progress
const CategoryProgress = ({ label, percentage, color }) => (
  <Box sx={{ mb: 2 }}>
    <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.5 }}>
      <Typography variant="body2" fontWeight="bold">{label}</Typography>
      <Typography variant="body2" color="text.secondary">{percentage}%</Typography>
    </Stack>
    <LinearProgress variant="determinate" value={percentage} sx={{ height: 6, borderRadius: 3, bgcolor: '#f0f0f0', "& .MuiLinearProgress-bar": { bgcolor: color } }} />
  </Box>
);

// ─── ADMIN DASHBOARD ────────────────────────────────

const Dashboard = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  // Design Colors
  const colors = {
    primary: "#0A2647", // Deep Blue
    accent: "#E86A33",  // Orange Action
    verified: "#2ECC71", // Green
    bg: "#F4F7F9",
    sidebar: "#06172a" // Darker Blue
  };

  // Mock Data (matches image_10.png counts but ₹ for price)
  const stats = [
    { title: "ACTIVE LISTINGS", value: "1.2k", growth: 12, icon: <ShoppingBagIcon /> },
    { title: "REGISTERED STUDENTS", value: "3.5k", growth: 8, icon: <PersonIcon /> },
    { title: "PENDING EXCHANGES", value: "156", growth: 5, icon: <AssessmentIcon /> },
    { title: "SUCCESSFUL DEALS", value: "8.9k", growth: 18, icon: <CheckCircleIcon /> },
  ];

  const recentOrders = [
    { id: "ORD-1024", studentName: "Sarah J.", productTitle: "Engineering Notes", status: "Pending", price: 150 },
    { id: "ORD-1023", studentName: "Michael C.", productTitle: "Lab Coat", status: "Success", price: 300 },
    { id: "ORD-1022", studentName: "Emily D.", productTitle: "Dorm Lamp", status: "Success", price: 180 },
  ];

  return (
    <Box sx={{ display: "flex", bgcolor: colors.bg, minHeight: "100vh" }}>
      
      {/* 🚒 SIDEBAR */}
      <Box sx={{ width: 280, bgcolor: colors.sidebar, minHeight: "100vh", position: "fixed" }}>
        <Typography variant="h5" fontWeight="900" color="white" sx={{ p: 4, letterSpacing: '-1px' }}>
          COLLEX ADMIN
        </Typography>
        <Stack spacing={0.5}>
          <SidebarItem icon={<DashboardIcon />} label="Dashboard" active theme={theme} colors={colors} />
          <SidebarItem icon={<ShoppingBagIcon />} label="Listings" theme={theme} colors={colors} />
          <SidebarItem icon={<AssessmentIcon />} label="Exchanges" theme={theme} colors={colors} />
          <SidebarItem icon={<PersonIcon />} label="Students" theme={theme} colors={colors} />
          <SidebarItem icon={<CategoryIcon />} label="Categories" theme={theme} colors={colors} />
          
          <Box pt={4} />
          <Typography variant="overline" color="text.secondary" sx={{ px: 3, fontWeight: '700' }}>Account</Typography>
          <SidebarItem icon={<SettingsIcon />} label="Settings" theme={theme} colors={colors} />
        </Stack>

        <Box sx={{ position: 'absolute', bottom: 30, left: 30, color: colors.verified, display: 'flex', alignItems: 'center' }}>
          <CheckCircleIcon sx={{ fontSize: 16, mr: 1 }} />
          <Typography variant="caption" fontWeight="bold">Secure Campus Admin</Typography>
        </Box>
      </Box>

      {/* 🚒 MAIN CONTENT AREA */}
      <Box sx={{ flex: 1, ml: "280px" }}>
        
        {/* TOP HEADER */}
        <Paper elevation={0} sx={{ p: 2, bgcolor: "white", borderRadius: 0, position: 'sticky', top: 0, zIndex: 10 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h5" fontWeight="800" color={colors.primary}>Overview</Typography>
            <Stack direction="row" alignItems="center" spacing={2}>
              {/* Search Bar (Updated style) */}
              <Paper variant="outlined" sx={{ display: 'flex', alignItems: 'center', px: 2, py: 0.5, borderRadius: 2, bgcolor: '#f8f9fa' }}>
                <SearchIcon sx={{ color: 'gray', mr: 1, fontSize: 18 }} />
                <InputBase placeholder="Search students, orders..." />
              </Paper>
              <IconButton sx={{ color: colors.primary }}><NotificationsIcon /></IconButton>
              <Avatar src={""} sx={{ width: 32, height: 32, bgcolor: colors.primary }}>A</Avatar>
              <Box>
                <Typography variant="caption" fontWeight="bold">Admin User</Typography>
                <Typography variant="caption" display="block" color="text.secondary">admin@collex.edu</Typography>
              </Box>
              <IconButton size="small"><MoreVertIcon fontSize="small" /></IconButton>
            </Stack>
          </Stack>
        </Paper>

        <Container maxWidth="xl" sx={{ py: 4 }}>
          {/* STATS GRID */}
          <Grid container spacing={3} mb={4}>
            {stats.map((item) => (
              <Grid item xs={12} sm={6} md={3} key={item.title}>
                <SummaryCard {...item} theme={theme} colors={colors} />
              </Grid>
            ))}
          </Grid>

          <Grid container spacing={4}>
            {/* 🔥 LEFT: RECENT ORDERS (List View) */}
            <Grid item xs={12} md={8}>
              <Paper elevation={0} sx={{ p: 3, borderRadius: 4 }}>
                <Typography variant="h6" fontWeight="bold" sx={{ mb: 2, color: colors.primary }}>
                  Recent Campus Exchanges
                </Typography>
                {recentOrders.map((order) => (
                  <OrderRow key={order.id} order={order} theme={theme} colors={colors} />
                ))}
              </Paper>
            </Grid>

            {/* 🔥 RIGHT: CATEGORIES & ACTIVITY */}
            <Grid item xs={12} md={4}>
              <Stack spacing={3}>
                
                {/* CATEGORIES */}
                <Paper elevation={0} sx={{ p: 3, borderRadius: 4 }}>
                  <Typography variant="h6" fontWeight="bold" sx={{ mb: 2, color: colors.primary }}>
                    Marketplace Distribution
                  </Typography>
                  <CategoryProgress label="Textbooks" percentage={42} color={colors.primary} />
                  <CategoryProgress label="Electronics" percentage={28} color={colors.accent} />
                  <CategoryProgress label="Dorm Goods" percentage={18} color="#e67e22" />
                  <CategoryProgress label="Apparel" percentage={12} color="#e74c3c" />
                </Paper>

                {/* ACTIVITY */}
                <Paper elevation={0} sx={{ p: 3, borderRadius: 4 }}>
                  <Typography variant="h6" fontWeight="bold" sx={{ mb: 2, color: colors.primary }}>
                    Recent Activity Feed
                  </Typography>
                  <ActivityItem time="2 mins ago" action="Verified new listing from" user="Rahul P." />
                  <ActivityItem time="12 mins ago" action="Marked Deal #ORD-1023 complete for" user="Michael C." />
                  <ActivityItem time="1 hr ago" action="Registered new student" user="Emily Davis" />
                </Paper>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Dashboard;