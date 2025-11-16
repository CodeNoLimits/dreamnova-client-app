import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

/**
 * API Route pour l'e-reporting automatique
 * Transmet les factures à la DGFIP via PDP ou PPF
 */
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    
    // Vérifier l'authentification
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })
    }

    const body = await request.json()
    const { invoiceId, pdpProvider } = body

    if (!invoiceId || !pdpProvider) {
      return NextResponse.json(
        { error: 'invoiceId et pdpProvider requis' },
        { status: 400 }
      )
    }

    // TODO: Implémenter la transmission réelle via PDP
    // Pour l'instant, on simule la transmission
    const transmissionResult = {
      success: true,
      transmissionId: `TRX-${Date.now()}`,
      timestamp: new Date().toISOString(),
      pdpProvider,
      status: 'transmitted',
    }

    // Enregistrer le log de transmission
    const { error: logError } = await supabase.from('e_reporting_logs').insert({
      user_id: user.id,
      invoice_id: invoiceId,
      pdp_provider: pdpProvider,
      status: 'success',
      transmission_id: transmissionResult.transmissionId,
      transmitted_at: transmissionResult.timestamp,
    })

    if (logError) {
      console.error('Erreur enregistrement log:', logError)
    }

    return NextResponse.json(transmissionResult)
  } catch (error: any) {
    console.error('Erreur e-reporting:', error)
    return NextResponse.json(
      { error: error.message || 'Erreur serveur' },
      { status: 500 }
    )
  }
}

/**
 * GET: Récupérer l'historique des transmissions
 */
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })
    }

    const { data: logs, error } = await supabase
      .from('e_reporting_logs')
      .select('*')
      .eq('user_id', user.id)
      .order('transmitted_at', { ascending: false })
      .limit(50)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ logs })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Erreur serveur' },
      { status: 500 }
    )
  }
}

