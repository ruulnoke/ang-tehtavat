import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RegService } from '../reg.service';
import { Registration } from '../registration';

@Component({
  selector: 'app-regform',
  templateUrl: './regform.component.html',
  styleUrl: './regform.component.css',
})
export class RegformComponent {
  // konstruktorissa määritellään, että pyytää injektiota RegServiceltä
  constructor(private regService: RegService, private router: Router) {}

  // lomakedatan lähetys
  onSubmit(formData: any) {
    // katsotaan lomaketta konsolissa
    console.log(formData);
    // lomakkeen arvot sijoitetaan RegServicen postReg-metodin parametriin
    this.regService
      .postReg({
        id: formData.id,
        name: formData.name,
        email: formData.email,
        food: formData.food,
        sauna: formData.sauna,
      } as Registration)
      .subscribe();
  }

  // näytetään Reglist-komponentti
  navigateToReglist() {
    this.router.navigate(['/']);
  }
}
