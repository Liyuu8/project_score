import firebase from 'firebase';

export type User = {
  id: string;
  inAppUserId: string;
  displayName: string | null;
  inAppUserName: string;
  email: string;
  bio: string;
  photoUrl: string | null;
  provider: string;
  createdAt: firebase.firestore.Timestamp | null;
  updatedAt: firebase.firestore.Timestamp | null;
};

export const blankUser: User = {
  id: '',
  inAppUserId: '',
  displayName: null,
  inAppUserName: '',
  email: '',
  bio: '',
  photoUrl: null,
  provider: 'google',
  createdAt: null,
  updatedAt: null,
};
