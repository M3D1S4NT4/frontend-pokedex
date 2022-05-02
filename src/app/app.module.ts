import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { HomeComponent } from './home/home.component';
import { PokedexComponent } from './pokedex/pokedex.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PokeCollapseComponent } from './pokedex/poke-collapse/poke-collapse.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NaturesComponent } from './pokedex/natures/natures.component';
import { TypeCalculatorComponent } from './pokedex/type-calculator/type-calculator.component';
import { AbilitydexComponent } from './pokedex/abilitydex/abilitydex.component';
import { MovedexComponent } from './pokedex/movedex/movedex.component';
import { ItemdexComponent } from './pokedex/itemdex/itemdex.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    PokedexComponent,
    PokeCollapseComponent,
    NavBarComponent,
    NaturesComponent,
    TypeCalculatorComponent,
    AbilitydexComponent,
    MovedexComponent,
    ItemdexComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
