import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryhomepageComponent } from './deliveryhomepage.component';

describe('DeliveryhomepageComponent', () => {
  let component: DeliveryhomepageComponent;
  let fixture: ComponentFixture<DeliveryhomepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveryhomepageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliveryhomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
