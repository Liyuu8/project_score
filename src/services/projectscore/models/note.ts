import firebase from 'firebase';

export type Note = {
  id?: string;
  title: string;
  type: string;
  posX: number;
  posY: number;
  comment: string;
  createdAt: firebase.firestore.Timestamp | null;
  updatedAt: firebase.firestore.Timestamp | null;
};

export const blankNote: Note = {
  title: '',
  type: '',
  posX: 0,
  posY: 0,
  comment: '',
  createdAt: null,
  updatedAt: null,
};
