// components/admin/ProductsPage.jsx

import { useEffect, useState } from "react";
import {
  Box, Paper, Typography, Table, TableBody, TableCell,
  TableHead, TableRow, Avatar, Chip, IconButton, Stack, useTheme
} from "@mui/material";
import { alpha } from "@mui/material/styles";

// Icons
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";

// Assuming you have your API setup
// import { getAllListingAPI } from "@/api/listing"; 

const ProductsPage = () => {
  const theme = useTheme();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mocking the fetch call based on your JSON structure
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // const res = await getAllListingAPI();
        // if(res.data.success) setProducts(res.data.data);
        
        // Using your provided JSON sample for logic:
        const sampleData = [
          {
            "_id": "69ecd9fe5c33dc852bb19818",
            "title": "Mr. Sunil",
            "images": ["https://res.cloudinary.com/db8233goj/image/upload/v1777129982/collex/aa0gepgd9nabzi2gwei9.jpg"],
            "category": "books",
            "price": 1000,
            "status": "available",
            "postedBy": { "fullName": "Sunil Kumar Fagoriya" },
            "location": "BH-2",
            "createdAt": "2026-04-25T15:13:02.491Z",
          }
        ];
        setProducts(sampleData);
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <Box p={4}>
      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 4,
          border: "1px solid",
          borderColor: "divider",
          overflow: "hidden",
        }}
      >
        {/* HEADER */}
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
          <Box>
            <Stack direction="row" spacing={1} alignItems="center">
              <Inventory2OutlinedIcon color="primary" />
              <Typography variant="h6" fontWeight={800}>
                Product Inventory
              </Typography>
            </Stack>
            <Typography variant="caption" color="text.secondary" fontWeight={600}>
              Monitor and manage all campus listings
            </Typography>
          </Box>
          <Chip 
            label={`${products.length} Items Total`} 
            sx={{ fontWeight: 700, bgcolor: alpha(theme.palette.primary.main, 0.05), color: theme.palette.primary.main }} 
          />
        </Stack>

        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: alpha(theme.palette.primary.main, 0.02) }}>
              <TableCell sx={{ fontWeight: 700, color: "text.secondary", fontSize: "0.85rem" }}>PRODUCT</TableCell>
              <TableCell sx={{ fontWeight: 700, color: "text.secondary", fontSize: "0.85rem" }}>SELLER</TableCell>
              <TableCell sx={{ fontWeight: 700, color: "text.secondary", fontSize: "0.85rem" }}>PRICE</TableCell>
              <TableCell sx={{ fontWeight: 700, color: "text.secondary", fontSize: "0.85rem" }}>STATUS</TableCell>
              <TableCell sx={{ fontWeight: 700, color: "text.secondary", fontSize: "0.85rem", textAlign: "right" }}>ACTIONS</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {products.map((item) => (
              <TableRow key={item._id} hover>
                {/* Product Detail Cell */}
                <TableCell>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar
                      variant="rounded"
                      src={item.images[0]}
                      sx={{ width: 44, height: 44, borderRadius: 2, border: "1px solid", borderColor: "divider" }}
                    />
                    <Box>
                      <Typography variant="body2" fontWeight={700}>
                        {item.title}
                      </Typography>
                      <Typography variant="caption" sx={{ color: "text.secondary", textTransform: "uppercase", fontWeight: 700, fontSize: "9px" }}>
                        {item.category} • {item.location}
                      </Typography>
                    </Box>
                  </Stack>
                </TableCell>

                {/* Seller Cell */}
                <TableCell>
                  <Typography variant="body2" fontWeight={600}>
                    {item.postedBy?.fullName}
                  </Typography>
                  <Typography variant="caption" sx={{ fontFamily: 'monospace', color: "text.disabled" }}>
                    ID: {item._id.slice(-6).toUpperCase()}
                  </Typography>
                </TableCell>

                {/* Price Cell */}
                <TableCell>
                  <Typography 
                    variant="body2" 
                    fontWeight={800} 
                    color={theme.palette.secondary.main} // Action Orange
                  >
                    ₹{item.price.toLocaleString()}
                  </Typography>
                </TableCell>

                {/* Status Cell */}
                <TableCell>
                  <Chip
                    label={item.status}
                    size="small"
                    sx={{
                      fontSize: "10px",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      bgcolor: item.status === "available" ? alpha(theme.palette.success.main, 0.1) : alpha(theme.palette.error.main, 0.1),
                      color: item.status === "available" ? theme.palette.success.main : theme.palette.error.main,
                      borderRadius: 1.5
                    }}
                  />
                </TableCell>

                {/* Actions Cell */}
                <TableCell align="right">
                  <Stack direction="row" spacing={0.5} justifyContent="flex-end">
                    <IconButton size="small" sx={{ color: theme.palette.primary.main }}>
                      <VisibilityOutlinedIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" sx={{ color: theme.palette.error.main }}>
                      <DeleteOutlineIcon fontSize="small" />
                    </IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default ProductsPage;