import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteOpcionalComponent } from './delete-opcional.component';

describe('DeleteOpcionalComponent', () => {
  let component: DeleteOpcionalComponent;
  let fixture: ComponentFixture<DeleteOpcionalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteOpcionalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteOpcionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
