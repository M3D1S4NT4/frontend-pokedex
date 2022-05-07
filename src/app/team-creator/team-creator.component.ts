import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../pokedex/pokemon';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-team-creator',
  templateUrl: './team-creator.component.html',
  styleUrls: ['./team-creator.component.css']
})
export class TeamCreatorComponent implements OnInit {
  cookie!: CookieService;
  teams!: (Pokemon[])[];

  constructor() { }

  ngOnInit(): void {

  }

  getTeams() {

  }
}
