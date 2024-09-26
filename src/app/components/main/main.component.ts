import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { CommonModule } from '@angular/common';
import Typed from 'typed.js';
import * as VANTA from 'vanta';
import CLOUDS from 'vanta/dist/vanta.clouds.min';
import BIRDS from 'vanta/dist/vanta.birds.min';

@Component({
  selector: 'app-main',
  standalone: true,
  templateUrl: './main.component.html',
  imports: [CommonModule],
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit, OnDestroy {
  myName: string = '';
  myJob: string[] = [];
  presentation: string = '';
  skills: { title: string; description: string; icon: string, img: string }[] = [];
  vantaEffect: any;
  animationPaused: boolean = false;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getSiteData().subscribe((data) => {
      this.myName = data.myName;
      this.myJob = data.myJob;
      this.presentation = data.presentation;
      this.skills = data.skills;
      this.initVanta();

      const options = {
        strings: this.myJob,
        typeSpeed: 50,
        backSpeed: 50,
        loop: true,
      };
      const typed = new Typed('.typed-element', options);
    });
  }

  initVanta() {
    this.vantaEffect = CLOUDS({
      el: '#vantajs',
      mouseControls: true,
      touchControls: true,
      skyColor: 0x68b8d7,
      cloudColor: 0xadc1de,
      cloudShadowCoolor: 0x183550,
      sunColor: 0xff9919,
      sunGlareColor: 0xff6633,
      sunlightColor: 0xff9933,
      speed: 0.5,
      minHeight: 100.00,  // Assure que Vanta s'ajuste bien à la hauteur du conteneur
      minWidth: 100.00,
      scale: 1.00,
      scaleMobile: 1.00
    });
  }

  toggleAnimation(): void {
    if (this.vantaEffect) {
      if (this.animationPaused) {
        // Resume animation
        this.initVanta();  // Reinitialize Vanta animation
      } else {
        // Pause animation
        this.vantaEffect.destroy();
      }
      this.animationPaused = !this.animationPaused;
    }
  }

  randomizeAnimation() {
    // If the animation is paused, resume it first
    if (this.animationPaused) {
      this.toggleAnimation();  // Resumes the animation
    }

    if (this.vantaEffect) this.vantaEffect.destroy(); // Destroy current animation
    const animations = [CLOUDS, BIRDS];
    const randomIndex = Math.floor(Math.random() * animations.length);
    const randomEffect = animations[randomIndex];

    this.vantaEffect = randomEffect({
      el: '#vantajs',
      mouseControls: true,
      touchControls: true,
      skyColor: 0x68b8d7,
      cloudColor: 0xadc1de,
      speed: 0.5,
    });
  }

  ngOnDestroy(): void {
    if (this.vantaEffect) this.vantaEffect.destroy();
  }

}
