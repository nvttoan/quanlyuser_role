package com.project1.spring.login.controllers;

// import com.project1.spring.login.models.ERole;
import com.project1.spring.login.models.Menu;
import com.project1.spring.login.models.User;
import com.project1.spring.login.service.MenuService;
import com.project1.spring.login.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true", maxAge = 3600)
@RequestMapping("/api/crud")

public class MenuController {
    @Autowired
    private MenuService menuService;
    @Autowired
    private UserService userService;

    public MenuController(MenuService menuService, UserService userService) {
        this.menuService = menuService;
        this.userService = userService;
    }

    @GetMapping("/menu")
    public List<Menu> getAllMenu() {
        return menuService.getAllMenu();
    }

    @GetMapping("/menu/getbyid/{id}")
    public ResponseEntity<Menu> getMenuById(@PathVariable long id) {
        Menu menu = menuService.getMenuById(id);
        return ResponseEntity.ok(menu);
    }

    // @PostMapping("/menu")
    // public Menu createMenu(@RequestBody Menu menu) {
    // return menuService.createMenu(menu);
    // }

    @PutMapping("/menu/update/{id}")
    public ResponseEntity<Menu> updateMenuById(@PathVariable long id, @RequestBody Menu menuDetails) {
        Menu menu = menuService.updateMenuById(id, menuDetails);
        return ResponseEntity.ok(menu);
    }

    @DeleteMapping("/menu/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteMenu(@PathVariable long id) {
        menuService.deleteMenu(id);
        Map<String, Boolean> response = new HashMap<>();
        response.put("delete", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }

    // @GetMapping("/menu/{role}")
    // public ResponseEntity<List<Long>> getMenuIdsByRole(@PathVariable("role")
    // String roleName) {
    // List<Menu> menus = menuService.getMenuByRole(roleName);
    // List<Long> menuIds =
    // menus.stream().map(Menu::getId).collect(Collectors.toList());
    // return ResponseEntity.ok().body(menuIds);
    // }
    @GetMapping("/menu/{role}")
    public ResponseEntity<List<Menu>> getMenuListByRole(@PathVariable("role") String roleName) {
        List<Menu> menus = menuService.getMenuByRole(roleName);
        return ResponseEntity.ok().body(menus);
    }

    @PutMapping("/menu/{role}")
    public ResponseEntity<List<Menu>> updateMenuByRole(@PathVariable("role") String roleName,
            @RequestBody List<Long> menuIds) {
        List<Menu> updatedMenus = menuService.updateMenuByRole(roleName, menuIds);
        return ResponseEntity.ok(updatedMenus);
    }
}
