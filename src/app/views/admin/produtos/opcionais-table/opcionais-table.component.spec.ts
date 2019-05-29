import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpcionaisTableComponent } from './opcionais-table.component';

describe('OpcionaisTableComponent', () => {
  let component: OpcionaisTableComponent;
  let fixture: ComponentFixture<OpcionaisTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpcionaisTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpcionaisTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
