import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyectoEstudiosComponent } from './proyecto-estudios.component';

describe('ProyectoEstudiosComponent', () => {
  let component: ProyectoEstudiosComponent;
  let fixture: ComponentFixture<ProyectoEstudiosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProyectoEstudiosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProyectoEstudiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
