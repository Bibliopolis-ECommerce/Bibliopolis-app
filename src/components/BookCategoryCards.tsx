// src/components/BookCategoryCards.tsx
import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import { useNavigate } from 'react-router-dom';

const categories = [
  { title: 'Fiction', image: '/assets/fiction.jpg' },
  { title: 'History', image: '/assets/history.jpg' },
  { title: 'Science', image: '/assets/science.jpg' },
  { title: 'Children', image: '/assets/children.jpg' },
];

export const BookCategoryCards: React.FC = () => {
  const navigate = useNavigate();
  const handleClick = (category: string) =>
    navigate(`/catalog?category=${encodeURIComponent(category)}`);

  return (
    <Box mt={2}>
      <Typography variant="h4" gutterBottom textAlign="center">
        Browse Categories
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gap: 3,
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(4, 1fr)',
          },
        }}
      >
        {categories.map((cat, idx) => (
          <Card key={idx} sx={{ height: '100%' }}>
            <CardActionArea onClick={() => handleClick(cat.title)}>
              <CardMedia
                component="img"
                height="160"
                image={cat.image}
                alt={cat.title}
              />
              <CardContent>
                <Typography variant="h6" align="center">
                  {cat.title}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Box>
    </Box>
  );
};
