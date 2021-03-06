import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) { }

    login(user : User): Observable<boolean> {
      return this.http.post<boolean>(`${this.apiServerUrl}/controller/login`, user);
    }

    register(user: User): Observable<User> {
      return this.http.post<User>(`${this.apiServerUrl}/controller/register`, user);
    }

    getEmailByName(name: string): Observable<User> {
      return this.http.post<User>(`${this.apiServerUrl}/controller/getEmailByName`, name);
    }

    deleteUser(name : string): Observable<boolean> {
      return this.http.post<boolean>(`${this.apiServerUrl}/controller/deleteUser`, name);
    }
}
