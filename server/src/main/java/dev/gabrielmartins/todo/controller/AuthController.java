package dev.gabrielmartins.todo.controller;

import dev.gabrielmartins.todo.domain.dto.auth.LoginDTO;
import dev.gabrielmartins.todo.domain.dto.auth.LoginResponseDTO;
import dev.gabrielmartins.todo.domain.dto.auth.RegisterDTO;
import dev.gabrielmartins.todo.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<Void> register(@RequestBody @Valid RegisterDTO data) {

        authService.register(data);

        return ResponseEntity.status(HttpStatus.CREATED).build();

    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody @Valid LoginDTO data) {

        var token = authService.login(data);

        return ResponseEntity.ok(new LoginResponseDTO(token));
    }
}
