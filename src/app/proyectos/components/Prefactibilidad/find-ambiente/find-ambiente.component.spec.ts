import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindAmbienteComponent } from './find-ambiente.component';

describe('FindAmbienteComponent', () => {
  let component: FindAmbienteComponent;
  let fixture: ComponentFixture<FindAmbienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindAmbienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FindAmbienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
