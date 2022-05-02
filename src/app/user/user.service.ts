import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './user';
import {sha512} from "js-sha512";


@Injectable({
  providedIn: 'root'
})
export class UserService {

    private apiServerUrl= environment.apiBaseUrl;

    constructor(private http: HttpClient) { }

    login(user : User): Observable<User> {
      user.password = sha512(user.password);
        return this.http.post<User>(`${this.apiServerUrl}/controller/login`, user);
    }

    register(user: User): Observable<User> {
      user.password = sha512(user.password);
      return this.http.post<User>(`${this.apiServerUrl}/controller/register`, user);
    }
}
