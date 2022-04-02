import { Button, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import React from 'react';
import { Container } from './SubmitMessageInput.styles';
import useSendMessages from './useSendMessages';

const SubmitMessageInput: React.FC = () => {
  const { onSendMessage, textToSend, onTextEntered } = useSendMessages();

  return (
    <Container onSubmit={onSendMessage}>
      <TextField
        onChange={onTextEntered}
        value={textToSend}
        placeholder='Message'
        fullWidth
      />
      <Button variant='contained' type='submit' endIcon={<SendIcon />}>
        Send
      </Button>
    </Container>
  );
};

export default SubmitMessageInput;
