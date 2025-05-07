import React, { useState } from 'react';
import { Box, Button, TextField, Modal, Typography, Grid, Snackbar, Alert } from '@mui/material';
import apiService from '../../../../../services/ZooZoneAPIService';
import Cookies from 'js-cookie';
import { CustomTextField } from '../../../../../context/theme';

const CreateProductModal = ({ open, onClose, onCreate }) => {
  const [productData, setProductData] = useState({
    Name_EN: '',
    Description_EN: '',
    Category_EN: '',
    Photo: '',
    Price: '',
    stock: '',
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const token = Cookies.get('token');
      await apiService.createProduct(token, productData);
      setSnackbarMessage('Product created successfully');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      onCreate(); 
      onClose();
    } catch (error) {
      console.error("Error creating product:", error);
      setSnackbarMessage('Failed to create product');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ ...modalStyle, width: 400 }}>
        <Typography variant="h6" gutterBottom>Create New Product</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CustomTextField
              label="Product Name"
              name="Name_EN"
              value={productData.Name_EN}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <CustomTextField
              label="Description"
              name="Description_EN"
              value={productData.Description_EN}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <CustomTextField
              label="Category"
              name="Category_EN"
              value={productData.Category_EN}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <CustomTextField
              label="Photo URL"
              name="Photo"
              value={productData.Photo}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <CustomTextField
              label="Price"
              name="Price"
              value={productData.Price}
              onChange={handleChange}
              fullWidth
              type="number"
            />
          </Grid>
          <Grid item xs={6}>
            <CustomTextField
              label="Stock"
              name="stock"
              value={productData.stock}
              onChange={handleChange}
              fullWidth
              type="number"
            />
          </Grid>
        </Grid>
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="contained" color="secondary" onClick={handleSubmit}>Create</Button>
          <Button variant="outlined" color="secondary" onClick={onClose}>Cancel</Button>
        </Box>

        {/* Snackbar for success/error messages */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={() => setSnackbarOpen(false)}
        >
          <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    </Modal>
  );
};

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default CreateProductModal;
