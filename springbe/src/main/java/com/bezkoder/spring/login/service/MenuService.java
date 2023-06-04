package com.bezkoder.spring.login.service;

import com.bezkoder.spring.login.models.Menu;
import com.bezkoder.spring.login.repository.MenuRepository;
import com.bezkoder.spring.login.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MenuService {
    @Autowired
    private MenuRepository menuRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    public MenuService(MenuRepository menuRepository){this.menuRepository=menuRepository;}
    public List<Menu> getAllMenu(){return menuRepository.findAll();}
}
