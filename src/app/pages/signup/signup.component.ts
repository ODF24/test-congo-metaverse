import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { SupabaseService } from '../../services/supabase.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  fullname = '';
  email = '';
  password = '';
  confirmPassword = '';
  loading = false;
  error = '';
  success = '';

  constructor(private supabase: SupabaseService, private router: Router) {}

  async onSubmit(): Promise<void> {
    this.error = '';
    this.success = '';

    if (!this.fullname.trim()) {
      this.error = 'Veuillez entrer votre nom complet.';
      return;
    }
    if (this.password.length < 6) {
      this.error = 'Le mot de passe doit contenir au moins 6 caractères.';
      return;
    }
    if (this.password !== this.confirmPassword) {
      this.error = 'Les mots de passe ne correspondent pas.';
      return;
    }

    this.loading = true;
    const { error } = await this.supabase.signUp(this.email, this.password, this.fullname);

    if (error) {
      this.error = this.translateError(error.message);
      this.loading = false;
      return;
    }

    // Connexion automatique puis redirection vers l'immersion
    const { error: loginError } = await this.supabase.signIn(this.email, this.password);
    this.loading = false;

    if (!loginError) {
      this.router.navigate(['/welcome']);
    } else {
      this.success = 'Compte créé ! Vérifiez votre email puis connectez-vous.';
    }
  }

  private translateError(msg: string): string {
    if (msg.includes('already registered')) return 'Cet email est déjà utilisé.';
    if (msg.includes('invalid email')) return 'Email invalide.';
    if (msg.includes('Password')) return 'Mot de passe trop faible (min. 6 caractères).';
    return msg;
  }
}
