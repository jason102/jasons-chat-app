import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

interface Props {
  children: JSX.Element;
}

const PublicOnlyRoute: React.FC<Props> = ({ children }) => {
  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Navigate to='/' />;
  }

  return children;
};

export default PublicOnlyRoute;
