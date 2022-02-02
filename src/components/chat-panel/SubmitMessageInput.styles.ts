import { TextField } from '@mui/material';
import styled from 'styled-components';

export const Container = styled.form`
  display: flex;
  flex-direction: row;
`;

export const TextInput = styled(TextField)`
  flex-grow: 1;
`;
