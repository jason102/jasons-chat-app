import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ClosePanelHeader } from './InviteFriendPanel.styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  TextField,
  IconButton,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';

interface Props {
  toggleOpenInvitePanel: VoidFunction;
}

const InviteFriendPanel: React.FC<Props> = ({ toggleOpenInvitePanel }) => {
  return (
    <>
      <ClosePanelHeader>
        <IconButton onClick={toggleOpenInvitePanel} edge='start'>
          <ArrowBackIcon />
        </IconButton>
        <Typography id='modal-modal-title' variant='h6' component='h2'>
          Add a friend
        </Typography>
      </ClosePanelHeader>
      <Typography id='modal-modal-description' sx={{ mt: 2 }}>
        Send a chat invite to any registered user by entering their email
        address:
      </Typography>
      <TextField
        sx={{ mt: 1 }}
        label='Search conversations'
        variant='outlined'
        size='small'
        fullWidth
      />
      <Accordion
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel2a-content'
          id='panel2a-header'
        >
          <Typography>Friend requests</Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            display: 'flex',
            flex: 1,
            flexDirection: 'column',
            maxHeight: '200px',
            overflowY: 'auto',
          }}
        >
          <Typography>Friend invite 1</Typography>
          <Typography>Friend invite 2</Typography>
          <Typography>Friend invite 3</Typography>
          <Typography>Friend invite 4</Typography>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default InviteFriendPanel;
