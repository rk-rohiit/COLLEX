import {
  Box,
  Typography,
  Container,
  Grid,
  IconButton,
} from "@mui/material";

import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";

import { useTheme } from "@mui/material/styles";

const Footer = () => {
  const theme = useTheme();

  const gradient = `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`;

  const links = ["Home", "About", "Services", "Contact"];

  return (
    <Box
      sx={{
        mt: 10,
        py: 6,
        backdropFilter: "blur(20px)",
        background: "rgba(255,255,255,0.05)",
        borderTop: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      <Container>
        <Grid container spacing={4} alignItems="center">
          {/* LEFT - LOGO */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="h5"
              fontWeight="bold"
              sx={{
                background: gradient,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Collex
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 1 }}
            >
              Smart campus marketplace for students.
            </Typography>
          </Grid>

          {/* CENTER - LINKS */}
          <Grid
            item
            xs={12}
            md={4}
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 3,
              flexWrap: "wrap",
            }}
          >
            {links.map((link, index) => (
              <Typography
                key={index}
                sx={{
                  cursor: "pointer",
                  color: "text.secondary",
                  "&:hover": {
                    color: theme.palette.primary.main,
                  },
                }}
              >
                {link}
              </Typography>
            ))}
          </Grid>

          {/* RIGHT - SOCIAL */}
          <Grid
            item
            xs={12}
            md={4}
            sx={{
              display: "flex",
              justifyContent: { xs: "center", md: "flex-end" },
              gap: 1,
            }}
          >
            <IconButton>
              <GitHubIcon />
            </IconButton>
            <IconButton>
              <LinkedInIcon />
            </IconButton>
            <IconButton>
              <TwitterIcon />
            </IconButton>
          </Grid>
        </Grid>

        {/* BOTTOM */}
        <Box
          sx={{
            mt: 4,
            textAlign: "center",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            pt: 2,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            © 2026 Collex. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;