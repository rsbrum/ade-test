import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPedidoModalComponent } from './edit-pedido-modal.component';

describe('EditPedidoModalComponent', () => {
  let component: EditPedidoModalComponent;
  let fixture: ComponentFixture<EditPedidoModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPedidoModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPedidoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
