import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcabadoListComponent } from './acabado-list.component';

describe('AcabadoListComponent', () => {
  let component: AcabadoListComponent;
  let fixture: ComponentFixture<AcabadoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcabadoListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcabadoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
