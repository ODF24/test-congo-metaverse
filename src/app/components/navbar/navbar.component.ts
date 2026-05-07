import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  patrimoineOpen = false;

  togglePatrimoine(event: Event) {
    if (window.innerWidth < 900) {
      event.preventDefault();
      this.patrimoineOpen = !this.patrimoineOpen;
    }
  }
}
