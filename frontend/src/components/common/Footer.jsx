// components/layout/Footer.jsx

import {
  Box,
  Typography,
  Container,
  Grid,
  IconButton,
  Stack,
  useTheme,
} from "@mui/material";
import { alpha } from "@mui/material/styles";

import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import SchoolIcon from "@mui/icons-material/School";

const Footer = () => {
  const theme = useTheme();

  const links = ["Home", "Browse", "Sell", "Safety", "Support"];

  return (
    <Box
      component="footer"
      sx={{
        mt: 10,
        py: 8,
        bgcolor: "background.paper",
        borderTop: "1px solid",
        borderColor: "divider",
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={6}>
          {/* LEFT - BRANDING */}
          <Grid item xs={12} md={4}>
            <Stack direction="row" alignItems="center" spacing={1.5} mb={2}>
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: "8px",
                  bgcolor: theme.palette.primary.main,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <SchoolIcon sx={{ fontSize: 18, color: "white" }} />
              </Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 800,
                  letterSpacing: "-0.5px",
                  color: theme.palette.primary.main,
                }}
              >
                COLLEX
              </Typography>
            </Stack>

            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
                lineHeight: 1.6,
                maxWidth: 280,
                fontWeight: 500,
              }}
            >
              The smart campus marketplace. Built for students to trade, save,
              and connect safely within the university community.
            </Typography>
          </Grid>

          {/* CENTER - NAVIGATION */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="overline"
              sx={{
                fontWeight: 800,
                color: "text.primary",
                letterSpacing: "1px",
              }}
            >
              Quick Links
            </Typography>
            <Stack
              direction="row"
              spacing={3}
              mt={2}
              flexWrap="wrap"
              useFlexGap
            >
              {links.map((link) => (
                <Typography
                  key={link}
                  variant="body2"
                  sx={{
                    cursor: "pointer",
                    fontWeight: 600,
                    color: "text.secondary",
                    transition: "0.2s",
                    "&:hover": {
                      color: theme.palette.secondary.main, // Action Orange on hover
                    },
                  }}
                >
                  {link}
                </Typography>
              ))}
            </Stack>
          </Grid>

          {/* RIGHT - SOCIALS */}
          <Grid item xs={12} md={4} sx={{ textAlign: { md: "right" } }}>
            <Typography
              variant="overline"
              sx={{
                fontWeight: 800,
                color: "text.primary",
                letterSpacing: "1px",
              }}
            >
              Join the Community
            </Typography>
            <Stack
              direction="row"
              justifyContent={{ xs: "flex-start", md: "flex-end" }}
              spacing={1}
              mt={1.5}
            >
              {[
                { icon: <GitHubIcon fontSize="small" />, key: "gh" },
                { icon: <LinkedInIcon fontSize="small" />, key: "li" },
                { icon: <TwitterIcon fontSize="small" />, key: "tw" },
              ].map((item) => (
                <IconButton
                  key={item.key}
                  sx={{
                    bgcolor: alpha(theme.palette.primary.main, 0.04),
                    color: theme.palette.primary.main,
                    border: "1px solid",
                    borderColor: alpha(theme.palette.primary.main, 0.1),
                    transition: "0.3s",
                    "&:hover": {
                      bgcolor: theme.palette.primary.main,
                      color: "white",
                      transform: "translateY(-4px)",
                    },
                  }}
                >
                  {item.icon}
                </IconButton>
              ))}
            </Stack>
          </Grid>
        </Grid>

        {/* BOTTOM COPYRIGHT */}
        <Box
          sx={{
            mt: 8,
            pt: 3,
            borderTop: "1px solid",
            borderColor: alpha(theme.palette.divider, 0.5),
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography variant="caption" sx={{ color: "text.disabled", fontWeight: 600 }}>
            © 2026 COLLEX TECHNOLOGIES. ALL RIGHTS RESERVED.
          </Typography>
          <Stack direction="row" spacing={3}>
            <Typography variant="caption" sx={{ color: "text.disabled", cursor: "pointer", "&:hover": { color: "text.secondary" } }}>
              Privacy Policy
            </Typography>
            <Typography variant="caption" sx={{ color: "text.disabled", cursor: "pointer", "&:hover": { color: "text.secondary" } }}>
              Terms of Service
            </Typography>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;