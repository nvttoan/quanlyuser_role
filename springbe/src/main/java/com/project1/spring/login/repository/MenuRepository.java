package com.project1.spring.login.repository;

// import com.project1.spring.login.models.ERole;
import com.project1.spring.login.models.Menu;
import com.project1.spring.login.models.Role;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface MenuRepository extends JpaRepository<Menu, Long> {
    @Query("SELECT m FROM Menu m JOIN m.roles r WHERE r = :role")
    List<Menu> findByRole(Role role);

    List<Menu> findByRolesContaining(String role);
}
