import { Component, OnInit } from '@angular/core';
// ActivatedRouten avulla saadaan reitistä id komponenttiin
import { ActivatedRoute } from '@angular/router';
// ContentServicen avulla saadaan palvelimelta sisältö komponenttiin
import { ContentService } from '../content.service';
import { Content } from '../content';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css'],
})
export class PageComponent implements OnInit {
  // esitettävän "sivun" sisältö tulee pageContent-muuttujaan
  pageContent: Content | undefined;

  constructor(
    private route: ActivatedRoute,
    private cservice: ContentService
  ) {}
  /*
  Kun komponentti latautuu muistiin, haetaan reitistä id,
  jonka perusteella haetaan komponenttiin id:tä vastaava sisältö.
  */
  ngOnInit(): void {
    // Haetaan sivun id reitistä.
    this.route.paramMap.subscribe((params) => {
      const pageId = Number(params.get('pageId'));
      // Haetaan sisältötaulukko palvelimelta. Se tulee sisään content-muuttujassa
      // Observable pitää aina tilata (subscribe)
      this.cservice.getContent().subscribe((content) => {
        // Haetaan sisältötaulukosta olio, jonka id on sama kuin reitistä haettu id.
        // valitun "sivun" sisältö menee pageContent-muuttujaan
        this.pageContent = content.find((content) => content.id === pageId);
      });
    });
  }
}
