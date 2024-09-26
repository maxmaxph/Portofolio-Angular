import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading-page.component.html',
  styleUrl: './loading-page.component.css'
})
export class LoadingPageComponent implements OnInit {
  isLoading: boolean = true;

  ngOnInit(): void {
    window.addEventListener('load', () => {
      setTimeout(() => {
        this.isLoading = false; // Charge les composants après un délai
      }, 2000); // Ajoute un délai si besoin
    });
  }
}
