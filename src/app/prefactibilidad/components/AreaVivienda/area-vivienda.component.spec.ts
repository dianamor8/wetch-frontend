import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaViviendaComponent } from './area-vivienda.component';

describe('AreaViviendaComponent', () => {
  let component: AreaViviendaComponent;
  let fixture: ComponentFixture<AreaViviendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AreaViviendaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaViviendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
