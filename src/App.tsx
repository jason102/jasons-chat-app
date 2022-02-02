import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ChatPage from './pages/Chat';
import NavigationBar from './components/NavigationBar';
import { AppContainer } from './App.styles';
import Register from './pages/Register';
import Login from './pages/Login';
import AuthenticationProvider from './context/AuthenticationContext';
import PrivateRoute from './components/PrivateRoute';

const App: React.FC = () => {
  return (
    <AuthenticationProvider>
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
    </AuthenticationProvider>
  );
};

export default App;
