import { Component, OnInit } from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {PokedexService} from "../pokedex.service";
import { Ability } from "./ability"

@Component({
  selector: 'app-abilitydex',
  templateUrl: './abilitydex.component.html',
  styleUrls: ['./abilitydex.component.css']
})
export class AbilitydexComponent implements OnInit {
  public abilities!: Ability[];
  public length!: number;

  constructor(public pokedexService: PokedexService) { }

  ngOnInit(): void {
    this.getAbilities();
    this.length = this.abilities.length;
  }

  public getAbilities(): void {
    this.pokedexService.getAbilities().subscribe(
      (response: Ability[]) => {
        this.abilities = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
