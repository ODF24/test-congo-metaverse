# 🇨🇬 Congo Metaverse — Angular 17 + Supabase

Application Angular avec authentification Supabase et parcours d'immersion unique à l'inscription.

---

## 🚀 Installation rapide

```bash
npm install
ng serve
```
→ http://localhost:4200

---

## ⚙️ Configuration Supabase (OBLIGATOIRE)

### Étape 1 — Créer un projet Supabase
1. Allez sur [supabase.com](https://supabase.com)
2. Créez un nouveau projet
3. Copiez votre **URL** et votre **clé anon** (Project Settings > API)

### Étape 2 — Configurer les variables
Éditez `src/environments/environment.ts` :
```typescript
export const environment = {
  production: false,
  supabase: {
    url: 'https://VOTRE_ID.supabase.co',
    key: 'VOTRE_CLE_ANON'
  }
};
```

### Étape 3 — Créer la base de données
Dans Supabase > **SQL Editor**, copiez-collez et exécutez le contenu du fichier **`SUPABASE_SETUP.sql`**

Ce script crée :
- ✅ Table `profiles` (id, email, full_name, user_type, has_completed_onboarding)
- ✅ Row Level Security (chaque utilisateur voit uniquement son profil)
- ✅ Trigger automatique (crée le profil à l'inscription)

---

## 🗺️ Routes & Navigation

| URL | Composant | Accès |
|-----|-----------|-------|
| `/home` | HomeComponent | Public |
| `/histoire` | HistoireComponent | Public |
| `/histoire/:id` | HistoirePresidentComponent | Public |
| `/actualites` | ActualitesComponent | Public |
| `/patrimoine` | PatrimoineComponent | Public |
| `/tourisme` | TourismeComponent | Public |
| `/marche-art` | MarcheArtComponent | Public |
| `/a-propos` | AProposComponent | Public |
| `/paiement` | PaiementComponent | Public |
| `/inscription` | InscriptionComponent | Public |
| `/signup` | SignupComponent | Public |
| `/welcome` | WelcomeScreenComponent | **1 seule fois** |
| `/selection` | UserSelectionComponent | **1 seule fois** |
| `/immersion` | ImmersiveGatewayComponent | **1 seule fois** |

---

## 🔐 Flux d'authentification

```
INSCRIPTION (/signup)
    ↓ Supabase signUp() → crée compte + profil (has_completed_onboarding: false)
    ↓ Auto-login
    ↓
WELCOME (/welcome)          [Étape 1/3]
    ↓ Accueil personnalisé avec le prénom
    ↓
SÉLECTION (/selection)      [Étape 2/3]
    ↓ Choisir son profil (Touriste, Étudiant, Diaspora, etc.)
    ↓ Sauvegarde user_type dans Supabase
    ↓
IMMERSION (/immersion)      [Étape 3/3]
    ↓ Diaporama cinématique (4 scènes)
    ↓ Marque has_completed_onboarding: true
    ↓
ACCUEIL (/home)             ← Site principal


CONNEXION (/inscription)
    ↓ Supabase signInWithPassword()
    ↓ Vérifie has_completed_onboarding
    ├─ false → Redirige vers /welcome
    └─ true  → Redirige vers /home
```

### Protection onboarding (Guard)
- Les routes `/welcome`, `/selection`, `/immersion` sont protégées par `onboardingGuard`
- Si `has_completed_onboarding === true` → Redirigé automatiquement vers `/home`
- L'immersion n'est donc possible **qu'une seule fois par personne**

---

## 📁 Structure

```
src/app/
├── services/
│   └── supabase.service.ts     ← Auth + profils Supabase
├── guards/
│   ├── auth.guard.ts           ← Protège routes privées
│   └── onboarding.guard.ts     ← Gère l'accès à l'immersion
├── components/
│   ├── navbar/                 ← Navigation (cachée pendant immersion)
│   └── footer/
└── pages/
    ├── welcom/                 ← Étape 1 : écran de bienvenue
    ├── select_user/            ← Étape 2 : choix du profil
    ├── imersion/               ← Étape 3 : diaporama cinématique
    ├── signup/                 ← Inscription (connecté à Supabase)
    ├── inscription/            ← Connexion (connecté à Supabase)
    ├── home/                   ← Page principale
    └── ...autres pages
```

---

## 🛠️ Technologies

- **Angular 17** (Standalone Components)
- **Supabase** (Auth + PostgreSQL)
- **TypeScript**
- **SCSS + CSS** (animations, glassmorphism)
- **Font Awesome 6**, **Google Fonts** (Cinzel, Raleway)
