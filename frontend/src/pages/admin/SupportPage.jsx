// components/admin/SupportPage.jsx

import {
  Box, Paper, Typography, Grid, Stack, 
  Button, useTheme, Avatar, Chip, IconButton, Divider
} from "@mui/material";
import { alpha } from "@mui/material/styles";

// Icons
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import MarkEmailReadOutlinedIcon from '@mui/icons-material/MarkEmailReadOutlined';
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const SupportPage = () => {
  const theme = useTheme();

  const tickets = [
    { id: "TK-8821", user: "Rohit Sharma", issue: "Payment verification pending", status: "open", time: "2h ago" },
    { id: "TK-8819", user: "Divya K.", issue: "Unable to upload product images", status: "resolved", time: "5h ago" },
    { id: "TK-8815", user: "Sunil Kumar", issue: "Account verification request", status: "open", time: "1d ago" },
  ];

  return (
    <Box p={4}>
      {/* HEADER SECTION */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}>
        <Box>
          <Typography variant="h6" fontWeight={800} sx={{ letterSpacing: "-0.5px" }}>
            Customer Support
          </Typography>
          <Typography variant="caption" color="text.secondary" fontWeight={600}>
            Manage student inquiries and platform assistance requests
          </Typography>
        </Box>
        <Button
          variant="contained"
          disableElevation
          startIcon={<MarkEmailReadOutlinedIcon />}
          sx={{
            bgcolor: theme.palette.primary.main,
            borderRadius: 2.5,
            fontWeight: 700,
            textTransform: "none",
            px: 3,
          }}
        >
          Resolve All
        </Button>
      </Stack>

      <Grid container spacing={3}>
        {/* LEFT: TICKET LIST */}
        <Grid item xs={12} md={8}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 4,
              border: "1px solid",
              borderColor: "divider",
              minHeight: 500,
            }}
          >
            <Typography variant="subtitle1" fontWeight={800} mb={3}>
              Active Support Tickets
            </Typography>

            <Stack spacing={2}>
              {tickets.map((ticket) => (
                <Box
                  key={ticket.id}
                  sx={{
                    p: 2,
                    borderRadius: 3,
                    border: "1px solid",
                    borderColor: alpha(theme.palette.divider, 0.5),
                    transition: "0.2s",
                    "&:hover": {
                      borderColor: theme.palette.primary.main,
                      bgcolor: alpha(theme.palette.primary.main, 0.01),
                    },
                  }}
                >
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Avatar
                        sx={{
                          bgcolor: alpha(theme.palette.primary.main, 0.1),
                          color: theme.palette.primary.main,
                          fontWeight: 700,
                          fontSize: "0.85rem",
                          borderRadius: 2
                        }}
                      >
                        {ticket.user.charAt(0)}
                      </Avatar>
                      <Box>
                        <Typography variant="body2" fontWeight={700}>
                          {ticket.issue}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" fontWeight={500}>
                          {ticket.user} • <span style={{ fontFamily: 'monospace' }}>{ticket.id}</span>
                        </Typography>
                      </Box>
                    </Stack>

                    <Stack direction="row" spacing={2} alignItems="center">
                      <Chip
                        label={ticket.status}
                        size="small"
                        sx={{
                          fontWeight: 800,
                          fontSize: "10px",
                          textTransform: "uppercase",
                          bgcolor: ticket.status === "open" 
                            ? alpha(theme.palette.secondary.main, 0.1) 
                            : alpha(theme.palette.success.main, 0.1),
                          color: ticket.status === "open" 
                            ? theme.palette.secondary.main 
                            : theme.palette.success.main,
                        }}
                      />
                      <IconButton size="small">
                        <ChatBubbleOutlineIcon fontSize="small" sx={{ color: theme.palette.primary.main }} />
                      </IconButton>
                    </Stack>
                  </Stack>
                </Box>
              ))}
            </Stack>
          </Paper>
        </Grid>

        {/* RIGHT: STATS & HELP */}
        <Grid item xs={12} md={4}>
          <Stack spacing={3}>
            {/* RESPONSE TIME CARD */}
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 4,
                bgcolor: theme.palette.primary.main,
                color: "white",
              }}
            >
              <Stack direction="row" spacing={2} alignItems="center">
                <AccessTimeIcon sx={{ fontSize: 32, opacity: 0.8 }} />
                <Box>
                  <Typography variant="caption" sx={{ opacity: 0.8, fontWeight: 700, textTransform: "uppercase" }}>
                    Avg. Response Time
                  </Typography>
                  <Typography variant="h5" fontWeight={800}>
                    24 Minutes
                  </Typography>
                </Box>
              </Stack>
            </Paper>

            {/* QUICK CATEGORIES */}
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 4,
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <Typography variant="subtitle2" fontWeight={800} mb={2}>
                Common Categories
              </Typography>
              <Divider sx={{ mb: 2, borderStyle: 'dashed' }} />
              
              <Stack spacing={1.5}>
                {[
                  { label: "Payment Issues", count: 12 },
                  { label: "Account Access", count: 5 },
                  { label: "Safety Reports", count: 2 },
                ].map((cat) => (
                  <Stack key={cat.label} direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="body2" fontWeight={600} color="text.secondary">{cat.label}</Typography>
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        bgcolor: alpha(theme.palette.secondary.main, 0.1), 
                        color: theme.palette.secondary.main,
                        px: 1, borderRadius: 1, fontWeight: 800 
                      }}
                    >
                      {cat.count}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            </Paper>

            {/* SUPPORT CONTACT */}
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 4,
                border: "1px solid",
                borderColor: "divider",
                bgcolor: alpha(theme.palette.secondary.main, 0.02),
                textAlign: 'center'
              }}
            >
              <HelpOutlineIcon sx={{ color: theme.palette.secondary.main, fontSize: 40, mb: 1 }} />
              <Typography variant="body2" fontWeight={700} mb={1}>
                Need technical help?
              </Typography>
              <Typography variant="caption" color="text.secondary" display="block" mb={2}>
                Contact the Collex developer team directly for system-wide bugs.
              </Typography>
              <Button 
                variant="outlined" 
                color="secondary" 
                fullWidth 
                sx={{ borderRadius: 2, fontWeight: 700, textTransform: 'none' }}
              >
                Dev Support
              </Button>
            </Paper>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SupportPage;