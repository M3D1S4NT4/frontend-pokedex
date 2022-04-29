import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  form!: FormGroup;

  constructor(public userService: UserService, private formBuilder : FormBuilder) { }
  
  ngOnInit(): void {
    this.form = this.initForm();  
  }

  initForm(): FormGroup {
    return this.formBuilder.group({
      userName: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(15)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
      repeatPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30), comparePasswdValidator]]
    }, {
      validator: comparePasswdValidator('password', 'repeatPassword')
    })
  }

  onSubmit():void {
    let user: User = {name: this.form.value.userName, password: this.form.value.password, email: this.form.value.email};
    console.log(user);
    this.userService.register(user).subscribe( (data) => {
      console.log(data);
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

  consoleLog():void {
    let user: User = {name: this.form.value.userName, password: this.form.value.password, email: this.form.value.email};
    console.log(user);
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
