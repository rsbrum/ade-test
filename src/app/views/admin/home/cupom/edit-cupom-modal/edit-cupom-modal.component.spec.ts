import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCupomModalComponent } from './edit-cupom-modal.component';

describe('EditCupomModalComponent', () => {
  let component: EditCupomModalComponent;
  let fixture: ComponentFixture<EditCupomModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCupomModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCupomModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
