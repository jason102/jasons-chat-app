import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ChatPage from './pages/Chat';
import NavigationBar from './components/NavigationBar';
import { AppContainer } from './App.styles';
import Register from './pages/Register';
import Login from './pages/Login';
import About from './pages/About';
import AuthProvider from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import PublicOnlyRoute from './components/PublicOnlyRoute';

const App: React.FC = () => (
  <AuthProvider>
    <AppContainer>
      <BrowserRouter>
        <NavigationBar />
        <Routes>
          <Route
            path='/'
            element={
              <PrivateRoute>
                <ChatPage />
              </PrivateRoute>
            }
          />
          <Route
            path='/register'
            element={
              <PublicOnlyRoute>
                <Register />
              </PublicOnlyRoute>
            }
          />
          <Route
            path='/login'
            element={
              <PublicOnlyRoute>
                <Login />
              </PublicOnlyRoute>
            }
          />
          <Route path='/about' element={<About />} />
        </Routes>
      </BrowserRouter>
    </AppContainer>
  </AuthProvider>
);

export default App;
