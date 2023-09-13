// package com.project1.spring.login.controllers;

// import java.util.HashMap;
// import java.util.List;
// import java.util.Map;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.data.domain.Page;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.CrossOrigin;
// import org.springframework.web.bind.annotation.DeleteMapping;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.PathVariable;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.PutMapping;
// import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RequestParam;
// import org.springframework.web.bind.annotation.RestController;

// import com.project1.spring.login.models.Employee;
// import com.project1.spring.login.repository.EmployeeRepository;
// import com.project1.spring.login.service.EmployeeService;

// @RestController
// @CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true",
// maxAge = 3600)
// @RequestMapping("/api/crud")
// public class EmployeeController {
// @Autowired
// private EmployeeRepository employeeRepository;
// @Autowired
// private EmployeeService employeeService;

// public EmployeeController(EmployeeService employeeService) {
// this.employeeService = employeeService;
// }

// @GetMapping("/employees")
// public List<Employee> getAllEmployees(@RequestParam(defaultValue = "1") int
// page,
// @RequestParam(defaultValue = "5") int size) {
// Page<Employee> employeePage = employeeService.getPaginatedEmployees(page,
// size);
// List<Employee> employees = employeePage.getContent();

// return employees;
// }

// // lấy tổng số employee trong db
// @GetMapping("/employees/total")
// public long getTotalEmployees() {
// return employeeRepository.count();
// }

// @PostMapping("/employees")
// public Employee createEmployee(@RequestBody Employee employee) {
// return employeeService.createEmployee(employee);
// }

// @GetMapping("/employees/{id}")
// public ResponseEntity<Employee> getEmployeeById(@PathVariable long id) {
// Employee employee = employeeService.getEmployeeById(id);
// return ResponseEntity.ok(employee);
// }

// @PutMapping("/employees/{id}")
// public ResponseEntity<Employee> updateEmployee(@PathVariable long id,
// @RequestBody Employee employeeDetails) {
// Employee employee = employeeService.updateEmployee(id, employeeDetails);
// return ResponseEntity.ok(employee);
// }

// @DeleteMapping("/employees/{id}")
// public ResponseEntity<Map<String, Boolean>> deleteEmployee(@PathVariable long
// id) {
// employeeService.deleteEmployee(id);
// Map<String, Boolean> response = new HashMap<>();
// response.put("delete", Boolean.TRUE);
// return ResponseEntity.ok(response);
// }

// // search
// @GetMapping("/employees/search")
// public List<Employee> searchEmployees(
// @RequestParam(required = false) String firstName,
// @RequestParam(required = false) String lastName,
// @RequestParam(required = false) long age,
// @RequestParam(required = false) String emailId) {
// return employeeService.findByFirstNameOrLastNameOrAgeOrEmailId(firstName,
// lastName, age, emailId);
// }
// }