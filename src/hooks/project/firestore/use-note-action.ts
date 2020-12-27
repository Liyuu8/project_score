import { useCallback } from 'react';
import firebase from 'firebase';
import { v4 as uuid } from 'uuid';

import { collectionName } from 'services/projectscore/constants';
import { Note, noteElements } from 'services/projectscore/models/note';
import { db } from 'utils/firebase';
import { ProjectHooks } from '..';

const useNoteAction: ProjectHooks['useNoteAction'] = () => {
  const addNote = useCallback(
    async (
      projectId: string,
      scoreId: string,
      content: string,
      type: keyof typeof noteElements
    ) => {
      try {
        const newNote = {
          id: uuid(),
          content,
          type,
          posX: noteElements[type].posX,
          posY: noteElements[type].posY,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        };
        await db
          .collection(collectionName.projects)
          .doc(projectId)
          .collection(collectionName.scores)
          .doc(scoreId)
          .collection(collectionName.notes)
          .doc(newNote.id)
          .set(newNote);
      } catch (e) {
        console.log(e);
      }
    },
    []
  );

  const updateNote = useCallback(
    async (projectId: string, scoreId: string, updatedNote: Note) => {
      try {
        const newNote = {
          ...updatedNote,
          updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        };
        await db
          .collection(collectionName.projects)
          .doc(projectId)
          .collection(collectionName.scores)
          .doc(scoreId)
          .collection(collectionName.notes)
          .doc(newNote.id)
          .set(newNote);
      } catch (e) {
        console.log(e);
      }
    },
    []
  );

  // TODO: サブコレクションの削除
  const deleteNote = useCallback(
    async (projectId: string, scoreId: string, noteId: string) => {
      await db
        .collection(collectionName.projects)
        .doc(projectId)
        .collection(collectionName.scores)
        .doc(scoreId)
        .collection(collectionName.notes)
        .doc(noteId)
        .delete();
    },
    []
  );

  return { addNote, updateNote, deleteNote };
};

export default useNoteAction;
