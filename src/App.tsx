import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ChatPage from './pages/Chat';
import NavigationBar from './components/NavigationBar';
import { AppContainer } from './App.styles';
import Register from './pages/Register';
import Login from './pages/Login';
import AuthProvider from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContainer>
        <BrowserRouter>
          <NavigationBar />
          <Routes>
            <Route path='/' element={<PrivateRoute />}>
              <Route path='/' element={<ChatPage />} />
            </Route>
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </BrowserRouter>
      </AppContainer>
    </AuthProvider>
  );
};

export default App;
