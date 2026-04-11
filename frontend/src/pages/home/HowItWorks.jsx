import {
  Box,
  Typography,
  Container,
  Grid,
  Avatar,
} from "@mui/material";

const steps = [
  {
    number: "1",
    title: "Verify Your Campus Email",
    description:
      "Sign up with your .edu email to join your campus community. We verify all students for safety.",
  },
  {
    number: "2",
    title: "Browse or List Items",
    description:
      "Search for what you need or post items you want to sell. Upload photos, set prices, and add details.",
  },
  {
    number: "3",
    title: "Connect & Complete",
    description:
      "Message sellers, arrange meetups on campus, and complete transactions safely in person.",
  },
];

const HowItWorks = () => {
  return (
    <Box sx={{ py: 10, bgcolor: "background.default" }}>
      <Container maxWidth="lg">
        
        {/* HEADING */}
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          color="primary.main"
        >
          How Collex Works
        </Typography>

        <Typography
          variant="body1"
          align="center"
          color="text.secondary"
          sx={{ mb: 6 }}
        >
          Simple, safe, and student-friendly
        </Typography>

        {/* STEPS */}
        <Grid container spacing={9} justifyContent="center">
          {steps.map((step, index) => (
            <Grid item xs={12} md={4} key={index}>
              
              <Box textAlign="center">
                
                {/* NUMBER CIRCLE */}
                <Avatar
                  sx={{
                    bgcolor: "primary.main",
                    color: "#fff",
                    width: 50,
                    height: 50,
                    margin: "0 auto",
                    mb: 2,
                    fontWeight: "bold",
                  }}
                >
                  {step.number}
                </Avatar>

                {/* TITLE */}
                <Typography fontWeight="700" gutterBottom>
                  {step.title}
                </Typography>

                {/* DESCRIPTION */}
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ maxWidth: 280, mx: "auto" }}
                >
                  {step.description}
                </Typography>

              </Box>

            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default HowItWorks;