// package com.project1.spring.login.service;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.data.domain.Page;
// import org.springframework.data.domain.PageRequest;
// import org.springframework.data.domain.Pageable;
// import org.springframework.stereotype.Service;

// import com.project1.spring.login.models.Employee;
// import com.project1.spring.login.exception.ResourceNotFoundException;
// import com.project1.spring.login.repository.EmployeeRepository;

// import java.util.List;

// @Service
// public class EmployeeService {
// @Autowired
// private EmployeeRepository employeeRepository;

// public EmployeeService(EmployeeRepository employeeRepository) {
// this.employeeRepository = employeeRepository;
// }

// public List<Employee> getAllEmployees() {
// return employeeRepository.findAll();
// }

// public Employee createEmployee(Employee employee) {
// return employeeRepository.save(employee);
// }

// public Employee getEmployeeById(long id) {
// return employeeRepository.findById(id)
// .orElseThrow(() -> new ResourceNotFoundException("employee not exit with id:"
// + id));
// }

// public Employee updateEmployee(long id, Employee employeeDetails) {
// Employee employee = employeeRepository.findById(id)
// .orElseThrow(() -> new ResourceNotFoundException("employee not exit with id:"
// + id));

// employee.setFirstName(employeeDetails.getFirstName());
// employee.setLastName(employeeDetails.getLastName());
// employee.setEmailId(employeeDetails.getEmailId());

// return employeeRepository.save(employee);
// }

// public void deleteEmployee(long id) {
// Employee employee = employeeRepository.findById(id)
// .orElseThrow(() -> new ResourceNotFoundException("employee not exit with id:"
// + id));
// employeeRepository.delete(employee);
// }

// // phân trang
// public Page<Employee> getPaginatedEmployees(int page, int size) {
// Pageable pageable = PageRequest.of(page - 1, size);
// return employeeRepository.findAll(pageable);
// }
// // tìm kiếm

// public List<Employee> findByFirstNameOrLastNameOrAgeOrEmailId(String
// firstName, String lastName, long age,
// String emailId) {
// return employeeRepository.findByFirstNameOrLastNameOrAgeOrEmailId(firstName,
// lastName, age, emailId);
// }
// }
