import {
  Box,
  Typography,
  Container,
  Grid,
} from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

const steps = [
  {
    number: "1",
    icon: <PersonOutlineIcon sx={{ fontSize: 24 }} />,
    title: "Verify Your Campus Email",
    description:
      "Sign up with your .edu email to join your campus community. We verify all students for safety.",
  },
  {
    number: "2",
    icon: <GridViewOutlinedIcon sx={{ fontSize: 24 }} />,
    title: "Browse or List Items",
    description:
      "Search for what you need or post items you want to sell. Upload photos, set prices, and add details.",
  },
  {
    number: "3",
    icon: <ChatBubbleOutlineIcon sx={{ fontSize: 24 }} />,
    title: "Connect & Complete",
    description:
      "Message sellers, arrange meetups on campus, and complete transactions safely in person.",
  },
];

const HowItWorks = () => {
  return (
    <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: "background.default" }}>
      <Container maxWidth="lg">

        {/* HEADING */}
        <Box textAlign="center" mb={8}>
          <Typography
            variant="caption"
            sx={{
              px: 2,
              py: 0.75,
              borderRadius: "20px",
              backgroundColor: "rgba(26,35,126,0.07)",
              color: "primary.main",
              fontWeight: 700,
              fontSize: "0.7rem",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              display: "inline-block",
              mb: 1.5,
            }}
          >
            How it works
          </Typography>

          <Typography variant="h4" fontWeight="800" color="text.primary" gutterBottom>
            Get started in 3 easy steps
          </Typography>

          <Typography variant="body1" color="text.secondary">
            Simple, safe, and student-friendly
          </Typography>
        </Box>

        {/* STEPS WRAPPER — relative so connector lines can be absolutely positioned */}
        <Box sx={{ position: "relative" }}>

          {/* CONNECTOR LINES — rendered once, behind the cards, desktop only */}
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              position: "absolute",
              top: 26, // vertically centered on the number circle (52px / 2)
              left: "16.66%",  // center of first column
              right: "16.66%", // center of last column
              alignItems: "center",
              justifyContent: "space-between",
              px: "8.33%", // half-column padding so line starts/ends at circle edge
              pointerEvents: "none",
              zIndex: 0,
            }}
          >
            {/* Line 1 */}
            <Box
              sx={{
                flex: 1,
                height: "2px",
                bgcolor: "rgba(26,35,126,0.12)",
                borderRadius: "2px",
                mx: 4,
              }}
            />
            {/* Spacer for middle circle */}
            <Box sx={{ width: 52, flexShrink: 0 }} />
            {/* Line 2 */}
            <Box
              sx={{
                flex: 1,
                height: "2px",
                bgcolor: "rgba(26,35,126,0.12)",
                borderRadius: "2px",
                mx: 4,
              }}
            />
          </Box>

          {/* STEP CARDS */}
          <Grid container spacing={4} justifyContent="center" alignItems="flex-start">
            {steps.map((step, index) => (
              <Grid item xs={12} sm={4} key={index}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  {/* NUMBER CIRCLE */}
                  <Box
                    sx={{
                      width: 52,
                      height: 52,
                      borderRadius: "50%",
                      bgcolor: "primary.main",
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 800,
                      fontSize: "1.1rem",
                      mb: 2.5,
                      position: "relative",
                      zIndex: 1,
                      boxShadow: "0 0 0 8px rgba(26,35,126,0.07)",
                    }}
                  >
                    {step.number}
                  </Box>

                  {/* CARD */}
                  <Box
                    sx={{
                      width: "100%",
                      bgcolor: "background.paper",
                      border: "0.5px solid",
                      borderColor: "divider",
                      borderRadius: "16px",
                      px: 3,
                      py: 3.5,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    {/* ICON BOX */}
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: "12px",
                        backgroundColor: "rgba(26,35,126,0.07)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "primary.main",
                        mb: 2,
                      }}
                    >
                      {step.icon}
                    </Box>

                    <Typography fontWeight="700" mb={1}>
                      {step.title}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ maxWidth: 220, lineHeight: 1.7 }}
                    >
                      {step.description}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>

        </Box>
      </Container>
    </Box>
  );
};

export default HowItWorks;