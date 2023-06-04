package com.bezkoder.spring.login.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bezkoder.spring.login.models.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

}
