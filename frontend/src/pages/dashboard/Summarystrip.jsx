import { Grid, Paper, Typography, Box } from "@mui/material";

/**
 * SummaryStrip
 * A row of secondary metric tiles between KPIs and detail panels.
 *
 * Props:
 *   items – Array<{ label: string, value: string }>
 */
const SummaryStrip = ({ items = [] }) => {
  return (
    <Grid container spacing={1.5} >
      {items.map(({ label, value }) => (
        <Grid item xs={6} sm={4} md key={label}>
          <Paper
            elevation={0}
            sx={{
              px: 2,
              py: 1.5,
              borderRadius: "10px",
              bgcolor: "action.hover",
              border: "none",
              
            }}
          >
            <Typography
              sx={{
                fontSize: "10px",
                fontWeight: 600,
                letterSpacing: "0.6px",
                textTransform: "uppercase",
                color: "text.secondary",
                mb: 0.25,
              }}
            >
              {label}
            </Typography>
            <Typography sx={{ fontSize: "18px", fontWeight: 700, lineHeight: 1 }}>
              {value}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default SummaryStrip;