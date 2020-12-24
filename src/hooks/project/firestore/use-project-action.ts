import { useCallback } from 'react';
import firebase from 'firebase';

import { collectionName } from 'services/projectscore/constants';
import { Project } from 'services/projectscore/models/project';
import { db } from 'utils/firebase';
import { ProjectHooks } from '..';

const useProjectAction: ProjectHooks['useProjectAction'] = () => {
  // TODO: 動作確認
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

  return { updateProject };
};

export default useProjectAction;
