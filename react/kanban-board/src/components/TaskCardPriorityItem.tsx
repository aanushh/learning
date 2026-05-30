import type { FC } from "react";
import {
  TaskPriority,
  type TaskPriority as TaskPriorityType,
} from "../types/task";

interface Props {
  priority: TaskPriorityType;
}

const taskPriorityBaseStyles =
  "w-fit py-1 px-2 mb-2 rounded-full uppercase text-xs";
const taskPriorityColorStyles = {
  [TaskPriority.Low]: "text-blue-900 bg-blue-300",
  [TaskPriority.Medium]: "text-yellow-900 bg-yellow-400",
  [TaskPriority.High]: "text-red-900 bg-red-300",
};

const TaskCardPriorityItem: FC<Props> = ({ priority }) => {
  if (!priority) {
    return null;
  }

  return (
    <p
      className={taskPriorityBaseStyles.concat(
        " ",
        taskPriorityColorStyles[priority],
      )}
    >
      {priority}
    </p>
  );
};

export default TaskCardPriorityItem;
