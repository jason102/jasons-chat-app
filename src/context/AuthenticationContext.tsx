import { onAuthStateChanged, User } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import { LoadingPageContainer } from '../components/AuthPages.styles';
import { auth } from '../firebase';

export const AuthenticationContext = createContext<User | null>(null);

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <LoadingPageContainer>Loading app, please wait...</LoadingPageContainer>
    );
  }

  return (
    <AuthenticationContext.Provider value={user}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export default AuthProvider;
