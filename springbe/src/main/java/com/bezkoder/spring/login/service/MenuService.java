package com.bezkoder.spring.login.service;

import com.bezkoder.spring.login.exception.ResourceNotFoundException;
import com.bezkoder.spring.login.models.Employee;
import com.bezkoder.spring.login.models.Menu;
import com.bezkoder.spring.login.models.Role;
import com.bezkoder.spring.login.models.User;
import com.bezkoder.spring.login.repository.MenuRepository;
import com.bezkoder.spring.login.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class MenuService {
    @Autowired
    private MenuRepository menuRepository;
    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    public MenuService(MenuRepository menuRepository) {
        this.menuRepository = menuRepository;
    }

    public List<Menu> getAllMenu() {
        return menuRepository.findAll();
    }

    public Menu getMenuById(long id) {
        return menuRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("menu not exit with id:" + id));
    }

    public Menu updateMenu(long id, Menu menuDetails) {
        Menu menu = menuRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("menu not exit with id:" + id));

        menu.setNameMenu(menuDetails.getNameMenu());
        menu.setCode(menuDetails.getCode());
        menu.setUrl(menuDetails.getUrl());
        menu.setUrlParent(menuDetails.getUrlParent());
        menu.setDescription(menuDetails.getDescription());
        Set<Role> roles = menuDetails.getRoles();
        if (roles != null) {
            // Lấy danh sách vai trò từ cơ sở dữ liệu dựa trên tên vai trò
            Set<Role> updatedRoles = new HashSet<>();
            for (Role role : roles) {
                Role existingRole = roleRepository.findByName(role.getName())
                        .orElseThrow(() -> new ResourceNotFoundException("Role not found: " + role.getName()));
                updatedRoles.add(existingRole);
            }

            menu.setRoles(updatedRoles);
        }

        return menuRepository.save(menu);
    }

    public void deleteMenu(long id) {
        Menu menu = menuRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("menu not delete with id:" + id));
        menuRepository.delete(menu);
    }
}
