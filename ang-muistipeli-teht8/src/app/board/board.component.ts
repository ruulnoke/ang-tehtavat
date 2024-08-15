import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../card/card.component';
import { Card } from '../card';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css',
})
export class BoardComponent implements OnInit {
  cards!: Card[]; // taulukko Card-tyyppisiä olioita eli kortit
  firstPick!: number; // ekana käännetyn kortin indeksi
  secondPick!: number; // tokana käännetyn kortin indeksi
  picks!: number; // kääntöjen määrä
  pausePicks!: boolean; // kääntämisen keskeytys
  gameSolved!: boolean; // kaikki parit on löydetty

  constructor() {}

  ngOnInit(): void {
    this.newGame();
  }

  newGame() {
    // annetaan alkuarvot
    this.picks = 0;
    this.firstPick = 99;
    this.secondPick = 99;
    this.pausePicks = false;
    this.gameSolved = false;
    // kortit sijoitetaan taulukkoon
    this.cards = [
      { value: '日', status: 'default' },
      { value: '月', status: 'default' },
      { value: '国', status: 'default' },
      { value: '水', status: 'default' },
      { value: '山', status: 'default' },
      { value: '米', status: 'default' },
      { value: '人', status: 'default' },
      { value: '方', status: 'default' },
      { value: '日', status: 'default' },
      { value: '月', status: 'default' },
      { value: '国', status: 'default' },
      { value: '水', status: 'default' },
      { value: '山', status: 'default' },
      { value: '米', status: 'default' },
      { value: '人', status: 'default' },
      { value: '方', status: 'default' },
    ];
    // kortit sekoitetaan
    this.cards = this.shuffleArray(this.cards);
  }

  pick(index: number) {
    // tarkistetaan, onko nosto sallittu
    if (
      this.pausePicks === true ||
      this.cards[index].status === 'picked' ||
      this.cards[index].status === 'matched'
    ) {
      return;
    }
    // nostetun kortin status vaihdetaan -> kuva tulee näkyviin
    this.cards[index].status = 'picked';
    // jos firstPick-muuttujassa on yhä aloitusarvo, nostetun kortin indeksi sijoitetaan siihen
    if (this.firstPick === 99) {
      this.firstPick = index;
      // jos firstPick-muuttujassa on jo uusi arvo, nostetun kortin indeksi sijoitetaan secondPick-muuttujaan
    } else {
      this.secondPick = index;
      // vertaillaan kortit
      this.checkMatch();
    }
  }

  checkMatch() {
    this.pausePicks = true; // uudet nostot eivät sallittuja tarkistuksen aikana
    this.picks = this.picks + 1; // lisätään nostolaskuriin yksi
    // jos korteissa on sama merkki (value)
    if (
      this.cards[this.firstPick].value === this.cards[this.secondPick].value
    ) {
      // sekunnin viive -> käyttäjä ehtii nähdä kortit ennen niiden kääntymistä
      setTimeout(() => {
        // muutetaan statusta -> kortit pois pelilaudalta
        this.cards[this.firstPick].status = 'matched';
        this.cards[this.secondPick].status = 'matched';
        // palautetaan alkuarvot
        this.resetDefaultValues();
        // tarkistetaan, onko peli jo ratkaistu
        let cardsLeft = this.cards.findIndex(
          (card) => card.status === 'default'
        );
        if (cardsLeft === -1) {
          this.gameSolved = true;
        }
      }, 1000);
      // jos merkit ovat eri
    } else {
      // sekunnin viive -> käyttäjä ehtii nähdä kortit ennen niiden poistumista
      setTimeout(() => {
        // muutetaan statusta -> kortit takaisin nurin
        this.cards[this.firstPick].status = 'default';
        this.cards[this.secondPick].status = 'default';
        // palautetaan alkuarvot
        this.resetDefaultValues();
      }, 1000);
    }
  }

  // sekoitusfunktio taulukolle
  shuffleArray(anArray: any[]): any[] {
    return anArray
      .map((a) => [Math.random(), a])
      .sort((a, b) => a[0] - b[0])
      .map((a) => a[1]);
  }

  // alkuarvojen palautus
  resetDefaultValues() {
    this.firstPick = 99;
    this.secondPick = 99;
    this.pausePicks = false;
  }
}
