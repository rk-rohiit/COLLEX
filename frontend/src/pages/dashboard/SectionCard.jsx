import { Paper, Stack, Typography, Box } from "@mui/material";

const SectionCard = ({ title, action, children }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width:"590px"
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{ px: 2, py: 1.5, borderBottom: "1px solid #eee" }}
      >
        <Typography fontWeight={600}>{title}</Typography>
        {action}
      </Stack>

      <Box sx={{ p: 2, flex: 1 }}>{children}</Box>
    </Paper>
  );
};

export default SectionCard;