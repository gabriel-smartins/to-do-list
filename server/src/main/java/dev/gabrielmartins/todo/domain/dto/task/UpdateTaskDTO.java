package dev.gabrielmartins.todo.domain.dto.task;

import jakarta.validation.constraints.NotBlank;

public record UpdateTaskDTO(
        @NotBlank
        String title
) {
}
