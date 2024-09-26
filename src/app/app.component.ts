import { Component, HostListener, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { initFlowbite } from 'flowbite';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'max-portofolio';
  isPageLoaded = false;
  recTime: number = 0;
   ngOnInit(): void {
    initFlowbite();
    this.startRecording();
     

    // Add the 'loading' class to the body when the component is initialized
    document.body.classList.add('loading');

    // Listen for the page load event and remove the 'loading' class, adding 'loaded' instead
    window.addEventListener('DOMContentLoaded', () => {
      setTimeout(() => {
        document.body.classList.remove('loading');
        document.body.classList.add('loaded');
        this.isPageLoaded = true;
        this.closeCameraEffect(); // Appel après que la page est complètement chargée
      }, 3500);
    });
    
  }

  startRecording() {
    const timerElement = document.getElementById('rec-timer');
    setInterval(() => {
      this.recTime += 1;
      if (timerElement) {
        timerElement.innerText = this.formatTime(this.recTime);
      }
    }, 1000);
  }

  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${sec < 10 ? '0' : ''}${sec}`;
  }

  closeCameraEffect() {
  if (this.isPageLoaded) { // Ensure the page is loaded
    const cameraFrame = document.querySelector('.camera-frame');
    if (cameraFrame) {
      cameraFrame.classList.add('closing');
      // setTimeout(() => {
      //   cameraFrame.classList.add('hidden');
      // }, 1500); // Temps aligné avec la transition CSS
    }
  }
}

}