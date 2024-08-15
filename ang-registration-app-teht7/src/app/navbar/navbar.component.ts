import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  // public, koska authServicea käytetään suoraan templaatissa
  constructor(public authService: AuthService) {}
  ngOnInit(): void {}

  // uloskirjautuminen
  logOut() {
    // päivitetään status AuthServiceen
    this.authService.isLoggedIn = false;
  }
}
