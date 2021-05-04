import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoAreaViviendaListComponent } from './tipo-area-vivienda-list.component';

describe('TipoAreaViviendaListComponent', () => {
  let component: TipoAreaViviendaListComponent;
  let fixture: ComponentFixture<TipoAreaViviendaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoAreaViviendaListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoAreaViviendaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
