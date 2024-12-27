import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SheetDetailComponent } from './sheet-detail.component';
import { ActivatedRoute } from '@angular/router';

describe('SheetDetailComponent', () => {
  let component: SheetDetailComponent;
  let fixture: ComponentFixture<SheetDetailComponent>;
  let activatedRoute: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SheetDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => '1',
              },
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SheetDetailComponent);
    component = fixture.componentInstance;
    activatedRoute = TestBed.inject(ActivatedRoute);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
