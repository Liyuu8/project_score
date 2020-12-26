import { useCollectionData } from 'react-firebase-hooks/firestore';

import { collectionName } from 'services/projectscore/constants';
import { blankMemo, Memo } from 'services/projectscore/models/memo';
import { db } from 'utils/firebase';
import { ProjectHooks } from '..';

const useMemos: ProjectHooks['useMemos'] = (projectId, scoreId) => {
  const [memos, loading, error] = useCollectionData<Memo>(
    db
      .collection(collectionName.projects)
      .doc(projectId)
      .collection(collectionName.scores)
      .doc(scoreId)
      .collection(collectionName.memos),
    {
      idField: 'id',
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  return { memos: memos ?? [blankMemo], loading, error };
};

export default useMemos;
