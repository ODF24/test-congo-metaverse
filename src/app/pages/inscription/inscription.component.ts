import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { SupabaseService } from '../../services/supabase.service';

@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './inscription.component.html',
  styleUrl: './inscription.component.css'
})
export class InscriptionComponent {
  email = '';
  password = '';
  loading = false;
  error = '';

  constructor(private supabase: SupabaseService, private router: Router) {}

  async onSubmit(): Promise<void> {
    this.error = '';
    this.loading = true;

    const { error, user } = await this.supabase.signIn(this.email, this.password);
    this.loading = false;

    if (error || !user) {
      this.error = this.translateError(error?.message || 'Erreur de connexion');
      return;
    }

    // Vérifier si l'onboarding a été fait
    const done = await this.supabase.hasCompletedOnboarding(user.id);
    if (done) {
      this.router.navigate(['/home']);
    } else {
      this.router.navigate(['/welcome']);
    }
  }

  private translateError(msg: string): string {
    if (msg.includes('Invalid login')) return 'Email ou mot de passe incorrect.';
    if (msg.includes('Email not confirmed')) return 'Veuillez confirmer votre email.';
    return 'Erreur de connexion. Vérifiez vos identifiants.';
  }
}
