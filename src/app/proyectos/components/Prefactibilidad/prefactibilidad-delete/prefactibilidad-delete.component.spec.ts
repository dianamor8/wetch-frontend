import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrefactibilidadDeleteComponent } from './prefactibilidad-delete.component';

describe('PrefactibilidadDeleteComponent', () => {
  let component: PrefactibilidadDeleteComponent;
  let fixture: ComponentFixture<PrefactibilidadDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrefactibilidadDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrefactibilidadDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
