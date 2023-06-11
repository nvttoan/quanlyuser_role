import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Router } from '@angular/router';
import { Employee } from '../../model/employee.model';

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit {
  isModalVisible = false;
  employeeIdToDelete: number | undefined;
  employees: Employee[] | undefined;
  
  constructor(private employeeService: EmployeeService, private router:Router){

  }
  ngOnInit(): void {
      this.getEmployees();
      
  }
  private getEmployees(){
    this.employeeService.getEmployeesList().subscribe(data => {
      this.employees = data;
    })
  }
  employeeDetails(id:number){
    this.router.navigate(['employee-details', id]);

  }
  updateEmployee(id: number){
    this.router.navigate(['update-employee', id]);
  }
  deleteEmployee(id: number){
    this.employeeService.deleteEmployee(id).subscribe(data =>{
      console.log(data);
      this.getEmployees();
    })
  }
  
  //modal
  openModal(employeeId: number) {
    this.isModalVisible = true;
    this.employeeIdToDelete = employeeId;
  }

  closeModal() {
    this.isModalVisible = false;
    this.employeeIdToDelete = undefined;
  }
  
  deleteEmployeeConfirmed() {
    if (this.employeeIdToDelete) {
      this.employeeService.deleteEmployee(this.employeeIdToDelete).subscribe(() => {
        console.log("Employee deleted");
        this.isModalVisible = false;
        this.employeeIdToDelete = undefined;
        this.getEmployees();
      });
    }
  }
}

