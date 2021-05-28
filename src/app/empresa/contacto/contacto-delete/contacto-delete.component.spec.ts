import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactoDeleteComponent } from './contacto-delete.component';

describe('ContactoDeleteComponent', () => {
  let component: ContactoDeleteComponent;
  let fixture: ComponentFixture<ContactoDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactoDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactoDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
