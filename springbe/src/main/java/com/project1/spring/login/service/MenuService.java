package com.project1.spring.login.service;

import com.project1.spring.login.exception.ResourceNotFoundException;
// import com.project1.spring.login.models.ERole;
import com.project1.spring.login.models.Menu;
import com.project1.spring.login.models.Role;
import com.project1.spring.login.models.User;
import com.project1.spring.login.repository.MenuRepository;
import com.project1.spring.login.repository.RoleRepository;
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
    public MenuService(MenuRepository menuRepository, RoleRepository roleRepository) {
        this.menuRepository = menuRepository;
        this.roleRepository = roleRepository;
    }

    public List<Menu> getAllMenu() {
        return menuRepository.findAll();
    }

    public Menu getMenuById(long id) {
        return menuRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("menu not exit with id:" + id));
    }

    public Menu createMenu(Menu menu) {
        return menuRepository.save(menu);
    }

    public Menu updateMenuById(long id, Menu menuDetails) {
        Menu menu = menuRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("menu not exit with id:" + id));

        menu.setNameMenu(menuDetails.getNameMenu());
        menu.setCode(menuDetails.getCode());
        menu.setUrl(menuDetails.getUrl());
        menu.setUrlParent(menuDetails.getUrlParent());
        menu.setDescription(menuDetails.getDescription());
        menu.setIcon(menuDetails.getIcon());

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

    // public List<Menu> getMenuByRole(String roleName) {
    // Role role = roleRepository.findByName(ERole.valueOf(roleName))
    // .orElseThrow(() -> new ResourceNotFoundException("Role not found: " +
    // roleName));

    // return menuRepository.findByRole(role);
    // }
    public List<Menu> getMenuByRole(String roleName) {
        Role role = roleRepository.findByName(roleName)
                .orElseThrow(() -> new ResourceNotFoundException("Role not found: " +
                        roleName));

        return menuRepository.findByRole(role);
    }

    public List<Menu> updateMenuByRole(String roleName, List<Long> menuIds) {
        Role role = roleRepository.findByName(roleName)
                .orElseThrow(() -> new ResourceNotFoundException("Role not found: " + roleName));

        List<Menu> menus = menuRepository.findAllById(menuIds);

        for (Menu menu : menus) {
            menu.getRoles().add(role);
        }

        List<Menu> existingMenus = menuRepository.findAll();
        for (Menu existingMenu : existingMenus) {
            if (!menus.contains(existingMenu)) {
                existingMenu.getRoles().remove(role);
            }
        }

        return menuRepository.saveAll(existingMenus);
    }

}