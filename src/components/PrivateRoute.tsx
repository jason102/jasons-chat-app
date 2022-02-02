import React, { useContext } from 'react';
import { AuthenticationContext } from '../context/AuthenticationContext';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute: React.FC = () => {
  const user = useContext(AuthenticationContext);

  if (user) {
    return <Outlet />;
  }

  return <Navigate to='/login' />;
};

export default PrivateRoute;
