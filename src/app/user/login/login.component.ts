import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../user.service';
import { User } from '../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  form = new FormGroup({
    userName: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(public userService: UserService) {}

  onSubmit(){
    
    let user: User = {name: this.form.value.userName, password: this.form.value.password, email: this.form.value.email};
    console.log(user);
    this.userService.login(user).subscribe( (data) => {
      console.log(data);
    }, (error) => {
      console.log("Error", error);
    } 
    );
  }
}
