import firebase from 'firebase';

export type Project = {
  id: string;
  title: string;
  description: string;
  authorId: string;
  isPublic: boolean;
  createdAt: firebase.firestore.Timestamp | null;
  updatedAt: firebase.firestore.Timestamp | null;
};

export const blankProject: Project = {
  id: '',
  title: '',
  description: '',
  authorId: '',
  isPublic: false,
  createdAt: null,
  updatedAt: null,
};
