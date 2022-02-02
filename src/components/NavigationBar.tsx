import { Button } from '@mui/material';
import { signOut } from 'firebase/auth';
import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { Nav, Links } from './NavigationBar.styles';
import { AuthenticationContext } from '../context/AuthenticationContext';

const NavigationBar: React.FC = () => {
  const user = useContext(AuthenticationContext);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleLogout = async () => {
    await signOut(auth);

    navigate('/login');
  };

  const LinkComponent = () => {
    if (user) {
      return <Button onClick={handleLogout}>Logout</Button>;
    }

    if (pathname === '/login') {
      return <Link to='/register'>Register</Link>;
    }

    return <Link to='/login'>Login</Link>;
  };

  return (
    <Nav>
      <h3>
        <Link to='/'>{`Jason's Chat App`}</Link>
      </h3>
      <Links>
        <LinkComponent />
      </Links>
    </Nav>
  );
};

export default NavigationBar;
