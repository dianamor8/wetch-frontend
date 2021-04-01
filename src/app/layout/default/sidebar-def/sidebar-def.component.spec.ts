import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarDefComponent } from './sidebar-def.component';

describe('SidebarDefComponent', () => {
  let component: SidebarDefComponent;
  let fixture: ComponentFixture<SidebarDefComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarDefComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarDefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
