import { useCallback } from 'react';
import firebase from 'firebase';
import { v4 as uuid } from 'uuid';

import { collectionName } from 'services/projectscore/constants';
import { Finding } from 'services/projectscore/models/finding';
import { db } from 'utils/firebase';
import { ProjectHooks } from '..';

const useFindingAction: ProjectHooks['useFindingAction'] = () => {
  const addFinding = useCallback(
    async (
      projectId: string,
      scoreId: string,
      noteId: string,
      content: string,
      isGood: boolean
    ) => {
      try {
        const newFinding = {
          id: uuid(),
          content,
          isGood,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        };
        await db
          .collection(collectionName.projects)
          .doc(projectId)
          .collection(collectionName.scores)
          .doc(scoreId)
          .collection(collectionName.notes)
          .doc(noteId)
          .collection(collectionName.findings)
          .doc(newFinding.id)
          .set(newFinding);
      } catch (e) {
        console.log(e);
      }
    },
    []
  );

  const updateFinding = useCallback(
    async (
      projectId: string,
      scoreId: string,
      noteId: string,
      updatedFinding: Finding
    ) => {
      if (!updatedFinding.content) {
        return;
      }

      try {
        const newFinding = {
          ...updatedFinding,
          updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        };
        await db
          .collection(collectionName.projects)
          .doc(projectId)
          .collection(collectionName.scores)
          .doc(scoreId)
          .collection(collectionName.notes)
          .doc(noteId)
          .collection(collectionName.findings)
          .doc(newFinding.id)
          .set(newFinding);
      } catch (e) {
        console.log(e);
      }
    },
    []
  );

  const deleteFinding = useCallback(
    async (
      projectId: string,
      scoreId: string,
      noteId: string,
      findingId: string
    ) => {
      await db
        .collection(collectionName.projects)
        .doc(projectId)
        .collection(collectionName.scores)
        .doc(scoreId)
        .collection(collectionName.notes)
        .doc(noteId)
        .collection(collectionName.findings)
        .doc(findingId)
        .delete();
    },
    []
  );

  return { addFinding, updateFinding, deleteFinding };
};

export default useFindingAction;
