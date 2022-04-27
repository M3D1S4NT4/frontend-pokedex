import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import { PokedexService } from '../pokedex.service';


@Component({
  selector: 'app-type-calculator',
  templateUrl: './type-calculator.component.html',
  styleUrls: ['./type-calculator.component.css']
})
export class TypeCalculatorComponent implements OnInit {
  public typeTable: Map<string, number[]> = new Map<string, number[]>();
  public typeList!: string[] | undefined;
  public damagesRes: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  public damages!: number[];
  public damages2!: number[];
  t1 = '1';
  t2 = '2';

  constructor(public pokedexService: PokedexService) { }

  ngOnInit(): void {
    this.getTypeTable();
  }

  public capturar(): void {
    this.calculateTypes(this.t1, this.t2);
  }

  public getTypeTable(): void {
    this.typeTable = new Map<string, number[]>();
    this.typeTable.set("Bug", [1, 1, 1, 1, 1, 0.5, 2, 2, 1, 0.5, 0.5, 1, 1, 1, 1, 2, 1, 1]);
    this.typeTable.set("Dark", [2, 0.5, 1, 1, 2, 2, 1, 1, 0.5, 1, 1, 1, 1, 1, 0, 1, 1, 1]);
    this.typeTable.set("Dragon", [1, 1, 2, 0.5, 2, 1, 0.5, 1, 1, 0.5, 1, 2, 1, 1, 1, 1, 1, 0.5]);
    this.typeTable.set("Electric", [1, 1, 1, 0.5, 1, 1, 1, 0.5, 1, 1, 2, 1, 1, 1, 1, 1, 0.5, 1]);
    this.typeTable.set("Fairy", [0.5, 0.5, 0, 1, 1, 0.5, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1]);
    this.typeTable.set("Fighting", [0.5, 0.5, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 0.5, 1, 1]);
    this.typeTable.set("Fire", [0.5, 1, 1, 1, 0.5, 1, 0.5, 1, 1, 0.5, 2, 0.5, 1, 1, 1, 2, 0.5, 2]);
    this.typeTable.set("Flying", [0.5, 1, 1, 2, 1, 0.5, 1, 1, 1, 0.5, 0, 2, 1, 1, 1, 2, 1, 1]);
    this.typeTable.set("Ghost", [0.5, 2, 1, 1, 1, 0, 1, 1, 2, 1, 1, 1, 0, 0.5, 1, 1, 1, 1]);
    this.typeTable.set("Grass", [2, 1, 1, 0.5, 1, 1, 2, 2, 1, 0.5, 0.5, 2, 1, 2, 1, 1, 1, 0.5]);
    this.typeTable.set("Ground", [1, 1, 1, 0, 1, 1, 1, 1, 1, 2, 1, 2, 1, 0.5, 1, 0.5, 1, 2]);
    this.typeTable.set("Ice", [1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 0.5, 1, 1, 1, 2, 2, 1]);
    this.typeTable.set("Normal", [1, 1, 1, 1, 1, 2, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
    this.typeTable.set("Poison", [0.5, 1, 1, 1, 0.5, 0.5, 1, 1, 1, 0.5, 2, 1, 1, 0.5, 2, 1, 1, 1]);
    this.typeTable.set("Psychic", [2, 2, 1, 1, 1, 0.5, 1, 1, 2, 1, 1, 1, 1, 1, 0.5, 1, 1, 1]);
    this.typeTable.set("Rock", [1, 1, 1, 1, 1, 2, 0.5, 1, 1, 2, 2, 1, 0.5, 0.5, 1, 1, 2, 2]);
    this.typeTable.set("Steel", [0.5, 1, 0.5, 1, 0.5, 2, 2, 0.5, 1, 0.5, 2, 0.5, 0.5, 0, 0.5, 0.5, 0.5, 1]);
    this.typeTable.set("Water", [1, 1, 1, 2, 1, 1, 0.5, 1, 1, 2, 1, 0.5, 1, 1, 1, 1, 0.5, 0.5]);

    this.typeList = ["Bug", "Dark", "Dragon", "Electric", "Fairy", "Fighting", "Fire", "Flying", "Ghost", "Grass", "Ground", "Ice", "Normal", "Poison", "Psychic", "Rock", "Steel", "Water"];
  }

  public calculateTypes(type1: string, type2: string): number[] | undefined {
    this.damagesRes = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    if (type1 == "1") {
      return this.damagesRes;
    }
    if (type2 == "2" || type1 == type2) {
      this.damagesRes = this.typeTable.get(type1)!;
      return this.damagesRes;
    } else {
      this.damages = this.typeTable.get(type1)!;
      this.damages2 = this.typeTable.get(type2)!;
      for (let i = 0; i < this.damages.length; i++) {
        this.damagesRes[i] = this.damages[i] * this.damages2[i];
      }
    }
    return this.damagesRes;
  }


}
