import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProdutoModalComponent } from './add-produto-modal.component';

describe('AddProdutoModalComponent', () => {
  let component: AddProdutoModalComponent;
  let fixture: ComponentFixture<AddProdutoModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProdutoModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProdutoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
