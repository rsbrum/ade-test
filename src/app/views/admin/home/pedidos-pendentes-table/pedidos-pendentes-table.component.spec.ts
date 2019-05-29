import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidosPendentesTableComponent } from './pedidos-pendentes-table.component';

describe('PedidosPendentesTableComponent', () => {
  let component: PedidosPendentesTableComponent;
  let fixture: ComponentFixture<PedidosPendentesTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedidosPendentesTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidosPendentesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
