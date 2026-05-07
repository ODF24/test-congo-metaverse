import { Injectable } from '@angular/core';
import { createClient, SupabaseClient, User, Session } from '@supabase/supabase-js';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  user_type: string | null;
  has_completed_onboarding: boolean;
  created_at: string;
}

@Injectable({ providedIn: 'root' })
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor(private router: Router) {
    this.supabase = createClient(
      environment.supabase.url,
      environment.supabase.key
    );
  }

  // ─── AUTH ─────────────────────────────────────────────────────────────────

  async signUp(email: string, password: string, fullName: string): Promise<{ error: any }> {
    const { data, error } = await this.supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } }
    });

    if (!error && data.user) {
      // Créer le profil dans la table profiles
      await this.supabase.from('profiles').insert({
        id: data.user.id,
        email,
        full_name: fullName,
        user_type: null,
        has_completed_onboarding: false
      });
    }

    return { error };
  }

  async signIn(email: string, password: string): Promise<{ error: any; user: User | null }> {
    const { data, error } = await this.supabase.auth.signInWithPassword({ email, password });
    return { error, user: data?.user ?? null };
  }

  async signOut(): Promise<void> {
    await this.supabase.auth.signOut();
    this.router.navigate(['/inscription']);
  }

  async getSession(): Promise<Session | null> {
    const { data } = await this.supabase.auth.getSession();
    return data.session;
  }

  async getCurrentUser(): Promise<User | null> {
    const session = await this.getSession();
    return session?.user ?? null;
  }

  // ─── PROFIL ───────────────────────────────────────────────────────────────

  async getProfile(userId: string): Promise<UserProfile | null> {
    const { data, error } = await this.supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) return null;
    return data as UserProfile;
  }

  async updateUserType(userId: string, userType: string): Promise<{ error: any }> {
    const { error } = await this.supabase
      .from('profiles')
      .update({ user_type: userType })
      .eq('id', userId);
    return { error };
  }

  async completeOnboarding(userId: string): Promise<{ error: any }> {
    const { error } = await this.supabase
      .from('profiles')
      .update({ has_completed_onboarding: true })
      .eq('id', userId);
    return { error };
  }

  async hasCompletedOnboarding(userId: string): Promise<boolean> {
    const profile = await this.getProfile(userId);
    return profile?.has_completed_onboarding ?? false;
  }
}
