import {
  FC,
  PropsWithChildren,
  ReactElement,
  useState,
  useMemo,
  useCallback,
} from 'react';
import { TaskStatusChangedContext } from './taskStatusChangedContext';

export const TaskStatusChangedContextProvider: FC<PropsWithChildren> = (
  props,
): ReactElement => {
  const [updated, setUpdated] = useState(false);

  const toggleHandler = useCallback(() => {
    setUpdated((prevState) => !prevState);
  }, []);

  return (
    <TaskStatusChangedContext.Provider
      value={useMemo(
        () => ({ updated, toggle: toggleHandler }),
        [updated, toggleHandler],
      )}>
      {props.children}
    </TaskStatusChangedContext.Provider>
  );
};
