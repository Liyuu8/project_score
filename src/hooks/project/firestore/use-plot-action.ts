import { useCallback } from 'react';
import firebase from 'firebase';

import { collectionName } from 'services/projectscore/constants';
import { Plot } from 'services/projectscore/models/plot';
import { db } from 'utils/firebase';
import { ProjectHooks } from '..';

const usePlotAction: ProjectHooks['usePlotAction'] = () => {
  const updatePlot = useCallback(
    async (projectId: string, scoreId: string, updatedPlot: Plot) => {
      try {
        const newPlot = {
          ...updatedPlot,
          updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        };
        await db
          .collection(collectionName.projects)
          .doc(projectId)
          .collection(collectionName.scores)
          .doc(scoreId)
          .collection(collectionName.plots)
          .doc(newPlot.id)
          .set(newPlot);
      } catch (e) {
        console.log(e);
      }
    },
    []
  );

  return { updatePlot };
};

export default usePlotAction;
