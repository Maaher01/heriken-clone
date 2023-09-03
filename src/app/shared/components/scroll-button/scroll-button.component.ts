import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scroll-button',
  templateUrl: './scroll-button.component.html',
  styleUrls: ['./scroll-button.component.scss'],
})
export class ScrollButtonComponent implements OnInit {
  windowScrolled = false;

  ngOnInit(): void {
    window.addEventListener(
      'scroll',
      () => (this.windowScrolled = window.scrollY !== 0)
    );
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
