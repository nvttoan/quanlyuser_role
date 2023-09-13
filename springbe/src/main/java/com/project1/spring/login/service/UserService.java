package com.project1.spring.login.service;

import com.project1.spring.login.exception.ResourceNotFoundException;
// import com.project1.spring.login.models.ERole;
import com.project1.spring.login.models.Menu;
import com.project1.spring.login.models.Role;
import com.project1.spring.login.models.User;
import com.project1.spring.login.repository.MenuRepository;
import com.project1.spring.login.repository.RoleRepository;
import com.project1.spring.login.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getAllUser() {
        return userRepository.findAll();
    }

    public User createUser(User user) {
        // kiểm tra xem tên người dùng hoặc email đã tồn tại trong repository
        if (userRepository.existsByUsername(user.getUsername())) {
            throw new ResourceNotFoundException("Username already exists: " + user.getUsername());
        }

        if (userRepository.existsByEmail(user.getEmail())) {
            throw new ResourceNotFoundException("Email already exists: " + user.getEmail());
        }

        // mã hóa password BCryptPasswordEncoder
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String encodedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);

        Set<Role> roles = user.getRoles();
        if (roles != null && !roles.isEmpty()) {
            Set<Role> assignedRoles = new HashSet<>();
            for (Role role : roles) {
                Role existingRole = roleRepository.findByName(role.getName())
                        .orElseThrow(() -> new ResourceNotFoundException("Role not found: " + role.getName()));
                assignedRoles.add(existingRole);
            }
            user.setRoles(assignedRoles);
        } else {
            throw new IllegalArgumentException("User must have at least one role.");
        }

        return userRepository.save(user);
    }

    public User getUserById(long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("user not exit with id:" + id));
    }

    public User updateUser(long id, User userDetails) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));

        user.setUsername(userDetails.getUsername());
        user.setEmail(userDetails.getEmail());
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String encodedPassword = passwordEncoder.encode(userDetails.getPassword());
        user.setPassword(encodedPassword);

        Set<Role> roles = userDetails.getRoles();
        if (roles != null) {
            // Lấy danh sách vai trò từ cơ sở dữ liệu dựa trên tên vai trò
            Set<Role> updatedRoles = new HashSet<>();
            for (Role role : roles) {
                Role existingRole = roleRepository.findByName(role.getName())
                        .orElseThrow(() -> new ResourceNotFoundException("Role not found: " + role.getName()));
                updatedRoles.add(existingRole);
            }

            user.setRoles(updatedRoles);
        }

        return userRepository.save(user);
    }

    public void deleteUser(long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("user not delete with id:" + id));
        userRepository.delete(user);

    }

    // phân trang
    public Page<User> getPaginatedUsers(int page, int size) {
        Pageable pageable = PageRequest.of(page - 1, size);
        return userRepository.findAll(pageable);
    }

}
