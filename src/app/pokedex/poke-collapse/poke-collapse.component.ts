import {Component, EventEmitter, OnInit, Output} from '@angular/core';
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
  public isCollapsed = true;
  @Output() selected = new EventEmitter<string>();

  constructor(private pokedexService: PokedexService){}

  ngOnInit() {
    if (this.pokedex == null) {
      this.getPokedex();
    }
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

  public changeNames(name: string) {
    this.selected.emit(name);
  }
}
