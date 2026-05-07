import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SupabaseService } from '../../services/supabase.service';

@Component({
  selector: 'app-welcome-screen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './welcome-screen.component.html',
  styleUrls: ['./welcome-screen.component.scss']
})
export class WelcomeScreenComponent implements OnInit, OnDestroy {
  userName = '';
  showContent = false;
  private autoTimer: any;

  constructor(private router: Router, private supabase: SupabaseService) {}

  async ngOnInit(): Promise<void> {
    const user = await this.supabase.getCurrentUser();
    if (user) {
      const profile = await this.supabase.getProfile(user.id);
      this.userName = profile?.full_name?.split(' ')[0] || 'Explorateur';
    }
    setTimeout(() => (this.showContent = true), 300);
  }

  ngOnDestroy(): void {
    clearTimeout(this.autoTimer);
  }

  continue(): void {
    this.router.navigate(['/selection']);
  }
}
