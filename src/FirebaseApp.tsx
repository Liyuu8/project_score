import React, { FC } from 'react';
import 'firebase/auth';
import 'firebase/firestore';

import { ProjectHooksContext } from 'hooks/project';
import useProjects from 'hooks/project/firestore/use-projects';
import useProjectScore from 'hooks/project/firestore/use-project-score';
import useProjectScoreAction from 'hooks/project/firestore/use-project-score-action';

const FirebaseApp: FC = ({ children }) => {
  return (
    <ProjectHooksContext.Provider
      value={{ useProjects, useProjectScore, useProjectScoreAction }}
    >
      {children}
    </ProjectHooksContext.Provider>
  );
};

export default FirebaseApp;
