import {Component, OnInit, ViewChild} from '@angular/core';
import {Ability} from "../../../pokedex/abilitydex/ability";
import {PokedexService} from "../../../pokedex/pokedex.service";
import {HttpErrorResponse} from "@angular/common/http";
import {NgbTypeahead} from "@ng-bootstrap/ng-bootstrap";
import {merge, Observable, OperatorFunction, Subject} from "rxjs";
import {debounceTime, distinctUntilChanged, filter, map} from "rxjs/operators";
import {Pokemon} from "../../../pokedex/pokemon";
import {Item} from "../../../pokedex/itemdex/item";
import {Move} from "../../../pokedex/movedex/move";
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-pokemon-editor',
  templateUrl: './pokemon-editor.component.html',
  styleUrls: ['./pokemon-editor.component.css'],
  providers: [TitleCasePipe]
})
export class PokemonEditorComponent implements OnInit {
  public pokemon!: Pokemon[];
  public items!: Item[];
  public abilities!: Ability[];
  public moves!: Move[];
  public model!: any;
  public item!: any;
  public ability!: any;
  public move1!: any;
  public move2!: any;
  public move3!: any;
  public move4!: any;

  constructor(public pokedexService: PokedexService, public titlecasePipe: TitleCasePipe) { }

  ngOnInit(): void {
    this.getPokemon();
    this.getItems()
  }

  public getPokemon(): void {
    this.pokedexService.getPokedex().subscribe(
      (response: Pokemon[]) => {
        this.pokemon = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getPokemonNames(): string[] {
    let aux = [];
    for (let i = 0; i < this.pokemon.length; i++) {
      aux[i] = this.pokemon[i].name;
    }
    return aux;
  }

  public getPokemonAbilities(): string[] {
    for (let i = 0; i < this.pokemon.length; i++) {
      if (this.model == this.pokemon[i].name) {
        let aux = this.pokemon[i].possibleAbilities;
        for (let j = 0; j < aux.length; j++) {
          if (aux[j] == "-") {
            delete aux[j];
          }
        }
        return aux;
      }
    }
    return [];
  }

  public getPokemonMoves(): string[] {
    for (let i = 0; i < this.pokemon.length; i++) {
      if (this.model == this.pokemon[i].name) {
        let aux = this.pokemon[i].learnset;
        for (let j = 0; j < aux.length; j++) {
          if (this.move1 ==  aux[j] || this.move2 ==  aux[j] || this.move3 ==  aux[j] || this.move4 ==  aux[j]) {
            delete  aux[j];
            continue;
          }
          aux[j] = aux[j].replace("-", " ");
          aux[j] = this.titlecasePipe.transform(aux[j]);
        }
        return aux;
      }
    }
    return [];
  }

  public getItems(): void {
    this.pokedexService.getItems().subscribe(
      (response: Item[]) => {
        this.items = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getItemsNames(): string[] {
    let aux = [];
    for (let i = 0; i < this.items.length; i++) {
      aux[i] = this.items[i].name;
    }
    return aux;
  }

  deleteFlags(): void {
    this.model = null;
    this.ability = null;
    this.item = null;
    this.move1 = null;
    this.move2 = null;
    this.move3 = null;
    this.move4 = null;
  }

  @ViewChild('instance', {static: true}) instance!: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  searchPokemon: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
    const inputFocus$ = this.focus$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => (term === '' ? this.getPokemonNames()
        : this.getPokemonNames().filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    );
  }

  @ViewChild('instanceItem', {static: true}) instanceItem!: NgbTypeahead;
  focusItem$ = new Subject<string>();
  clickItem$ = new Subject<string>();

  searchItems: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.clickItem$.pipe(filter(() => !this.instanceItem.isPopupOpen()));
    const inputFocus$ = this.focusItem$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => (term === '' ? this.getItemsNames()
        : this.getItemsNames().filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    );
  }

  @ViewChild('instanceAbility', {static: true}) instanceAbility!: NgbTypeahead;
  focusAbility$ = new Subject<string>();
  clickAbility$ = new Subject<string>();

  searchAbilities: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.clickAbility$.pipe(filter(() => !this.instanceAbility.isPopupOpen()));
    const inputFocus$ = this.focusAbility$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => (term === '' ? this.getPokemonAbilities()
        : this.getPokemonAbilities().filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    );
  }

  @ViewChild('instanceMove1', {static: true}) instanceMove1!: NgbTypeahead;
  focusMove1$ = new Subject<string>();
  clickMove1$ = new Subject<string>();

  searchMoves1: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.clickMove1$.pipe(filter(() => !this.instanceMove1.isPopupOpen()));
    const inputFocus$ = this.focusMove1$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => (term === '' ? this.getPokemonMoves()
        : this.getPokemonMoves().filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)))
    );
  }

  @ViewChild('instanceMove2', {static: true}) instanceMove2!: NgbTypeahead;
  focusMove2$ = new Subject<string>();
  clickMove2$ = new Subject<string>();

  searchMoves2: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.clickMove2$.pipe(filter(() => !this.instanceMove2.isPopupOpen()));
    const inputFocus$ = this.focusMove2$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => (term === '' ? this.getPokemonMoves()
        : this.getPokemonMoves().filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)))
    );
  }

  @ViewChild('instanceMove3', {static: true}) instanceMove3!: NgbTypeahead;
  focusMove3$ = new Subject<string>();
  clickMove3$ = new Subject<string>();

  searchMoves3: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.clickMove3$.pipe(filter(() => !this.instanceMove3.isPopupOpen()));
    const inputFocus$ = this.focusMove3$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => (term === '' ? this.getPokemonMoves()
        : this.getPokemonMoves().filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)))
    );
  }

  @ViewChild('instanceMove4', {static: true}) instanceMove4!: NgbTypeahead;
  focusMove4$ = new Subject<string>();
  clickMove4$ = new Subject<string>();

  searchMoves4: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.clickMove4$.pipe(filter(() => !this.instanceMove4.isPopupOpen()));
    const inputFocus$ = this.focusMove4$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => (term === '' ? this.getPokemonMoves()
        : this.getPokemonMoves().filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)))
    );
  }
}
