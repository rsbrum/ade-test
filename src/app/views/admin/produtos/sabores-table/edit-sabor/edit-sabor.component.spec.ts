import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSaborComponent } from './edit-sabor.component';

describe('EditSaborComponent', () => {
  let component: EditSaborComponent;
  let fixture: ComponentFixture<EditSaborComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSaborComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSaborComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
