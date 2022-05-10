import { Component, OnInit } from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";
import {UserService} from "../user.service";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  form!: FormGroup;
  nameFromCookie!: string;
  emailFromDB!:string;

  constructor(private cookieService: CookieService, private router: Router,public userService: UserService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    if((this.nameFromCookie=this.cookieService.get('user')) == ''){
      this.router.navigate(["/login"]);
    }

    this.userService.getEmailByName(this.name).subscribe( (data) => {
      console.log(data);
      this.emailFromDB=data.Email;
    }, (error) => {
      console.log("Error", error);
    });

    this.form=this.initForm();
  }

  initForm():FormGroup{
    return this.formBuilder.group({
      userName:[this.nameFromCookie, [Validators.required, Validators.minLength(4), Validators.maxLength(15)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
      email: [this.emailFromDB, [Validators.required, Validators.email]],
    });
  }

  logOut(): void{
    this.cookieService.deleteAll();
    this.router.navigate(["/pokedex"]);
  }

  onSubmit() {

  }

  get name(){
    return this.form.value.userName;
  }

  get email(){
    return this.form.value.email;
  }

  get passwd(){
    return this.form.value.password;
  }
}
