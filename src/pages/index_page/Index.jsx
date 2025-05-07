
import  { useEffect, useState , useContext } from 'react';
import Navbar from '../layout/Navbar';
import Hero from './components/Hero';
import CssBaseline from '@mui/material/CssBaseline';
import MultiCarousel from './components/MultiCarousel';
import Footer from '../layout/Footer';
import apiService from '../../services/ZooZoneAPIService';
import LoadingScreen from '../../context/LoadingScreen';

const Index = () => {
  const [carouselData, setCarouselData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!carouselData) {
      const fetchFeaturedItems = async () => {
        try {
          const data = await apiService.getFeaturedItems();
          setCarouselData(data);
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      };

      fetchFeaturedItems();
    } else {
      setLoading(false);
    }
  }, [carouselData]);

  if (loading) {
    return  <LoadingScreen />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <CssBaseline />
      <Navbar />
      <Hero />
      <MultiCarousel CarouselData={carouselData} />
      <Footer />
    </>
  );
};

export default Index;
