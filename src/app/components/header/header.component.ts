import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  siteName: string = '';
  siteLogo: string = '';
  headerLinks: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    // Charge les données depuis data.json
    this.http.get('assets/data.json').subscribe((data: any) => {
      this.siteName = data.siteName;
      this.siteLogo = data.siteLogo;
      this.headerLinks = data.links;
      this.updateActiveLink();
    });
  }

  // Mise à jour du lien actif en fonction de l'URL actuelle
  updateActiveLink(): void {
    this.router.events.subscribe(() => {
      const currentUrl = this.router.url;
      this.headerLinks.forEach(link => {
        link.active = link.url === currentUrl;
      });
    });
  }
}
