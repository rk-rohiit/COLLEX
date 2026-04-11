import {
    Box,
    Typography,
    Container,
    Grid,
    Paper,
    Avatar,
    Stack,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

const reviews = [
    {
        name: "Alex Chen",
        university: "UC Berkeley",
        text: "Sold my textbooks in less than 24 hours! Way better than dealing with the campus bookstore. Plus I met other students in my major.",
    },
    {
        name: "Maya Patel",
        university: "NYU",
        text: "Found an amazing deal on a mini fridge for my dorm. The seller was super friendly and we met right on campus. So convenient!",
    },
    {
        name: "Jordan Lee",
        university: "UCLA",
        text: "Love that everyone is verified students. Makes me feel safe buying and selling. Already saved hundreds on textbooks this semester!",
    },
];

const Testimonials = () => {
    return (
        <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: "background.default" }}>
            <Container maxWidth="lg">

                {/* HEADING */}
                <Typography
                    variant="h4"
                    fontWeight="800"
                    align="center"
                    sx={{
                        fontSize: { xs: "1.8rem", md: "2.2rem" },
                    }}
                    gutterBottom
                >
                    Loved by Students
                </Typography>

                <Typography
                    variant="body1"
                    align="center"
                    color="text.secondary"
                    sx={{
                        mb: { xs: 4, md: 6 },
                        maxWidth: 500,
                        mx: "auto",
                    }}
                >
                    See what your peers are saying
                </Typography>

                {/* REVIEWS */}
                {/* <Grid container spacing={{ xs: 3, md: 4 }}> */}
                <Grid
                    container
                    spacing={{ xs: 3, sm: 3, md: 4 }}
                    justifyContent="center"
                >
                    {reviews.map((review, index) => (
                        // <Grid item xs={12} sm={6} md={4} key={index}>
                        <Grid item xs={12} sm={6} md={4}>

                            <Paper
                                elevation={0}
                                sx={{
                                    p: { xs: 2.5, md: 3 },
                                    borderRadius: "16px",
                                    border: "1px solid #eee",
                                    height: "100%",
                                    maxWidth: 360,   // 👈 ADD THIS
                                    mx: "auto",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                    transition: "all 0.3s ease",
                                    "&:hover": {
                                        boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
                                        transform: "translateY(-6px)",
                                    },
                                }}
                            >

                                {/* TOP CONTENT */}
                                <Box>
                                    {/* STARS */}
                                    <Stack direction="row" spacing={0.5} mb={2}>
                                        {[...Array(5)].map((_, i) => (
                                            <StarIcon
                                                key={i}
                                                sx={{
                                                    fontSize: { xs: 16, md: 18 },
                                                    color: "#f5b50a",
                                                }}
                                            />
                                        ))}
                                    </Stack>

                                    {/* REVIEW TEXT */}
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{
                                            mb: 3,
                                            fontSize: { xs: "0.85rem", md: "0.95rem" },
                                            lineHeight: 1.6,
                                        }}
                                    >
                                        "{review.text}"
                                    </Typography>
                                </Box>

                                {/* USER INFO */}
                                <Stack direction="row" spacing={2} alignItems="center">
                                    <Avatar
                                        sx={{
                                            width: { xs: 36, md: 40 },
                                            height: { xs: 36, md: 40 },
                                        }}
                                    >
                                        {review.name.charAt(0)}
                                    </Avatar>

                                    <Box>
                                        <Typography
                                            fontWeight="700"
                                            sx={{ fontSize: { xs: "0.9rem", md: "1rem" } }}
                                        >
                                            {review.name}
                                        </Typography>
                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                        >
                                            {review.university}
                                        </Typography>
                                    </Box>
                                </Stack>

                            </Paper>

                        </Grid>
                    ))}
                </Grid>

            </Container>
        </Box>
    );
};

export default Testimonials;