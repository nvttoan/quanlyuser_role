package com.bezkoder.spring.login.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bezkoder.spring.login.models.Role;
import com.bezkoder.spring.login.repository.RoleRepository;

@Service
public class RoleService {
    private RoleRepository roleRepository;

    @Autowired
    public RoleService(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    public List<Role> getAllRoles() {
        return roleRepository.findAll();
    }

    public Role addRole(Role role) {
        return roleRepository.save(role);
    }

    public Role updateRole(long id, Role updatedRole) {
        Role role = roleRepository.findById(id).orElse(null);
        if (role != null) {
            role.setName(updatedRole.getName());
            return roleRepository.save(role);
        }
        return null;
    }

    public void deleteRole(long id) {
        roleRepository.deleteById(id);
    }
}
