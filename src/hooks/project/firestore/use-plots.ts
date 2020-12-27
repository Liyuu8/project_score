import { useCollectionData } from 'react-firebase-hooks/firestore';

import { collectionName } from 'services/projectscore/constants';
import { Plot } from 'services/projectscore/models/plot';
import { db } from 'utils/firebase';
import { ProjectHooks } from '..';

const usePlots: ProjectHooks['usePlots'] = (projectId, scoreId) => {
  const [plots, loading, error] = useCollectionData<Plot>(
    db
      .collection(collectionName.projects)
      .doc(projectId)
      .collection(collectionName.scores)
      .doc(scoreId)
      .collection(collectionName.plots)
      .orderBy('index', 'asc'),
    {
      idField: 'id',
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  return { plots: plots ?? [], loading, error };
};

export default usePlots;
