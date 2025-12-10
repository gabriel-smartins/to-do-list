package dev.gabrielmartins.todo.service;

import dev.gabrielmartins.todo.domain.dto.auth.LoginDTO;
import dev.gabrielmartins.todo.domain.dto.auth.RegisterDTO;
import dev.gabrielmartins.todo.domain.entity.User;
import dev.gabrielmartins.todo.repository.UserRepository;
import dev.gabrielmartins.todo.security.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    @Lazy
    PasswordEncoder passwordEncoder;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    TokenService tokenService;

    public void register(RegisterDTO data) {
        if(this.userRepository.findByUsername(data.username()).isPresent()) {
            throw new RuntimeException("User already exists");
        }

        String encryptedPassword = passwordEncoder.encode(data.password());

        User newUser = new User();
        newUser.setUsername(data.username());
        newUser.setPassword(encryptedPassword);

        this.userRepository.save(newUser);
    }

    public String login(LoginDTO data) {
        var usernamePassword = new UsernamePasswordAuthenticationToken(data.username(), data.password());

        var auth = this.authenticationManager.authenticate(usernamePassword);

        return tokenService.generateToken((User) auth.getPrincipal());
    }

}
