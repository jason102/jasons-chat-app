import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import React, { useContext, useEffect, useRef } from 'react';
import { Container, TextInput } from './SubmitMessageInput.styles';
import { ChatContext } from '../../context/ChatContext';

const SubmitMessageInput: React.FC = () => {
  const chatData = useContext(ChatContext);

  // Autofocus the send text input field each time a message is sent
  const focusRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (chatData && chatData.isSendingMessage === false) {
      focusRef.current?.focus();
    }
  }, [chatData, chatData?.isSendingMessage]);

  return (
    <Container onSubmit={chatData?.onSendMessage}>
      <TextInput
        onChange={chatData?.onTextEntered}
        error={chatData?.sendMessageError ? true : false}
        helperText={chatData?.sendMessageError}
        value={chatData?.textToSend}
        disabled={chatData?.isSendingMessage}
        inputRef={focusRef}
        placeholder='Enter the text you want to send here'
      />
      <Button
        variant='contained'
        type='submit'
        endIcon={<SendIcon />}
        disabled={chatData?.isSendingMessage}
      >
        Send
      </Button>
    </Container>
  );
};

export default SubmitMessageInput;
