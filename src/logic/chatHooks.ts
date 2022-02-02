import {
  addDoc,
  collection,
  DocumentData,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
  where,
  limit,
  Unsubscribe,
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../firebase';

export const MAX_MESSAGES_PER_CHAT = 50;

export type ChatHookParams = {
  currentUserID?: string;
  messagesSnapshotUnsubscribe: React.MutableRefObject<Unsubscribe | null>;
};

// Load the list of other users to chat with
export const useLoadUsersList = ({
  currentUserID,
  messagesSnapshotUnsubscribe,
}: ChatHookParams) => {
  const [otherUsers, setOtherUsers] = useState<DocumentData[]>([]);

  useEffect(() => {
    const usersRef = collection(db, 'users');

    const builtQuery = query(usersRef, where('uid', 'not-in', [currentUserID]));

    const unsubscribe = onSnapshot(builtQuery, (querySnapshot) => {
      const users: DocumentData[] = [];

      querySnapshot.forEach((doc) => {
        users.push(doc.data());
      });

      setOtherUsers(users);
    });

    return () => {
      unsubscribe();

      if (messagesSnapshotUnsubscribe.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        messagesSnapshotUnsubscribe.current();
      }
    };
  }, [currentUserID, messagesSnapshotUnsubscribe]);

  return { otherUsers };
};

export const useSelectUser = ({
  currentUserID,
  messagesSnapshotUnsubscribe,
}: ChatHookParams) => {
  const [userToChatWith, setUserToChatWith] = useState<DocumentData | null>(
    null
  );
  const [messages, setMessages] = useState<DocumentData[]>([]);

  const selectUser = async (user: DocumentData) => {
    const otherUserID = user.uid;

    if (!currentUserID || otherUserID === userToChatWith?.uid) {
      return;
    }

    setUserToChatWith(user);

    const id =
      currentUserID > otherUserID
        ? `${currentUserID + otherUserID}`
        : `${otherUserID + currentUserID}`;

    const msgsRef = collection(db, 'messages', id, 'chat');
    const builtQuery = query(
      msgsRef,
      limit(MAX_MESSAGES_PER_CHAT),
      orderBy('createdAt', 'desc')
    );

    messagesSnapshotUnsubscribe.current = onSnapshot(
      builtQuery,
      (querySnapshot) => {
        const snapshotMessages: DocumentData[] = [];

        querySnapshot.forEach((doc) => {
          snapshotMessages.push(doc.data());
        });

        // Firebase sends them in the reversed order that we want
        snapshotMessages.reverse();

        setMessages(snapshotMessages);
      }
    );
  };

  return { userToChatWith, selectUser, messages };
};

export const useSendMessages = ({
  userToChatWith,
  currentUserID,
}: {
  userToChatWith: DocumentData | null;
  currentUserID?: string;
}) => {
  const [textToSend, setTextToSend] = useState('');
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  const [sendMessageError, setSendMessageError] = useState('');

  const onTextEntered = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSendMessageError('');
    setTextToSend(e.target.value);
  };

  const onSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userToChatWith || !currentUserID || textToSend.trim().length === 0) {
      return;
    }

    setIsSendingMessage(true);

    const otherUserID = userToChatWith.uid;

    const id =
      currentUserID > otherUserID
        ? `${currentUserID + otherUserID}`
        : `${otherUserID + currentUserID}`;

    try {
      await addDoc(collection(db, 'messages', id, 'chat'), {
        text: textToSend,
        from: currentUserID,
        to: otherUserID,
        createdAt: Timestamp.fromDate(new Date()),
      });

      setTextToSend('');
    } catch (firebaseError: any) {
      setSendMessageError(firebaseError.message);
    } finally {
      setIsSendingMessage(false);
    }
  };

  return {
    textToSend,
    onTextEntered,
    onSendMessage,
    sendMessageError,
    isSendingMessage,
  };
};
