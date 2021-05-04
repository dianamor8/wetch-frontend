import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmbienteListComponent } from './ambiente-list.component';

describe('AmbienteListComponent', () => {
  let component: AmbienteListComponent;
  let fixture: ComponentFixture<AmbienteListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmbienteListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AmbienteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
