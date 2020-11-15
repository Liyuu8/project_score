import firebase from 'firebase';
import { Note } from './note';

export type Score = {
  id?: string;
  title: string;
  stage: number;
  member: string;
  budget: string;
  leadTime: string;
  quality: string;
  businessModel: string;
  surroundings: string;
  competitor: string;
  enemy: string;
  noteIds: string[];
  notes: Note[];
  memo: string;
  createdAt: firebase.firestore.Timestamp | null;
  updatedAt: firebase.firestore.Timestamp | null;
};

export const blankScore: Score = {
  title: '',
  stage: 0,
  member: '',
  budget: '',
  leadTime: '',
  quality: '',
  businessModel: '',
  surroundings: '',
  competitor: '',
  enemy: '',
  noteIds: [],
  notes: [],
  memo: '',
  createdAt: null,
  updatedAt: null,
};
