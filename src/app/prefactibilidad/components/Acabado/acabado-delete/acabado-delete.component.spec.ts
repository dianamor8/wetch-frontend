import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcabadoDeleteComponent } from './acabado-delete.component';

describe('AcabadoDeleteComponent', () => {
  let component: AcabadoDeleteComponent;
  let fixture: ComponentFixture<AcabadoDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcabadoDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcabadoDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
