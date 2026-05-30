import type { FC } from "react";
import type { Task } from "../types/task";
import TaskCardPriorityItem from "./TaskCardPriorityItem";

type Props = Pick<Task, "dueDate" | "title" | "priority" | "id">;

const TaskCard: FC<Props> = ({ dueDate, id, priority, title }) => {
  return (
    <div className="flex flex-col relative size-52 border border-gray-300 p-2 rounded my-4 cursor-pointer hover:bg-gray-50 transition-colors bg-white">
      <div className="flex justify-between flex-nowrap">
        <p className="text-sm mb-2 uppercase w-32">task-{id}</p>
        <TaskCardPriorityItem priority={priority} />
      </div>

      <div>
        <h3 className="text-base font-bold">{title}</h3>
      </div>

      {dueDate ? (
        <p className="mt-auto text-sm">
          Due by: {new Date(dueDate).toLocaleDateString()}
        </p>
      ) : null}
    </div>
  );
};

export default TaskCard;
