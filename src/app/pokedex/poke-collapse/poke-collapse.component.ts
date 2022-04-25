import { Component, OnInit, Input} from '@angular/core';
//import {NgbActiveModal, NgbModal} from '../@ng-bootstrap/ng-bootstrap';
import {Pokemon} from "../pokemon";
import {PokedexService} from "../pokedex.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-poke-collapse',
  templateUrl: './poke-collapse.component.html',
  styleUrls: ['./poke-collapse.component.css']
})
export class PokeCollapseComponent implements OnInit {
  public pokedex: Pokemon[] | undefined;

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
  }

}
