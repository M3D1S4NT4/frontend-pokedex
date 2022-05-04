import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../pokedex/pokemon';
import { User } from "../user/user";

@Component({
  selector: 'app-team-creator',
  templateUrl: './team-creator.component.html',
  styleUrls: ['./team-creator.component.css']
})
export class TeamCreatorComponent implements OnInit {
  user!: User;
  teams!: Pokemon[];

  constructor() { }

  ngOnInit(): void {

  }

}
