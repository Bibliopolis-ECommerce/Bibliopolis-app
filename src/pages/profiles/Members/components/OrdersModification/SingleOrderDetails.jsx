import { useContext } from 'react';
import { Box, Typography, Divider } from '@mui/material';
import { LanguageContext } from '../../../../../context/AppContext';

const SingleOrderDetail = ({ order }) => {
  const { language } = useContext(LanguageContext);

  return (
    <Box
      sx={{
        p: 2,
        border: '1px solid grey',
        borderRadius: 2,
        mb: 2,
      }}
    >
      <Typography variant="h6" gutterBottom>
        {language === 'EN' ? 'Order Details' : 'Détails de la commande'}
      </Typography>
      <Divider sx={{ my: 2 }} />

      <Box>
        {order.items.map((item, index) => (
          <Box key={index} display="flex" alignItems="center" mb={2}>
            <img
              src={item.image}
              alt={item[`name_${language}`]}
              style={{ width: 100, height: 100, marginRight: 16 }}
            />
            <Box flexGrow={1}>
              <Typography variant="body1">{item.name}</Typography>
              <Typography variant="body2" color="textSecondary">
                {language === 'EN' ? 'Quantity' : 'Quantité'}: {item.quantity}
              </Typography>
              <Typography variant="body2">
                {language === 'EN' ? 'Price' : 'Prix'}: ${item.price}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>

      <Divider sx={{ my: 2 }} />

      <Typography variant="body1">
        {language === 'EN' ? 'Subtotal' : 'Sous-total'}: ${order.subtotal.toFixed(2)}
      </Typography>
      <Typography variant="body1">
        {language === 'EN' ? 'GST' : 'TPS'}: ${order.taxes.gst.toFixed(2)}
      </Typography>
      <Typography variant="body1">
        {language === 'EN' ? 'QST' : 'TVQ'}: ${order.taxes.qst.toFixed(2)}
      </Typography>
      <Typography variant="body1">
        {language === 'EN' ? 'Total' : 'Total'}: ${order.total.toFixed(2)}
      </Typography>
    </Box>
  );
};

export default SingleOrderDetail;
