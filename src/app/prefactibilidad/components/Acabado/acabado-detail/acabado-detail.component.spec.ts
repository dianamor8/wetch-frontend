import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcabadoDetailComponent } from './acabado-detail.component';

describe('AcabadoDetailComponent', () => {
  let component: AcabadoDetailComponent;
  let fixture: ComponentFixture<AcabadoDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcabadoDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcabadoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
