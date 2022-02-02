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
  otherPersonIsTyping: boolean;
};

export const ChatContext = createContext<ChatData | null>(null);

const ChatProvider: React.FC = ({ children }) => {
  const messagesSnapshotUnsubscribe = useRef<Unsubscribe | null>(null);
  const otherPersonIsTypingUnsubscribe = useRef<Unsubscribe | null>(null);

  const currentUserID = auth?.currentUser?.uid;

  const { otherUsers } = useLoadUsersList({
    currentUserID,
    messagesSnapshotUnsubscribe,
    otherPersonIsTypingUnsubscribe,
  });

  const { userToChatWith, selectUser, messages, otherPersonIsTyping } =
    useSelectUser({
      currentUserID,
      messagesSnapshotUnsubscribe,
      otherPersonIsTypingUnsubscribe,
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
        otherPersonIsTyping,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;
