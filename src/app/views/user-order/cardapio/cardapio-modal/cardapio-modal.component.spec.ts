import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardapioModalComponent } from './cardapio-modal.component';

describe('CardapioModalComponent', () => {
  let component: CardapioModalComponent;
  let fixture: ComponentFixture<CardapioModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardapioModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardapioModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
