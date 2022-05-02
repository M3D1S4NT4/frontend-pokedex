import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { UserService } from '../user.service';
import { User } from '../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  form!: FormGroup;

  constructor(public userService: UserService, private formBuilder: FormBuilder) {}

  ngOnInit(): void{
    this.form=this.initForm();
  }

  initForm():FormGroup{
    return this.formBuilder.group({
      userName: [''],
      password: ['']
    });
  }

  onSubmit(){
    let user = new User(this.form.value.userName, this.form.value.password, this.form.value.email);
    console.log(user);
    this.userService.login(user).subscribe( (data) => {
      console.log(data);
    }, (error) => {
      console.log("Error", error);
    }
    );
  }
}
