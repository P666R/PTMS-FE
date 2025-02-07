import { Status } from '../../createTaskForm/enums/Status';

export type TaskCounterStatusType = keyof typeof Status;

export interface ITaskCounter {
  count?: number;
  status?: TaskCounterStatusType;
}
