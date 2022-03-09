import { DocumentData } from 'firebase/firestore';
import React from 'react';
import { auth } from 'firebaseConfig';
import {
  MessageFromFriend,
  MessageFromMe,
  MessageRow,
} from './ChatMessages.styles';

interface Props {
  message: DocumentData;
}

const Message: React.FC<Props> = ({ message }) => {
  const isSentByMe = auth?.currentUser?.uid === message.from;

  const MessageComponent = isSentByMe ? MessageFromMe : MessageFromFriend;

  return (
    <MessageRow isSentByMe={isSentByMe}>
      <MessageComponent>{message.text}</MessageComponent>
    </MessageRow>
  );
};

export default Message;
