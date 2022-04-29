import { Component, OnInit, ViewChild } from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {NgbTypeahead} from '@ng-bootstrap/ng-bootstrap';
import {Observable, Subject, merge, OperatorFunction} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, map} from 'rxjs/operators';
import {PokedexService} from "../pokedex.service";
import { Ability } from "./ability"

@Component({
  selector: 'app-abilitydex',
  templateUrl: './abilitydex.component.html',
  styles: ['.form-control { width: 25% !important; }']
})
export class AbilitydexComponent implements OnInit {
  public abilities!: Ability[];
  public names!: string[];
  public length!: number;
  public model!: any;
  public searched = '';

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

  public getNames(): string[] {
    let aux = [];
    for (let i = 0; i < this.abilities.length; i++) {
      aux[i] = this.abilities[i].name;
    }
    return aux;
  }

  public duplicateModel(modelString: string): void {
    let aux = '';
    for (let i = 0; i < this.abilities.length; i++) {
      if (modelString == this.abilities[i].name) {
        aux = this.abilities[i].description;
        this.searched = aux;
        return;
      }
    }
  }

  @ViewChild('instance', {static: true}) instance!: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
    const inputFocus$ = this.focus$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => (term === '' ? this.getNames()
        : this.getNames().filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    );
  }
}
