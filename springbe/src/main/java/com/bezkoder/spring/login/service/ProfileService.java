package com.bezkoder.spring.login.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bezkoder.spring.login.models.Employee;
import com.bezkoder.spring.login.models.User;
import com.bezkoder.spring.login.exception.ResourceNotFoundException;
import com.bezkoder.spring.login.repository.EmployeeRepository;

import java.util.List;

@Service
public class ProfileService {
    @Autowired
    private EmployeeRepository employeeRepository;

    public ProfileService(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }
        public Employee updateProfile(long id, Employee employeeDetail) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("employee not exit with id:" + id));
                
        employee.setAvatar(employeeDetail.getAvatar());

        return employeeRepository.save(employee);
    }
}
