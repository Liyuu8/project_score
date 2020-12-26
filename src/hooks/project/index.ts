import { createContext } from 'react';

import { useClient } from 'hooks/di';
import { Project } from 'services/projectscore/models/project';
import { Score } from 'services/projectscore/models/score';
import { Memo } from 'services/projectscore/models/memo';
import { Plot } from 'services/projectscore/models/plot';
import { Note, noteElements } from 'services/projectscore/models/note';
import { NoteConnection } from 'services/projectscore/models/connection';
import { Finding } from 'services/projectscore/models/finding';

export type ProjectsOptions = {
  limit?: number;
};

export type ProjectHooks = {
  useProjects: (
    options?: ProjectsOptions
  ) => {
    projects: Project[];
    loading: boolean;
    error: Error | undefined;
  };
  useProject: (
    projectId: string
  ) => {
    project: Project | undefined;
    loading: boolean;
    error: Error | undefined;
  };
  useProjectAction: () => {
    updateProject: (
      projectId: string,
      updatedProject: Project
    ) => Promise<void>;
    deleteProject: (projectId: string) => Promise<void>;
  };

  useProjectScoreAction: () => {
    addProjectScore: (
      projectId: string,
      title: string,
      description: string
    ) => Promise<void>;
  };

  useScores: (
    projectId: string
  ) => {
    scores: Score[];
    loading: boolean;
    error: Error | undefined;
  };
  useScoreAction: () => {
    updateScore: (projectId: string, updatedScore: Score) => Promise<void>;
  };

  useScoreDataAction: () => {
    addScoreData: (projectId: string) => Promise<void>;
    deleteScoreData: (projectId: string, scoreId: string) => Promise<void>;
  };

  useMemos: (
    projectId: string,
    scoreId: string
  ) => {
    memos: Memo[];
    loading: boolean;
    error: Error | undefined;
  };
  useMemoAction: () => {
    addMemo: (
      projectId: string,
      scoreId: string,
      content: string
    ) => Promise<void>;
    updateMemo: (
      projectId: string,
      scoreId: string,
      updatedMemo: Memo
    ) => Promise<void>;
    deleteMemo: (
      projectId: string,
      scoreId: string,
      memoId: string
    ) => Promise<void>;
  };

  usePlots: (
    projectId: string,
    scoreId: string
  ) => {
    plots: Plot[];
    loading: boolean;
    error: Error | undefined;
  };
  usePlotAction: () => {
    updatePlot: (
      projectId: string,
      scoreId: string,
      updatedPlot: Plot
    ) => Promise<void>;
  };

  useNotes: (
    projectId: string,
    scoreId: string
  ) => {
    notes: Note[];
    loading: boolean;
    error: Error | undefined;
  };
  useNoteAction: () => {
    addNote: (
      projectId: string,
      scoreId: string,
      content: string,
      type: keyof typeof noteElements
    ) => Promise<void>;
    updateNote: (
      projectId: string,
      scoreId: string,
      updatedNote: Note
    ) => Promise<void>;
    deleteNote: (
      projectId: string,
      scoreId: string,
      noteId: string
    ) => Promise<void>;
  };

  useConnections: (
    projectId: string,
    scoreId: string
  ) => {
    connections: NoteConnection[];
    loading: boolean;
    error: Error | undefined;
  };
  // useConnectionAction: () => {
  //   addConnection: () => Promise<void>;
  //   deleteConnection: (id: string) => Promise<void>;
  // };

  useFindings: (
    projectId: string,
    scoreId: string,
    noteId: string
  ) => {
    findings: Finding[];
    loading: boolean;
    error: Error | undefined;
  };
  useFindingAction: () => {
    addFinding: (
      projectId: string,
      scoreId: string,
      noteId: string,
      content: string,
      isGood: boolean
    ) => Promise<void>;
    updateFinding: (
      projectId: string,
      scoreId: string,
      noteId: string,
      updatedFinding: Finding
    ) => Promise<void>;
    deleteFinding: (
      projectId: string,
      scoreId: string,
      noteId: string,
      findingId: string
    ) => Promise<void>;
  };
};

export const ProjectHooksContext = createContext<ProjectHooks | null>(null);

export const useProjects: ProjectHooks['useProjects'] = (options) => {
  const client = useClient(ProjectHooksContext);

  return client.useProjects(options);
};

export const useProject: ProjectHooks['useProject'] = (projectId) => {
  const client = useClient(ProjectHooksContext);

  return client.useProject(projectId);
};

export const useProjectAction: ProjectHooks['useProjectAction'] = () => {
  const client = useClient(ProjectHooksContext);

  return client.useProjectAction();
};

export const useProjectScoreAction: ProjectHooks['useProjectScoreAction'] = () => {
  const client = useClient(ProjectHooksContext);

  return client.useProjectScoreAction();
};

export const useScores: ProjectHooks['useScores'] = (projectId) => {
  const client = useClient(ProjectHooksContext);

  return client.useScores(projectId);
};

export const useScoreAction: ProjectHooks['useScoreAction'] = () => {
  const client = useClient(ProjectHooksContext);

  return client.useScoreAction();
};

export const useScoreDataAction: ProjectHooks['useScoreDataAction'] = () => {
  const client = useClient(ProjectHooksContext);

  return client.useScoreDataAction();
};

export const useMemos: ProjectHooks['useMemos'] = (projectId, scoreId) => {
  const client = useClient(ProjectHooksContext);

  return client.useMemos(projectId, scoreId);
};

export const useMemoAction: ProjectHooks['useMemoAction'] = () => {
  const client = useClient(ProjectHooksContext);

  return client.useMemoAction();
};

export const usePlots: ProjectHooks['usePlots'] = (projectId, scoreId) => {
  const client = useClient(ProjectHooksContext);

  return client.usePlots(projectId, scoreId);
};

export const usePlotAction: ProjectHooks['usePlotAction'] = () => {
  const client = useClient(ProjectHooksContext);

  return client.usePlotAction();
};

export const useNotes: ProjectHooks['useNotes'] = (projectId, scoreId) => {
  const client = useClient(ProjectHooksContext);

  return client.useNotes(projectId, scoreId);
};

export const useNoteAction: ProjectHooks['useNoteAction'] = () => {
  const client = useClient(ProjectHooksContext);

  return client.useNoteAction();
};

export const useConnections: ProjectHooks['useConnections'] = (
  projectId,
  scoreId
) => {
  const client = useClient(ProjectHooksContext);

  return client.useConnections(projectId, scoreId);
};

export const useFindings: ProjectHooks['useFindings'] = (
  projectId,
  scoreId,
  noteId
) => {
  const client = useClient(ProjectHooksContext);

  return client.useFindings(projectId, scoreId, noteId);
};

export const useFindingAction: ProjectHooks['useFindingAction'] = () => {
  const client = useClient(ProjectHooksContext);

  return client.useFindingAction();
};
