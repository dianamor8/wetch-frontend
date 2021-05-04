import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoAreaViviendaDetailComponent } from './tipo-area-vivienda-detail.component';

describe('TipoAreaViviendaDetailComponent', () => {
  let component: TipoAreaViviendaDetailComponent;
  let fixture: ComponentFixture<TipoAreaViviendaDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoAreaViviendaDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoAreaViviendaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
