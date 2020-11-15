import firebase from 'firebase';
import { Score } from './score';

export type Project = {
  id?: string;
  title: string;
  description: string | null;
  scoreIds: string[];
  scores: Score[];
  createdAt: firebase.firestore.Timestamp | null;
  updatedAt: firebase.firestore.Timestamp | null;
};

export const blankProject: Project = {
  title: '',
  description: null,
  scoreIds: [],
  scores: [],
  createdAt: null,
  updatedAt: null,
};
