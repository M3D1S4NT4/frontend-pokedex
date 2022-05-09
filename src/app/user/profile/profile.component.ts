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
  name!: string;
  email!:string;

  constructor(private cookieService: CookieService, private router: Router,public userService: UserService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    if((this.name=this.cookieService.get('user'))==""){
      this.router.navigate(["/login"]);
    }

    this.userService.getEmailByName(this.name).subscribe( (data) => {
      console.log(data);
      this.email=data.Email;
    }, (error) => {
      console.log("Error", error);
    });

    this.form=this.initForm();
  }

  initForm():FormGroup{
    return this.formBuilder.group({
      userName:[this.name, [Validators.required, Validators.minLength(4), Validators.maxLength(15)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
      email: [this.email, [Validators.required, Validators.email]],
    });
  }

  logOut(): void{
    this.cookieService.deleteAll();
    this.router.navigate(["/pokedex"]);
  }
}
