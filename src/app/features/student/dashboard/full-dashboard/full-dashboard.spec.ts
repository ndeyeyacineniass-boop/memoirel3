import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullDashboard } from './full-dashboard';

describe('FullDashboard', () => {
  let component: FullDashboard;
  let fixture: ComponentFixture<FullDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FullDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FullDashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
