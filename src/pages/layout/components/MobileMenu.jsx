import React, { useState, useContext } from 'react';
import {
  Badge,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  Brightness7,
  Brightness2,
  ShoppingCart,
  Translate,
  Menu as MenuIcon,
} from '@mui/icons-material';
import { styled, useTheme } from '@mui/material/styles';
import { LanguageContext } from '../../../context/AppContext';
import NavBarData from '../../../lang/NavBar.json';
import useCart from '../../../context/hooks/useCart';
import menuItems from '../../../lang/CardsProfile.json'
const MobileMenu = ({ toggleDarkMode, isDarkMode }) => {
  const { getCartItemCount } = useCart();
  const { language, toggleLanguage } = useContext(LanguageContext);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const listItems = [
    { title: { EN: "Your account", FR: "Votre compte" } },
    ...menuItems.cards.map(card => ({ title: card.title })),
    { title: { EN: "Logout", FR: "Déconnexion" } }
  ];

  const DrawerStyled = styled(Drawer)(() => ({
    '& .MuiDrawer-paper': {
      backgroundColor: theme.palette.background.default,
      color: theme.palette.text.primary,
    },
  }));

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setDrawerOpen(open);
  };
  const translate = () => () => {
    language == 'FR' ? toggleLanguage('EN') : toggleLanguage('FR');
  };

  const drawerList = () => (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={toggleDarkMode}>
            <ListItemIcon>
              {isDarkMode ? <Brightness7 /> : <Brightness2 />}
            </ListItemIcon>
            <ListItemText
              primary={
                !isDarkMode
                  ? NavBarData.dark_mode[language]
                  : NavBarData.light_mode[language]
              }
            />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={translate()}>
            <ListItemIcon>
              <Translate />
            </ListItemIcon>
            <ListItemText primary={NavBarData.translate_button[language]} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton to="/cart">
            <ListItemIcon>
              <Badge badgeContent={getCartItemCount()} color="error">
                <ShoppingCart />
              </Badge>
            </ListItemIcon>
            <ListItemText primary={NavBarData.cart_button[language]} />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
      {listItems.map((item, index) => (
        <ListItem key={index} disablePadding>
          <ListItemButton onClick={() => setDrawerOpen(false)}>
            <ListItemText primary={item.title[language]} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
    </Box>
  );

  return (
    <Box>
      <IconButton
        sx={{ width: 40, height: 40, ml: 2 }}
        onClick={toggleDrawer(true)}
      >
        <MenuIcon />
      </IconButton>
      <DrawerStyled
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
      >
        {drawerList()}
      </DrawerStyled>
    </Box>
  );
};

export default MobileMenu;
