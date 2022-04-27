import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbilitydexComponent } from './abilitydex.component';

describe('AbilitydexComponent', () => {
  let component: AbilitydexComponent;
  let fixture: ComponentFixture<AbilitydexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbilitydexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbilitydexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
