// components/admin/CategoriesPage.jsx

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTopCategories } from "@/features/admin/adminSlice";
import { 
  Paper, Typography, Box, LinearProgress, Stack, 
  useTheme, Grid, Chip 
} from "@mui/material";
import { alpha } from "@mui/material/styles";

// Icons
import LeaderboardOutlinedIcon from '@mui/icons-material/LeaderboardOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';

const CategoriesPage = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { categories } = useSelector((s) => s.admin);

  useEffect(() => {
    dispatch(getTopCategories());
  }, [dispatch]);

  // Sort categories to identify the top one for the badge
  const sortedCategories = [...(categories || [])].sort((a, b) => b.percentage - a.percentage);

  return (
    <Box p={4}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 3, 
              borderRadius: 4, 
              border: "1px solid", 
              borderColor: "divider",
              bgcolor: "background.paper"
            }}
          >
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}>
              <Box>
                <Stack direction="row" spacing={1} alignItems="center">
                  <LeaderboardOutlinedIcon sx={{ color: theme.palette.primary.main }} />
                  <Typography variant="h6" fontWeight={800}>
                    Category Analytics
                  </Typography>
                </Stack>
                <Typography variant="caption" color="text.secondary" fontWeight={600}>
                  Market distribution based on listing volume
                </Typography>
              </Box>

              <Chip 
                label={`${categories?.length || 0} Total Categories`}
                variant="outlined"
                sx={{ fontWeight: 700, borderRadius: 2, borderColor: 'divider' }}
              />
            </Stack>

            <Grid container spacing={4}>
              {sortedCategories.map((c, index) => (
                <Grid item xs={12} md={6} key={c.category}>
                  <Box 
                    sx={{ 
                      p: 2, 
                      borderRadius: 3, 
                      bgcolor: index === 0 ? alpha(theme.palette.primary.main, 0.02) : "transparent",
                      border: "1px solid",
                      borderColor: index === 0 ? alpha(theme.palette.primary.main, 0.1) : "transparent"
                    }}
                  >
                    <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1.5}>
                      <Stack direction="row" spacing={1.5} alignItems="center">
                        <Box 
                          sx={{ 
                            width: 32, height: 32, borderRadius: 1.5, 
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            bgcolor: alpha(theme.palette.secondary.main, 0.1),
                            color: theme.palette.secondary.main
                          }}
                        >
                          <CategoryOutlinedIcon sx={{ fontSize: 18 }} />
                        </Box>
                        <Box>
                          <Typography variant="body2" fontWeight={700}>
                            {c.category}
                          </Typography>
                          {index === 0 && (
                            <Typography variant="caption" sx={{ color: theme.palette.success.main, fontWeight: 700, display: 'block', mt: -0.5 }}>
                              Top Performer
                            </Typography>
                          )}
                        </Box>
                      </Stack>
                      <Typography 
                        variant="body2" 
                        fontWeight={800} 
                        sx={{ fontFamily: 'monospace', color: theme.palette.primary.main }}
                      >
                        {c.percentage}%
                      </Typography>
                    </Stack>

                    <LinearProgress
                      variant="determinate"
                      value={Number(c.percentage)}
                      sx={{
                        height: 8,
                        borderRadius: 5,
                        bgcolor: alpha(theme.palette.secondary.main, 0.1),
                        "& .MuiLinearProgress-bar": {
                          bgcolor: theme.palette.secondary.main, // Action Orange
                          borderRadius: 5,
                        }
                      }}
                    />
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CategoriesPage;