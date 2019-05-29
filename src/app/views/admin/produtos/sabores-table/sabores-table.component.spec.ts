import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaboresTableComponent } from './sabores-table.component';

describe('SaboresTableComponent', () => {
  let component: SaboresTableComponent;
  let fixture: ComponentFixture<SaboresTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaboresTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaboresTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
