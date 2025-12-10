/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import { cx } from "class-variance-authority";

import ButtonIcon from "../components/button-icon";
import Card from "../components/card";
import InputCheckbox from "../components/input-checkbox";
import Text from "../components/text";
import InputText from "../components/input-text";
import Skeleton from "../components/skeleton";

import TrashIcon from "../assets/icons/trash.svg?react";
import PencilIcon from "../assets/icons/pencil.svg?react";
import XIcon from "../assets/icons/x.svg?react";
import CheckIcon from "../assets/icons/check.svg?react";

import { Task, TaskState } from "../models/task";

interface TaskItemProps {
  task: Task;
  loading?: boolean;
  createTask: (tempId: string, title: string) => Promise<void>;
  updateTask: (
    id: string,
    payload: { title: string; description?: string }
  ) => Promise<any>;
  updateTaskStatus: (id: string) => Promise<any>;
  deleteTask: (id: string) => Promise<void>;
}

export default function TaskItem({
  task,
  loading,
  createTask,
  updateTask,
  updateTaskStatus,
  deleteTask,
}: TaskItemProps) {
  const isCreating = task.state === TaskState.Creating;
  const [isEditing, setIsEditing] = useState(isCreating);
  const [taskTitle, setTaskTitle] = useState(task.title || "");
  const [isHandling, setIsHandling] = useState(false);

  function handleEditTask() {
    setIsEditing(true);
  }

  async function handleExitEditTask() {
    if (isCreating) {
      await deleteTask(task.id);
    }
    setIsEditing(false);
  }

  function handleChangeTaskTitle(e: React.ChangeEvent<HTMLInputElement>) {
    setTaskTitle(e.target.value || "");
  }

  async function handleSaveTask(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!taskTitle.trim()) return;

    setIsHandling(true);
    try {
      if (isCreating) {
        await createTask(task.id, taskTitle);
      } else {
        await updateTask(task.id, { title: taskTitle });
      }
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsHandling(false);
    }
  }

  function handleChangeTaskStatus() {
    updateTaskStatus(task.id);
  }

  async function handleDeleteTask() {
    setIsHandling(true);

    await deleteTask(task.id);
    setIsHandling(false);
  }

  return (
    <Card size="md">
      {!isEditing ? (
        <div className="flex items-center gap-4">
          <InputCheckbox
            checked={task?.concluded}
            onChange={handleChangeTaskStatus}
            loading={loading}
          />
          {!loading ? (
            <Text
              className={cx("flex-1", {
                "line-through text-zinc-500": task.concluded,
              })}
            >
              {task?.title}
            </Text>
          ) : (
            <Skeleton className="h-6 flex-1" />
          )}
          <div className="flex gap-1">
            <ButtonIcon
              icon={TrashIcon}
              variant="terciary"
              onClick={handleDeleteTask}
              loading={loading}
              handling={isHandling}
            />
            <ButtonIcon
              icon={PencilIcon}
              variant="terciary"
              onClick={handleEditTask}
              loading={loading}
              disabled={task.concluded}
            />
          </div>
        </div>
      ) : (
        <form
          onSubmit={handleSaveTask}
          className="flex items-center gap-4 w-full"
        >
          <InputText
            value={taskTitle}
            className="flex-1"
            onChange={handleChangeTaskTitle}
            required
            autoFocus
            placeholder="Digite o nome da tarefa..."
          />
          <div className="flex gap-1">
            <ButtonIcon
              icon={XIcon}
              variant="secondary"
              onClick={handleExitEditTask}
              type="button"
            />
            <ButtonIcon
              icon={CheckIcon}
              variant="primary"
              type="submit"
              handling={isHandling}
            />
          </div>
        </form>
      )}
    </Card>
  );
}
