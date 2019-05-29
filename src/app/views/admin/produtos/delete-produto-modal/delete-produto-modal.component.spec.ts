import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteProdutoModalComponent } from './delete-produto-modal.component';

describe('DeleteProdutoModalComponent', () => {
  let component: DeleteProdutoModalComponent;
  let fixture: ComponentFixture<DeleteProdutoModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteProdutoModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteProdutoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
