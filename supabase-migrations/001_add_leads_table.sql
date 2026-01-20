-- Migration: Add leads table for DreamNova Consult
-- Project: DreamNova Consult
-- Date: 2026-01-19

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create leads table
CREATE TABLE IF NOT EXISTS public.leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  industry TEXT,
  company_size TEXT,
  pain_points JSONB DEFAULT '[]'::jsonb,
  budget TEXT,
  timeline TEXT,
  message TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'proposal', 'negotiation', 'client', 'lost')),
  lead_source TEXT DEFAULT 'website',
  assigned_to UUID,
  last_contacted TIMESTAMPTZ,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create audit submissions table (for velocity audits)
CREATE TABLE IF NOT EXISTS public.audit_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id UUID REFERENCES public.leads(id) ON DELETE CASCADE,
  company_name TEXT NOT NULL,
  industry TEXT,
  current_tech TEXT,
  goal TEXT,
  velocity_score INTEGER,
  bottleneck TEXT,
  recommendation TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_leads_email ON public.leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_status ON public.leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_created ON public.leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_source ON public.leads(lead_source);
CREATE INDEX IF NOT EXISTS idx_audit_lead ON public.audit_submissions(lead_id);

-- Enable RLS
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_submissions ENABLE ROW LEVEL SECURITY;

-- Policies for leads (admin access only via service key)
CREATE POLICY "Service can manage leads"
ON public.leads FOR ALL
USING (true);

-- Policies for audit submissions (anyone can create, admin can read)
CREATE POLICY "Anyone can create audit submission"
ON public.audit_submissions FOR INSERT
WITH CHECK (true);

CREATE POLICY "Service can read audit submissions"
ON public.audit_submissions FOR SELECT
USING (true);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for leads updated_at
DROP TRIGGER IF EXISTS update_leads_updated_at ON public.leads;
CREATE TRIGGER update_leads_updated_at
  BEFORE UPDATE ON public.leads
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- View for lead statistics
CREATE OR REPLACE VIEW public.lead_stats AS
SELECT
  status,
  COUNT(*) as count,
  DATE_TRUNC('day', created_at) as date
FROM public.leads
GROUP BY status, DATE_TRUNC('day', created_at)
ORDER BY date DESC, status;

COMMENT ON TABLE public.leads IS 'Leads captured from DreamNova Consult website';
COMMENT ON TABLE public.audit_submissions IS 'AI velocity audit submissions';
