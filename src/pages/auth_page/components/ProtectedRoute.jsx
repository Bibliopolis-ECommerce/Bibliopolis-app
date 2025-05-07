import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import { SupplierContext} from '../../../context/SupplierContext';

const ProtectedRoute = ({ children }) => {
  const { userData, loading } = useContext(AuthContext);

  if (loading ) {
    return <div>Loading...</div>;
  }

  return userData.member || userData.supplier ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
