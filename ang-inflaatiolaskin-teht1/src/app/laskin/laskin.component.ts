import { Component } from '@angular/core';

@Component({
  selector: 'app-laskin',
  templateUrl: './laskin.component.html',
  styleUrls: ['./laskin.component.css'],
})
export class LaskinComponent {
  //ominaisuudet

  hinta: number; // TS:ssä tietotyyppi merkitään kaksoispisteen perään
  prosentti: number; // val1 ja val2 -arvot saadaan templaatin lomakkeelta
  tulos: number; // result lasketaan tässä luokassa

  // konstruktori antaa luokasta syntyvän olion muuttujille alkuarvot
  constructor() {
    this.tulos = 0;
    this.hinta = 0;
    this.prosentti = 0;
  }

  // metodit

  // Sovelluslogiikan tuottavat metodit

  // laskee uuden hinnan inflaation jälkeen
  public laske() {
    this.tulos = Number((this.hinta * (1 + this.prosentti * 0.01)).toFixed(2));
  }
}
