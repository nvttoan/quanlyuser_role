import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../../services/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../../../model/employee.model';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {

  id!: number;
  employee: Employee = new Employee();
  constructor(private employeeService: EmployeeService,
    private route: ActivatedRoute,private router: Router){

  }
  ngOnInit(): void {
    this.id= this.route.snapshot.params['id'];
      this.employeeService.getEmployeeById(this.id).subscribe(data =>{
        this.employee =data;
      }),console.error();
  }
  saveEmployee(){
    this.employeeService.CreateEmployee(this.employee).subscribe(data =>{
      console.log(data);
      this.goToEmployeeList();
    }),
    console.error();
    
  }
  goToEmployeeList(){
    this.router.navigate(['/admin']);
  }



}
