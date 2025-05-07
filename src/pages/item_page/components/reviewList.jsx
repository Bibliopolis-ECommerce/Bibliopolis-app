import React from 'react';
import { Card, CardContent, Typography, Grid, Rating} from '@mui/material';
import useLanguage from '../../../context/hooks/useLanguage';
import reviewData from '../../../lang/Review.json';

const ReviewList = ({ reviews }) => {
  const { language } = useLanguage();
  const reviewText = reviewData.review;


  const getUsernameFromEmail = (email) => {
    const parts = email.split('@');
    return parts[0];
  };

  return (
    <Grid container spacing={2}>
      <Typography variant="h4">{reviewText.title[language]}</Typography>
      {reviews.length === 0 ? (
        <Grid item xs={12}>
          <Typography variant="h6">{reviewText.noReviews[language]}</Typography>
        </Grid>
      ) : (
        reviews.map((review) => (
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">{getUsernameFromEmail(review.email)}</Typography>
                <Rating value={review.rating} readOnly />
                <Typography variant="body1" paragraph>
                    {review.comment[language]}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  {new Date(review.timestamp).toLocaleDateString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))
      )}
    </Grid>
    );
};

export default ReviewList;
