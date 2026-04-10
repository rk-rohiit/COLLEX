
import {
  Grid, Paper, Typography, Box, LinearProgress
} from "@mui/material";

const Card = ({ title, value }) => (
  <Paper sx={{ p: 3, borderRadius: 3 }}>
    <Typography variant="h5" fontWeight="bold">{value}</Typography>
    <Typography color="text.secondary">{title}</Typography>
  </Paper>
);

const Dashboard = () => {
  return (
    <Grid container spacing={3}>
      
      {/* TOP CARDS */}
      <Grid item xs={12} md={3}>
        <Card title="Total Products" value="1,247" />
      </Grid>
      <Grid item xs={12} md={3}>
        <Card title="Students" value="3,542" />
      </Grid>
      <Grid item xs={12} md={3}>
        <Card title="Pending Orders" value="156" />
      </Grid>
      <Grid item xs={12} md={3}>
        <Card title="Completed Orders" value="8,924" />
      </Grid>

      {/* TABLE */}
      <Grid item xs={12} md={8}>
        <Paper sx={{ p: 3, borderRadius: 3 }}>
          <Typography fontWeight="bold" mb={2}>
            Recent Orders
          </Typography>
          <Typography color="text.secondary">
            Table UI (you can plug MUI DataGrid here)
          </Typography>
        </Paper>
      </Grid>

      {/* RIGHT PANEL */}
      <Grid item xs={12} md={4}>
        <Paper sx={{ p: 3, borderRadius: 3 }}>
          <Typography fontWeight="bold">Top Categories</Typography>

          <Box mt={2}>
            <Typography>Textbooks</Typography>
            <LinearProgress variant="determinate" value={42} />
          </Box>

          <Box mt={2}>
            <Typography>Electronics</Typography>
            <LinearProgress variant="determinate" value={28} />
          </Box>
        </Paper>
      </Grid>

    </Grid>
  );
};

export default Dashboard;