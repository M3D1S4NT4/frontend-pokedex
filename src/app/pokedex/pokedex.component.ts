import {Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef} from '@angular/core';
import { PokeCollapseComponent } from "./poke-collapse/poke-collapse.component";

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.css']
})
export class PokedexComponent implements OnInit {
  selected: string = '';

  @ViewChild(PokeCollapseComponent) hijo: any;

  constructor(public changeDetector: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.selected = this.hijo.selected;
  }
}
