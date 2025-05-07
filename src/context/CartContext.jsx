import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = Cookies.get('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const addToCart = (item) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);

    let updatedCart;
    if (existingItem) {
      updatedCart = cart.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem,
      );
    } else {
      updatedCart = [...cart, { ...item, quantity: 1 }];
    }

    setCart(updatedCart);
    Cookies.set('cart', JSON.stringify(updatedCart), { expires: 365 });
  };

  const removeFromCart = (itemId) => {
    const updatedCart = cart.reduce((acc, cartItem) => {
      if (cartItem.id === itemId) {
        if (cartItem.quantity > 1) {
          acc.push({ ...cartItem, quantity: cartItem.quantity - 1 });
        }
      } else {
        acc.push(cartItem);
      }
      return acc;
    }, []);

    setCart(updatedCart);
    Cookies.set('cart', JSON.stringify(updatedCart), { expires: 365 });
  };

  const removeAllSameItem = (itemId) => {
    const updatedCart = cart.filter((cartItem) => cartItem.id !== itemId);
    setCart(updatedCart);
    Cookies.set('cart', JSON.stringify(updatedCart), { expires: 365 });
  };

  const getCartItemCount = () => {
    return cart.reduce((count, cartItem) => count + cartItem.quantity, 0);
  };


  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        getCartItemCount,
        removeAllSameItem,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
