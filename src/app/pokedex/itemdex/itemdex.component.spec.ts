import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemdexComponent } from './itemdex.component';

describe('ItemdexComponent', () => {
  let component: ItemdexComponent;
  let fixture: ComponentFixture<ItemdexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemdexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemdexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
