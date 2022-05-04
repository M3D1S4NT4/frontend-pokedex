import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import {User} from "../user/user";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  public isMenuCollapsed = true;
  logged!:boolean;
  username!: string;
  constructor() { }

  ngOnInit(): void {
  }

  usernameOnChanges(name: string) {
    this.username = name;
    this.logged = true;
  }

}
