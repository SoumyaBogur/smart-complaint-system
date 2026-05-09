package com.project;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserRepository repo;

    @PostMapping("/register")
    public String register(@RequestBody User user) {
        if (repo.findByEmail(user.getEmail()) != null) {
            return "Email already registered!";
        }
        user.setRole("USER");
        repo.save(user);
        return "User registered successfully!";
    }

    @PostMapping("/login")
    public User login(@RequestBody User user) {
        return repo.findByEmailAndPassword(
                user.getEmail(),
                user.getPassword()
        );
    }
}