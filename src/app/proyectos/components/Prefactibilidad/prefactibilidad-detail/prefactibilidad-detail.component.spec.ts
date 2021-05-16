import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrefactibilidadDetailComponent } from './prefactibilidad-detail.component';

describe('PrefactibilidadDetailComponent', () => {
  let component: PrefactibilidadDetailComponent;
  let fixture: ComponentFixture<PrefactibilidadDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrefactibilidadDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrefactibilidadDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
