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
  Unsubscribe as FSunsubscribe,
} from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react';
import { firestoreDB, realtimeDB } from '../firebase';
import {
  set,
  ref,
  onValue,
  onDisconnect,
  Unsubscribe as RTDBunsubscribe,
} from 'firebase/database';

export const MAX_MESSAGES_PER_CHAT = 50;
export const TYPING_DEBOUNCE_TIME = 1500;

export type ChatHookParams = {
  currentUserID?: string;
  messagesSnapshotUnsubscribe: React.MutableRefObject<FSunsubscribe | null>;
  otherPersonIsTypingUnsubscribe: React.MutableRefObject<RTDBunsubscribe | null>;
};

// Load the list of other users to chat with
export const useLoadUsersList = ({
  currentUserID,
  messagesSnapshotUnsubscribe,
  otherPersonIsTypingUnsubscribe,
}: ChatHookParams) => {
  const [otherUsers, setOtherUsers] = useState<DocumentData[]>([]);

  useEffect(() => {
    const usersRef = collection(firestoreDB, 'users');

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
      if (otherPersonIsTypingUnsubscribe.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        otherPersonIsTypingUnsubscribe.current();
      }
    };
  }, [
    currentUserID,
    messagesSnapshotUnsubscribe,
    otherPersonIsTypingUnsubscribe,
  ]);

  return { otherUsers };
};

export const useSelectUser = ({
  currentUserID,
  messagesSnapshotUnsubscribe,
  otherPersonIsTypingUnsubscribe,
}: ChatHookParams) => {
  const [userToChatWith, setUserToChatWith] = useState<DocumentData | null>(
    null
  );
  const [messages, setMessages] = useState<DocumentData[]>([]);
  const [otherPersonIsTyping, setOtherPersonIsTyping] = useState(false);

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

    messagesSnapshotUnsubscribe.current = onSnapshot(
      query(
        collection(firestoreDB, 'messages', id, 'chat'),
        limit(MAX_MESSAGES_PER_CHAT),
        orderBy('createdAt', 'desc')
      ),
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

    // Show when the other person is typing
    otherPersonIsTypingUnsubscribe.current = onValue(
      ref(realtimeDB, 'conversations/' + id + '/' + otherUserID + '_isTyping'),
      (snapshot) => {
        const otherUserIsTyping = snapshot.val();
        setOtherPersonIsTyping(otherUserIsTyping);
      }
    );

    // Set the user to not typing if they close the app before the timeout has triggered
    onDisconnect(
      ref(realtimeDB, 'conversations/' + id + '/' + currentUserID + '_isTyping')
    ).set(false);
  };

  return { userToChatWith, selectUser, messages, otherPersonIsTyping };
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
  const isTyping = useRef(false);
  const isTypingDebounceTimer = useRef(-1);

  const onTextEntered = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!userToChatWith || !currentUserID) {
      return;
    }

    const otherUserID = userToChatWith?.uid;
    const id =
      currentUserID > otherUserID
        ? `${currentUserID + otherUserID}`
        : `${otherUserID + currentUserID}`;

    setSendMessageError('');
    setTextToSend(e.target.value);

    const conversationRef = ref(
      realtimeDB,
      'conversations/' + id + '/' + currentUserID + '_isTyping'
    );

    if (!isTyping.current) {
      isTyping.current = true;

      try {
        set(conversationRef, true);
      } catch (error: any) {
        console.log(error.message);
      }
    }

    window.clearTimeout(isTypingDebounceTimer.current);
    isTypingDebounceTimer.current = window.setTimeout(() => {
      isTyping.current = false;

      try {
        set(conversationRef, false);
      } catch (error: any) {
        console.log(error.message);
      }
    }, TYPING_DEBOUNCE_TIME);
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
      await addDoc(collection(firestoreDB, 'messages', id, 'chat'), {
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
