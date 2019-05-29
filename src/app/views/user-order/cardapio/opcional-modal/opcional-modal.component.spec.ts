import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpcionalModalComponent } from './opcional-modal.component';

describe('OpcionalModalComponent', () => {
  let component: OpcionalModalComponent;
  let fixture: ComponentFixture<OpcionalModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpcionalModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpcionalModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
