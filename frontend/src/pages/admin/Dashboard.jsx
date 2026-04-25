// components/admin/Dashboard.jsx

import {
  Grid, Paper, Typography, Box, Stack,
  Avatar, Chip, LinearProgress, useTheme
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDashboardStats,
  getRecentOrders,
  getTopCategories,
} from "@/features/admin/adminSlice";

// Icons for Stats
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import PendingActionsOutlinedIcon from '@mui/icons-material/PendingActionsOutlined';
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';

const Dashboard = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { stats, recentOrders, categories } = useSelector((s) => s.admin);

  useEffect(() => {
    dispatch(getDashboardStats());
    dispatch(getRecentOrders());
    dispatch(getTopCategories());
  }, [dispatch]);

  const STAT_CARDS = [
    { label: "Products", value: stats?.totalProducts, icon: <Inventory2OutlinedIcon />, color: theme.palette.primary.main },
    { label: "Students", value: stats?.totalStudents, icon: <PeopleAltOutlinedIcon />, color: theme.palette.secondary.main },
    { label: "Pending", value: stats?.pendingOrders, icon: <PendingActionsOutlinedIcon />, color: theme.palette.warning.main },
    { label: "Success", value: stats?.successOrders, icon: <TaskAltOutlinedIcon />, color: theme.palette.success.main },
  ];

  return (
    <Box p={4} sx={{ bgcolor: alpha(theme.palette.background.default, 0.5), minHeight: "100%" }}>
      <Grid container spacing={3}>
        
        {/* 📊 KEY PERFORMANCE INDICATORS */}
        {STAT_CARDS.map((card, i) => (
          <Grid item xs={12} sm={6} md={3} key={i}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: 3, 
                borderRadius: 4, 
                border: "1px solid", 
                borderColor: "divider",
                position: "relative",
                overflow: "hidden"
              }}
            >
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                <Box>
                  <Typography fontSize={12} fontWeight={700} color="text.secondary" sx={{ textTransform: "uppercase", letterSpacing: 1 }}>
                    {card.label}
                  </Typography>
                  <Typography variant="h4" fontWeight={800} sx={{ mt: 1, color: "text.primary" }}>
                    {card.value || 0}
                  </Typography>
                </Box>
                <Avatar 
                  sx={{ 
                    bgcolor: alpha(card.color, 0.1), 
                    color: card.color, 
                    borderRadius: 2 
                  }}
                >
                  {card.icon}
                </Avatar>
              </Stack>
            </Paper>
          </Grid>
        ))}

        {/* 📋 RECENT ORDERS TABLE-LIKE LIST */}
        <Grid item xs={12} md={8}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 3, 
              borderRadius: 4, 
              border: "1px solid", 
              borderColor: "divider",
              height: "100%"
            }}
          >
            <Typography variant="h6" fontWeight={800} mb={3}>
              Recent Marketplace Activity
            </Typography>

            <Stack spacing={2}>
              {recentOrders?.map((o) => (
                <Stack
                  key={o._id}
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ 
                    p: 2, 
                    borderRadius: 3, 
                    bgcolor: alpha(theme.palette.background.default, 0.8),
                    border: "1px solid",
                    borderColor: alpha(theme.palette.divider, 0.5)
                  }}
                >
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar 
                      sx={{ 
                        bgcolor: theme.palette.primary.main, 
                        fontWeight: 700,
                        fontSize: 14 
                      }}
                    >
                      {o.buyer?.fullName?.[0].toUpperCase()}
                    </Avatar>
                    <Box>
                      <Typography variant="body2" fontWeight={700}>
                        {o.buyer?.fullName}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>
                        Ordered: {o.listing?.title}
                      </Typography>
                    </Box>
                  </Stack>

                  <Chip 
                    label={o.status} 
                    size="small"
                    sx={{ 
                      fontWeight: 700, 
                      fontSize: 10,
                      textTransform: "uppercase",
                      bgcolor: o.status === 'completed' ? alpha(theme.palette.success.main, 0.1) : alpha(theme.palette.warning.main, 0.1),
                      color: o.status === 'completed' ? theme.palette.success.main : theme.palette.warning.dark,
                    }} 
                  />
                </Stack>
              ))}
            </Stack>
          </Paper>
        </Grid>

        {/* 📈 CATEGORY DISTRIBUTION */}
        <Grid item xs={12} md={4}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 3, 
              borderRadius: 4, 
              border: "1px solid", 
              borderColor: "divider",
              height: "100%"
            }}
          >
            <Typography variant="h6" fontWeight={800} mb={3}>
              Top Categories
            </Typography>

            {categories?.map((c) => (
              <Box key={c.category} mb={3}>
                <Stack direction="row" justifyContent="space-between" mb={1}>
                  <Typography variant="body2" fontWeight={700} color="text.primary">
                    {c.category}
                  </Typography>
                  <Typography variant="body2" fontWeight={800} color={theme.palette.secondary.main}>
                    {c.percentage}%
                  </Typography>
                </Stack>

                <LinearProgress
                  variant="determinate"
                  value={Number(c.percentage)}
                  sx={{
                    height: 8,
                    borderRadius: 5,
                    bgcolor: alpha(theme.palette.secondary.main, 0.1),
                    "& .MuiLinearProgress-bar": {
                      bgcolor: theme.palette.secondary.main, // Action Orange
                      borderRadius: 5,
                    }
                  }}
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