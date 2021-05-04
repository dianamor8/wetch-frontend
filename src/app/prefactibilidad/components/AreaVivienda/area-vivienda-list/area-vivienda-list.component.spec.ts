import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaViviendaListComponent } from './area-vivienda-list.component';

describe('AreaViviendaListComponent', () => {
  let component: AreaViviendaListComponent;
  let fixture: ComponentFixture<AreaViviendaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AreaViviendaListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaViviendaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
