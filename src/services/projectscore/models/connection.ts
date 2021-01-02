import firebase from 'firebase';

export type NoteConnection = {
  id: string;
  sourceNoteId: string;
  targetNoteId: string;
  authorId: string;
  isPublic: boolean;
  createdAt: firebase.firestore.Timestamp | null;
  updatedAt: firebase.firestore.Timestamp | null;
};

export const blankConnection: NoteConnection = {
  id: '',
  sourceNoteId: '',
  targetNoteId: '',
  authorId: '',
  isPublic: false,
  createdAt: null,
  updatedAt: null,
};

export const initialConnectionElementList = [
  { source: 0, target: 2 },
  { source: 2, target: 3 },
];
