import styled from 'styled-components';

export const ClosePanelHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Container = styled.div`
  padding-right: 10px;
`;

export const InviteFriendForm = styled.form`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-top: 10px;
`;

export const SearchButtonContainer = styled.div`
  width: 47px;
  display: flex;
  justify-content: center;
`;

export const SearchResultContainer = styled.div`
  display: flex;
  padding-top: 10px;
`;

export const FoundUserContainer = styled.div`
  display: flex;
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-right: 5px;
  align-self: center;
`;
