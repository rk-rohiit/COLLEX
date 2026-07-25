import { Grid, Paper, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";

/**
 * SummaryStrip
 * A row of secondary metric tiles between KPIs and detail panels.
 *
 * Props:
 *   items – Array<{ label: string, value: string }>
 */
const SummaryStrip = ({ items = [] }) => {
  return (
    <Grid container spacing={2} sx={{ width: "100%", m: 0 }}>
      {items.map(({ label, value }) => (
        <Grid item xs={12} sm={4} md={4} key={label}>
          <Paper
            elevation={0}
            sx={{
              p: 2.5,
              borderRadius: "12px",
              bgcolor: "background.paper",
              border: "1.5px solid",
              borderColor: "divider",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minHeight: 90,
              transition: "all 0.2s ease-in-out",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 8px 24px rgba(10, 38, 71, 0.05)",
                borderColor: "primary.main",
              },
            }}
          >
            <Typography
              sx={{
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.8px",
                textTransform: "uppercase",
                color: "text.secondary",
                mb: 0.75,
                textAlign: "center",
              }}
            >
              {label}
            </Typography>
            <Typography 
              sx={{ 
                fontSize: "22px", 
                fontWeight: 800, 
                lineHeight: 1.1,
                color: "primary.main",
                textAlign: "center",
              }}
            >
              {value}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default SummaryStrip;