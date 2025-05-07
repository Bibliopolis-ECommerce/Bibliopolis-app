import Navbar from '../layout/Navbar';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';
import Footer from '../layout/Footer';
import Product from './components/product';
import ReviewForm from './components/reviewForm';
import { useParams } from 'react-router-dom';


const ProductPage = () => {
  const { id } = useParams();  

  return (
    <>
      <CssBaseline />
      <Box
        sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
      >
        <Navbar />
        <Box sx={{ flexGrow: 1, pd: 2, px: 2}}>
          <Box sx={{ mb: 4 }}>
            <Product productId={id} />
          </Box>
          <Box sx={{ mb: 4, px: 3 }}>
            <ReviewForm productId={id} />
          </Box>
        </Box>
        <Footer />
      </Box>
    </>
  );
};

export default ProductPage;
