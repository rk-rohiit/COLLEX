// components/admin/ReportPage.jsx

import {
  Box, Paper, Typography, Grid, Stack, 
  Button, useTheme, Divider, Avatar
} from "@mui/material";
import { alpha } from "@mui/material/styles";

// Icons
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import LocalOfferOutlinedIcon from '@mui/material/SvgIcon'; // Replacement or similar
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PieChartOutlineIcon from '@mui/icons-material/PieChartOutline';

const ReportPage = () => {
  const theme = useTheme();

  // Mock Data for Analytics
  const summaryStats = [
    { label: "Gross Revenue", value: "₹45,280", growth: "+12.5%", icon: <ShowChartIcon /> },
    { label: "Avg. Order Value", value: "₹850", growth: "+3.2%", icon: <ReceiptLongIcon /> },
    { label: "Platform Fee (5%)", value: "₹2,264", growth: "+12.5%", icon: <PieChartOutlineIcon /> },
  ];

  return (
    <Box p={4}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}>
        <Box>
          <Typography variant="h6" fontWeight={800}>
            Financial Reports
          </Typography>
          <Typography variant="caption" color="text.secondary" fontWeight={600}>
            Track revenue, platform growth, and transaction history
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<FileDownloadOutlinedIcon />}
          sx={{
            bgcolor: theme.palette.primary.main,
            borderRadius: 2.5,
            fontWeight: 700,
            textTransform: "none",
            px: 3,
          }}
        >
          Export CSV
        </Button>
      </Stack>

      <Grid container spacing={3}>
        {/* 📈 SUMMARY CARDS */}
        {summaryStats.map((stat, i) => (
          <Grid item xs={12} md={4} key={i}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 4,
                border: "1px solid",
                borderColor: "divider",
                bgcolor: "background.paper",
              }}
            >
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar
                  sx={{
                    bgcolor: alpha(theme.palette.secondary.main, 0.1),
                    color: theme.palette.secondary.main,
                    borderRadius: 2,
                  }}
                >
                  {stat.icon}
                </Avatar>
                <Box>
                  <Typography variant="caption" color="text.secondary" fontWeight={700} sx={{ textTransform: "uppercase" }}>
                    {stat.label}
                  </Typography>
                  <Stack direction="row" spacing={1} alignItems="baseline">
                    <Typography variant="h5" fontWeight={800}>
                      {stat.value}
                    </Typography>
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        color: theme.palette.success.main, 
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      <TrendingUpIcon sx={{ fontSize: 12, mr: 0.5 }} /> {stat.growth}
                    </Typography>
                  </Stack>
                </Box>
              </Stack>
            </Paper>
          </Grid>
        ))}

        {/* 📊 DETAILED BREAKDOWN */}
        <Grid item xs={12} md={7}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 4,
              border: "1px solid",
              borderColor: "divider",
              minHeight: 300,
            }}
          >
            <Typography variant="subtitle1" fontWeight={800} mb={3}>
              Monthly Revenue Breakdown
            </Typography>
            
            {/* Placeholder for Chart - using Stacks to mimic data rows */}
            <Stack spacing={2.5}>
              {["April 2026", "March 2026", "February 2026"].map((month, idx) => (
                <Box key={month}>
                  <Stack direction="row" justifyContent="space-between" mb={1}>
                    <Typography variant="body2" fontWeight={700}>{month}</Typography>
                    <Typography variant="body2" fontWeight={800} color="primary.main">₹{(15000 - (idx * 2000)).toLocaleString()}</Typography>
                  </Stack>
                  <Box sx={{ width: '100%', height: 8, bgcolor: alpha(theme.palette.primary.main, 0.05), borderRadius: 4, overflow: 'hidden' }}>
                    <Box sx={{ width: `${90 - (idx * 15)}%`, height: '100%', bgcolor: theme.palette.primary.main }} />
                  </Box>
                </Box>
              ))}
            </Stack>
          </Paper>
        </Grid>

        {/* 🛠️ QUICK TOOLS */}
        <Grid item xs={12} md={5}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 4,
              border: "1px solid",
              borderColor: "divider",
              bgcolor: alpha(theme.palette.primary.main, 0.02),
            }}
          >
            <Typography variant="subtitle1" fontWeight={800} mb={2}>
              Report Parameters
            </Typography>
            <Divider sx={{ mb: 2, borderStyle: 'dashed' }} />
            
            <Stack spacing={2}>
              <Box>
                <Typography variant="caption" fontWeight={700} color="text.secondary" sx={{ textTransform: "uppercase", display: 'block', mb: 1 }}>
                  Data Range
                </Typography>
                <Typography variant="body2" fontWeight={600} sx={{ p: 1.5, bgcolor: 'background.paper', borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
                  Last 30 Days (Standard)
                </Typography>
              </Box>
              
              <Box>
                <Typography variant="caption" fontWeight={700} color="text.secondary" sx={{ textTransform: "uppercase", display: 'block', mb: 1 }}>
                  Included Metrics
                </Typography>
                <Stack direction="row" spacing={1}>
                  <Typography variant="caption" sx={{ px: 1.5, py: 0.5, bgcolor: alpha(theme.palette.secondary.main, 0.1), color: theme.palette.secondary.main, borderRadius: 5, fontWeight: 700 }}>Sales</Typography>
                  <Typography variant="caption" sx={{ px: 1.5, py: 0.5, bgcolor: alpha(theme.palette.secondary.main, 0.1), color: theme.palette.secondary.main, borderRadius: 5, fontWeight: 700 }}>Fees</Typography>
                  <Typography variant="caption" sx={{ px: 1.5, py: 0.5, bgcolor: alpha(theme.palette.secondary.main, 0.1), color: theme.palette.secondary.main, borderRadius: 5, fontWeight: 700 }}>Refunds</Typography>
                </Stack>
              </Box>

              <Button 
                fullWidth 
                variant="outlined" 
                sx={{ 
                  mt: 1, 
                  borderRadius: 2.5, 
                  fontWeight: 700, 
                  textTransform: 'none',
                  borderColor: theme.palette.primary.main,
                  color: theme.palette.primary.main
                }}
              >
                Generate Custom Report
              </Button>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ReportPage;