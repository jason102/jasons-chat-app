import { DocumentData, Unsubscribe } from 'firebase/firestore';
import React, { createContext, useRef } from 'react';
import { auth } from '../firebase';
import {
  useLoadUsersList,
  useSelectUser,
  useSendMessages,
} from '../logic/chatHooks';

export type ChatData = {
  otherUsers: DocumentData[];
  userToChatWith: DocumentData | null;
  selectUser: (user: DocumentData) => void;
  onTextEntered: (e: React.ChangeEvent<HTMLInputElement>) => void;
  textToSend: string;
  onSendMessage: (e: React.FormEvent) => void;
  sendMessageError: string;
  messages: DocumentData[];
  isSendingMessage: boolean;
};

export const ChatContext = createContext<ChatData | null>(null);

const ChatProvider: React.FC = ({ children }) => {
  const messagesSnapshotUnsubscribe = useRef<Unsubscribe | null>(null);

  const currentUserID = auth?.currentUser?.uid;

  const { otherUsers } = useLoadUsersList({
    currentUserID,
    messagesSnapshotUnsubscribe,
  });

  const { userToChatWith, selectUser, messages } = useSelectUser({
    currentUserID,
    messagesSnapshotUnsubscribe,
  });

  const {
    textToSend,
    onTextEntered,
    onSendMessage,
    sendMessageError,
    isSendingMessage,
  } = useSendMessages({ userToChatWith, currentUserID });

  return (
    <ChatContext.Provider
      value={{
        otherUsers,
        userToChatWith,
        selectUser,
        textToSend,
        onTextEntered,
        onSendMessage,
        sendMessageError,
        messages,
        isSendingMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;
