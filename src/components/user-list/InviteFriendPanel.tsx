import React, { ChangeEvent, FormEvent, useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  Container,
  ClosePanelHeader,
  InviteFriendForm,
  SearchButtonContainer,
  SearchResultContainer,
  FoundUserContainer,
} from './InviteFriendPanel.styles';
import {
  TextField,
  IconButton,
  Typography,
  CircularProgress,
  Collapse,
  Button,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { getDocs, query, collection, where } from 'firebase/firestore';
import { firestoreDB } from 'firebaseConfig';
import { OtherUser } from 'types';

interface Props {
  toggleOpenInvitePanel: VoidFunction;
}

const InviteFriendPanel: React.FC<Props> = ({ toggleOpenInvitePanel }) => {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [foundUser, setFoundUser] = useState<OtherUser | null>(null);
  const [showSearchResult, setShowSearchResult] = useState(false);
  const [searchUserError, setSearchUserError] = useState('');
  const [isSearchingUser, setIsSearchingUser] = useState(false);

  const onSearchFriend = async (e: FormEvent) => {
    e.preventDefault();

    const trimmedEmail = enteredEmail.trim();

    if (!trimmedEmail.length) {
      return;
    }

    setIsSearchingUser(true);

    try {
      const queriedUsers: OtherUser[] = [];

      const querySnapshot = await getDocs(
        query(
          collection(firestoreDB, 'users'),
          where('email', '==', enteredEmail)
        )
      );

      querySnapshot.forEach((doc) => {
        const { createdAt, ...rest } = doc.data();
        queriedUsers.push(rest as OtherUser);
      });

      if (queriedUsers.length > 0) {
        setFoundUser(queriedUsers[0]);
        setSearchUserError('');
      } else {
        setSearchUserError(
          'User does not exist. Is the email address correct?'
        );
      }

      setShowSearchResult(true);
      setIsSearchingUser(false);
    } catch (e) {
      console.log('Error searching for user: ', e);
    }
  };

  const onEmailEntered = (e: ChangeEvent<HTMLInputElement>) => {
    setShowSearchResult(false);
    setEnteredEmail(e.target.value);
  };

  return (
    <Container>
      <ClosePanelHeader>
        <IconButton onClick={toggleOpenInvitePanel} edge='start'>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant='h6'>Add a friend</Typography>
      </ClosePanelHeader>
      <Typography sx={{ mt: 2 }}>
        Send a chat invite to any registered user by entering their email
        address:
      </Typography>
      <InviteFriendForm onSubmit={onSearchFriend}>
        <TextField
          label={`Friend's email address`}
          variant='outlined'
          size='small'
          fullWidth
          onChange={onEmailEntered}
          value={enteredEmail}
          error={!!searchUserError}
          disabled={isSearchingUser}
        />
        <SearchButtonContainer>
          {isSearchingUser ? (
            <CircularProgress size={20} />
          ) : (
            <IconButton type='submit'>
              <SearchIcon />
            </IconButton>
          )}
        </SearchButtonContainer>
      </InviteFriendForm>
      <Collapse in={showSearchResult}>
        <SearchResultContainer>
          {searchUserError ? (
            <Typography variant='caption' sx={{ color: '#D32F2F' }}>
              {searchUserError}
            </Typography>
          ) : (
            <>
              <FoundUserContainer>
                <Typography noWrap>{foundUser?.name}</Typography>
              </FoundUserContainer>
              <Button size='small' variant='outlined'>
                Invite
              </Button>
            </>
          )}
        </SearchResultContainer>
      </Collapse>
      {/* Collapse component that expands to show search result including user details like name */}
    </Container>
  );
};

export default InviteFriendPanel;
