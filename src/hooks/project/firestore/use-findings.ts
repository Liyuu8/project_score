import { useCollectionData } from 'react-firebase-hooks/firestore';

import { collectionName } from 'services/projectscore/constants';
import { Finding } from 'services/projectscore/models/finding';
import { db } from 'utils/firebase';
import { ProjectHooks } from '..';

const useFindings: ProjectHooks['useFindings'] = (
  projectId,
  scoreId,
  noteId
) => {
  const [findings, loading, error] = useCollectionData<Finding>(
    db
      .collection(collectionName.projects)
      .doc(projectId)
      .collection(collectionName.scores)
      .doc(scoreId)
      .collection(collectionName.notes)
      .doc(noteId)
      .collection(collectionName.findings),
    {
      idField: 'id',
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  return { findings: findings ?? [], loading, error };
};

export default useFindings;
