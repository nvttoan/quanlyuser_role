package com.bezkoder.spring.login.repository;

import com.bezkoder.spring.login.models.Menu;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MenuRepository extends JpaRepository<Menu, Long> {
}
