import React, { useContext, useEffect, useState } from 'react';
import { Container, UsersListMessage } from './UsersList.styles';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'redux/store';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { firestoreDB } from 'firebaseConfig';
import { AuthContext } from 'context/AuthContext';
import { setMyFriends } from 'redux/slices/usersSlice';
import { OtherUser } from 'types';
import { AnimatePresence, motion } from 'framer-motion';
import FriendsList from './FriendsList';
import InviteFriendPanel from './InviteFriendPanel';

const UsersList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { currentUserId } = useContext(AuthContext);
  const { myFriends } = useSelector((state: RootState) => state.users);
  const [openInvitePanel, setOpenInvitePanel] = useState(false);

  const toggleOpenInvitePanel = () => {
    setOpenInvitePanel((prevOpen) => !prevOpen);
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(firestoreDB, 'users'),
        where('uid', 'not-in', [currentUserId])
      ),
      (querySnapshot) => {
        const users: OtherUser[] = [];

        querySnapshot.forEach((doc) => {
          const { createdAt, ...rest } = doc.data();
          users.push(rest as OtherUser);
        });

        dispatch(
          setMyFriends([...users, ...users, ...users, ...users, ...users])
        );
      }
    );

    return () => unsubscribe();
  }, [currentUserId, dispatch]);

  if (myFriends.length === 0) {
    return (
      <Container>
        <UsersListMessage>Loading users...</UsersListMessage>
      </Container>
    );
  }

  return (
    <Container>
      <AnimatePresence>
        {openInvitePanel ? (
          <motion.div
            key='InviteFriendPanel'
            initial={{ opacity: 0, x: '-100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '-100%' }}
            transition={{ duration: 0.25 }}
          >
            <InviteFriendPanel toggleOpenInvitePanel={toggleOpenInvitePanel} />
          </motion.div>
        ) : (
          <motion.div
            key='FriendsList'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.25 }}
          >
            <FriendsList toggleOpenInvitePanel={toggleOpenInvitePanel} />
          </motion.div>
        )}
      </AnimatePresence>
    </Container>
  );
};

export default UsersList;
