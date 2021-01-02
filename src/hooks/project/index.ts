import { createContext } from 'react';

import { useClient } from 'hooks/di';
import { Project } from 'services/projectscore/models/project';
import { Score } from 'services/projectscore/models/score';
import { Memo } from 'services/projectscore/models/memo';
import { Plot } from 'services/projectscore/models/plot';
import { Note, noteElements } from 'services/projectscore/models/note';
import { NoteConnection } from 'services/projectscore/models/connection';
import { Finding } from 'services/projectscore/models/finding';
import { User } from 'services/projectscore/models/user';

export type ProjectsOptions = {
  limit?: number;
};

export type ProjectHooks = {
  usePubProjects: (
    options?: ProjectsOptions
  ) => {
    pubProjects: Project[];
    pubProjectsLoading: boolean;
    error: Error | undefined;
  };
  useMyProjects: (
    authorId: string,
    options?: ProjectsOptions
  ) => {
    myProjects: Project[];
    myProjectsLoading: boolean;
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
      description: string,
      authorId: string,
      isPublic: boolean
    ) => Promise<void>;
  };

  useScores: (
    projectId: string,
    isPublic: boolean,
    authorId: string
  ) => {
    scores: Score[];
    loading: boolean;
    error: Error | undefined;
  };
  useScoreAction: () => {
    updateScore: (projectId: string, updatedScore: Score) => Promise<void>;
    deleteScore: (
      projectId: string,
      scoreId: string,
      deletedIndex: number
    ) => Promise<void>;
  };

  useScoreDataAction: () => {
    addScoreDataFromExisiting: (
      projectId: string,
      title: string
    ) => Promise<void>;
    addScoreDataFromScratch: (
      projectId: string,
      title: string
    ) => Promise<void>;
  };

  useMemos: (
    projectId: string,
    scoreId: string,
    isPublic: boolean,
    authorId: string
  ) => {
    memos: Memo[];
    loading: boolean;
    error: Error | undefined;
  };
  useMemoAction: () => {
    addMemo: (
      projectId: string,
      scoreId: string,
      content: string,
      authorId: string,
      isPublic: boolean
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
    scoreId: string,
    isPublic: boolean,
    authorId: string
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
    scoreId: string,
    isPublic: boolean,
    authorId: string
  ) => {
    notes: Note[];
    noteLoading: boolean;
    error: Error | undefined;
  };
  useNoteAction: () => {
    addNote: (
      projectId: string,
      scoreId: string,
      content: string,
      type: keyof typeof noteElements,
      authorId: string,
      isPublic: boolean
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
    scoreId: string,
    isPublic: boolean,
    authorId: string
  ) => {
    connections: NoteConnection[];
    connectionLoading: boolean;
    error: Error | undefined;
  };
  useConnectionAction: () => {
    addConnection: (
      projectId: string,
      scoreId: string,
      source: string,
      target: string,
      authorId: string,
      isPublic: boolean
    ) => Promise<void>;
    deleteConnection: (
      projectId: string,
      scoreId: string,
      connectionId: string
    ) => Promise<void>;
  };

  useFindings: (
    projectId: string,
    scoreId: string,
    noteId: string,
    isPublic: boolean,
    authorId: string
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
      isGood: boolean,
      authorId: string,
      isPublic: boolean
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

  useUser: (
    userId: string
  ) => {
    user: User | undefined;
    loading: boolean;
    error: Error | undefined;
  };
  useUserAction: () => {
    addUser: (user: User) => Promise<void>;
    updateUser: (updatedUser: User) => Promise<void>;
    deleteUser: (userId: string) => Promise<void>;
  };
};

export const ProjectHooksContext = createContext<ProjectHooks | null>(null);

export const usePubProjects: ProjectHooks['usePubProjects'] = (options) => {
  const client = useClient(ProjectHooksContext);

  return client.usePubProjects(options);
};

export const useMyProjects: ProjectHooks['useMyProjects'] = (
  authorId,
  options
) => {
  const client = useClient(ProjectHooksContext);

  return client.useMyProjects(authorId, options);
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

export const useScores: ProjectHooks['useScores'] = (
  projectId,
  isPublic,
  authorId
) => {
  const client = useClient(ProjectHooksContext);

  return client.useScores(projectId, isPublic, authorId);
};

export const useScoreAction: ProjectHooks['useScoreAction'] = () => {
  const client = useClient(ProjectHooksContext);

  return client.useScoreAction();
};

export const useScoreDataAction: ProjectHooks['useScoreDataAction'] = () => {
  const client = useClient(ProjectHooksContext);

  return client.useScoreDataAction();
};

export const useMemos: ProjectHooks['useMemos'] = (
  projectId,
  scoreId,
  isPublic,
  authorId
) => {
  const client = useClient(ProjectHooksContext);

  return client.useMemos(projectId, scoreId, isPublic, authorId);
};

export const useMemoAction: ProjectHooks['useMemoAction'] = () => {
  const client = useClient(ProjectHooksContext);

  return client.useMemoAction();
};

export const usePlots: ProjectHooks['usePlots'] = (
  projectId,
  scoreId,
  isPublic,
  authorId
) => {
  const client = useClient(ProjectHooksContext);

  return client.usePlots(projectId, scoreId, isPublic, authorId);
};

export const usePlotAction: ProjectHooks['usePlotAction'] = () => {
  const client = useClient(ProjectHooksContext);

  return client.usePlotAction();
};

export const useNotes: ProjectHooks['useNotes'] = (
  projectId,
  scoreId,
  isPublic,
  authorId
) => {
  const client = useClient(ProjectHooksContext);

  return client.useNotes(projectId, scoreId, isPublic, authorId);
};

export const useNoteAction: ProjectHooks['useNoteAction'] = () => {
  const client = useClient(ProjectHooksContext);

  return client.useNoteAction();
};

export const useConnections: ProjectHooks['useConnections'] = (
  projectId,
  scoreId,
  isPublic,
  authorId
) => {
  const client = useClient(ProjectHooksContext);

  return client.useConnections(projectId, scoreId, isPublic, authorId);
};

export const useConnectionAction: ProjectHooks['useConnectionAction'] = () => {
  const client = useClient(ProjectHooksContext);

  return client.useConnectionAction();
};

export const useFindings: ProjectHooks['useFindings'] = (
  projectId,
  scoreId,
  noteId,
  isPublic,
  authorId
) => {
  const client = useClient(ProjectHooksContext);

  return client.useFindings(projectId, scoreId, noteId, isPublic, authorId);
};

export const useFindingAction: ProjectHooks['useFindingAction'] = () => {
  const client = useClient(ProjectHooksContext);

  return client.useFindingAction();
};

export const useUser: ProjectHooks['useUser'] = (userId) => {
  const client = useClient(ProjectHooksContext);

  return client.useUser(userId);
};

export const useUserAction: ProjectHooks['useUserAction'] = () => {
  const client = useClient(ProjectHooksContext);

  return client.useUserAction();
};
