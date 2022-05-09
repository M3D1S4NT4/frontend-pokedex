import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../user';
import {Router} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  form!: FormGroup;

  constructor(public userService: UserService, private formBuilder : FormBuilder, private router:Router, private cookieService: CookieService) { }

  ngOnInit(): void {
    this.form = this.initForm();
  }

  initForm(): FormGroup {
    return this.formBuilder.group({
      userName: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(15)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
      repeatPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]]
    }, {
      validator: comparePasswdValidator('password', 'repeatPassword')
    })
  }

  onSubmit():void {
    let user = new User(this.form.value.userName, this.form.value.password, this.form.value.email);
    this.userService.register(user).subscribe( (data) => {
      console.log(data);
      if(data!=null){
        this.router.navigate(['/pokedex']);
        this.cookieService.set("user", user.getName());
      }

    }, (error) => {
      console.log("Error", error);
    });
  }

  get name(){
    return this.form.get('userName');
  }

  get email(){
    return this.form.get('email');
  }

  get passwd(){
    return this.form.get('password');
  }

  get rPasswd(){
    return this.form.get('repeatPassword');
  }
}

function comparePasswdValidator(passwd: string, repeatPasswd: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[passwd];
    const matchingControl = formGroup.controls[repeatPasswd];
    if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
        return;
    }
    if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
    } else {
        matchingControl.setErrors(null);
    }
  }
}
