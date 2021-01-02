import { useCollectionData } from 'react-firebase-hooks/firestore';

import { collectionName } from 'services/projectscore/constants';
import { Plot } from 'services/projectscore/models/plot';
import { db } from 'utils/firebase';
import { ProjectHooks } from '..';

const usePlots: ProjectHooks['usePlots'] = (
  projectId,
  scoreId,
  isPublic,
  authorId
) => {
  const plotRef = db
    .collection(collectionName.projects)
    .doc(projectId)
    .collection(collectionName.scores)
    .doc(scoreId)
    .collection(collectionName.plots)
    .orderBy('index', 'asc');
  const [plots, loading, error] = useCollectionData<Plot>(
    isPublic
      ? plotRef.where('isPublic', '==', true)
      : plotRef.where('authorId', '==', authorId),
    {
      idField: 'id',
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  return { plots: plots ?? [], loading, error };
};

export default usePlots;
