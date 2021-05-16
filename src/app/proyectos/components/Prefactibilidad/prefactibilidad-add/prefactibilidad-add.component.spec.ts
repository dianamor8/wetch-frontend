import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrefactibilidadAddComponent } from './prefactibilidad-add.component';

describe('PrefactibilidadAddComponent', () => {
  let component: PrefactibilidadAddComponent;
  let fixture: ComponentFixture<PrefactibilidadAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrefactibilidadAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrefactibilidadAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
