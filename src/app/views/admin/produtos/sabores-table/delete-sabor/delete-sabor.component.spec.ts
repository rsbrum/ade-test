import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSaborComponent } from './delete-sabor.component';

describe('DeleteSaborComponent', () => {
  let component: DeleteSaborComponent;
  let fixture: ComponentFixture<DeleteSaborComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteSaborComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteSaborComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
