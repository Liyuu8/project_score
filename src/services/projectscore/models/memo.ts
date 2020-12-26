import firebase from 'firebase';

export type Memo = {
  id: string;
  content: string;
  createdAt: firebase.firestore.Timestamp | null;
  updatedAt: firebase.firestore.Timestamp | null;
};

export const blankMemo: Memo = {
  id: '',
  content: '',
  createdAt: null,
  updatedAt: null,
};
