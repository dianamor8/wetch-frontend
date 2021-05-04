import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoAreaViviendaDeleteComponent } from './tipo-area-vivienda-delete.component';

describe('TipoAreaViviendaDeleteComponent', () => {
  let component: TipoAreaViviendaDeleteComponent;
  let fixture: ComponentFixture<TipoAreaViviendaDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoAreaViviendaDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoAreaViviendaDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
