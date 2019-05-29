import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSaborModalComponent } from './add-sabor-modal.component';

describe('AddSaborModalComponent', () => {
  let component: AddSaborModalComponent;
  let fixture: ComponentFixture<AddSaborModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSaborModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSaborModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
