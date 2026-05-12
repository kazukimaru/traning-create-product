package com.example.backend.controller;

import com.example.backend.domain.entity.User;
import com.example.backend.domain.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    private final UserRepository userRepository;

    @GetMapping("/{email}/company")
    public ResponseEntity<String> getUserCompany(@PathVariable String email) {
        Optional<User> user = userRepository.findById(email);
        return user.map(u -> ResponseEntity.ok(u.getCompany()))
                   .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
