import { useCollectionData } from 'react-firebase-hooks/firestore';

import { collectionName } from 'services/projectscore/constants';
import { NoteConnection } from 'services/projectscore/models/connection';
import { db } from 'utils/firebase';
import { ProjectHooks } from '..';

const useConnections: ProjectHooks['useConnections'] = (
  projectId,
  scoreId,
  isPublic,
  authorId
) => {
  const collectionRef = db
    .collection(collectionName.projects)
    .doc(projectId)
    .collection(collectionName.scores)
    .doc(scoreId)
    .collection(collectionName.connections);
  const [connections, connectionLoading, error] = useCollectionData<
    NoteConnection
  >(
    isPublic
      ? collectionRef.where('isPublic', '==', true)
      : collectionRef.where('authorId', '==', authorId),
    {
      idField: 'id',
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  return { connections: connections ?? [], connectionLoading, error };
};

export default useConnections;
