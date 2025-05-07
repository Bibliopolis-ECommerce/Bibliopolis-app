import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

const DeleteConfirmationModal = ({ open, onClose, onDelete, product }) => {



  
  return (
    <Dialog
      open={open}
      onClose={onClose}
    >
      <DialogTitle>Confirm Deletion</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete the product "{product.Name_EN}"?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onDelete} color="secondary" variant="contained">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationModal;
