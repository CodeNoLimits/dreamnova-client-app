import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { checkConversionLimit, getConversionStats } from '@/lib/conversion-limits'

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()

    // Vérifier auth
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })
    }

    // Récupérer stats et limites
    const [stats, limit] = await Promise.all([
      getConversionStats(user.id),
      checkConversionLimit(user.id),
    ])

    return NextResponse.json({
      success: true,
      stats,
      limit,
    })
  } catch (error: any) {
    console.error('Erreur stats:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
