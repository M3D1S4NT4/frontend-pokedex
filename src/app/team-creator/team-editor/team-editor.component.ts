import { Component, OnInit } from '@angular/core';
import { TrainerPokemon } from './pokemon-editor/TrainerPokemon';

@Component({
  selector: 'app-team-editor',
  templateUrl: './team-editor.component.html',
  styleUrls: ['./team-editor.component.css']
})
export class TeamEditorComponent implements OnInit {
  pokemons!: TrainerPokemon[];

  constructor() { }

  ngOnInit(): void {
  }
}
