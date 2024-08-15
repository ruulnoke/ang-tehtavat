/*
Board on ns. toiminnallinen eli "älykäs" komponentti joka sisältää
sovelluslogiikan.
*/

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SquareComponent } from '../square/square.component';
import { Score } from '../score';
import { ScoreService } from '../score.service';

@Component({
  standalone: true,
  imports: [CommonModule, SquareComponent],
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrl: './board.component.css',
})
export class BoardComponent implements OnInit {
  /* Propertyt eivät voi olla undefined (!-merkintä), koska ne alustetaan
       newGame() -metodissa aina kun peli alkaa. Niitä on siis turha alustaa
       konstruktorissa 
    */
  squares!: string[]; // Taulukko jossa on pelin tila, eli arvoja: '', 'X', '0'
  xIsNext!: boolean; // Kertoo kumpi on seuraavaksi vuorossa
  winner!: string; // Kertoo voittajan '', 'X' tai '0'
  tie!: boolean; // Kertoo tasapelin
  moves!: number; // Kertoo siirtojen määrän
  scores!: Score; // Kertoo pistetilanteen
  line!: number[]; // Kertoo voittosiirron numerot

  constructor(private scoreService: ScoreService) {}

  ngOnInit() {
    this.scoreService.initScores(); // alkutilane on 0-0
    this.newGame(); // newGame suoritetaan aina kun komponentti latautuu muistiin
  }
  // newGame() -metodin suoritus käynnistää uuden pelin
  newGame() {
    // Kun uusi peli alkaa, pelin muuttujat alustetaan.
    // Squares-taulukkoon laitetaan 9 tyhjää paikkaa
    this.squares = Array(9).fill('');
    // jos edellisessä pelissä X jäi vuoroon (eli hävisi), arvo on true -> X aloittaa
    // muuten false -> 0 aloittaa
    this.xIsNext = this.xIsNext ? true : false;
    this.winner = '';
    this.tie = false;
    this.moves = 0;
    this.scores = this.scoreService.getScores();
    this.line = [];
  }

  // scores-olion tyhjennys
  nullifyScore() {
    this.scoreService.initScores();
    this.scores = this.scoreService.getScores();
  }

  /*
   Tässä on sovelluksen model eli tietomalli. Se muodostuu
   risteistä ja nollista jotka välitetään ruutuihin player-
   get propertyn kautta. Get property joka on TS:n piirre,
   tarjoilee vuorotellen ristin tai nollan.
   */
  get player() {
    // ternäärinen operaattori joka korvaa if-elsen
    return this.xIsNext ? 'X' : '0';
    /*
        if (this.xIsNext) {
            return 'X';
        } else {
            return '0';
        }
        */
  }

  // makeMove(index: number) laittaa ristin tai nollan squares -taulukkoon indeksiin index
  makeMove(index: number) {
    // jos pelillä on jo voittaja, uudet siirrot eivät enää mahdollisia
    if (this.winner) {
      return;
    }
    // Paikan johon risti tai nolla laitetaan pitää olla tyhjä, eli ''
    if (!this.squares[index]) {
      // splice-metodi poistaa indeksistä alkion ja laittaa
      // tilalle yhden alkion joka tulee this.player -get propertyltä
      this.squares.splice(index, 1, this.player);
      this.xIsNext = !this.xIsNext; // Vaihdetaan vuoroa
      this.moves = this.moves + 1; // lisätään siirto laskuriin
    }
    // Yritetään määritellä voittaja. Metodi tuottaa 'X', '0' tai ''
    // tilanteesta riippuen. Jos voittaja on olemassa, se näytetään templaatissa.
    this.winner = this.calculateWinner();
    // jos voittajaa ei ole, mutta siirrot ovat täynnä, peli on tasapeli
    if (this.moves === 9 && !this.winner) {
      this.tie = true;
    }
  }

  // Metodi joka määrittää pelin voittajan
  calculateWinner() {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (const line of lines) {
      const [a, b, c] = line;
      // tässä if-lohkossa löydetään voittaja
      if (
        this.squares[a] &&
        this.squares[a] === this.squares[b] &&
        this.squares[a] === this.squares[c]
      ) {
        // otetaan talteen voittajan rivi sen korostamista varten
        this.line = line;
        // lisätään voittajan pisteet localstorageen
        this.scoreService.addScore(this.squares[a]);
        // päivitetään pisteet localstrogesta tähän luokkaan
        this.scores = this.scoreService.getScores();
        return this.squares[a]; // palautetaan 'X' tai '0'
      }
    }
    return ''; // ei voittajaa
  }
}
