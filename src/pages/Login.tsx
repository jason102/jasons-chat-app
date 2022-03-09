import { Link, Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Form,
  Section,
  TextContainer,
  TextInput,
  SubmitButtonContainer,
  ErrorMessage,
  OtherAuthPageLink,
} from 'components/AuthPages.styles';
import { LoginFormData, useLogin } from 'hooks/authHooks';

const Login: React.FC = () => {
  const { formData, setFormData, handleSubmit } = useLogin();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevFormData: LoginFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const onGoToRegister = () => {
    navigate('/register');
  };

  const { email, password, error, loading } = formData;

  return (
    <Section>
      <h3>Welcome! Please login:</h3>
      <Form onSubmit={handleSubmit}>
        <TextContainer>
          <TextInput
            label='Email'
            variant='outlined'
            name='email'
            value={email}
            disabled={loading}
            onChange={handleChange}
            autoComplete='email'
          />
        </TextContainer>
        <TextContainer>
          <TextInput
            label='Password'
            variant='outlined'
            name='password'
            type='password'
            value={password}
            onChange={handleChange}
            disabled={loading}
            autoComplete='current-password'
          />
        </TextContainer>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <SubmitButtonContainer>
          <Button size='large' type='submit' disabled={loading}>
            {loading ? 'Please wait...' : 'Login'}
          </Button>
        </SubmitButtonContainer>
      </Form>
      <OtherAuthPageLink>
        {`Don't have an account? Please `}
        <Link onClick={onGoToRegister}>register</Link>
      </OtherAuthPageLink>
    </Section>
  );
};

export default Login;
