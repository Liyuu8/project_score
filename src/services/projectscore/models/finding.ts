import firebase from 'firebase';

export type Finding = {
  id: string;
  content: string;
  isGood: boolean;
  authorId: string;
  isPublic: boolean;
  createdAt: firebase.firestore.Timestamp | null;
  updatedAt: firebase.firestore.Timestamp | null;
};

export const blankFinding: Finding = {
  id: '',
  content: '',
  isGood: true,
  authorId: '',
  isPublic: false,
  createdAt: null,
  updatedAt: null,
};
