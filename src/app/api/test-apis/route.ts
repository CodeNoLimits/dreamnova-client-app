import { NextRequest, NextResponse } from 'next/server'
import { testAllAPIs } from '@/lib/test-apis'

/**
 * API Route: Tester toutes les APIs
 * GET /api/test-apis
 * 
 * Retourne l'état de toutes les intégrations
 */
export async function GET(request: NextRequest) {
  try {
    const results = await testAllAPIs()
    
    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      results,
    })
  } catch (error: any) {
    console.error('Erreur test APIs:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: error.message 
      },
      { status: 500 }
    )
  }
}

