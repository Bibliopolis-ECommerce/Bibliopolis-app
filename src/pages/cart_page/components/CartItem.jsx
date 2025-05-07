import { useContext } from 'react';
import {
  Box,
  Button,
  IconButton,
  Typography,
  Divider,
  useMediaQuery,
} from '@mui/material';
import { Add, Remove, Delete } from '@mui/icons-material';
import useLanguage from '../../../context/hooks/useLanguage';
import { useTheme } from '@emotion/react';
import AddToWishlistButton from '../../item_page/components/AddToWishListButton'; 
import { AuthContext } from '../../../context/AuthContext'; 

const CartItem = ({
  item,
  addToCart,
  removeFromCart,
  isFirstItem,
  isLastItem,
  removeAllSameItem,
}) => {
  const { language } = useLanguage();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { userData } = useContext(AuthContext); 
  return (
    <>
      {isFirstItem && <Divider sx={{ my: 2, borderColor: 'grey.500' }} />}
      <Box display="flex" alignItems="center" mb={2}>
        <img
          src={item.image}
          alt={item.name}
          style={{ width: 100, height: 100, marginRight: 16 }}
        />
        <Box flexGrow={1}>
        <Typography variant="body1">{item.name}</Typography>
        <Typography variant="body2" color="textSecondary">
            Size :  {item.size}
          </Typography>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mt={1}
          >
            <Typography variant="body2">Price: $ {item.price}</Typography>
            <Typography variant="body2">
              Total: $ {(item.quantity * parseFloat(item.price)).toFixed(2)}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" mt={1}>
            <Button
              size="small"
              disableElevation
              variant="contained"
              color="secondary"
              onClick={() => removeFromCart(item.id)}
              sx={{ minWidth: '32px', height: '32px', mr: 1, color: 'white' }}
            >
              <Remove />
            </Button>
            <Typography variant="body1" sx={{ mx: 2 }}>
              {item.quantity}
            </Typography>
            <Button
              size="small"
              disableElevation
              variant="contained"
              onClick={() => addToCart(item)}
              color="secondary"
              sx={{ minWidth: '32px', height: '32px', ml: 1 }}
            >
              <Add sx={{ color: 'white' }} />
            </Button>
          </Box>
        </Box>
        <Box display="flex" alignItems="center" sx={isMobile ? {} : { ml: 2 }}>
          {userData && <AddToWishlistButton productId={item.id} />} {/* Conditionally render */}
          <IconButton
            onClick={() => removeAllSameItem(item.id)}
            sx={{ width: '40px', height: '40px', ml: 1 }}
          >
            <Delete />
          </IconButton>
        </Box>
      </Box>
      {!isLastItem && <Divider sx={{ my: 2, borderColor: 'grey.500' }} />}
    </>
  );
};

export default CartItem;

