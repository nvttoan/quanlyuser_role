import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css'],
})
export class UpdateUserComponent implements OnInit {
  roleOptions: { name: string }[] = [
    { name: 'ROLE_USER' },
    { name: 'ROLE_MODERATOR' },
    { name: 'ROLE_ADMIN' },
  ];
  id!: number;
  user: User = new User();
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.userService.getUserById(this.id).subscribe((data) => {
      this.user = data;
    }),
      console.error();
  }
  myForm: FormGroup;
  saveUser() {
    this.user.roles = this.selectedRoles.map((roleName) => ({
      name: roleName,
    }));

    this.userService.updateUser(this.user.id, this.user).subscribe(
      (data) => {
        this.goToUserList();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  selectedRoles: string[] = [];

  goToUserList() {
    this.router.navigate(['/usertable']);
  }
}
