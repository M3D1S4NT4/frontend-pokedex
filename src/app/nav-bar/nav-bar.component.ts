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
  public name : string = '';

  constructor(private cookieService:CookieService) {  }

  ngOnInit(): void {
    if ((this.name = this.cookieService.get("user")) != null) {
      console.log(this.name);
    }
  }
}
