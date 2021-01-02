import { useCollectionData } from 'react-firebase-hooks/firestore';

import { collectionName } from 'services/projectscore/constants';
import { Finding } from 'services/projectscore/models/finding';
import { db } from 'utils/firebase';
import { ProjectHooks } from '..';

const useFindings: ProjectHooks['useFindings'] = (
  projectId,
  scoreId,
  noteId,
  isPublic,
  authorId
) => {
  const findingRef = db
    .collection(collectionName.projects)
    .doc(projectId)
    .collection(collectionName.scores)
    .doc(scoreId)
    .collection(collectionName.notes)
    .doc(noteId)
    .collection(collectionName.findings);
  const [findings, loading, error] = useCollectionData<Finding>(
    isPublic
      ? findingRef.where('isPublic', '==', true)
      : findingRef.where('authorId', '==', authorId),
    {
      idField: 'id',
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  return { findings: findings ?? [], loading, error };
};

export default useFindings;
