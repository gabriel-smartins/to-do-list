package dev.gabrielmartins.todo.repository;

import dev.gabrielmartins.todo.domain.entity.Task;
import dev.gabrielmartins.todo.domain.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface TaskRepository extends JpaRepository<Task, UUID> {
    List<Task> findByUser(User user);
}
