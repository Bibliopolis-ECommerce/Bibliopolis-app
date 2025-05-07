import React, { useState , useContext} from 'react';
import { Modal, Box, Button, Typography } from '@mui/material';
import { CustomTextField } from '../../../../../context/theme';
import { LanguageContext } from '../../../../../context/AppContext';
import SupplierLang from '../../../../../lang/SupplierDashBoard.json';

const EditProductModal = ({ open, onClose, product, onSave }) => {
  const [editedProduct, setEditedProduct] = useState({ ...product });
  const { language } = useContext(LanguageContext);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave(editedProduct);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="edit-product-modal-title"
      aria-describedby="edit-product-modal-description"
    >
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      }}>
        <Typography id="edit-product-modal-title" variant="h6" component="h2">
          Edit Product
        </Typography>
        <CustomTextField
          fullWidth
          margin="normal"
          label="Product Name"
          name="Name_EN"
          value={editedProduct.Name_EN}
          onChange={handleInputChange}
        />
        <CustomTextField
          fullWidth
          margin="normal"
          label="Description"
          name="Description_EN"
          value={editedProduct.Description_EN}
          onChange={handleInputChange}
        />
        <CustomTextField
          fullWidth
          margin="normal"
          label="Category"
          name="Category_EN"
          value={editedProduct.Category_EN}
          onChange={handleInputChange}
        />
        <CustomTextField
          fullWidth
          margin="normal"
          label="Price"
          name="Price"
          value={editedProduct.Price}
          onChange={handleInputChange}
        />
        <CustomTextField
          fullWidth
          margin="normal"
          label="Stock"
          name="stock"
          value={editedProduct.stock}
          onChange={handleInputChange}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Button variant="contained" color="secondary" onClick={handleSave}>
            Save
          </Button>
          <Button variant="outlined" color="secondary" onClick={onClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditProductModal;
