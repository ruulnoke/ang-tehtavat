import { Component, OnInit } from '@angular/core';
// ContentServicen avulla saadaan palvelimelta sisältö komponenttiin
import { ContentService } from '../content.service';
import { Content } from '../content';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  content: Content[] | undefined;

  constructor(private cservice: ContentService) {}

  ngOnInit(): void {
    // Haetaan sisältötaulukko palvelimelta. Se tulee sisään content-muuttujassa
    // Observable pitää aina tilata (subscribe)
    this.cservice.getContent().subscribe((content) => (this.content = content));
  }
}
