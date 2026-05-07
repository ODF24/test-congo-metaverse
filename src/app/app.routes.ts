import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { HistoireComponent } from './pages/histoire/histoire.component';
import { HistoirePresidentComponent } from './pages/histoire-president/histoire-president.component';
import { InscriptionComponent } from './pages/inscription/inscription.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ActualitesComponent } from './pages/actualites/actualites.component';
import { PatrimoineComponent } from './pages/patrimoine/patrimoine.component';
import { TourismeComponent } from './pages/tourisme/tourisme.component';
import { MarcheArtComponent } from './pages/marche-art/marche-art.component';
import { AProposComponent } from './pages/a-propos/a-propos.component';
import { PaiementComponent } from './pages/paiement/paiement.component';
import { WelcomeScreenComponent } from './pages/welcom/welcome-screen.component';
import { UserSelectionComponent } from './pages/select_user/user-selection.component';
import { ImmersiveGatewayComponent } from './pages/imersion/immersive-gateway.component';
import { onboardingGuard } from './guards/onboarding.guard';

export const routes: Routes = [
  // ─── PAGES PUBLIQUES ───────────────────────────────────────────────────────
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'histoire', component: HistoireComponent },
  { path: 'histoire/:id', component: HistoirePresidentComponent },
  { path: 'actualites', component: ActualitesComponent },
  { path: 'patrimoine', component: PatrimoineComponent },
  { path: 'tourisme', component: TourismeComponent },
  { path: 'marche-art', component: MarcheArtComponent },
  { path: 'a-propos', component: AProposComponent },
  { path: 'paiement', component: PaiementComponent },

  // ─── AUTH ──────────────────────────────────────────────────────────────────
  { path: 'inscription', component: InscriptionComponent },
  { path: 'signup', component: SignupComponent },

  // ─── ONBOARDING (1 seule fois, protégé) ────────────────────────────────────
  {
    path: 'welcome',
    component: WelcomeScreenComponent,
    canActivate: [onboardingGuard]  // Bloque si déjà fait
  },
  {
    path: 'selection',
    component: UserSelectionComponent,
    canActivate: [onboardingGuard]
  },
  {
    path: 'immersion',
    component: ImmersiveGatewayComponent,
    canActivate: [onboardingGuard]
  },

  // ─── FALLBACK ──────────────────────────────────────────────────────────────
  { path: '**', redirectTo: 'home' }
];
