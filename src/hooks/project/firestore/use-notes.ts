import { useCollectionData } from 'react-firebase-hooks/firestore';

import { collectionName } from 'services/projectscore/constants';
import { Note } from 'services/projectscore/models/note';
import { db } from 'utils/firebase';
import { ProjectHooks } from '..';

const useNotes: ProjectHooks['useNotes'] = (projectId, scoreId) => {
  const [notes, loading, error] = useCollectionData<Note>(
    db
      .collection(collectionName.projects)
      .doc(projectId)
      .collection(collectionName.scores)
      .doc(scoreId)
      .collection(collectionName.notes),
    {
      idField: 'id',
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  return { notes: notes ?? [], loading, error };
};

export default useNotes;
