import { useCollectionData } from 'react-firebase-hooks/firestore';

import { collectionName } from 'services/projectscore/constants';
import { NoteConnection } from 'services/projectscore/models/connection';
import { db } from 'utils/firebase';
import { ProjectHooks } from '..';

const useConnections: ProjectHooks['useConnections'] = (projectId, scoreId) => {
  const [connections, connectionLoading, error] = useCollectionData<
    NoteConnection
  >(
    db
      .collection(collectionName.projects)
      .doc(projectId)
      .collection(collectionName.scores)
      .doc(scoreId)
      .collection(collectionName.connections),
    {
      idField: 'id',
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  return { connections: connections ?? [], connectionLoading, error };
};

export default useConnections;
