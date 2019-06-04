import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProdutoModalComponent } from './edit-produto-modal.component';

describe('EditProdutoModalComponent', () => {
  let component: EditProdutoModalComponent;
  let fixture: ComponentFixture<EditProdutoModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditProdutoModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProdutoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
