import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeCalculatorComponent } from './type-calculator.component';

describe('TypeCalculatorComponent', () => {
  let component: TypeCalculatorComponent;
  let fixture: ComponentFixture<TypeCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeCalculatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
