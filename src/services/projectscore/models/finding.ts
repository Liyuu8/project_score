import firebase from 'firebase';

export type Finding = {
  id?: string;
  title: string;
  isGood: boolean;
  createdAt: firebase.firestore.Timestamp | null;
  updatedAt: firebase.firestore.Timestamp | null;
};

export const blankFinding: Finding = {
  title: '',
  isGood: true,
  createdAt: null,
  updatedAt: null,
};
