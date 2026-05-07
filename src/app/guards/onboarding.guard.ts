import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SupabaseService } from '../services/supabase.service';

// Bloque l'accès au site principal si l'onboarding n'est pas terminé
export const onboardingDoneGuard: CanActivateFn = async () => {
  const supabase = inject(SupabaseService);
  const router = inject(Router);

  const user = await supabase.getCurrentUser();
  if (!user) return true; // pas connecté, laisser passer (auth guard gère)

  const done = await supabase.hasCompletedOnboarding(user.id);
  if (!done) {
    router.navigate(['/welcome']);
    return false;
  }
  return true;
};

// Bloque l'accès aux pages d'onboarding si déjà terminé
export const onboardingGuard: CanActivateFn = async () => {
  const supabase = inject(SupabaseService);
  const router = inject(Router);

  const user = await supabase.getCurrentUser();
  if (!user) {
    router.navigate(['/signup']);
    return false;
  }

  const done = await supabase.hasCompletedOnboarding(user.id);
  if (done) {
    router.navigate(['/home']);
    return false;
  }
  return true;
};
