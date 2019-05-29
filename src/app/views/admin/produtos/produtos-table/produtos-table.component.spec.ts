import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutosTableComponent } from './produtos-table.component';

describe('ProdutosTableComponent', () => {
  let component: ProdutosTableComponent;
  let fixture: ComponentFixture<ProdutosTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProdutosTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdutosTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
