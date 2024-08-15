import { Component, inject, Input } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatNavList, MatListItem } from '@angular/material/list';
import { MatToolbar } from '@angular/material/toolbar';
import { MatSidenavContainer, MatSidenav, MatSidenavContent } from '@angular/material/sidenav';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrl: './navigation.component.css',
    standalone: true,
    imports: [
        MatSidenavContainer,
        MatSidenav,
        MatToolbar,
        MatNavList,
        MatListItem,
        MatSidenavContent,
        MatIconButton,
        MatIcon,
        RouterOutlet,
        AsyncPipe,
    ],
})
export class NavigationComponent {
  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
}
