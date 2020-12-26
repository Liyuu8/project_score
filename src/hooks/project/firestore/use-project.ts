import { useDocumentData } from 'react-firebase-hooks/firestore';

import { Project } from 'services/projectscore/models/project';
import { collectionName } from 'services/projectscore/constants';
import { db } from 'utils/firebase';
import { ProjectHooks } from '..';

const useProject: ProjectHooks['useProject'] = (projectId) => {
  if (!projectId) {
    return { project: undefined, loading: false, error: undefined };
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [project, loading, error] = useDocumentData<Project>(
    db.collection(collectionName.projects).doc(projectId)
  );

  return { project, loading, error };
};

export default useProject;
