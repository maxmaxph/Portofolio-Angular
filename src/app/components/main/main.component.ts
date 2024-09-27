import { Component, OnInit, OnDestroy, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { DataService } from '../../services/data.service';
import { CommonModule } from '@angular/common';
import Typed from 'typed.js';
import * as VANTA from 'vanta';
import CLOUDS from 'vanta/dist/vanta.clouds.min'; // Tu peux changer l'animation ici
import * as THREE from 'three';

@Component({
  selector: 'app-main',
  standalone: true,
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  imports: [CommonModule],
})
export class MainComponent implements OnInit, OnDestroy {
  @ViewChild('vantajs') vantaRef!: ElementRef; // Référence à l'élément DOM pour Vanta.js
  vantaEffect: any;
  myName: string = '';
  myJob: string[] = [];
  presentation: string = '';
  skills: { title: string; description: string; icon: string; img: string }[] = [];
  animationPaused: boolean = false;

  constructor(private dataService: DataService, private renderer: Renderer2) {}

  ngOnInit(): void {
    // Détection de l'écran mobile
    const isMobile = window.innerWidth < 768;
    // Chargement des données du service
    this.dataService.getSiteData().subscribe((data) => {
      this.myName = data.myName;
      this.myJob = data.myJob;
      this.presentation = data.presentation;
      this.skills = data.skills;

      // Initialiser Typed.js après un petit délai
      setTimeout(() => {
        const options = {
          strings: this.myJob,
          typeSpeed: 50,
          backSpeed: 50,
          loop: true,
        };
        new Typed('.typed-element', options);
      }, 500);

      // Initialiser l'animation Vanta.js sur l'élément référencé
      this.vantaEffect = CLOUDS({
        el: this.vantaRef.nativeElement, // Référence à l'élément
        mouseControls: !isMobile, // Désactiver les contrôles de la souris sur mobile
        touchControls: false,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        skyColor: 0x68b8d7, // Couleurs de l'animation
        cloudColor: 0xffffff,
        speed: 0.6,
      });
    });
  }

  // Méthode pour changer dynamiquement le curseur
  changeCursor(skillIcon: string, event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const iconUrl = `url(${skillIcon})`;
    this.renderer.setStyle(target, 'cursor', `${iconUrl}, auto`);
  }

  // Méthode pour restaurer le curseur par défaut
  resetCursor(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    this.renderer.setStyle(target, 'cursor', 'auto');
  }

  ngOnDestroy(): void {
    if (this.vantaEffect) {
      this.vantaEffect.destroy(); // Toujours détruire l'animation lors de la destruction du composant
    }
  }

  toggleAnimation(): void {
    this.animationPaused = !this.animationPaused;
  }
}
