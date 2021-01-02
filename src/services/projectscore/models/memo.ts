import firebase from 'firebase';

export type Memo = {
  id: string;
  content: string;
  authorId: string;
  isPublic: boolean;
  createdAt: firebase.firestore.Timestamp | null;
  updatedAt: firebase.firestore.Timestamp | null;
};

export const blankMemo: Memo = {
  id: '',
  content: '',
  authorId: '',
  isPublic: false,
  createdAt: null,
  updatedAt: null,
};
