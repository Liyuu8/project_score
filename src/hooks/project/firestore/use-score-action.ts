import { useCallback } from 'react';
import firebase from 'firebase';

import { collectionName } from 'services/projectscore/constants';
import { Score } from 'services/projectscore/models/score';
import { db } from 'utils/firebase';
import { ProjectHooks } from '..';

const useScoreAction: ProjectHooks['useScoreAction'] = () => {
  const updateScore = useCallback(
    async (projectId: string, updatedScore: Score) => {
      try {
        await db
          .collection(collectionName.projects)
          .doc(projectId)
          .collection(collectionName.scores)
          .doc(updatedScore.id)
          .set({
            ...updatedScore,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
          });
      } catch (e) {
        console.log(e);
      }
    },
    []
  );

  // TODO: サブコレクションの削除
  const deleteScore = useCallback(
    async (projectId: string, scoreId: string, deletedIndex: number) => {
      try {
        const scoreDocs = db
          .collection(collectionName.projects)
          .doc(projectId)
          .collection(collectionName.scores);

        await scoreDocs.doc(scoreId).delete();

        const updatedTargetScoreSnap = await scoreDocs
          .where('index', '>', deletedIndex)
          .get();
        const updateTargetScores = updatedTargetScoreSnap.docs.map(
          (doc) => doc.data() as Score
        );

        await Promise.all(
          updateTargetScores.map(async (score) => {
            await scoreDocs.doc(score.id).update({ index: score.index - 1 });
          })
        );
      } catch (e) {
        console.log(e);
      }
    },
    []
  );

  return { updateScore, deleteScore };
};

export default useScoreAction;
