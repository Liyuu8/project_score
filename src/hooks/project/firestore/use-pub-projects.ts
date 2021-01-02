import { useRef } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import { Project } from 'services/projectscore/models/project';
import { collectionName } from 'services/projectscore/constants';
import { db } from 'utils/firebase';
import { ProjectHooks, ProjectsOptions } from '..';

const defaultOptions: Required<ProjectsOptions> = {
  limit: 30,
};

const usePubProjects: ProjectHooks['usePubProjects'] = (options) => {
  const optionsRef = useRef({ ...defaultOptions, ...options });

  const [projects, loading, error] = useCollectionData<Project>(
    db
      .collection(collectionName.projects)
      .where('isPublic', '==', true)
      .orderBy('updatedAt', 'desc')
      .limit(optionsRef.current.limit),
    {
      idField: 'id',
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  return { pubProjects: projects ?? [], pubProjectsLoading: loading, error };
};

export default usePubProjects;
