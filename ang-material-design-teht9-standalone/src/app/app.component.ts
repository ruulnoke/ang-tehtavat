import { Component } from '@angular/core';
import { NavigationComponent } from './navigation/navigation.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    standalone: true,
    imports: [NavigationComponent],
})
export class AppComponent {
  title = 'Angular Material (Mat Design -komponentteja Angularille';
}
