package com.project1.spring.login.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project1.spring.login.models.Role;
import com.project1.spring.login.repository.RoleRepository;
import com.project1.spring.login.service.RoleService;

@RestController
@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true", maxAge = 3600)
@RequestMapping("/api/crud")

public class RoleController {

    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private RoleService roleService;

    public RoleController(RoleService roleService) {
        this.roleService = roleService;
    }

    // phân trang
    @GetMapping("/paginatedroles")
    public List<Role> getAllRoles(@RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "5") int size) {
        Page<Role> rolePage = roleService.getPaginatedRoles(page, size);
        List<Role> roles = rolePage.getContent();

        return roles;
    }

    // lấy tổng role trong db
    @GetMapping("/gettotalroles")
    public long getTotalRoles() {
        return roleRepository.count();
    }

    @GetMapping("/rolelist")
    public List<Role> getAllRoles() {
        return roleService.getAllRoles();
    }

    @GetMapping("/getrole/{id}")
    public ResponseEntity<Role> getRoleById(@PathVariable long id) {
        Role role = roleService.getRoleById(id);
        return ResponseEntity.ok(role);
    }

    @PostMapping("/addrole")
    public Role addRole(@RequestBody Role role) {
        return roleService.addRole(role);
    }

    @PutMapping("/updaterole/{id}")
    public ResponseEntity<Role> updateRole(@PathVariable long id, @RequestBody Role roleDetails) {
        Role role = roleService.updateRole(id, roleDetails);
        return ResponseEntity.ok(role);
    }

    @DeleteMapping("/deleterole/{id}")
    public void deleteRole(@PathVariable Integer id) {
        roleService.deleteRole(id);
    }
}
