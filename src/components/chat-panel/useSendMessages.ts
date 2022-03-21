import { addDoc, collection, Timestamp } from 'firebase/firestore';
import {
  useContext,
  useEffect,
  useRef,
  useState,
  ChangeEvent,
  FormEvent,
} from 'react';
import { firestoreDB, realtimeDB } from 'firebaseConfig';
import { set, ref } from 'firebase/database';
import { AuthContext } from 'context/AuthContext';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import _debounce from 'lodash/debounce';

const TYPING_DEBOUNCE_TIME = 1500;

const useSendMessages = () => {
  const { currentUserId } = useContext(AuthContext);
  const { userToChatWith } = useSelector(
    (state: RootState) => state.conversation
  );

  const [textToSend, setTextToSend] = useState('');

  const isTyping = useRef(false);
  const isTypingDebounce = useRef(
    _debounce(() => {
      isTyping.current = false;

      try {
        set(conversationRef, false);
      } catch (error: any) {
        console.log(error.message);
      }
    }, TYPING_DEBOUNCE_TIME)
  );

  const otherUserId = userToChatWith.uid;

  const chatId =
    currentUserId > otherUserId
      ? currentUserId + otherUserId
      : otherUserId + currentUserId;

  const conversationRef = ref(
    realtimeDB,
    'conversations/' + chatId + '/' + currentUserId + '_isTyping'
  );

  // Set the user to not be typing on component unmount or when they select a different user to chat with
  useEffect(
    () => () => {
      if (isTyping.current) {
        isTypingDebounce.current.cancel();
        isTyping.current = false;

        try {
          set(conversationRef, false);
        } catch (error: any) {
          console.log(error.message);
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [chatId]
  );

  const onTextEntered = (e: ChangeEvent<HTMLInputElement>) => {
    setTextToSend(e.target.value);

    if (!isTyping.current) {
      isTyping.current = true;

      try {
        set(conversationRef, true);
      } catch (error: any) {
        console.log(error.message);
      }
    }

    isTypingDebounce.current();
  };

  const onSendMessage = async (e: FormEvent) => {
    e.preventDefault();

    if (textToSend.trim().length === 0) {
      return;
    }

    setTextToSend('');

    try {
      await addDoc(collection(firestoreDB, 'messages', chatId, 'chat'), {
        text: textToSend,
        from: currentUserId,
        to: otherUserId,
        createdAt: Timestamp.fromDate(new Date()),
      });
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return { onTextEntered, textToSend, onSendMessage };
};

export default useSendMessages;
