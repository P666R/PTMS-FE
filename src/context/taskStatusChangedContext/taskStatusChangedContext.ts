import { createContext } from 'react';

export const TaskStatusChangedContext = createContext({
  updated: false,
  toggle: () => {},
});
