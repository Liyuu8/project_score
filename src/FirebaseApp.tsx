import React, { FC } from 'react';

import { ProjectHooksContext } from 'hooks/project';
import useProjects from 'hooks/project/firestore/use-projects';
import useProject from 'hooks/project/firestore/use-project';
import useProjectAction from 'hooks/project/firestore/use-project-action';
import useProjectScoreAction from 'hooks/project/firestore/use-project-score-action';
import useScores from 'hooks/project/firestore/use-scores';
import useScoreAction from 'hooks/project/firestore/use-score-action';
import useScoreDataAction from 'hooks/project/firestore/use-score-data-action';
import usePlots from 'hooks/project/firestore/use-plots';
import usePlotAction from 'hooks/project/firestore/use-plot-action';
import useNotes from 'hooks/project/firestore/use-notes';
import useNoteAction from 'hooks/project/firestore/use-note-action';
import useConnections from 'hooks/project/firestore/use-connections';
import useFindings from 'hooks/project/firestore/use-findings';
import useFindingAction from 'hooks/project/firestore/use-finding-action';

const FirebaseApp: FC = ({ children }) => {
  return (
    <ProjectHooksContext.Provider
      value={{
        useProjects,
        useProject,
        useProjectAction,
        useProjectScoreAction,
        useScores,
        useScoreAction,
        useScoreDataAction,
        usePlots,
        usePlotAction,
        useNotes,
        useNoteAction,
        useConnections,
        useFindings,
        useFindingAction,
      }}
    >
      {children}
    </ProjectHooksContext.Provider>
  );
};

export default FirebaseApp;
