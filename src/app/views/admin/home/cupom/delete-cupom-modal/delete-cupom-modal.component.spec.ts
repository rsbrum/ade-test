import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCupomModalComponent } from './delete-cupom-modal.component';

describe('DeleteCupomModalComponent', () => {
  let component: DeleteCupomModalComponent;
  let fixture: ComponentFixture<DeleteCupomModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteCupomModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteCupomModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
