import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPedidoModalComponent } from './add-pedido-modal.component';

describe('AddPedidoModalComponent', () => {
  let component: AddPedidoModalComponent;
  let fixture: ComponentFixture<AddPedidoModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPedidoModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPedidoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
