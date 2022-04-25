import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokeCollapseComponent } from './poke-collapse.component';

describe('PokeCollapseComponent', () => {
  let component: PokeCollapseComponent;
  let fixture: ComponentFixture<PokeCollapseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokeCollapseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokeCollapseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
