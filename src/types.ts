type UserId = string;

export interface OtherUser {
  uid: UserId;
  email: string;
  name: string;
}

export interface Message {
  from: UserId;
  to: UserId;
  text: string;
}
