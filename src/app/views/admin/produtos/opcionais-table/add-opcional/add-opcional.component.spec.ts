import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOpcionalComponent } from './add-opcional.component';

describe('AddOpcionalComponent', () => {
  let component: AddOpcionalComponent;
  let fixture: ComponentFixture<AddOpcionalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOpcionalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOpcionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
