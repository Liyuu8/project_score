/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useContext, useEffect, useRef, useState } from 'react';

import { Project } from 'services/projectscore/models/project';
import { collectionName } from 'services/projectscore/constants';
import { FirebaseContext } from 'contexts';

type ProjectsOptions = {
  limit?: number;
};
const defaultOptions: Required<ProjectsOptions> = {
  limit: 30,
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useProjects = (options?: ProjectsOptions) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const firebaseRef = useRef(useContext(FirebaseContext));
  const optionsRef = useRef({ ...defaultOptions, ...options });

  useEffect(() => {
    const { db } = firebaseRef.current;
    if (!db) throw new Error('Firestore is not initialized');
    const query = db
      .collection(collectionName.projects)
      .orderBy('updatedAt', 'asc')
      .limit(optionsRef.current.limit);

    const load = async () => {
      setLoading(true);
      try {
        const snap = await query.get();
        const projectsData = snap.docs.map((doc) => ({
          ...(doc.data() as Project),
          id: doc.id,
        }));
        setProjects(projectsData);
        setError(null);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };

    load();
  }, []);

  return { projects, loading, error };
};

export default useProjects;
