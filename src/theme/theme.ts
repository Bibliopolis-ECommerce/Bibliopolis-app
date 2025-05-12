// src/theme/theme.ts
export { lightTheme } from './lightTheme';
export { darkTheme } from './darkTheme';

export const getTheme = (mode: 'light' | 'dark') =>
  mode === 'dark' ? getTheme : getTheme;
