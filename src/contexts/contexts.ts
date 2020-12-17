import { createContext } from 'react';
import projectScoreTheme from './theme';

export const ThemeContext = createContext(
  (null as unknown) as typeof projectScoreTheme
);
