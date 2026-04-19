-- Create leads table for Stttock CRM
CREATE TABLE IF NOT EXISTS public.leads (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),

  -- Contact info
  nombre        TEXT NOT NULL,
  negocio       TEXT NOT NULL,
  correo        TEXT NOT NULL,
  telefono      TEXT NOT NULL,

  -- Plan context
  plan          TEXT NOT NULL CHECK (plan IN ('cadena', 'enterprise')),

  -- Business size
  sucursales    INTEGER NOT NULL,

  -- Staff per role
  meseros       INTEGER NOT NULL DEFAULT 0,
  jefes_barra   INTEGER NOT NULL DEFAULT 0,
  managers      INTEGER NOT NULL DEFAULT 0,
  admins        INTEGER NOT NULL DEFAULT 0,

  -- CRM status
  status        TEXT NOT NULL DEFAULT 'nuevo' CHECK (status IN ('nuevo', 'contactado', 'demo', 'cerrado', 'perdido')),
  notas         TEXT
);

-- Enable RLS
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Only authenticated users (CRM admins) can read/update leads
CREATE POLICY "leads_select_authenticated" ON public.leads
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "leads_update_authenticated" ON public.leads
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "leads_delete_authenticated" ON public.leads
  FOR DELETE USING (auth.role() = 'authenticated');

-- Anyone (anon) can insert a new lead (landing page form)
CREATE POLICY "leads_insert_anon" ON public.leads
  FOR INSERT WITH CHECK (true);
