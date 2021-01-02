import { useDocumentData } from 'react-firebase-hooks/firestore';

import { collectionName } from 'services/projectscore/constants';
import { User } from 'services/projectscore/models/user';
import { db } from 'utils/firebase';
import { ProjectHooks } from '..';

const useUser: ProjectHooks['useUser'] = (userId) => {
  const [user, loading, error] = useDocumentData<User>(
    userId && db.collection(collectionName.users).doc(userId),
    {
      idField: 'id',
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  return { user: user ?? undefined, loading, error };
};

export default useUser;
