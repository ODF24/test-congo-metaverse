import { Component, OnInit, OnDestroy, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {
  clockTime = '--:--';
  clockDate = '';
  timeOfDay = 'Congo';
  private clockInterval: any;

  ngOnInit(): void {
    this.updateClock();
    this.clockInterval = setInterval(() => this.updateClock(), 1000);
  }

  ngAfterViewInit(): void {
    this.initSkyCanvas();
    this.initStars();
    this.initFireflies();
  }

  ngOnDestroy(): void {
    clearInterval(this.clockInterval);
  }

  getBrazzavilleTime(): Date {
    const now = new Date();
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    return new Date(utc + 3600000); // UTC+1
  }

  updateClock(): void {
    const t = this.getBrazzavilleTime();
    this.clockTime = String(t.getHours()).padStart(2, '0') + ':' + String(t.getMinutes()).padStart(2, '0');
    const months = ['Jan','Fév','Mar','Avr','Mai','Jun','Jul','Aoû','Sep','Oct','Nov','Déc'];
    this.clockDate = t.getDate() + ' ' + months[t.getMonth()] + ' ' + t.getFullYear();
    const h = t.getHours();
    if (h >= 5 && h < 12) this.timeOfDay = '🌅 Matin';
    else if (h >= 12 && h < 18) this.timeOfDay = '☀️ Après-midi';
    else if (h >= 18 && h < 21) this.timeOfDay = '🌇 Soir';
    else this.timeOfDay = '🌙 Nuit';
  }

  initSkyCanvas(): void {
    const canvas = document.getElementById('sky-canvas') as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const t = this.getBrazzavilleTime();
    const h = t.getHours();
    let top: string, bottom: string;
    if (h >= 5 && h < 8) { top = '#1a0a3a'; bottom = '#ff6b35'; }
    else if (h >= 8 && h < 17) { top = '#0d2040'; bottom = '#1a4a6a'; }
    else if (h >= 17 && h < 20) { top = '#1a0a1a'; bottom = '#ff4500'; }
    else { top = '#000510'; bottom = '#0a1020'; }
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, top);
    gradient.addColorStop(1, bottom);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  initStars(): void {
    const starsContainer = document.getElementById('stars');
    if (!starsContainer) return;
    const t = this.getBrazzavilleTime();
    const h = t.getHours();
    if (h >= 20 || h < 6) {
      starsContainer.style.opacity = '1';
      for (let i = 0; i < 150; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        const size = Math.random() * 2.5 + 0.5;
        star.style.cssText = `
          width:${size}px; height:${size}px;
          top:${Math.random()*80}%;
          left:${Math.random()*100}%;
          animation-duration:${Math.random()*3+2}s;
          animation-delay:${Math.random()*3}s;
        `;
        starsContainer.appendChild(star);
      }
    }
  }

  initFireflies(): void {
    const container = document.getElementById('fireflies');
    if (!container) return;
    const t = this.getBrazzavilleTime();
    const h = t.getHours();
    if (h >= 19 || h < 5) {
      container.style.opacity = '1';
      for (let i = 0; i < 20; i++) {
        const ff = document.createElement('div');
        ff.className = 'firefly';
        const dx = () => (Math.random() - 0.5) * 200 + 'px';
        const dy = () => (Math.random() - 0.5) * 200 + 'px';
        ff.style.cssText = `
          top:${Math.random()*100}%; left:${Math.random()*100}%;
          animation-duration:${Math.random()*10+8}s,${Math.random()*2+1}s;
          animation-delay:${Math.random()*5}s,${Math.random()*2}s;
          --dx1:${dx()};--dy1:${dy()};--dx2:${dx()};--dy2:${dy()};
          --dx3:${dx()};--dy3:${dy()};--dx4:${dx()};--dy4:${dy()};
        `;
        container.appendChild(ff);
      }
    }
  }
}
