import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './board/board.component';

@Component({
  selector: 'app-root',
  // standalone-komponentti ei ole moduulissa
  standalone: true,
  // komponentin riippuvuudet laitetaan tähän taulukkoon
  imports: [CommonModule, BoardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Ristinolla';
}
