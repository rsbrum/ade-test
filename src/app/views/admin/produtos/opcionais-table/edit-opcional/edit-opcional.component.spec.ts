import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOpcionalComponent } from './edit-opcional.component';

describe('EditOpcionalComponent', () => {
  let component: EditOpcionalComponent;
  let fixture: ComponentFixture<EditOpcionalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditOpcionalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditOpcionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
