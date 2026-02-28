/*
  # Perception-to-Decision Lab Schema

  1. New Tables
    - `scenarios`
      - `id` (uuid, primary key)
      - `title` (text) - Scenario display name
      - `domain` (text) - Business domain: revenue, inventory, marketing, churn, budget, project
      - `description` (text) - Scenario narrative context
      - `decision_timeframe` (text) - day, week, month, quarter, year
      - `data_spans_orders_of_magnitude` (boolean) - Whether data spans >1 order of magnitude
      - `base_data` (jsonb) - Raw dataset for the scenario
      - `sort_order` (integer) - Display ordering
      - `created_at` (timestamptz)

    - `executive_reactions`
      - `id` (uuid, primary key)
      - `archetype` (text) - skeptic, optimist, firefighter, strategist
      - `credibility_band` (text) - high (>=3), moderate (0-2), low (-1 to -3), critical (<=-4)
      - `dominant_manipulation` (text) - Which manipulation type triggers this reaction
      - `template_text` (text) - Parameterized reaction template with {tokens}
      - `decision_tendency` (text) - What action this archetype takes
      - `created_at` (timestamptz)

    - `cognitive_principles`
      - `id` (uuid, primary key)
      - `principle_key` (text, unique) - e.g. 'preattentive', 'cognitive_load', 'anchoring', 'pattern_recognition'
      - `title` (text) - Display title
      - `description` (text) - Full description
      - `research_citation` (text) - Academic source
      - `sort_order` (integer)

    - `ethical_levels`
      - `id` (uuid, primary key)
      - `level` (integer, 1-5) - Ethical level number
      - `name` (text) - Level name
      - `description` (text) - Full description
      - `example_text` (text) - Concrete example
      - `color_code` (text) - Display color for UI

    - `user_lab_sessions`
      - `id` (uuid, primary key)
      - `user_id` (uuid) - References auth.users
      - `scenario_id` (uuid) - References scenarios
      - `chart_state` (jsonb) - Full chart state snapshot
      - `credibility_score` (numeric) - Computed score
      - `score_breakdown` (jsonb) - Decomposed score details
      - `created_at` (timestamptz)

  2. Security
    - RLS enabled on all tables
    - scenarios, executive_reactions, cognitive_principles, ethical_levels: readable by authenticated users
    - user_lab_sessions: users can only read/write their own sessions
*/

CREATE TABLE IF NOT EXISTS scenarios (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  domain text NOT NULL DEFAULT 'revenue',
  description text NOT NULL DEFAULT '',
  decision_timeframe text NOT NULL DEFAULT 'quarter',
  data_spans_orders_of_magnitude boolean NOT NULL DEFAULT false,
  base_data jsonb NOT NULL DEFAULT '[]'::jsonb,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE scenarios ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read scenarios"
  ON scenarios FOR SELECT
  TO authenticated
  USING (auth.uid() IS NOT NULL);

CREATE TABLE IF NOT EXISTS executive_reactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  archetype text NOT NULL,
  credibility_band text NOT NULL,
  dominant_manipulation text NOT NULL DEFAULT 'general',
  template_text text NOT NULL,
  decision_tendency text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE executive_reactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read executive reactions"
  ON executive_reactions FOR SELECT
  TO authenticated
  USING (auth.uid() IS NOT NULL);

CREATE TABLE IF NOT EXISTS cognitive_principles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  principle_key text UNIQUE NOT NULL,
  title text NOT NULL,
  description text NOT NULL DEFAULT '',
  research_citation text NOT NULL DEFAULT '',
  sort_order integer NOT NULL DEFAULT 0
);

ALTER TABLE cognitive_principles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read cognitive principles"
  ON cognitive_principles FOR SELECT
  TO authenticated
  USING (auth.uid() IS NOT NULL);

CREATE TABLE IF NOT EXISTS ethical_levels (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  level integer NOT NULL,
  name text NOT NULL,
  description text NOT NULL DEFAULT '',
  example_text text NOT NULL DEFAULT '',
  color_code text NOT NULL DEFAULT '#6B7280'
);

ALTER TABLE ethical_levels ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read ethical levels"
  ON ethical_levels FOR SELECT
  TO authenticated
  USING (auth.uid() IS NOT NULL);

CREATE TABLE IF NOT EXISTS user_lab_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  scenario_id uuid NOT NULL REFERENCES scenarios(id),
  chart_state jsonb NOT NULL DEFAULT '{}'::jsonb,
  credibility_score numeric NOT NULL DEFAULT 0,
  score_breakdown jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE user_lab_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own lab sessions"
  ON user_lab_sessions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own lab sessions"
  ON user_lab_sessions FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own lab sessions"
  ON user_lab_sessions FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own lab sessions"
  ON user_lab_sessions FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);
