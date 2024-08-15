import { Component } from '@angular/core';
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle,
  MatExpansionPanelDescription,
} from '@angular/material/expansion';
import { MatTabGroup, MatTab } from '@angular/material/tabs';
import { MatButton } from '@angular/material/button';
import {
  MatCard,
  MatCardHeader,
  MatCardAvatar,
  MatCardTitle,
  MatCardSubtitle,
  MatCardImage,
  MatCardContent,
  MatCardActions,
} from '@angular/material/card';

@Component({
  selector: 'app-page-one',
  templateUrl: './page-one.component.html',
  styleUrl: './page-one.component.css',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardAvatar,
    MatCardTitle,
    MatCardSubtitle,
    MatCardImage,
    MatCardContent,
    MatCardActions,
    MatButton,
    MatTabGroup,
    MatTab,
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    MatExpansionPanelDescription,
  ],
})
export class PageOneComponent {
  panelOpenState = false;
}
