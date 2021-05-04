import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyectoAddComponent } from './proyecto-add.component';

describe('ProyectoAddComponent', () => {
  let component: ProyectoAddComponent;
  let fixture: ComponentFixture<ProyectoAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProyectoAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProyectoAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
