import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import React from 'react';
import { Container, TextInput } from './SubmitMessageInput.styles';
import useSendMessages from './useSendMessages';

const SubmitMessageInput: React.FC = () => {
  const { onSendMessage, textToSend, onTextEntered } = useSendMessages();

  return (
    <Container onSubmit={onSendMessage}>
      <TextInput
        onChange={onTextEntered}
        value={textToSend}
        placeholder='Message'
      />
      <Button variant='contained' type='submit' endIcon={<SendIcon />}>
        Send
      </Button>
    </Container>
  );
};

export default SubmitMessageInput;
