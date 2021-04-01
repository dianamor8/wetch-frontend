import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterDefComponent } from './footer-def.component';

describe('FooterDefComponent', () => {
  let component: FooterDefComponent;
  let fixture: ComponentFixture<FooterDefComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterDefComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterDefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
