import React, { useContext, useEffect } from 'react';
import OtherFriend from './OtherFriend';
import { Container, UsersListMessage } from './UsersList.styles';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { firestoreDB } from '../../firebase';
import { AuthContext } from '../../context/AuthContext';
import { setMyFriends } from '../../redux/slices/usersSlice';
import { OtherUser } from '../../types';

const UsersList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { currentUserId } = useContext(AuthContext);
  const { myFriends } = useSelector((state: RootState) => state.users);

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

  return (
    <Container>
      <UsersListMessage>User Chat List:</UsersListMessage>
      {myFriends.map((user: OtherUser) => (
        <OtherFriend key={user.uid} user={user} />
      ))}
      {myFriends.length === 0 && (
        <UsersListMessage>Loading users...</UsersListMessage>
      )}
    </Container>
  );
};

export default UsersList;
