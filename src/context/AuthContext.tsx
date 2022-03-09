import { onAuthStateChanged, User } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import { LoadingPageContainer } from 'components/AuthPages.styles';
import { auth } from 'firebaseConfig';

export const AuthContext = createContext<{
  currentUser: User | null;
  currentUserId: string;
}>({ currentUser: null, currentUserId: '' });

const AuthProvider: React.FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentUserId, setCurrentUserId] = useState('');

  const [loadingApp, setLoadingApp] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setCurrentUserId(user?.uid ?? '');
      setLoadingApp(false);
    });
  }, []);

  if (loadingApp) {
    return (
      <LoadingPageContainer>Loading app, please wait...</LoadingPageContainer>
    );
  }

  return (
    <AuthContext.Provider value={{ currentUser, currentUserId }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
