import {
  Box,
  Typography,
  Container,
  Grid,
  Paper,
  Stack,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const features = [
  {
    title: "Student Verification",
    desc: "All users verified with campus email addresses",
  },
  {
    title: "User Ratings & Reviews",
    desc: "Build trust with transparent feedback system",
  },
  {
    title: "Safe Meeting Spots",
    desc: "Suggested public campus locations for exchanges",
  },
];

const FeatureSection = () => {
  return (
    <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: "background.default" }}>
      <Container maxWidth="lg">

        {/* ===== SECTION 1 ===== */}
        <Grid
          container
          spacing={6}
          alignItems="center"
          direction={{ xs: "column", md: "row" }}
        >
          {/* IMAGE */}
          <Grid item xs={12} md={6}>
            <Paper
              elevation={0}
              sx={{
                height: { xs: 220, md: 320 },
                width: "100%",
                borderRadius: "20px",
                bgcolor: "grey.100",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography color="text.secondary">
                Safety illustration
              </Typography>
            </Paper>
          </Grid>

          {/* CONTENT */}
          <Grid item xs={12} md={6}>
            <Typography
              variant="caption"
              sx={{
                px: 2,
                py: 0.5,
                borderRadius: "20px",
                bgcolor: "rgba(0,0,0,0.05)",
                fontWeight: 600,
              }}
            >
              ⭐ Safe & Secure
            </Typography>

            <Typography variant="h4" fontWeight="800" mt={2} mb={2}>
              Built for Student Safety
            </Typography>

            <Typography color="text.secondary" mb={4}>
              Your security is our priority. Every user is verified, and all
              transactions happen within your trusted campus community.
            </Typography>

            <Stack spacing={2}>
              {features.map((item, index) => (
                <Stack key={index} direction="row" spacing={2}>
                  <CheckCircleIcon sx={{ color: "success.main" }} />
                  <Box>
                    <Typography fontWeight="700">{item.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.desc}
                    </Typography>
                  </Box>
                </Stack>
              ))}
            </Stack>
          </Grid>
        </Grid>

        {/* ===== SECTION 2 (REVERSED) ===== */}
        <Grid
          container
          spacing={6}
          alignItems="center"
          direction={{ xs: "column", md: "row-reverse" }}
          sx={{ mt: { xs: 6, md: 10 } }}
        >
          {/* IMAGE */}
          <Grid item xs={12} md={6}>
            <Paper
              elevation={0}
              sx={{
                height: { xs: 220, md: 320 },
                width: "100%",
                borderRadius: "20px",
                bgcolor: "grey.100",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography color="text.secondary">
                Listing illustration
              </Typography>
            </Paper>
          </Grid>

          {/* CONTENT */}
          <Grid item xs={12} md={6}>
            <Typography
              variant="caption"
              sx={{
                px: 2,
                py: 0.5,
                borderRadius: "20px",
                bgcolor: "rgba(0,0,0,0.05)",
                fontWeight: 600,
              }}
            >
              ⭐ Easy to Use
            </Typography>

            <Typography variant="h4" fontWeight="800" mt={2} mb={2}>
              List Items in Seconds
            </Typography>

            <Typography color="text.secondary" mb={4}>
              Snap a photo, add a description, set your price. It's that simple.
              Our streamlined interface makes buying and selling effortless.
            </Typography>

            <Stack spacing={2}>
              {features.map((item, index) => (
                <Stack key={index} direction="row" spacing={2}>
                  <CheckCircleIcon sx={{ color: "success.main" }} />
                  <Box>
                    <Typography fontWeight="700">{item.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.desc}
                    </Typography>
                  </Box>
                </Stack>
              ))}
            </Stack>
          </Grid>
        </Grid>

      </Container>
    </Box>
  );
};

export default FeatureSection;