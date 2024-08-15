import { Component } from '@angular/core';
import { LaskinService } from '../laskin.service';

@Component({
  selector: 'app-laskin2',
  templateUrl: './laskin2.component.html',
  styleUrls: ['./laskin2.component.css'],
})
export class Laskin2Component {
  vanhaHinta: number = 0; // TS:ssä tietotyyppi merkitään kaksoispisteen perään
  uusiHinta: number = 0; // val1 ja val2 -arvot saadaan templaatin lomakkeelta
  tulos: number = 0; // result lasketaan tässä luokassa

  constructor(private laskinService: LaskinService) {}

  laske() {
    this.tulos = this.laskinService.laskeInflaatio(
      this.vanhaHinta,
      this.uusiHinta
    );
  }
}
