import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmbienteDeleteComponent } from './ambiente-delete.component';

describe('AmbienteDeleteComponent', () => {
  let component: AmbienteDeleteComponent;
  let fixture: ComponentFixture<AmbienteDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmbienteDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AmbienteDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
