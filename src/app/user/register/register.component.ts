import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from '../user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  form = new FormGroup({
    userName: new FormControl(''),
    password: new FormControl(''),
    email: new FormControl(''),
  });

  constructor(public userService: UserService) { }

  onSubmit() {
    let user: User = {name: this.form.value.userName, password: this.form.value.password, email: this.form.value.email};
    console.log(user);
    this.userService.register(user).subscribe( (data) => {
      console.log(data);
    }, (error) => {
      console.log("Error", error);
    } 
    );
  }

}
