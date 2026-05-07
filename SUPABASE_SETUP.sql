-- ================================================================
-- CONGO METAVERSE — Configuration Supabase
-- Exécuter dans Supabase > SQL Editor
-- ================================================================

-- 1. Table profiles (liée à auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL DEFAULT '',
  user_type TEXT DEFAULT NULL,
  has_completed_onboarding BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Chaque utilisateur peut voir et modifier uniquement son propre profil
CREATE POLICY "Profil visible par l'utilisateur" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Profil modifiable par l'utilisateur" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Profil créable à l'inscription" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- 3. Trigger : création automatique du profil lors de l'inscription
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', '')
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ================================================================
-- VÉRIFICATION : après avoir exécuté, testez avec :
-- SELECT * FROM public.profiles;
-- ================================================================
