import {
  Box,
  Typography,
  Container,
  Stack,
} from "@mui/material";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import BoltOutlinedIcon from "@mui/icons-material/BoltOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";

const safetyFeatures = [
  {
    icon: <PersonOutlineIcon fontSize="small" />,
    title: "Student Verification",
    desc: "All users verified with campus email addresses",
    color: "rgba(46,125,50,0.08)",
    iconColor: "success.main",
  },
  {
    icon: <StarBorderIcon fontSize="small" />,
    title: "User Ratings & Reviews",
    desc: "Build trust with transparent feedback system",
    color: "rgba(46,125,50,0.08)",
    iconColor: "success.main",
  },
  {
    icon: <LocationOnOutlinedIcon fontSize="small" />,
    title: "Safe Meeting Spots",
    desc: "Suggested public campus locations for exchanges",
    color: "rgba(46,125,50,0.08)",
    iconColor: "success.main",
  },
];

const listingFeatures = [
  {
    icon: <CameraAltOutlinedIcon fontSize="small" />,
    title: "Snap & Upload",
    desc: "Take a photo directly in-app or upload from your gallery",
    color: "rgba(26,35,126,0.07)",
    iconColor: "primary.main",
  },
  {
    icon: <DescriptionOutlinedIcon fontSize="small" />,
    title: "Smart Descriptions",
    desc: "Auto-suggested tags and categories to save you time",
    color: "rgba(26,35,126,0.07)",
    iconColor: "primary.main",
  },
  {
    icon: <AccessTimeIcon fontSize="small" />,
    title: "Live in Under a Minute",
    desc: "Your listing goes live instantly — no approval wait",
    color: "rgba(26,35,126,0.07)",
    iconColor: "primary.main",
  },
];

const FeatureContent = ({ badge, badgeIcon, title, description, features }) => (
  <Box>
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 0.75,
        px: 2,
        py: 0.75,
        borderRadius: "20px",
        backgroundColor: "rgba(26,35,126,0.07)",
        mb: 2,
      }}
    >
      <Box sx={{ color: "primary.main", display: "flex", alignItems: "center" }}>
        {badgeIcon}
      </Box>
      <Typography
        variant="caption"
        fontWeight={700}
        color="primary.main"
        sx={{ fontSize: "0.7rem", letterSpacing: "0.05em", textTransform: "uppercase" }}
      >
        {badge}
      </Typography>
    </Box>

    <Typography
      variant="h4"
      fontWeight="800"
      mb={1.5}
      sx={{ fontSize: { xs: "1.6rem", md: "2rem" }, lineHeight: 1.2 }}
    >
      {title}
    </Typography>

    <Typography color="text.secondary" mb={4} variant="body1" sx={{ lineHeight: 1.7 }}>
      {description}
    </Typography>

    <Stack spacing={2.5}>
      {features.map((item, index) => (
        <Stack key={index} direction="row" spacing={1.5} alignItems="flex-start">
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: "10px",
              backgroundColor: item.color,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              color: item.iconColor,
            }}
          >
            {item.icon}
          </Box>
          <Box>
            <Typography fontWeight="700" variant="body2">{item.title}</Typography>
            <Typography variant="body2" color="text.secondary">{item.desc}</Typography>
          </Box>
        </Stack>
      ))}
    </Stack>
  </Box>
);

const FeatureImage = ({ src, alt, badgeIcon, badgeLabel, badgeSub, badgeBg, badgeIconColor }) => (
  <Box
    sx={{
      width: "100%",
      height: { xs: 260, md: 400 },
      borderRadius: "20px",
      overflow: "hidden",
      border: "0.5px solid",
      borderColor: "divider",
      position: "relative",
    }}
  >
    <Box
      component="img"
      src={src}
      alt={alt}
      sx={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
    />
    {/* FLOATING BADGE */}
    <Box
      sx={{
        position: "absolute",
        bottom: 16,
        left: 16,
        bgcolor: "background.paper",
        borderRadius: "12px",
        px: 1.75,
        py: 1.25,
        display: "flex",
        alignItems: "center",
        gap: 1.25,
        boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
        border: "0.5px solid",
        borderColor: "divider",
      }}
    >
      <Box
        sx={{
          width: 32,
          height: 32,
          borderRadius: "8px",
          backgroundColor: badgeBg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: badgeIconColor,
          flexShrink: 0,
        }}
      >
        {badgeIcon}
      </Box>
      <Box>
        <Typography fontWeight="700" fontSize="0.78rem">{badgeLabel}</Typography>
        <Typography variant="caption" color="text.secondary">{badgeSub}</Typography>
      </Box>
    </Box>
  </Box>
);

const FeatureSection = () => {
  return (
    <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: "background.default" }}>
      <Container maxWidth="lg">

        {/* SECTION 1 — Image LEFT, Content RIGHT */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            gap: { xs: 4, md: 8 },
          }}
        >
          <Box sx={{ flex: 1, width: "100%" }}>
            <FeatureImage
              src="https://images.unsplash.com/flagged/photo-1554473675-d0904f3cbf38?w=800&q=80"
              alt="Student Safety"
              badgeIcon={<CheckCircleOutlineIcon sx={{ fontSize: 17 }} />}
              badgeLabel="All users verified"
              badgeSub="Campus email required"
              badgeBg="rgba(46,125,50,0.1)"
              badgeIconColor="success.main"
            />
          </Box>
          <Box sx={{ flex: 1, width: "100%" }}>
            <FeatureContent
              badge="Safe & Secure"
              badgeIcon={<SecurityOutlinedIcon sx={{ fontSize: 13 }} />}
              title="Built for Student Safety"
              description="Your security is our priority. Every user is verified, and all transactions happen within your trusted campus community."
              features={safetyFeatures}
            />
          </Box>
        </Box>

        {/* SECTION 2 — Content LEFT, Image RIGHT */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            gap: { xs: 4, md: 8 },
            mt: { xs: 8, md: 14 },
          }}
        >
          <Box sx={{ flex: 1, width: "100%" }}>
            <FeatureContent
              badge="Easy to Use"
              badgeIcon={<BoltOutlinedIcon sx={{ fontSize: 13 }} />}
              title="List Items in Seconds"
              description="Snap a photo, add a description, set your price. Our streamlined interface makes buying and selling effortless."
              features={listingFeatures}
            />
          </Box>
          <Box sx={{ flex: 1, width: "100%" }}>
            <FeatureImage
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80"
              alt="List Items"
              badgeIcon={<TimerOutlinedIcon sx={{ fontSize: 17 }} />}
              badgeLabel="Live in <60 seconds"
              badgeSub="No approval needed"
              badgeBg="rgba(26,35,126,0.07)"
              badgeIconColor="primary.main"
            />
          </Box>
        </Box>

      </Container>
    </Box>
  );
};

export default FeatureSection;