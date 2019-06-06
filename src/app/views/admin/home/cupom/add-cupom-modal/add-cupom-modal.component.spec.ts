import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCupomModalComponent } from './add-cupom-modal.component';

describe('AddCupomModalComponent', () => {
  let component: AddCupomModalComponent;
  let fixture: ComponentFixture<AddCupomModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCupomModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCupomModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
