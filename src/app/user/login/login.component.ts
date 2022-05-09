import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../user';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  form!: FormGroup;
  logged!:boolean;

  constructor(private router:Router,public userService: UserService, private formBuilder: FormBuilder, private cookieService: CookieService) {}

  ngOnInit(): void{
    this.form=this.initForm();
  }

  initForm():FormGroup{
    return this.formBuilder.group({
      userName:['', [Validators.required, Validators.minLength(4), Validators.maxLength(15)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]]
      });
  }
  get log(){
    return this.logged;
  }

  get password(){
    return this.form.value.password;
  }

  onSubmit(){
    let user = new User(this.form.value.userName, this.form.value.password, this.form.value.email);
    console.log(user);
    this.userService.login(user).subscribe( (data) => {
      console.log(data);
      this.logged=data;
      if(this.logged){
        this.router.navigate(['/pokedex']);
        this.cookieService.set("user", user.getName());
      }
    }, (error) => {
      console.log("Error", error);
    });
  }
}
