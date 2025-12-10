package dev.gabrielmartins.todo.domain.dto.task;

import jakarta.validation.constraints.NotBlank;

public record CreateTaskDTO (
        @NotBlank(message = "o título da tarefa é obrigatório")
        String title
) { }
