package dev.gabrielmartins.todo.domain.dto.task;

import dev.gabrielmartins.todo.domain.entity.Task;

import java.util.UUID;

public record TaskResponseDTO(
        UUID id,
        String title,
        Boolean concluded
) {
    public TaskResponseDTO(Task task) {
      this(task.getId() , task.getTitle(), task.getConcluded());
    }
}
