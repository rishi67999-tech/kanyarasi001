-- ==============================================================================
-- KNOWLEDGE SKELETON: INITIAL SCHEMA & ROW LEVEL SECURITY
-- ==============================================================================

-- 1. Profiles Table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS for profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone."
  ON public.profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update their own profile."
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- 2. Knowledge Maps Table
CREATE TABLE IF NOT EXISTS public.knowledge_maps (
  id TEXT PRIMARY KEY,
  owner_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  topic TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  central_node_id TEXT NOT NULL,
  graph_data JSONB NOT NULL,
  is_public BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_knowledge_maps_owner ON public.knowledge_maps(owner_id);
CREATE INDEX IF NOT EXISTS idx_knowledge_maps_topic ON public.knowledge_maps(topic);

-- Enable RLS for knowledge_maps
ALTER TABLE public.knowledge_maps ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public knowledge maps are viewable by everyone."
  ON public.knowledge_maps FOR SELECT
  USING (is_public = true OR auth.uid() = owner_id);

CREATE POLICY "Users can insert knowledge maps."
  ON public.knowledge_maps FOR INSERT
  WITH CHECK (auth.uid() = owner_id OR owner_id IS NULL);

CREATE POLICY "Users can update their own knowledge maps."
  ON public.knowledge_maps FOR UPDATE
  USING (auth.uid() = owner_id);

-- 3. Learning Progress Table
CREATE TABLE IF NOT EXISTS public.learning_progress (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  knowledge_map_id TEXT NOT NULL REFERENCES public.knowledge_maps(id) ON DELETE CASCADE,
  concept_node_id TEXT NOT NULL,
  completion_state TEXT NOT NULL DEFAULT 'completed',
  quiz_score INT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT unique_user_map_node UNIQUE (user_id, knowledge_map_id, concept_node_id)
);

CREATE INDEX IF NOT EXISTS idx_progress_map_user ON public.learning_progress(knowledge_map_id, user_id);

-- Enable RLS for learning_progress
ALTER TABLE public.learning_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own learning progress."
  ON public.learning_progress FOR SELECT
  USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can upsert their own learning progress."
  ON public.learning_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can update their own progress."
  ON public.learning_progress FOR UPDATE
  USING (auth.uid() = user_id);
