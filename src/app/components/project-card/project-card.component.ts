import { Component, Input, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.css']
})
export class ProjectCardComponent {
  @Input() project: any; // Récupère les données du projet depuis le parent
  @ViewChildren('projectImage') projectImages!: QueryList<ElementRef>; // Utilise ViewChildren pour sélectionner les images du projet courant

  // Méthode pour faire tourner les images dans le sens des aiguilles d'une montre
  rotateImages(): void {
    if (this.project.images && this.project.images.length > 0) {
      const firstImage = this.project.images.shift();  // Retirer la première image
      this.project.images.push(firstImage);  // Ajouter cette image à la fin du tableau
    }
  }

  // Méthode pour flouter les autres images
  onMouseEnter(index: number): void {
    this.projectImages.forEach((img, i) => {
      if (i !== index) {
        img.nativeElement.classList.add('blurred'); // Applique la classe de floutage aux images non survolées du projet courant
      }
    });
  }

  // Méthode pour retirer le floutage
  onMouseLeave(): void {
    this.projectImages.forEach((img) => {
      img.nativeElement.classList.remove('blurred'); // Supprime la classe de floutage pour le projet courant
    });
  }
}
