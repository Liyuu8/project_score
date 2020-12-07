import firebase from 'firebase';

import { noteElements } from '../constants';

export type Note = {
  id: string;
  content: string;
  type: keyof typeof noteElements;
  posX: number;
  posY: number;
  createdAt: firebase.firestore.Timestamp | null;
  updatedAt: firebase.firestore.Timestamp | null;
};

export const blankNote: Note = {
  id: '',
  content: '',
  type: 'measure',
  posX: 0,
  posY: 0,
  createdAt: null,
  updatedAt: null,
};
