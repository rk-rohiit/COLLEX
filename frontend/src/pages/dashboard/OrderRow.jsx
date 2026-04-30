import { Stack, Avatar, Typography, Box, Chip } from "@mui/material";

const STATUS = {
  completed: { bg: "#EAF3DE", color: "#3B6D11" },
  pending: { bg: "#FAEEDA", color: "#854F0B" },
  cancelled: { bg: "#FCEBEB", color: "#A32D2D" },
};

const OrderRow = ({ order }) => {
  const name = order?.buyer?.fullName || "Unknown";
  const chip = STATUS[order?.status] || STATUS.pending;

  return (
    <Stack direction="row" spacing={1.5} alignItems="center">
      <Avatar>{name[0]}</Avatar>

      <Box flex={1}>
        <Typography fontSize={13}>{name}</Typography>
        <Typography fontSize={11} color="text.secondary">
          {order?.listing?.title}
        </Typography>
      </Box>

      <Chip
        label={order?.status}
        size="small"
        sx={{ bgcolor: chip.bg, color: chip.color }}
      />
    </Stack>
  );
};

export default OrderRow;