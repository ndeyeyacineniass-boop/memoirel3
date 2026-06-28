import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscriptionReview } from './inscription-review';

describe('InscriptionReview', () => {
  let component: InscriptionReview;
  let fixture: ComponentFixture<InscriptionReview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InscriptionReview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InscriptionReview);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
