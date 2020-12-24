import firebase from 'firebase';

export type Project = {
  id: string;
  title: string;
  description: string | null;
  createdAt: firebase.firestore.Timestamp | null;
  updatedAt: firebase.firestore.Timestamp | null;
};

export const blankProject: Project = {
  id: '',
  title: '',
  description: null,
  createdAt: null,
  updatedAt: null,
};
