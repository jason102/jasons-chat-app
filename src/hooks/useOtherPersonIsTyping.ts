import { useContext, useEffect, useState } from 'react';
import { realtimeDB } from '../firebase';
import { ref, onValue, onDisconnect } from 'firebase/database';
import { AuthContext } from '../context/AuthContext';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const useOtherPersonIsTyping = () => {
  const { currentUserId } = useContext(AuthContext);
  const {
    userToChatWith: { uid: otherUserId },
  } = useSelector((state: RootState) => state.conversation);

  const [otherPersonIsTyping, setOtherPersonIsTyping] = useState(false);

  useEffect(() => {
    const id =
      currentUserId > otherUserId
        ? currentUserId + otherUserId
        : otherUserId + currentUserId;

    // Show when the other person is typing
    const unsubscribe = onValue(
      ref(realtimeDB, 'conversations/' + id + '/' + otherUserId + '_isTyping'),
      (snapshot) => {
        const otherUserIsTyping = snapshot.val();
        setOtherPersonIsTyping(otherUserIsTyping);
      }
    );

    // Set the user to not typing if they close the app before the timeout has triggered
    onDisconnect(
      ref(realtimeDB, 'conversations/' + id + '/' + currentUserId + '_isTyping')
    ).set(false);

    return () => unsubscribe();
  }, [currentUserId, otherUserId]);

  return { otherPersonIsTyping };
};

export default useOtherPersonIsTyping;
