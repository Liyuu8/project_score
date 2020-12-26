import { useCallback } from 'react';
import firebase from 'firebase';

import { collectionName } from 'services/projectscore/constants';
import { Project } from 'services/projectscore/models/project';
import { db } from 'utils/firebase';
import { ProjectHooks } from '..';

const useProjectAction: ProjectHooks['useProjectAction'] = () => {
  const updateProject = useCallback(
    async (projectId: string, updatedProject: Project) => {
      if (!updatedProject.title) {
        return;
      }

      try {
        const projectDoc = db
          .collection(collectionName.projects)
          .doc(projectId);
        const newProject = {
          ...updatedProject,
          updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        };
        await projectDoc.set(newProject);
      } catch (e) {
        console.log(e);
      }
    },
    []
  );

  // TODO: サブコレクションの削除
  const deleteProject = useCallback(async (projectId: string) => {
    await db.collection(collectionName.projects).doc(projectId).delete();
  }, []);

  return { updateProject, deleteProject };
};

export default useProjectAction;
