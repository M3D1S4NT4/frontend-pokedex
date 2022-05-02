import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokedexComponent } from './pokedex/pokedex.component';
import {LoginComponent} from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import {HomeComponent} from './home/home.component';
import { NaturesComponent } from './pokedex/natures/natures.component';
import { TypeCalculatorComponent } from './pokedex/type-calculator/type-calculator.component';
import { AbilitydexComponent } from './pokedex/abilitydex/abilitydex.component';
import { MovedexComponent } from './pokedex/movedex/movedex.component';
import {ItemdexComponent} from "./pokedex/itemdex/itemdex.component";

const routes: Routes = [
  {path: "", component: PokedexComponent, pathMatch: "full"},
  {path: "login", component: LoginComponent, pathMatch: "full"},
  {path: "register", component: RegisterComponent, pathMatch: "full"},
  {path: "pokedex", component: PokedexComponent, pathMatch: "full"},
  {path: "natures", component: NaturesComponent, pathMatch: "full"},
  {path: "typeCalculator", component: TypeCalculatorComponent, pathMatch: "full"},
  {path: "abilities", component: AbilitydexComponent, pathMatch: "full"},
  {path: "home", component: HomeComponent, pathMatch: "full"},
  {path: "moves", component: MovedexComponent, pathMatch: "full"},
  {path: "items", component: ItemdexComponent, pathMatch: "full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
