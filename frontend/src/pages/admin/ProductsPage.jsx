// components/admin/ProductsPage.jsx

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box, Paper, Typography, Table, TableBody, TableCell,
  TableHead, TableRow, Avatar, Chip, IconButton, Stack, useTheme,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem,
  FormControl, InputLabel, Select, Button, Grid
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { toast } from "react-toastify";

// Icons
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";

import {
  getAllListingsAdmin,
  updateListingAdmin,
  deleteListingAdmin,
} from "@/features/admin/adminSlice";

const ProductsPage = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { listings, loading } = useSelector((s) => s.admin);

  // Edit Modal State
  const [editOpen, setEditOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    condition: "good",
    price: "",
    type: "sell",
    rentPeriod: "weekly",
    rentDeposit: "",
    location: "",
    status: "available",
  });

  useEffect(() => {
    dispatch(getAllListingsAdmin());
  }, [dispatch]);

  const handleOpenEdit = (product) => {
    setSelectedProduct(product);
    setForm({
      title: product.title || "",
      description: product.description || "",
      category: product.category || "",
      condition: product.condition || "good",
      price: product.price || "",
      type: product.type || "sell",
      rentPeriod: product.rentPeriod || "weekly",
      rentDeposit: product.rentDeposit || "",
      location: product.location || "",
      status: product.status || "available",
    });
    setEditOpen(true);
  };

  const handleCloseEdit = () => {
    setEditOpen(false);
    setSelectedProduct(null);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDelete = async (id, title) => {
    if (window.confirm(`Delete listing "${title}"? This action cannot be undone.`)) {
      try {
        await dispatch(deleteListingAdmin(id)).unwrap();
        toast.success("Listing deleted successfully!");
      } catch (err) {
        toast.error(err || "Failed to delete listing");
      }
    }
  };

  const handleSave = async () => {
    if (!form.title || !form.description || !form.category || !form.price || !form.location) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      const dataToSave = {
        ...form,
        price: Number(form.price),
        rentDeposit: form.type === "rent" ? Number(form.rentDeposit || 0) : undefined,
        rentPeriod: form.type === "rent" ? form.rentPeriod : undefined,
      };

      await dispatch(updateListingAdmin({ id: selectedProduct._id, data: dataToSave })).unwrap();
      toast.success("Listing updated successfully! 🎉");
      handleCloseEdit();
    } catch (err) {
      toast.error(err || "Failed to update listing");
    }
  };

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
            label={`${listings?.length || 0} Items Total`} 
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
            {listings && listings.map((item) => (
              <TableRow key={item._id} hover>
                {/* Product Detail Cell */}
                <TableCell>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar
                      variant="rounded"
                      src={item.images?.[0]}
                      sx={{ width: 44, height: 44, borderRadius: 2, border: "1px solid", borderColor: "divider" }}
                    />
                    <Box>
                      <Typography variant="body2" fontWeight={700}>
                        {item.title}
                      </Typography>
                      <Typography variant="caption" sx={{ color: "text.secondary", textTransform: "uppercase", fontWeight: 700, fontSize: "9px" }}>
                        {item.category} • {item.location} • {item.type}
                      </Typography>
                    </Box>
                  </Stack>
                </TableCell>

                {/* Seller Cell */}
                <TableCell>
                  <Typography variant="body2" fontWeight={600}>
                    {item.postedBy?.fullName || "System User"}
                  </Typography>
                  <Typography variant="caption" sx={{ fontFamily: 'monospace', color: "text.disabled" }}>
                    ID: {item._id?.slice(-6).toUpperCase()}
                  </Typography>
                </TableCell>

                {/* Price Cell */}
                <TableCell>
                  <Typography 
                    variant="body2" 
                    fontWeight={800} 
                    color={theme.palette.secondary.main}
                  >
                    ₹{item.price?.toLocaleString()}
                    {item.type === "rent" && <Typography component="span" variant="caption" color="text.secondary">/{item.rentPeriod}</Typography>}
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
                    <IconButton size="small" onClick={() => handleOpenEdit(item)} sx={{ color: theme.palette.primary.main }}>
                      <EditOutlinedIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" onClick={() => handleDelete(item._id, item.title)} sx={{ color: theme.palette.error.main }}>
                      <DeleteOutlineIcon fontSize="small" />
                    </IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
            
            {(!listings || listings.length === 0) && (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 5 }}>
                  <Typography color="text.secondary">No products found in inventory.</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>

      {/* EDIT PRODUCT DIALOG */}
      <Dialog
        open={editOpen}
        onClose={handleCloseEdit}
        fullWidth
        maxWidth="md"
        PaperProps={{
          sx: {
            borderRadius: 4,
            p: 1.5,
          }
        }}
      >
        <DialogTitle sx={{ fontWeight: 800, pb: 1 }}>
          Edit Product Listing
        </DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, mt: 1.5 }}>
            <TextField
              name="title"
              label="Listing Title"
              value={form.title}
              onChange={handleChange}
              fullWidth
              required
            />
            
            <TextField
              name="description"
              label="Description"
              value={form.description}
              onChange={handleChange}
              fullWidth
              required
              multiline
              rows={3}
            />

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Category</InputLabel>
                  <Select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    label="Category"
                  >
                    <MenuItem value="electronics">Electronics</MenuItem>
                    <MenuItem value="books">Books & Notes</MenuItem>
                    <MenuItem value="furniture">Furniture</MenuItem>
                    <MenuItem value="stationery">Stationery</MenuItem>
                    <MenuItem value="clothing">Clothing</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Condition</InputLabel>
                  <Select
                    name="condition"
                    value={form.condition}
                    onChange={handleChange}
                    label="Condition"
                  >
                    <MenuItem value="new">Brand New</MenuItem>
                    <MenuItem value="like new">Like New</MenuItem>
                    <MenuItem value="good">Good</MenuItem>
                    <MenuItem value="fair">Fair / Used</MenuItem>
                    <MenuItem value="poor">Poor</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Listing Type</InputLabel>
                  <Select
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                    label="Listing Type"
                  >
                    <MenuItem value="sell">Sell</MenuItem>
                    <MenuItem value="rent">Rent Out</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  name="price"
                  label={form.type === "rent" ? "Rent Price" : "Selling Price"}
                  value={form.price}
                  onChange={handleChange}
                  fullWidth
                  required
                  type="number"
                />
              </Grid>
            </Grid>

            {form.type === "rent" && (
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth required>
                    <InputLabel>Rent Period</InputLabel>
                    <Select
                      name="rentPeriod"
                      value={form.rentPeriod}
                      onChange={handleChange}
                      label="Rent Period"
                    >
                      <MenuItem value="daily">Daily</MenuItem>
                      <MenuItem value="weekly">Weekly</MenuItem>
                      <MenuItem value="monthly">Monthly</MenuItem>
                      <MenuItem value="yearly">Yearly</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    name="rentDeposit"
                    label="Security Deposit"
                    value={form.rentDeposit}
                    onChange={handleChange}
                    fullWidth
                    type="number"
                  />
                </Grid>
              </Grid>
            )}

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="location"
                  label="Pickup Location"
                  value={form.location}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Status</InputLabel>
                  <Select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    label="Status"
                  >
                    <MenuItem value="available">Available</MenuItem>
                    <MenuItem value="reserved">Reserved</MenuItem>
                    <MenuItem value="sold">Sold</MenuItem>
                    <MenuItem value="rented">Rented</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
          <Button 
            onClick={handleCloseEdit} 
            variant="outlined" 
            sx={{ borderRadius: 2, textTransform: "none", fontWeight: 700 }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSave} 
            variant="contained" 
            color="primary"
            sx={{ borderRadius: 2, textTransform: "none", fontWeight: 700 }}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProductsPage;