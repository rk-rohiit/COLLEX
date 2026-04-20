import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTopCategories } from "@/features/admin/adminSlice";
import { Paper, Typography, Box, LinearProgress } from "@mui/material";

const CategoriesPage = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((s) => s.admin);

  useEffect(() => {
    dispatch(getTopCategories());
  }, [dispatch]);

  return (
    <Paper sx={{ p: 3, borderRadius: 4 }}>
      <Typography variant="h6" mb={2}>
        Categories Analytics
      </Typography>

      {categories.map((c) => (
        <Box key={c.category} mb={2}>
          <Typography>
            {c.category} ({c.percentage}%)
          </Typography>

          <LinearProgress
            variant="determinate"
            value={Number(c.percentage)}
          />
        </Box>
      ))}
    </Paper>
  );
};

export default CategoriesPage;