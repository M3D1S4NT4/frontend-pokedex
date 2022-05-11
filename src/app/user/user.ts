import * as sha512 from 'js-sha512';
import { CookieService } from 'ngx-cookie-service';
import { Pokemon } from '../pokedex/pokemon';

export class User{
  private name: string;
  private password: string;
  public email: string;
  public teams!: Pokemon[];

  constructor(userName: string, passwd: string, email: string) {
    this.name = userName;
    this.password = sha512.sha512(passwd);
    this.email = email;
  }

  getName(){
    return this.name;
  }

  getPassword(){
    return this.password;
  }
}
