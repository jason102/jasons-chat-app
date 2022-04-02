import styled from 'styled-components';
import { TextField } from '@mui/material';

export const Section = styled.section`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-items: center;
`;

export const Form = styled.form`
  flex-direction: column;
  border: 5px solid black;
  border-radius: 20px;
  padding: 20px;
  width: 500px;
`;

export const TextContainer = styled.div`
  display: flex;
  flex-grow: 1;
  margin-bottom: 20px;
`;

export const TextInput = styled(TextField)`
  flex-grow: 1;
`;

export const SubmitButtonContainer = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: center;
  margin: 0px 10px 0px 10px;
`;

export const ErrorMessage = styled.p`
  text-align: center;
  color: red;
`;

export const OtherAuthPageLink = styled.div`
  margin: 20px 0px 0px 0px;
  text-align: center;
`;

export const LoadingPageContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`;
