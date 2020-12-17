import { useCallback } from 'react';
import firebase from 'firebase';
import { v4 as uuid } from 'uuid';

import { collectionName } from 'services/projectscore/constants';
import { blankProject } from 'services/projectscore/models/project';
import { blankScore } from 'services/projectscore/models/score';
import { blankNote } from 'services/projectscore/models/note';
import { blankConnection } from 'services/projectscore/models/connection';
import { db } from 'utils/firebase';
import { ProjectHooks } from '..';

const useProjectScoreAction: ProjectHooks['useProjectScoreAction'] = () => {
  const addProjectScore = useCallback(
    async (projectId: string, title: string, description: string) => {
      if (!title) {
        return;
      }

      try {
        const projectDoc = db
          .collection(collectionName.projects)
          .doc(projectId);
        const newProject = {
          ...blankProject,
          id: projectId,
          title,
          description,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        };
        await projectDoc.set(newProject);

        const newScore = {
          ...blankScore,
          id: uuid(),
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        };
        const scoreDoc = projectDoc
          .collection(collectionName.scores)
          .doc(newScore.id);
        await scoreDoc.set(newScore);

        const initialNoteInfoList = [
          {
            type: 'measure',
            posX: 50,
            posY: 25,
          },
          {
            type: 'measure',
            posX: 50,
            posY: 250,
          },
          {
            type: 'intermediateObjective',
            posX: 450,
            posY: 25,
          },
          {
            type: 'victoryCondition',
            posX: 850,
            posY: 25,
          },
          {
            type: 'acquisitionGoal',
            posX: 850,
            posY: 340,
          },
        ];
        const newNotes = initialNoteInfoList.map((noteInfo) => ({
          ...blankNote,
          ...noteInfo,
          id: uuid(),
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        }));
        await Promise.all(
          newNotes.map(async (newNote) => {
            await scoreDoc
              .collection(collectionName.notes)
              .doc(newNote.id)
              .set(newNote);
          })
        );
        const initialConnectionInfoList = [
          { source: 0, target: 2 },
          { source: 2, target: 3 },
        ];
        const newConnections = initialConnectionInfoList.map((info) => ({
          ...blankConnection,
          id: uuid(),
          sourceNoteId: newNotes[info.source].id,
          targetNoteId: newNotes[info.target].id,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        }));
        await Promise.all(
          newConnections.map(async (newConnection) => {
            await scoreDoc
              .collection(collectionName.connections)
              .doc(newConnection.id)
              .set(newConnection);
          })
        );
      } catch (e) {
        console.log(e);
      }
    },
    []
  );

  const deleteProjectScore = useCallback(async (id: string) => {
    await db.collection(collectionName.projects).doc(id).delete();
  }, []);

  return { addProjectScore, deleteProjectScore };
};

export default useProjectScoreAction;
