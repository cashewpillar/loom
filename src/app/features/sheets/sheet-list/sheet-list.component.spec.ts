import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SheetListComponent } from './sheet-list.component';
import { ActivatedRoute } from '@angular/router';

describe('SheetListComponent', () => {
  let component: SheetListComponent;
  let fixture: ComponentFixture<SheetListComponent>;
  let activatedRoute: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SheetListComponent],
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

    fixture = TestBed.createComponent(SheetListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    activatedRoute = TestBed.inject(ActivatedRoute);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
