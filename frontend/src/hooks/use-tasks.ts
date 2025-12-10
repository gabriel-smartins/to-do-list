import { useEffect, useState } from "react";
import { taskService } from "../services/task-service";
import { Task, TaskState } from "../models/task";
import { toast } from "sonner";

export default function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoadingTasks, setIsLoadingTasks] = useState(true);
  const [isUpdatingTask, setIsUpdatingTask] = useState(false);
  const [isDeletingTask, setIsDeletingTask] = useState(false);

  async function fetchTasks() {
    setIsLoadingTasks(true);
    try {
      const data = await taskService.getAll();
      setTasks(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingTasks(false);
    }
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  function prepareTask() {
    const draftTask: Task = {
      id: `temp-${Date.now()}`,
      title: "",
      concluded: false,
      state: TaskState.Creating,
    };
    setTasks((old) => [...old, draftTask]);
  }

  async function createTask(tempId: string, title: string) {
    if (!title.trim()) {
      setTasks((old) => old.filter((t) => t.id !== tempId));
      return;
    }

    try {
      const newTask = await taskService.create(title);
      setTasks((currentTasks) =>
        currentTasks.map((task) => (task.id === tempId ? newTask : task))
      );
      toast.success("Tarefa criada!");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao criar tarefa.");
      setTasks((old) => old.filter((t) => t.id !== tempId));
    }
  }

  async function updateTask(
    id: string,
    payload: { title: string; description?: string }
  ) {
    setIsUpdatingTask(true);
    try {
      await taskService.update(id, payload.title, payload.description);
      setTasks((current) =>
        current.map((t) => (t.id === id ? { ...t, ...payload } : t))
      );
      toast.success("Tarefa atualizada.");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao salvar alterações.");
      fetchTasks();
    } finally {
      setIsUpdatingTask(false);
    }
  }

  async function updateTaskStatus(id: string) {
    if (id.startsWith("temp-")) return;

    setTasks((current) =>
      current.map((t) => (t.id === id ? { ...t, concluded: !t.concluded } : t))
    );

    try {
      await taskService.toggle(id);
    } catch (error) {
      console.error(error);
      toast.error("Erro ao atualizar status.");
      fetchTasks();
    }
  }

  async function deleteTask(id: string) {
    if (id.startsWith("temp-")) {
      setTasks((old) => old.filter((t) => t.id !== id));
      return;
    }

    setIsDeletingTask(true);
    setTasks((old) => old.filter((t) => t.id !== id));

    try {
      await taskService.delete(id);
      toast.success("Tarefa removida.");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao deletar tarefa.");
      fetchTasks();
    } finally {
      setIsDeletingTask(false);
    }
  }

  const realTasks = tasks.filter((t) => t.state !== TaskState.Creating);
  const tasksCount = realTasks.length;
  const concludeTasksCount = realTasks.filter((t) => t.concluded).length;

  return {
    tasks,
    isLoadingTasks,
    isUpdatingTask,
    isDeletingTask,
    prepareTask,
    createTask,
    updateTask,
    updateTaskStatus,
    deleteTask,
    tasksCount,
    concludeTasksCount,
  };
}
