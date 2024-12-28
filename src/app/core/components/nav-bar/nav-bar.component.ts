import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterModule,
  UrlSegment,
} from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterModule, RouterLink, RouterLinkActive], // Import only what's needed
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  private readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private readonly destroyRef: DestroyRef = inject(DestroyRef);
  private readonly router: Router = inject(Router);

  ngOnInit(): void {
    this.router.events.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (event) => {
        if (event instanceof NavigationEnd) {
          console.log('NavigationEnd event:', event);
          const url = event.urlAfterRedirects;
          const match = url.match(/\/organization\/.*/);
          if (match) {
            console.log('Matched URL:', match[0]);
          }
        }
      },
    });
  }
}
