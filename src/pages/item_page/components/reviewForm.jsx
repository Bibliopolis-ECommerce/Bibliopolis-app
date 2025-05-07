import React, { useContext, useState } from 'react';
import { TextField, Button, Rating, Snackbar, Alert } from '@mui/material';
import { AuthContext } from '../../../context/AuthContext';
import apiService from '../../../services/ZooZoneAPIService';
import useLanguage from '../../../context/hooks/useLanguage';
import reviewData from '../../../lang/Review.json';
import { CustomTextField } from '../../../context/theme';

const ReviewForm = ({ productId }) => {
  const { userData } = useContext(AuthContext);
  const { language } = useLanguage();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const reviewText = reviewData.review;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!userData) {
      setSnackbarMessage(reviewText.notLoggedIn[language]);
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    try {
      const response = await apiService.addReview({
        productId,
        rating,
        comment,
        language,
      });

      setSnackbarMessage(reviewText.reviewAdded[language]);
      setSnackbarSeverity('success');
      setRating(0);
      setComment('');
    } catch (error) {
      console.error('Failed to submit review:', error);
      setSnackbarMessage(reviewText.failedToSubmit[language]);
      setSnackbarSeverity('error');
    } finally {
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Rating
        name="rating"
        value={rating}
        onChange={(event, newValue) => setRating(newValue)}
        size="large"
      />
      <CustomTextField
        label={reviewText.comment[language]}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        multiline
        rows={4}
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" color="secondary">
        {reviewText.submit[language]}
      </Button>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} variant="filled" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </form>
  );
};

export default ReviewForm;
