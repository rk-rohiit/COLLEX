import {
  Container,
  TextField,
  Typography,
  Button,
  Grid,
  MenuItem,
  Stack,
  Paper,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { createListing, clearCreateState } from "@/features/listing/listingSlice";
import { useNavigate } from "react-router-dom";

const CreateListingPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { createLoading, createSuccess, error } = useSelector(
    (state) => state.listing
  );

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    type: "sell",
    condition: "good",
    location: "",
    images: [],
    rentPeriod: "",
    rentDeposit: "",
  });

  const [imageInput, setImageInput] = useState("");

  /* =========================
     INPUT HANDLER
  ========================= */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* =========================
     ADD IMAGE VIA URL
  ========================= */
  const addImage = () => {
    if (!imageInput) return;

    if (!imageInput.startsWith("http")) {
      toast.error("Enter valid image URL");
      return;
    }

    if (form.images.length >= 5) {
      toast.error("Max 5 images allowed");
      return;
    }

    setForm({
      ...form,
      images: [...form.images, imageInput.trim()],
    });

    setImageInput("");
  };

  /* =========================
     UPLOAD LOCAL IMAGE
  ========================= */
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    if (form.images.length + files.length > 5) {
      toast.error("Max 5 images allowed");
      return;
    }

    const localImages = files.map((file) =>
      URL.createObjectURL(file)
    );

    setForm({
      ...form,
      images: [...form.images, ...localImages],
    });
  };

  /* =========================
     REMOVE IMAGE
  ========================= */
  const removeImage = (index) => {
    setForm({
      ...form,
      images: form.images.filter((_, i) => i !== index),
    });
  };

  /* =========================
     SUBMIT
  ========================= */
  const handleSubmit = () => {
    if (
      !form.title ||
      !form.description ||
      !form.price ||
      !form.category ||
      !form.location ||
      form.images.length === 0
    ) {
      toast.error("Fill all required fields");
      return;
    }

    const payload = {
      ...form,
      price: Number(form.price),
      rentDeposit: form.rentDeposit
        ? Number(form.rentDeposit)
        : undefined,
    };

    dispatch(createListing(payload));
  };

  /* =========================
     SUCCESS
  ========================= */
  useEffect(() => {
    if (createSuccess) {
      toast.success("Listing created 🎉");
      dispatch(clearCreateState());
      navigate("/listings");
    }
  }, [createSuccess]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  /* =========================
     UI
  ========================= */
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h4" fontWeight="bold" mb={3}>
          Post a Product 🚀
        </Typography>
        <Typography>Testing</Typography>

        <Grid container spacing={2}>
          {/* TITLE */}
          <Grid item xs={12}>
            <TextField fullWidth label="Title" name="title" value={form.title} onChange={handleChange} />
          </Grid>

          {/* DESCRIPTION */}
          <Grid item xs={12}>
            <TextField fullWidth multiline rows={3} label="Description" name="description" value={form.description} onChange={handleChange} />
          </Grid>

          {/* PRICE + CATEGORY */}
          <Grid item xs={12} sm={6}>
            <TextField fullWidth type="number" label="Price" name="price" value={form.price} onChange={handleChange} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Category" name="category" value={form.category} onChange={handleChange} />
          </Grid>

          {/* TYPE + CONDITION */}
          <Grid item xs={12} sm={6}>
            <TextField select fullWidth label="Type" name="type" value={form.type} onChange={handleChange}>
              <MenuItem value="sell">Sell</MenuItem>
              <MenuItem value="rent">Rent</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField select fullWidth label="Condition" name="condition" value={form.condition} onChange={handleChange}>
              <MenuItem value="new">New</MenuItem>
              <MenuItem value="like new">Like New</MenuItem>
              <MenuItem value="good">Good</MenuItem>
              <MenuItem value="fair">Fair</MenuItem>
              <MenuItem value="poor">Poor</MenuItem>
            </TextField>
          </Grid>

          {/* LOCATION */}
          <Grid item xs={12}>
            <TextField fullWidth label="Location" name="location" value={form.location} onChange={handleChange} />
          </Grid>

          {/* RENT FIELDS */}
          {form.type === "rent" && (
            <>
              <Grid item xs={12} sm={6}>
                <TextField select fullWidth label="Rent Period" name="rentPeriod" value={form.rentPeriod} onChange={handleChange}>
                  <MenuItem value="daily">Daily</MenuItem>
                  <MenuItem value="weekly">Weekly</MenuItem>
                  <MenuItem value="monthly">Monthly</MenuItem>
                  <MenuItem value="yearly">Yearly</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField fullWidth type="number" label="Deposit" name="rentDeposit" value={form.rentDeposit} onChange={handleChange} />
              </Grid>
            </>
          )}

          {/* IMAGE URL */}
          <Grid item xs={8}>
            <TextField fullWidth label="Paste Image URL" value={imageInput} onChange={(e) => setImageInput(e.target.value)} />
          </Grid>

          <Grid item xs={4}>
            <Button fullWidth variant="contained" onClick={addImage}>
              Add URL
            </Button>
          </Grid>

          {/* FILE UPLOAD */}
          <Grid item xs={12}>
            <Button variant="outlined" component="label" fullWidth>
              Upload from Device 📁
              <input type="file" hidden multiple accept="image/*" onChange={handleImageUpload} />
            </Button>
          </Grid>

          {/* IMAGE PREVIEW */}
          <Grid item xs={12}>
            <Stack direction="row" spacing={1} flexWrap="wrap">
              {form.images.map((img, i) => (
                <div key={i} style={{ position: "relative" }}>
                  <img
                    src={img}
                    width={80}
                    height={80}
                    style={{ borderRadius: 8, objectFit: "cover" }}
                  />
                  <IconButton
                    size="small"
                    onClick={() => removeImage(i)}
                    sx={{
                      position: "absolute",
                      top: -8,
                      right: -8,
                      bgcolor: "red",
                      color: "#fff",
                      "&:hover": { bgcolor: "darkred" },
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </div>
              ))}
            </Stack>
          </Grid>

          {/* SUBMIT */}
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              size="large"
              onClick={handleSubmit}
              disabled={createLoading}
              sx={{ py: 1.5 }}
            >
              {createLoading ? "Creating..." : "Create Listing"}
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default CreateListingPage;