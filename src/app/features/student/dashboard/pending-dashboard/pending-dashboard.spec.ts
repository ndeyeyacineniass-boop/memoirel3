import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingDashboard } from './pending-dashboard';

describe('PendingDashboard', () => {
  let component: PendingDashboard;
  let fixture: ComponentFixture<PendingDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PendingDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingDashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
