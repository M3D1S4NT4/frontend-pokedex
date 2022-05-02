import {Component, OnInit, ViewChild} from '@angular/core';
import {NgbTypeahead} from "@ng-bootstrap/ng-bootstrap";
import {merge, Observable, OperatorFunction, Subject} from "rxjs";
import {debounceTime, distinctUntilChanged, filter, map} from "rxjs/operators";
import {PokedexService} from "../pokedex.service";
import {Ability} from "../abilitydex/ability";
import {HttpErrorResponse} from "@angular/common/http";
import {Item} from "./item";

@Component({
  selector: 'app-itemdex',
  templateUrl: './itemdex.component.html',
  styles: ['.form-control { width: 25% !important; }']
})
export class ItemdexComponent implements OnInit {
  public items!: Item[];
  public model!: any;
  public searched = '';

  constructor(public pokedexService: PokedexService) { }

  ngOnInit(): void {
    this.getItems();
  }

  public getItems(): void {
    this.pokedexService.getItems().subscribe(
      (response: Ability[]) => {
        this.items = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getNames(): string[] {
    let aux = [];
    for (let i = 0; i < this.items.length; i++) {
      aux[i] = this.items[i].name;
    }
    return aux;
  }

  public duplicateModel(modelString: string): void {
    let aux = '';
    for (let i = 0; i < this.items.length; i++) {
      if (modelString == this.items[i].name) {
        aux = this.items[i].description;
        this.searched = aux;
        return;
      }
    }
  }

  public deleteModel(): void {
    let aux = '';
    aux = '';
    this.searched = aux;
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
