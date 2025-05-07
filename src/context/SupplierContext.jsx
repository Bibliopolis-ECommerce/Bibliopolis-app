import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import apiService from '../services/ZooZoneAPIService';

const SupplierContext = createContext();

const SupplierProvider = ({ children }) => {
  const [supplierData, setSupplier] = useState(null);
  const [loadingSupplier, setLoading] = useState(true);

  useEffect(() => {
    const fetchSupplier = async () => {
      const cookie = Cookies.get('supplier');
      if (cookie) {
        try {
          const { token } = JSON.parse(cookie);
          if (token) {
            const supplierData = await apiService.validateSupplierToken(token);
            setSupplier(supplierData);
          }
        } catch (error) {
          console.error('Token validation failed', error);
        }
      }
      setLoading(false);
    };
    fetchSupplier();
  }, []);

  const loginSupplier = async (email, password) => {
    try {
      const supplierData = await apiService.login(email, password, 'supplier');
      const token = supplierData.token;
      Cookies.set('supplier_token', token);
      Cookies.set('supplier', JSON.stringify(supplierData), { expires: 1 });
      setSupplier(supplierData);
      return supplierData;
    } catch (error) {
      throw new Error('Invalid credentials');
    }
  };

  const logoutSupplier = () => {
    Cookies.remove('supplier');
    Cookies.remove('supplier_token');
    setSupplier(null);
  };

  return (
    <SupplierContext.Provider value={{ supplierData, loading: loadingSupplier, loginSupplier, logoutSupplier, setSupplier  }}>
      {children}
    </SupplierContext.Provider>
  );
};

export { SupplierContext, SupplierProvider };
