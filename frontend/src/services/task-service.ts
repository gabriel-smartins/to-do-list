import { api } from "./api";

export interface Task {
  id: string;
  title: string;
  concluded: boolean;
}

export const taskService = {
  getAll: async () => {
    const response = await api.get<Task[]>("/tasks");
    return response.data;
  },

  create: async (title: string) => {
    const response = await api.post<Task>("/tasks", { title });
    return response.data;
  },

  toggle: async (id: string) => {
    const response = await api.patch<Task>(`/tasks/${id}/toggle`);
    return response.data;
  },
  update: async (id: string, title: string, description?: string) => {
    const response = await api.put<Task>(`/tasks/${id}`, {
      title,
      description,
    });
    return response.data;
  },

  delete: async (id: string) => {
    await api.delete(`/tasks/${id}`);
  },
};
