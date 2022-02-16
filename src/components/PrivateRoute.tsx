import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute: React.FC = () => {
  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Outlet />;
  }

  return <Navigate to='/login' />;
};

export default PrivateRoute;
