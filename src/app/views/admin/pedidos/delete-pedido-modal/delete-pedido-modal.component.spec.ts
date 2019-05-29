import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePedidoModalComponent } from './delete-pedido-modal.component';

describe('DeletePedidoModalComponent', () => {
  let component: DeletePedidoModalComponent;
  let fixture: ComponentFixture<DeletePedidoModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletePedidoModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletePedidoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
