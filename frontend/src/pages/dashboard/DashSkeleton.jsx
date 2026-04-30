import { Box, Grid, Skeleton } from "@mui/material";

/**
 * DashSkeleton
 * Shown while Redux is loading dashboard data.
 * Mirrors the real layout: 4 KPI cards + 2 side-by-side section cards.
 */
const DashSkeleton = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {/* KPI row */}
      <Grid container spacing={1.5}>
        {[1, 2, 3, 4].map((i) => (
          <Grid item xs={6} md={3} key={i}>
            <Skeleton variant="rounded" height={130} sx={{ borderRadius: "14px" }} />
          </Grid>
        ))}
      </Grid>

      {/* Summary strip */}
      <Grid container spacing={1.5}>
        {[1, 2, 3].map((i) => (
          <Grid item xs={4} key={i}>
            <Skeleton variant="rounded" height={60} sx={{ borderRadius: "10px" }} />
          </Grid>
        ))}
      </Grid>

      {/* Section cards */}
      <Grid container spacing={1.5}>
        {[1, 2].map((i) => (
          <Grid item xs={12} md={6} key={i}>
            <Skeleton variant="rounded" height={320} sx={{ borderRadius: "14px" }} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DashSkeleton;