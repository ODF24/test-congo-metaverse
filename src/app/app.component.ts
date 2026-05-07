import { Component } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent, CommonModule],
  template: `
    <app-navbar *ngIf="showChrome"></app-navbar>
    <main [class.with-nav]="showChrome">
      <router-outlet></router-outlet>
    </main>
    <app-footer *ngIf="showChrome"></app-footer>
  `,
  styles: [`
    :host { display: flex; flex-direction: column; min-height: 100vh; }
    main { flex: 1; }
    main.with-nav { padding-top: 0; }
  `]
})
export class AppComponent {
  showChrome = true;

  // Routes qui cachent la navbar et le footer (immersion plein écran)
  private readonly FULLSCREEN_ROUTES = ['/welcome', '/selection', '/immersion'];

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe((e: any) => {
      this.showChrome = !this.FULLSCREEN_ROUTES.some(r => e.urlAfterRedirects.startsWith(r));
    });
  }
}
