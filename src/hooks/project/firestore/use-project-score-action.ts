import { useCallback } from 'react';
import firebase from 'firebase';
import { v4 as uuid } from 'uuid';

import { collectionName } from 'services/projectscore/constants';
import { blankProject } from 'services/projectscore/models/project';
import { blankScore } from 'services/projectscore/models/score';
import { blankMemo } from 'services/projectscore/models/memo';
import { blankPlot, plotTypeList } from 'services/projectscore/models/plot';
import {
  blankNote,
  initialNoteElementList,
} from 'services/projectscore/models/note';
import {
  blankConnection,
  initialConnectionElementList,
} from 'services/projectscore/models/connection';
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

        const newMemo = {
          ...blankMemo,
          id: uuid(),
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        };
        await scoreDoc
          .collection(collectionName.memos)
          .doc(newMemo.id)
          .set(newMemo);

        const newPlots = plotTypeList.map((plotType) => ({
          ...blankPlot,
          id: uuid(),
          type: plotType,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        }));
        await Promise.all(
          newPlots.map(async (newPlot) => {
            await scoreDoc
              .collection(collectionName.plots)
              .doc(newPlot.id)
              .set(newPlot);
          })
        );

        const newNotes = initialNoteElementList.map((initElement) => ({
          ...blankNote,
          ...initElement,
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

        const newConnections = initialConnectionElementList.map(
          (initElement) => ({
            ...blankConnection,
            id: uuid(),
            sourceNoteId: newNotes[initElement.source].id,
            targetNoteId: newNotes[initElement.target].id,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
          })
        );
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

  return { addProjectScore };
};

export default useProjectScoreAction;
