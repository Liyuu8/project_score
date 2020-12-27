import { useCollectionData } from 'react-firebase-hooks/firestore';

import { collectionName } from 'services/projectscore/constants';
import { Score } from 'services/projectscore/models/score';
import { db } from 'utils/firebase';
import { ProjectHooks } from '..';

const useScores: ProjectHooks['useScores'] = (projectId) => {
  const [scores, loading, error] = useCollectionData<Score>(
    db
      .collection(collectionName.projects)
      .doc(projectId)
      .collection(collectionName.scores)
      .orderBy('index', 'asc'),
    {
      idField: 'id',
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  return { scores: scores ?? [], loading, error };
};

export default useScores;
