package dev.gabrielmartins.todo.service;

import dev.gabrielmartins.todo.domain.dto.task.CreateTaskDTO;
import dev.gabrielmartins.todo.domain.dto.task.UpdateTaskDTO;
import dev.gabrielmartins.todo.domain.entity.Task;
import dev.gabrielmartins.todo.domain.entity.User;
import dev.gabrielmartins.todo.repository.TaskRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    @Transactional
    public Task createTask(CreateTaskDTO data, User user) {
        Task newTask = new Task();
        newTask.setTitle(data.title());
        newTask.setUser(user);
        newTask.setConcluded(false);

        return taskRepository.save(newTask);
    }

    public List<Task> listTasksByUser(User user) {
        return taskRepository.findByUser(user);
    }

    @Transactional
    public Task updateTask(UUID taskId, UpdateTaskDTO data, User user) {
        Task task = getTaskOrThrow(taskId, user);

        task.setTitle(data.title());

        return taskRepository.save(task);
    }

    @Transactional
    public Task toggleTaskConclusion(UUID taskId, User user) {
        Task task = getTaskOrThrow(taskId, user);

        task.setConcluded(!task.getConcluded());

        return taskRepository.save(task);
    }

    @Transactional
    public void deleteTask(UUID taskId, User user) {
        Task task = getTaskOrThrow(taskId, user);

        taskRepository.delete(task);
    }

    public Task getTaskOrThrow(UUID taskId, User user) {

        Task task = taskRepository.findById(taskId).orElseThrow(
                () -> new RuntimeException("Tarefa não encontrada"));

        if (!task.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Acesso negado: Você não é o dono dessa tarefa!");
        }

        return task;
    }

}
