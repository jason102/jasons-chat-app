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
} from '../components/AuthPages.styles';
import { RegistrationFormData, useRegistration } from '../hooks/authHooks';

const Register: React.FC = () => {
  const navigate = useNavigate();

  const { handleSubmit, formData, setFormData } = useRegistration();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevFormData: RegistrationFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const onGoToRegister = () => {
    navigate('/login');
  };

  const { name, email, password, error, loading } = formData;

  return (
    <Section>
      <h3>{`Let's chat! Create an account:`}</h3>
      <Form onSubmit={handleSubmit}>
        <TextContainer>
          <TextInput
            label='Name'
            variant='outlined'
            name='name'
            value={name}
            disabled={loading}
            onChange={handleChange}
          />
        </TextContainer>
        <TextContainer>
          <TextInput
            label='Email'
            variant='outlined'
            name='email'
            value={email}
            disabled={loading}
            onChange={handleChange}
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
          />
        </TextContainer>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <SubmitButtonContainer>
          <Button size='large' disabled={loading} type='submit'>
            {loading ? 'Please wait...' : 'Register'}
          </Button>
        </SubmitButtonContainer>
      </Form>
      <OtherAuthPageLink>
        {`Already have an account? Please `}
        <Link onClick={onGoToRegister}>login</Link>
      </OtherAuthPageLink>
    </Section>
  );
};

export default Register;
