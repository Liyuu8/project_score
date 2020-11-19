import firebase from 'firebase';
import { Finding } from './finding';

export type Note = {
  id?: string;
  title: string;
  type: string;
  posX: number;
  posY: number;
  findingIds: string[];
  findings: Finding[];
  createdAt: firebase.firestore.Timestamp | null;
  updatedAt: firebase.firestore.Timestamp | null;
};

export const blankNote: Note = {
  title: '',
  type: '',
  posX: 0,
  posY: 0,
  findingIds: [],
  findings: [],
  createdAt: null,
  updatedAt: null,
};
