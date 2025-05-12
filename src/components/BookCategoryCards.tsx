// src/components/BookCategoryCards.tsx
import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

interface Category {
  title: string;
  image: string;
  textColor: string;
  borderColor: string;
  shadow: string;
}

const bgColor = "#FFFFFF";
const cardBorderColor = "#E0E0E0";

const categories: Category[] = [
  {
    title: 'Fiction',
    image: '/assets/fiction.jpg',
    textColor: '#b71c1c',
    borderColor: cardBorderColor,
    shadow: '0 4px 12px rgba(244,67,54,0.3)',
  },
  {
    title: 'History',
    image: '/assets/history.jpg',
    textColor: '#1b5e20',
    borderColor: cardBorderColor,
    shadow: '0 4px 12px rgba(76,175,80,0.3)',
  },
  {
    title: 'Science',
    image: '/assets/science.jpg',
    textColor: '#0d47a1',
    borderColor: cardBorderColor,
    shadow: '0 4px 12px rgba(33,150,243,0.3)',
  },
  {
    title: 'Children',
    image: '/assets/children.jpg',
    textColor: '#e65100',
    borderColor: cardBorderColor,
    shadow: '0 4px 12px rgba(255,152,0,0.3)',
  },
];

export const BookCategoryCards: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box mt={4}>
      <Typography variant="h4" textAlign="center" gutterBottom>
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
        {categories.map((cat) => (
          <Card
            key={cat.title}
            sx={{
              backgroundColor: bgColor,
              color: cat.textColor,
              border: `2px solid ${cat.borderColor}`,
              boxShadow: cat.shadow,
              borderRadius: 2,
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
              },
            }}
          >
            <CardActionArea
              onClick={() =>
                navigate(`/catalog?category=${encodeURIComponent(cat.title)}`)
              }
            >
              <CardMedia
                component="div"
                sx={{
                  height: 160,
                  backgroundImage: `url(${cat.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
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
