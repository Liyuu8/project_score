import firebase from 'firebase';

export type Score = {
  id: string;
  title: string;
  index: number; // ステージ項番
  createdAt: firebase.firestore.Timestamp | null;
  updatedAt: firebase.firestore.Timestamp | null;
};

export const blankScore: Score = {
  id: '',
  title: 'Stage 1',
  index: 1,
  createdAt: null,
  updatedAt: null,
};
