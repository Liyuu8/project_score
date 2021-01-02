import { useCallback } from 'react';
import firebase from 'firebase';
import { v4 as uuid } from 'uuid';

import { collectionName } from 'services/projectscore/constants';
import { blankConnection } from 'services/projectscore/models/connection';
import { db } from 'utils/firebase';
import { ProjectHooks } from '..';

const useConnectionAction: ProjectHooks['useConnectionAction'] = () => {
  const addConnection = useCallback(
    async (
      projectId: string,
      scoreId: string,
      source: string,
      target: string,
      authorId: string,
      isPublic: boolean
    ) => {
      try {
        const newConnection = {
          ...blankConnection,
          id: uuid(),
          sourceNoteId: source,
          targetNoteId: target,
          authorId,
          isPublic,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        };
        await db
          .collection(collectionName.projects)
          .doc(projectId)
          .collection(collectionName.scores)
          .doc(scoreId)
          .collection(collectionName.connections)
          .doc(newConnection.id)
          .set(newConnection);
      } catch (e) {
        console.log(e);
      }
    },
    []
  );

  const deleteConnection = useCallback(
    async (projectId: string, scoreId: string, connectionId: string) => {
      try {
        await db
          .collection(collectionName.projects)
          .doc(projectId)
          .collection(collectionName.scores)
          .doc(scoreId)
          .collection(collectionName.connections)
          .doc(connectionId)
          .delete();
      } catch (e) {
        console.log(e);
      }
    },
    []
  );

  return { addConnection, deleteConnection };
};

export default useConnectionAction;
