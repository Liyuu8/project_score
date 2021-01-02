import { createContext } from 'react';
import firebase from 'firebase/app';

import projectScoreTheme from './theme';

export const ThemeContext = createContext(
  (null as unknown) as typeof projectScoreTheme
);

type UserContextValue = {
  userId: string;
  authLoading: boolean;
  setAuthLoading: (authLoading: boolean) => void;
  credential: firebase.auth.UserCredential | null;
  setCredential: (credential: firebase.auth.UserCredential | null) => void;
};

export const UserContext = createContext<UserContextValue>({
  userId: '',
  authLoading: false,
  setAuthLoading: () => undefined,
  credential: null,
  setCredential: () => undefined,
});

type ProjectContextValue = {
  isPublicProject: boolean;
  setIsPublicProject: (isPublicProject: boolean) => void;
};

export const ProjectContext = createContext<ProjectContextValue>({
  isPublicProject: false,
  setIsPublicProject: () => undefined,
});

// [REF]
// https://github.com/oukayuka/ReactFirebaseBook/blob/master/05-react/mangarel-demo/src/contexts.ts
