import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Button, Container, Stack } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';

const NotFound = () => {
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          minHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        {/* Visual Header */}
        <Box sx={{ position: 'relative', mb: 4 }}>
          <ShoppingBasketIcon 
            sx={{ fontSize: 100, color: 'primary.main' }} 
          />
          <ErrorOutlineIcon 
            sx={{ 
              fontSize: 40, 
              color: 'secondary.main', // Primary Blue
              position: 'absolute', 
              bottom: 0, 
              right: 0,
              backgroundColor: 'white',
              borderRadius: '50%'
            }} 
          />
        </Box>

        {/* Text Content */}
        <Typography variant="h1" fontWeight="800" color="textPrimary" gutterBottom>
          404
        </Typography>
        
        <Typography variant="h4" fontWeight="600" color="textSecondary" gutterBottom>
          Listing Not Found
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 500 }}>
          The page or product you're looking for doesn't exist on the campus marketplace. 
          It might have been sold or the link has expired.
        </Typography>

        {/* Actions */}
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <Button
            component={Link}
            to="/"
            variant="contained"
            size="large"
            startIcon={<HomeIcon />}
            sx={{ 
              textTransform: 'none', 
              px: 4,
              backgroundColor: '#1976d2' 
            }}
          >
            Back to Home
          </Button>
          
          <Button
            component={Link}
            to="/login"
            variant="outlined"
            size="large"
            startIcon={<SearchIcon />}
            sx={{ textTransform: 'none', px: 4 }}
          >
            Search Marketplace
          </Button>
        </Stack>

        <Typography variant="caption" sx={{ mt: 8, color: 'text.disabled' }}>
          Collex — Your Student Marketplace
        </Typography>
      </Box>
    </Container>
  );
};

export default NotFound;