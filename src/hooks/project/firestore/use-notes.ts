import { useCollectionData } from 'react-firebase-hooks/firestore';

import { collectionName } from 'services/projectscore/constants';
import { Note } from 'services/projectscore/models/note';
import { db } from 'utils/firebase';
import { ProjectHooks } from '..';

const useNotes: ProjectHooks['useNotes'] = (projectId, scoreId) => {
  const [notes, noteLoading, error] = useCollectionData<Note>(
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

  return { notes: notes ?? [], noteLoading, error };
};

export default useNotes;
