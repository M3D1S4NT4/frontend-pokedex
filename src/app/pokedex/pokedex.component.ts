import {Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef} from '@angular/core';
import { PokeCollapseComponent } from "./poke-collapse/poke-collapse.component";
@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.css']
})
export class PokedexComponent {
  selected: string = 'Bulbasaur';
  constructor() {

  }
  onChanges(name: string) {
    this.selected = name;
  }
}
