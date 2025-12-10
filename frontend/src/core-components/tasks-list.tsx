import Button from "../components/button";
import PlusIcon from "../assets/icons/plus.svg?react";
import TaskItem from "./task-item";
import useTasks from "../hooks/use-tasks";
import { Task, TaskState } from "../models/task";
import Text from "../components/text"; // Importe o Text
import TasksSummary from "./tasks-summary";

export default function TasksList() {
  const {
    tasks,
    isLoadingTasks,
    prepareTask,
    createTask,
    updateTask,
    updateTaskStatus,
    deleteTask,
    tasksCount,
    concludeTasksCount,
  } = useTasks();

  function handleNewTask() {
    prepareTask();
  }

  const pendingTasks = tasks.filter((t) => !t.concluded);
  const completedTasks = tasks.filter((t) => t.concluded);

  return (
    <>
      <section>
        <TasksSummary
          total={tasksCount}
          concluded={concludeTasksCount}
          loading={isLoadingTasks}
        />
      </section>

      <section className="mt-6">
        <Button
          icon={PlusIcon}
          className="w-full"
          onClick={handleNewTask}
          disabled={
            tasks.some((task) => task.state === TaskState.Creating) ||
            isLoadingTasks
          }
        >
          Nova Tarefa
        </Button>
      </section>

      <section className="space-y-3 mt-6">
        {!isLoadingTasks &&
          pendingTasks.length === 0 &&
          completedTasks.length === 0 && (
            <Text
              as="p"
              variant="body-sm-bold"
              className="text-zinc-400 text-center"
            >
              Nenhuma tarefa encontrada.
            </Text>
          )}

        {!isLoadingTasks &&
          pendingTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              createTask={createTask}
              updateTask={updateTask}
              updateTaskStatus={updateTaskStatus}
              deleteTask={deleteTask}
            />
          ))}

        {isLoadingTasks && (
          <>
            <TaskItem
              task={{} as Task}
              loading
              createTask={async () => {}}
              updateTask={async () => {}}
              updateTaskStatus={async () => {}}
              deleteTask={async () => {}}
            />
            <TaskItem
              task={{} as Task}
              loading
              createTask={async () => {}}
              updateTask={async () => {}}
              updateTaskStatus={async () => {}}
              deleteTask={async () => {}}
            />
          </>
        )}
      </section>

      {!isLoadingTasks && completedTasks.length > 0 && (
        <>
          <div className="mt-8 mb-4 flex items-center gap-4 opacity-50">
            <div className="h-px bg-zinc-700 flex-1" />

            <Text variant="body-sm-bold" className="text-zinc-400">
              Concluídas ({completedTasks.length})
            </Text>

            <div className="h-px bg-zinc-700 flex-1" />
          </div>

          <section className="space-y-3 opacity-60 hover:opacity-100 transition-opacity">
            {completedTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                createTask={createTask}
                updateTask={updateTask}
                updateTaskStatus={updateTaskStatus}
                deleteTask={deleteTask}
              />
            ))}
          </section>
        </>
      )}
    </>
  );
}
