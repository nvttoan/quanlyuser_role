package com.bezkoder.spring.login.controllers;

import com.bezkoder.spring.login.models.Employee;
import com.bezkoder.spring.login.models.User;
import com.bezkoder.spring.login.repository.UserRepository;
import com.bezkoder.spring.login.service.ProfileService;
import com.bezkoder.spring.login.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true", maxAge = 3600)
@RequestMapping("/api/crud")

public class ProfileController {
    @Autowired
    private ProfileService profileService;

    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }
    @PutMapping("/profile/{id}")
    public ResponseEntity<Employee> updateProfile(@PathVariable long id, @RequestBody Employee employeeDetail) {
        Employee employee = profileService.updateProfile(id, employeeDetail);
        return ResponseEntity.ok(employee);
    }

}
