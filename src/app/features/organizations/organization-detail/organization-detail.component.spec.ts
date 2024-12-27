import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationDetailComponent } from './organization-detail.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('OrganizationDetailComponent', () => {
  let component: OrganizationDetailComponent;
  let fixture: ComponentFixture<OrganizationDetailComponent>;
  let activatedRoute: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrganizationDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: 1 }),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(OrganizationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    activatedRoute = TestBed.inject(ActivatedRoute);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
