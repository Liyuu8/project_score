import { useCallback } from 'react';
import firebase from 'firebase';
import { v4 as uuid } from 'uuid';

import { collectionName } from 'services/projectscore/constants';
import { Memo } from 'services/projectscore/models/memo';
import { db } from 'utils/firebase';
import { ProjectHooks } from '..';

const useMemoAction: ProjectHooks['useMemoAction'] = () => {
  const addMemo = useCallback(
    async (projectId: string, scoreId: string, content: string) => {
      try {
        if (!content) {
          return;
        }
        const newMemo = {
          id: uuid(),
          content,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        };
        await db
          .collection(collectionName.projects)
          .doc(projectId)
          .collection(collectionName.scores)
          .doc(scoreId)
          .collection(collectionName.memos)
          .doc(newMemo.id)
          .set(newMemo);
      } catch (e) {
        console.log(e);
      }
    },
    []
  );

  const updateMemo = useCallback(
    async (projectId: string, scoreId: string, updatedMemo: Memo) => {
      try {
        const memoDoc = await db
          .collection(collectionName.projects)
          .doc(projectId)
          .collection(collectionName.scores)
          .doc(scoreId)
          .collection(collectionName.memos)
          .doc(updatedMemo.id);

        if (updatedMemo.content) {
          const newMemo = {
            ...updatedMemo,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
          };
          memoDoc.set(newMemo);
        } else {
          memoDoc.delete();
        }
      } catch (e) {
        console.log(e);
      }
    },
    []
  );

  const deleteMemo = useCallback(
    async (projectId: string, scoreId: string, memoId: string) => {
      await db
        .collection(collectionName.projects)
        .doc(projectId)
        .collection(collectionName.scores)
        .doc(scoreId)
        .collection(collectionName.memos)
        .doc(memoId)
        .delete();
    },
    []
  );

  return { addMemo, updateMemo, deleteMemo };
};

export default useMemoAction;
