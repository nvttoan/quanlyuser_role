package com.bezkoder.spring.login.controllers;

import com.bezkoder.spring.login.models.User;
import com.bezkoder.spring.login.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true", maxAge = 3600)
@RequestMapping("/api/crud")

public class UserController {
    @Autowired
    private UserService userService;
    public UserController(UserService userService){ this.userService = userService;}
    @GetMapping("/user")
    public List<User> getAllUser() {
        return userService.getAllUser();
    }
    @PostMapping("/user")
    public User createUser(@RequestBody User user){ return userService.createUser(user);}
    @GetMapping("/user/{id}")
    public ResponseEntity<User> getUserById(@PathVariable long id){
        User user = userService.getUserById(id);
        return ResponseEntity.ok(user);
    }
    @PutMapping("/user/{id}")
    public ResponseEntity<User> updateUser(@PathVariable long id, @RequestBody User userDetails){
        User user = userService.updateUser(id,userDetails);
        return ResponseEntity.ok(user);
    }
    @DeleteMapping("/user/{id}")
    public ResponseEntity<Map<String,Boolean>> deleteUser(@PathVariable long id){
        userService.deleteUser(id);
        Map<String, Boolean> response = new HashMap<>();
        response.put("delete", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }

}
