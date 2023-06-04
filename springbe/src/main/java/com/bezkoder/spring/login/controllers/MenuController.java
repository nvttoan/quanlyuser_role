package com.bezkoder.spring.login.controllers;

import com.bezkoder.spring.login.models.Menu;
import com.bezkoder.spring.login.models.User;
import com.bezkoder.spring.login.service.MenuService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true", maxAge = 3600)
@RequestMapping("/api/crud")

public class MenuController {
    @Autowired
    private MenuService menuService;
    public MenuController(MenuService menuService){ this.menuService = menuService;}
    @GetMapping("/menu")
    public List<Menu> getAllMenu() {
        return menuService.getAllMenu();
    }
}
