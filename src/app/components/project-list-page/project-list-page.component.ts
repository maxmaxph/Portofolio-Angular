import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ProjectCardComponent } from '../project-card/project-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-list-page',
  standalone: true,
  imports: [ProjectCardComponent, CommonModule],
  templateUrl: './project-list-page.component.html',
  styleUrls: ['./project-list-page.component.css']
})
export class ProjectListPageComponent implements OnInit {
  projects: any[] = [];
  filteredProjects: any[] = [];
  categories: { name: string, icon: string }[] = [];
  selectedCategories: string[] = [];  // Liste des catégories sélectionnées

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getSiteData().subscribe((data) => {
      if (data && data.project) {
        this.projects = data.project;
        this.filteredProjects = this.projects;
        this.categories = this.extractCategoriesWithIcons();
      }
    });
  }

  extractCategoriesWithIcons(): { name: string, icon: string }[] {
    const categoryMap = new Map();
    this.projects.forEach((project) => {
      if (!categoryMap.has(project.category)) {
        categoryMap.set(project.category, project.icon);
      }
    });
    return Array.from(categoryMap).map(([name, icon]) => ({ name, icon }));
  }

  toggleCategory(category: string): void {
    if (category === 'all') {
      this.selectedCategories = ['all'];  // Si "Tous" est sélectionné, afficher tous les projets
    } else {
      this.selectedCategories = [category];  // Remplace toutes les catégories par la nouvelle sélection
    }
  
    this.filterProjects();  // Met à jour la liste des projets en fonction de la sélection
  }
  

  filterProjects(): void {
    if (this.selectedCategories.includes('all') || this.selectedCategories.length === 0) {
      this.filteredProjects = this.projects;
    } else {
      this.filteredProjects = this.projects.filter(project =>
        this.selectedCategories.includes(project.category)
      );
    }
  }
}
