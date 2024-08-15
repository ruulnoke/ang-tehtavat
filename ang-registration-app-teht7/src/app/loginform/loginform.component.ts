import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Credential } from '../credential';

@Component({
  selector: 'app-loginform',
  templateUrl: './loginform.component.html',
  styleUrl: './loginform.component.css',
})
export class LoginformComponent implements OnInit {
  creds: Credential[] = [];
  error: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // haetaan tunnukset valetietokannasta
    this.getCreds();
  }

  // autentikaation tarkistus
  onSubmit(formData: Credential, isValid: boolean): void {
    if (isValid) {
      // etsitään syötettyä käyttäjätunnus- ja salasanayhdistelmää tietokannasta
      let correctCreds = this.creds.findIndex(
        (cred) =>
          cred.username === formData.username &&
          cred.password === formData.password
      );
      if (correctCreds >= 0) {
        // autentikaatio onnistui
        // AuthServicessa muuttujan arvoksi vaihtuu true
        this.authService.isLoggedIn = true;
        // siirrytään regformiin ilmoittautumista varten
        this.router.navigate(['/regform']);
      }
      // autentikaatio ei onnistunut
      else {
        this.error = 'Väärä tunnus tai salasana';
      }
    }
  }

  // tunnusten haku valetietokannasta
  // näin ei tehtäisi oikeassa sovelluksessa
  getCreds(): void {
    this.authService.getCreds().subscribe((creds) => (this.creds = creds));
  }
}
