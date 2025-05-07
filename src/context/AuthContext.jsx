import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";

import apiService from '../services/ZooZoneAPIService';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [userData, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchUser = async () => {
      console.log('Inside fetchUser');
      const cookie = Cookies.get('user');
      if (cookie) {
        try {
          const { token } = JSON.parse(cookie); 
          const userRole = JSON.parse(cookie).member ? 'member' : 'supplier';

          if (token) {
            const userData = await apiService.validateToken(token, userRole);
            setUser(userData);
          }
        } catch (error) {
          logout();
          console.error('Token validation failed', error);

        }
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  const login = async (email, password, role) => {
    try {
      const userData = await apiService.login(email, password, role);
      const token  = userData.token;
      Cookies.set('token', token ,{expires: 1}); 
      Cookies.set('user', JSON.stringify(userData), { expires: 1 });
      setUser(userData);
      return userData;
    } catch (error) {
      throw new Error('Invalid credentials');
    }
  };

  const logout = () => {
    Cookies.remove('user');
    Cookies.remove('token');
    setUser(null);
  };




  const googleLogin = async (tokenId) => {
    try {
      const userData = jwtDecode(tokenId);
      Cookies.set('user', JSON.stringify(userData), { expires: 365 });
      setUser(userData);
      return userData;
    } catch (error) {
      console.error('Google login failed', error);
      throw new Error('Google login failed');
    }
  };





  return (
    <AuthContext.Provider value={{ userData: userData, loading, login, logout,  setUser , googleLogin}}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
