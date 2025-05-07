import React, { useContext, useState } from 'react';
import { Avatar, Menu, MenuItem, useTheme } from '@mui/material';
import { AuthContext } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LanguageContext } from '../../../context/AppContext';
import cardsData from '../../../lang/CardsProfile.json';

const UserAvatar = () => {
  const { userData, logout } = useContext(AuthContext);
  const theme = useTheme();
  const [avatarMenuEl, setAvatarMenuEl] = useState(null);
  const navigate = useNavigate();
  const { language } = useContext(LanguageContext);

  const handleAvatarMenuOpen = (event) => {
    setAvatarMenuEl(event.currentTarget);
  };

  const handleAccountClick = () => {
    const rolePath = userData?.supplier ? '/account-supplier' : '/account';
    navigate(rolePath);
    handleAvatarMenuClose();
  };

  const handleAvatarMenuClose = () => {
    setAvatarMenuEl(null);
  };

  const getFirstName = () => {
    if (userData?.member) {
      return userData.member.first_name[0];
    } else if (userData?.supplier) {
      return userData.supplier.contact_name[0];
    }
    return '';
  };

  const menuItems = [
    { title: { EN: "Your account", FR: "Votre compte" }, action: handleAccountClick },
    {
      title: { EN: "Logout", FR: "Déconnexion" },
      action: () => {
        logout();
        handleAvatarMenuClose();
        navigate('/');
      }
    }
  ];

  if (userData?.member) {
    menuItems.splice(1, 0,
      { title: cardsData.cards.find(card => card.title.EN === "Orders").title, action: () => { navigate('/orders'); handleAvatarMenuClose(); } },
      { title: cardsData.cards.find(card => card.title.EN === "LogIn, Security & Address").title, action: () => { navigate('/modify-login-info'); handleAvatarMenuClose(); } },
      { title: cardsData.cards.find(card => card.title.EN === "Payment Methods").title, action: () => { navigate('/modify-banking-info'); handleAvatarMenuClose(); } }
    );
  }

  return (
    <>
      <Avatar
        sx={{
          cursor: 'pointer',
          ml: 2,
          backgroundColor: theme.palette.background.primary,
          color: theme.palette.iconButton.color,
          transition: 'color 0.3s ease, background-color 0.3s ease',
          width: '40px',
          height: '40px',
          '&:hover': {
            backgroundColor: theme.palette.iconButton.hoverBackgroundColor,
            color: theme.palette.secondary.main,
          },
        }}
        onClick={handleAvatarMenuOpen}
      >
        {getFirstName()}
      </Avatar>

      <Menu
        anchorEl={avatarMenuEl}
        open={Boolean(avatarMenuEl)}
        onClose={handleAvatarMenuClose}
        MenuListProps={{
          sx: {
            backgroundColor: theme.palette.background.default,
            color: theme.palette.text.primary,
          },
        }}
      >
        {menuItems.map((item, index) => (
          <MenuItem key={index} onClick={item.action}>
            {item.title[language]}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default UserAvatar;
