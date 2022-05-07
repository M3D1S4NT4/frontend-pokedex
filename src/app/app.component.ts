import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {CookieService} from "ngx-cookie-service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  /*public pokedex: Pokemon[] | undefined;

  constructor(private pokedexService: PokedexService){}

  ngOnInit() {
    this.getPokedex();
  }

  public getPokedex(): void {
    this.pokedexService.getPokedex().subscribe(
      (response: Pokemon[]) => {
        this.pokedex = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }*/
  constructor ( private cookieSvc: CookieService){
  }

  ngOnInit():void {
    if (this.cookieSvc.get("user") == null) {
      this.cookieSvc.deleteAll();
      this.cookieSvc.set('user', '');
      console.log(this.cookieSvc.get('user'));
    } else {
      console.log("El usuario esta autenticado con id: " + this.cookieSvc.get('user'));
    }
  }
}
