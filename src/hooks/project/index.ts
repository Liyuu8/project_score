import { createContext } from 'react';

import { useClient } from 'hooks/di';
import { Project } from 'services/projectscore/models/project';
import { ProjectScore } from 'services/projectscore/models/projectscore';

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
  useProjectScore: (
    projectId: string
  ) => {
    projectScore: ProjectScore | undefined;
    loading: boolean;
    error: Error | null;
  };
  useProjectScoreAction: () => {
    addProjectScore: (
      projectId: string,
      title: string,
      description: string
    ) => Promise<void>;
    deleteProjectScore: (id: string) => Promise<void>;
  };
  // useScoreAction: () => {
  //   addScore: () => Promise<void>; // TODO:
  //   updateScore: () => Promise<void>; // TODO:
  //   deleteScore: (id: string) => Promise<void>; // TODO:
  // };
  // useNoteAction: () => {
  //   addNote: () => Promise<void>; // TODO:
  //   updateNote: () => Promise<void>; // TODO:
  //   deleteNote: (id: string) => Promise<void>; // TODO:
  // };
  // useConnectionAction: () => {
  //   addConnection: () => Promise<void>; // TODO:
  //   deleteConnection: (id: string) => Promise<void>; // TODO:
  // };
};

export const ProjectHooksContext = createContext<ProjectHooks | null>(null);

export const useProjects: ProjectHooks['useProjects'] = (options) => {
  const client = useClient(ProjectHooksContext);

  return client.useProjects(options);
};

export const useProjectScore: ProjectHooks['useProjectScore'] = (projectId) => {
  const client = useClient(ProjectHooksContext);

  return client.useProjectScore(projectId);
};

export const useProjectScoreAction: ProjectHooks['useProjectScoreAction'] = () => {
  const client = useClient(ProjectHooksContext);

  return client.useProjectScoreAction();
};
