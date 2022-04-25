import { Component, OnInit } from '@angular/core';
import {PokedexService} from "../pokedex.service";
import {Pokemon} from "../pokemon";
import {HttpErrorResponse} from "@angular/common/http";
import {Nature} from "./nature";

@Component({
  selector: 'app-natures',
  templateUrl: './natures.component.html',
  styleUrls: ['./natures.component.css']
})
export class NaturesComponent implements OnInit {
  public natures: Nature[] | undefined;

  constructor(public pokedexService: PokedexService) { }

  ngOnInit(): void {
    this.getNatures();
  }

  public getNatures(): void {
    this.pokedexService.getNatures().subscribe(
      (response: Nature[]) => {
        this.natures = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

}
