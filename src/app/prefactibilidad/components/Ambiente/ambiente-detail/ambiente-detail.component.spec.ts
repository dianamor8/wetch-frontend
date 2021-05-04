import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmbienteDetailComponent } from './ambiente-detail.component';

describe('AmbienteDetailComponent', () => {
  let component: AmbienteDetailComponent;
  let fixture: ComponentFixture<AmbienteDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmbienteDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AmbienteDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
