import { useCallback } from 'react';
import firebase from 'firebase';
import { v4 as uuid } from 'uuid';

import { collectionName } from 'services/projectscore/constants';
import { Score } from 'services/projectscore/models/score';
import {
  blankNote,
  initialNoteElementList,
  Note,
} from 'services/projectscore/models/note';
import { blankMemo } from 'services/projectscore/models/memo';
import {
  blankPlot,
  Plot,
  plotTypeList,
} from 'services/projectscore/models/plot';
import {
  blankConnection,
  initialConnectionElementList,
  NoteConnection,
} from 'services/projectscore/models/connection';
import { db } from 'utils/firebase';
import { ProjectHooks } from '..';

const useScoreDataAction: ProjectHooks['useScoreDataAction'] = () => {
  const addScoreDataFromExisiting = useCallback(
    async (projectId: string, title: string) => {
      if (!title) {
        return;
      }

      try {
        const projectDoc = db
          .collection(collectionName.projects)
          .doc(projectId);

        const lastScoreSnap = await projectDoc
          .collection(collectionName.scores)
          .orderBy('index', 'desc')
          .limit(1)
          .get();
        const lastScore = lastScoreSnap.docs.map(
          (doc) => doc.data() as Score
        )[0];

        const newScore = {
          ...lastScore,
          id: uuid(),
          title,
          index: lastScore.index + 1,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        };
        const newScoreDoc = projectDoc
          .collection(collectionName.scores)
          .doc(newScore.id);
        await newScoreDoc.set(newScore);

        const lastScoreDoc = projectDoc
          .collection(collectionName.scores)
          .doc(lastScore.id);

        // Not copy last memos

        // Copy last plots

        const lastScorePlotSnap = await lastScoreDoc
          .collection(collectionName.plots)
          .get();
        const lastScorePlotList = lastScorePlotSnap.docs.map(
          (doc) => doc.data() as Plot
        );

        const newPlots = lastScorePlotList.map((plot) => ({
          ...plot,
          id: uuid(),
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        }));
        await Promise.all(
          newPlots.map(async (newPlot) => {
            await newScoreDoc
              .collection(collectionName.plots)
              .doc(newPlot.id)
              .set(newPlot);
          })
        );

        // Copy last notes

        const lastScoreNoteSnap = await lastScoreDoc
          .collection(collectionName.notes)
          .get();
        const lastScoreNoteList = lastScoreNoteSnap.docs.map(
          (doc) => doc.data() as Note
        );

        const newNotes = lastScoreNoteList.map((note) => ({
          ...note,
          id: uuid(),
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        }));
        await Promise.all(
          newNotes.map(async (newNote) => {
            await newScoreDoc
              .collection(collectionName.notes)
              .doc(newNote.id)
              .set(newNote);
          })
        );

        // Copy last connections

        const lastScoreNoteConnectionSnap = await lastScoreDoc
          .collection(collectionName.connections)
          .get();
        const lastScoreNoteConnectionList = lastScoreNoteConnectionSnap.docs.map(
          (doc) => doc.data() as NoteConnection
        );

        const newConnections = lastScoreNoteConnectionList.map((connection) => {
          const sourseNoteIndex = lastScoreNoteList.findIndex(
            (lastScoreNote) => lastScoreNote.id === connection.sourceNoteId
          );
          const targetNoteIndex = lastScoreNoteList.findIndex(
            (lastScoreNote) => lastScoreNote.id === connection.targetNoteId
          );

          return {
            ...connection,
            id: uuid(),
            sourceNoteId: newNotes[sourseNoteIndex].id,
            targetNoteId: newNotes[targetNoteIndex].id,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
          };
        });
        await Promise.all(
          newConnections.map(async (newConnection) => {
            await newScoreDoc
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

  const addScoreDataFromScratch = useCallback(
    async (projectId: string, title: string) => {
      if (!title) {
        return;
      }

      try {
        const projectDoc = db
          .collection(collectionName.projects)
          .doc(projectId);

        const lastScoreSnap = await projectDoc
          .collection(collectionName.scores)
          .orderBy('index', 'desc')
          .limit(1)
          .get();
        const lastScore = lastScoreSnap.docs.map(
          (doc) => doc.data() as Score
        )[0];

        const newScore = {
          ...lastScore,
          id: uuid(),
          title,
          index: lastScore.index + 1,
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

        const newPlots = plotTypeList.map((plotType, index) => ({
          ...blankPlot,
          id: uuid(),
          type: plotType,
          index,
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

  return { addScoreDataFromExisiting, addScoreDataFromScratch };
};

export default useScoreDataAction;
