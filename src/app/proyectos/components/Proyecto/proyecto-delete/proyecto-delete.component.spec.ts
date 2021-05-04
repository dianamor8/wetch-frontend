import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyectoDeleteComponent } from './proyecto-delete.component';

describe('ProyectoDeleteComponent', () => {
  let component: ProyectoDeleteComponent;
  let fixture: ComponentFixture<ProyectoDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProyectoDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProyectoDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
