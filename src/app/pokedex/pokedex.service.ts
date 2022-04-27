import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pokemon } from './pokemon';
import { Nature } from "./natures/nature";
import { typeCalculator } from "./type-calculator/typeCalculator"
import { Ability } from "./abilitydex/ability"

@Injectable({
  providedIn: 'root'
})
export class PokedexService {
private apiServerUrl= environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getPokedex(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(`${this.apiServerUrl}/controller/getPokedex`)
  }

  public getNatures(): Observable<Nature[]> {
    return this.http.get<Nature[]>(`${this.apiServerUrl}/controller/getNatures`)
  }

  public getAbilities(): Observable<Ability[]> {
    return this.http.get<Ability[]>(`${this.apiServerUrl}/controller/getAbilities`)
  }
}
