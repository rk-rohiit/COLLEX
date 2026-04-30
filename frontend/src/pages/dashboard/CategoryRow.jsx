import { Box, Stack, Typography } from "@mui/material";

const colors = ["#1D9E75", "#378ADD", "#EF9F27", "#639922"];

const CategoryRow = ({ category, percentage, index }) => {
  return (
    <Box>
      <Stack direction="row" justifyContent="space-between">
        <Typography fontSize={12}>{category}</Typography>
        <Typography fontSize={11}>{percentage}%</Typography>
      </Stack>

      <Box sx={{ height: 5, bgcolor: "#eee", borderRadius: 2 }}>
        <Box
          sx={{
            width: `${percentage}%`,
            height: "100%",
            bgcolor: colors[index],
          }}
        />
      </Box>
    </Box>
  );
};

export default CategoryRow;