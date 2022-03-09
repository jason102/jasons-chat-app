import React, { useContext } from 'react';
import { AuthContext } from 'context/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';

interface Props {
  children: JSX.Element;
}

const PrivateRoute: React.FC<Props> = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const location = useLocation();

  if (currentUser) {
    return children;
  }

  return <Navigate to='/login' state={{ from: location }} replace />;
};

export default PrivateRoute;
