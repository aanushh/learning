export interface Task {
  id: number;
  title: string;
  description: string;
  dueDate?: number;
  priority: TaskPriority;
  status: TaskStatus;
}

export const TaskStatus = {
  Todo: "todo",
  InProgress: "in-progress",
  Done: "done",
} as const;

type TaskStatus = (typeof TaskStatus)[keyof typeof TaskStatus];

export const TaskPriority = {
  Low: "low",
  Medium: "medium",
  High: "high",
} as const;

export type TaskPriority = (typeof TaskPriority)[keyof typeof TaskPriority];
