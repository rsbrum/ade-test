import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardapioItemComponent } from './cardapio-item.component';

describe('CardapioItemComponent', () => {
  let component: CardapioItemComponent;
  let fixture: ComponentFixture<CardapioItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardapioItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardapioItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
