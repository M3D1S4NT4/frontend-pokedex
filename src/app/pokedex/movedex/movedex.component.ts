import { Component, OnInit, ViewChild } from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {NgbTypeahead} from '@ng-bootstrap/ng-bootstrap';
import {Observable, Subject, merge, OperatorFunction} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, map} from 'rxjs/operators';
import {PokedexService} from "../pokedex.service";
import { Move } from "./move"

@Component({
  selector: 'app-movedex',
  templateUrl: './movedex.component.html',
  styles: ['.form-control { width: 25% !important; }']
})
export class MovedexComponent implements OnInit {
  public moves!: Move[];
  public names!: string[];
  public length!: number;
  public model!: any;
  public searched = '';
  public sPower!: string;
  public sAccuracy!: string;
  public sType!: string;
  public sCategory!: string;
  constructor(public pokedexService: PokedexService) { }

  ngOnInit(): void {
    this.getMoves();
  }

  public getMoves(): void {
    this.pokedexService.getMoves().subscribe(
      (response: Move[]) => {
        this.moves = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getNames(): string[] {
    let aux = [];
    for (let i = 0; i < this.moves.length; i++) {
      aux[i] = this.moves[i].name;
    }
    return aux;
  }

  public duplicateModel(modelString: string): void {
    let aux = '';
    for (let i = 0; i < this.moves.length; i++) {
      if (modelString == this.moves[i].name) {
        aux = this.moves[i].description;
        this.searched = aux;
        aux = this.moves[i].basePower;
        this.sPower = aux;
        aux = this.moves[i].baseAccuracy;
        this.sAccuracy = aux;
        aux = this.moves[i].type;
        this.sType = aux;
        aux = this.moves[i].category;
        this.sCategory = aux;
        return;
      }
    }
  }

  public deleteModel(): void {
    let aux = '';
    this.searched = aux;
    this.sPower = aux;
    this.sAccuracy = aux;
    this.sType = aux;
    this.sCategory = aux;
    return;
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
