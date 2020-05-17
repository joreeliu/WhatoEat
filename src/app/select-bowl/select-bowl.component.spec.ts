import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectBowlComponent } from './select-bowl.component';

describe('SelectBowlComponent', () => {
  let component: SelectBowlComponent;
  let fixture: ComponentFixture<SelectBowlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectBowlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectBowlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
