/**
 * - Create a task with:
 *    - Title
 *    - Description
 *    - Due Date
 *    - Priority
 * - Edit and delete existing tasks.
 * - Drag and drop tasks between columns.
 * - Reorder tasks within the same column using drag and drop.
 * - Persist the board state so changes remain after page refresh.
 */

import TaskCard from "./components/TaskCard";
import { TaskPriority, TaskStatus, type Task } from "./types/task";

const tasks: Task[] = [
  {
    id: 1,
    title: "Lorem ipsum dolor sit amet",
    description:
      "Nunc aliquet, odio ac porta pellentesque, velit massa pharetra urna, ut auctor sem lorem a nibh. Ut nec odio nulla. Phasellus varius nunc in est maximus ultrices et quis tortor. Integer sagittis risus sed quam consequat, et vehicula urna eleifend.",
    dueDate: Date.now(),
    priority: TaskPriority.Low,
    status: TaskStatus.Todo,
  },
  {
    id: 2,
    title: "consectetur adipiscing elit",
    description:
      "In ut ullamcorper turpis. Quisque finibus molestie felis, sed facilisis metus tristique nec. Maecenas cursus tortor lorem, non vulputate mauris ornare vel. Nunc tincidunt metus et ipsum iaculis tempus. Vestibulum sit amet finibus tellus. Curabitur tincidunt nibh ac lectus vulputate, sit amet pharetra odio placerat",
    dueDate: undefined,
    priority: TaskPriority.High,
    status: TaskStatus.Todo,
  },
  {
    id: 3,
    title: "Ut imperdiet, mauris varius placerat vulputate",
    description:
      "Praesent varius eleifend euismod. Sed accumsan sollicitudin tellus vitae rhoncus. Nullam ex augue, interdum et condimentum dignissim, facilisis nec neque. Nunc sed leo sed felis tincidunt sodales non nec ex.",
    dueDate: undefined,
    priority: TaskPriority.Medium,
    status: TaskStatus.InProgress,
  },
  {
    id: 4,
    title: "metus turpis congue diam",
    description:
      "Mauris dapibus, velit vitae feugiat feugiat, ante elit placerat orci, nec dapibus libero quam a lectus. Sed sed leo turpis. Fusce laoreet dolor ut lectus luctus, ut iaculis turpis efficitur.",
    dueDate: undefined,
    priority: TaskPriority.High,
    status: TaskStatus.InProgress,
  },
  {
    id: 5,
    title: "quis faucibus ligula ex non leo",
    description:
      "Nulla ac orci diam. Donec scelerisque quam eget mauris accumsan malesuada. Aliquam tristique quam vel lorem auctor eleifend. Vivamus scelerisque, velit id porttitor ullamcorper, lorem nulla euismod lectus, sit amet vehicula nibh leo in arcu. ",
    dueDate: undefined,
    priority: TaskPriority.Low,
    status: TaskStatus.Done,
  },
];

const COLUMN_TITLE = {
  [TaskStatus.Todo]: "To-Do",
  [TaskStatus.InProgress]: "In Progress",
  [TaskStatus.Done]: "Done",
} as const;

function App() {
  const columns = tasks.reduce(
    (taskColumns, task) => {
      const { status } = task;
      const tasksByColumn = taskColumns[status] || [];

      taskColumns[status] = [...tasksByColumn, task];

      return taskColumns;
    },
    {} as Record<(typeof TaskStatus)[keyof typeof TaskStatus], Task[]>,
  );

  return (
    <div className="flex size-full justify-center items-cente">
      <section className="flex gap-1 w-full max-w-2xl mt-20">
        {Object.entries(columns).map(([column, tasks]) => (
          <div className="w-full" key={column}>
            <h2 className="text-xl font-bold mb-4">
              {COLUMN_TITLE[column as keyof typeof COLUMN_TITLE]}
            </h2>

            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                dueDate={task.dueDate}
                id={task.id}
                priority={task.priority}
                title={task.title}
              />
            ))}
          </div>
        ))}
      </section>
    </div>
  );
}

export default App;
