package dev.gabrielmartins.todo.controller;

import dev.gabrielmartins.todo.domain.dto.task.CreateTaskDTO;
import dev.gabrielmartins.todo.domain.dto.task.TaskResponseDTO;
import dev.gabrielmartins.todo.domain.dto.task.UpdateTaskDTO;
import dev.gabrielmartins.todo.domain.entity.User;
import dev.gabrielmartins.todo.service.TaskService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/tasks")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @PostMapping
    public ResponseEntity<TaskResponseDTO> create(@RequestBody @Valid CreateTaskDTO data,
                                                  @AuthenticationPrincipal User user) {

        var newTask = taskService.createTask(data, user);
        return ResponseEntity.status(HttpStatus.CREATED).body(new TaskResponseDTO(newTask));

    }

    @GetMapping
    public ResponseEntity<List<TaskResponseDTO>> listAll(@AuthenticationPrincipal User user) {
        var tasks = taskService.listTasksByUser(user);

        var response = tasks.stream().map(TaskResponseDTO:: new).toList();

        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TaskResponseDTO> update(@PathVariable UUID id,
                                                  @RequestBody @Valid UpdateTaskDTO data,
                                                  @AuthenticationPrincipal User user) {

        var updatedTask = taskService.updateTask(id , data , user);

        return ResponseEntity.ok(new TaskResponseDTO(updatedTask));

    }

    @PatchMapping("/{id}/toggle")
    public ResponseEntity<TaskResponseDTO> toggleConclusion(@PathVariable UUID id,
                                                            @AuthenticationPrincipal User user) {

        var updatedTask = taskService.toggleTaskConclusion(id , user);

        return ResponseEntity.ok(new TaskResponseDTO(updatedTask));

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete (@PathVariable UUID id,
                                        @AuthenticationPrincipal User user) {

        taskService.deleteTask(id , user);

        return ResponseEntity.noContent().build();

    }

}
