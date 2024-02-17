import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierhomepageComponent } from './supplierhomepage.component';

describe('SupplierhomepageComponent', () => {
  let component: SupplierhomepageComponent;
  let fixture: ComponentFixture<SupplierhomepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplierhomepageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupplierhomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
