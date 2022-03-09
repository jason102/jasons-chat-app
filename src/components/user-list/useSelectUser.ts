import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  Unsubscribe,
} from 'firebase/firestore';
import { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AuthContext } from 'context/AuthContext';
import { firestoreDB } from 'firebaseConfig';
import { setMessages, setUserToChatWith } from 'redux/slices/conversationSlice';
import { AppDispatch, RootState } from 'redux/store';
import { Message, OtherUser } from 'types';

export const MAX_MESSAGES_PER_CHAT = 50;

const useSelectUser = (selectedUser: OtherUser) => {
  const { currentUserId } = useContext(AuthContext);
  const dispatch: AppDispatch = useDispatch();
  const {
    userToChatWith: { uid: currentOtherUserId },
  } = useSelector((state: RootState) => state.conversation);

  let unsubscribe: Unsubscribe | null = null;

  const onSelectUser = () => {
    const selectedUserId = selectedUser.uid;

    if (selectedUserId === currentOtherUserId) {
      return;
    }

    dispatch(setUserToChatWith(selectedUser));

    const chatId =
      currentUserId > selectedUserId
        ? currentUserId + selectedUserId
        : selectedUserId + currentUserId;

    unsubscribe = onSnapshot(
      query(
        collection(firestoreDB, 'messages', chatId, 'chat'),
        limit(MAX_MESSAGES_PER_CHAT),
        orderBy('createdAt', 'desc')
      ),
      (querySnapshot) => {
        const snapshotMessages: Message[] = [];

        querySnapshot.forEach((doc) => {
          const { createdAt, ...rest } = doc.data();
          snapshotMessages.push(rest as Message);
        });

        // Firebase sends them in the reversed order that we want
        snapshotMessages.reverse();

        dispatch(setMessages(snapshotMessages));
      }
    );
  };

  useEffect(
    () => () => {
      if (unsubscribe) {
        unsubscribe();
      }
    },
    [unsubscribe]
  );

  return { onSelectUser };
};

export default useSelectUser;
