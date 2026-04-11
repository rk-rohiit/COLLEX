import {
  Box,
  Typography,
  Container,
  Grid,
  Paper,
  Avatar,
  Stack,
  Divider,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

const reviews = [
  {
    name: "Alex Chen",
    university: "UC Berkeley",
    text: "Sold my textbooks in less than 24 hours! Way better than dealing with the campus bookstore. Plus I met other students in my major.",
    featured: false,
  },
  {
    name: "Maya Patel",
    university: "NYU",
    text: "Found an amazing deal on a mini fridge for my dorm. The seller was super friendly and we met right on campus. So convenient!",
    featured: true,
  },
  {
    name: "Jordan Lee",
    university: "UCLA",
    text: "Love that everyone is verified students. Makes me feel safe buying and selling. Already saved hundreds on textbooks this semester!",
    featured: false,
  },
];

const stats = [
  { value: "4.9", label: "Average rating" },
  { value: "12K+", label: "Student reviews" },
  { value: "98%", label: "Would recommend" },
];

const Testimonials = () => {
  return (
    <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: "background.default" }}>
      <Container maxWidth="lg">

        {/* HEADING */}
        <Box textAlign="center" mb={6}>
          <Typography
            variant="caption"
            sx={{
              px: 2, py: 0.75,
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
            Testimonials
          </Typography>

          <Typography
            variant="h4"
            fontWeight="800"
            sx={{ fontSize: { xs: "1.8rem", md: "2.2rem" } }}
            gutterBottom
          >
            Loved by{" "}
            <Box component="span" sx={{ color: "primary.main" }}>
              Students
            </Box>
          </Typography>

          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 480, mx: "auto" }}>
            See what your peers are saying about Collex
          </Typography>
        </Box>

        {/* RATING SUMMARY */}
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={{ xs: 3, md: 5 }}
          divider={
            <Box sx={{ width: "0.5px", height: 48, bgcolor: "divider" }} />
          }
          sx={{ mb: 6, flexWrap: "wrap", gap: { xs: 2, md: 0 } }}
        >
          {stats.map((stat) => (
            <Box key={stat.label} textAlign="center">
              <Typography fontWeight="800" fontSize="2.2rem" lineHeight={1}>
                {stat.value}
              </Typography>
              {stat.label === "Average rating" && (
                <Stack direction="row" justifyContent="center" spacing={0.25} my={0.5}>
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} sx={{ fontSize: 14, color: "#f5b50a" }} />
                  ))}
                </Stack>
              )}
              <Typography variant="caption" color="text.secondary" display="block" mt={0.5}>
                {stat.label}
              </Typography>
            </Box>
          ))}
        </Stack>

        {/* REVIEW CARDS */}
        <Grid container spacing={3} justifyContent="center">
          {reviews.map((review, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 2.5, md: 3 },
                  borderRadius: "16px",
                  border: review.featured ? "1.5px solid" : "0.5px solid",
                  borderColor: review.featured ? "rgba(26,35,126,0.25)" : "divider",
                  height: "100%",
                  maxWidth: 360,
                  mx: "auto",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 10px 28px rgba(26,35,126,0.09)",
                    borderColor: "rgba(26,35,126,0.2)",
                  },
                }}
              >
                {/* TOP */}
                <Box>
                  <Stack direction="row" spacing={0.4} mb={1.5}>
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} sx={{ fontSize: 16, color: "#f5b50a" }} />
                    ))}
                  </Stack>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      mb: 2.5,
                      fontSize: { xs: "0.85rem", md: "0.92rem" },
                      lineHeight: 1.7,
                      fontStyle: "italic",
                    }}
                  >
                    "{review.text}"
                  </Typography>
                </Box>

                {/* BOTTOM */}
                <Box>
                  <Divider sx={{ mb: 2 }} />
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <Avatar
                      sx={{
                        width: 38,
                        height: 38,
                        fontSize: "0.9rem",
                        fontWeight: 700,
                        bgcolor: "rgba(26,35,126,0.12)",
                        color: "primary.main",
                      }}
                    >
                      {review.name.charAt(0)}
                    </Avatar>
                    <Box>
                      <Typography fontWeight="700" fontSize="0.9rem">
                        {review.name}
                      </Typography>
                      <Stack direction="row" alignItems="center" spacing={0.75}>
                        <Box
                          sx={{
                            width: 6, height: 6,
                            borderRadius: "50%",
                            bgcolor: "success.main",
                          }}
                        />
                        <Typography variant="caption" color="text.secondary">
                          {review.university} · Verified Student
                        </Typography>
                      </Stack>
                    </Box>
                  </Stack>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>

      </Container>
    </Box>
  );
};

export default Testimonials;