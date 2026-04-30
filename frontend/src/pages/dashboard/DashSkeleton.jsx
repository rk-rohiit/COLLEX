import { Grid, Skeleton } from "@mui/material";

const DashSkeleton = () => {
  return (
    <Grid container spacing={2.5}>
      {[1, 2, 3, 4].map((i) => (
        <Grid item xs={6} md={3} key={i}>
          <Skeleton variant="rounded" height={110} />
        </Grid>
      ))}
    </Grid>
  );
};

export default DashSkeleton;