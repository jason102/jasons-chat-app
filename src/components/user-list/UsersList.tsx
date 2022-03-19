import React, { useContext, useEffect, useState } from 'react';
import { Container, UsersListMessage } from './UsersList.styles';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'redux/store';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { firestoreDB } from 'firebaseConfig';
import { AuthContext } from 'context/AuthContext';
import { setMyFriends } from 'redux/slices/usersSlice';
import { OtherUser } from 'types';
import { AnimatePresence } from 'framer-motion';
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

        dispatch(setMyFriends(users));
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
          <InviteFriendPanel toggleOpenInvitePanel={toggleOpenInvitePanel} />
        ) : (
          <FriendsList toggleOpenInvitePanel={toggleOpenInvitePanel} />
        )}
      </AnimatePresence>
    </Container>
  );
};

export default UsersList;
