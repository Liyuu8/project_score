import { useCallback } from 'react';
import firebase from 'firebase';

import { collectionName } from 'services/projectscore/constants';
import { Score } from 'services/projectscore/models/score';
import { db } from 'utils/firebase';
import { ProjectHooks } from '..';

const useScoreAction: ProjectHooks['useScoreAction'] = () => {
  // TODO: 動作確認
  const updateScore = useCallback(
    async (projectId: string, updatedScore: Score) => {
      try {
        const projectDoc = db
          .collection(collectionName.projects)
          .doc(projectId);

        const newScore = {
          ...updatedScore,
          updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        };
        const scoreDoc = projectDoc
          .collection(collectionName.scores)
          .doc(newScore.id);
        await scoreDoc.set(newScore);
      } catch (e) {
        console.log(e);
      }
    },
    []
  );

  return { updateScore };
};

export default useScoreAction;
