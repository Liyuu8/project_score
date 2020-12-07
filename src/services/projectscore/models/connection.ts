import firebase from 'firebase';

export type NoteConnection = {
  id: string;
  sourceNoteId: string;
  targetNoteId: string;
  createdAt: firebase.firestore.Timestamp | null;
  updatedAt: firebase.firestore.Timestamp | null;
};

export const blankConnection: NoteConnection = {
  id: '',
  sourceNoteId: '',
  targetNoteId: '',
  createdAt: null,
  updatedAt: null,
};
