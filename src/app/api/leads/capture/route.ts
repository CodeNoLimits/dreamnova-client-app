import { NextRequest, NextResponse } from 'next/server';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Lazy initialize Supabase client
let supabase: SupabaseClient | null = null;

function getSupabase(): SupabaseClient {
  if (!supabase) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error('Missing Supabase environment variables');
    }

    supabase = createClient(supabaseUrl, supabaseServiceKey);
  }
  return supabase;
}

// Email notification (optional - integrate with SendGrid/Resend)
async function sendNotificationEmail(lead: any) {
  // TODO: Integrate with email service
  console.log('New lead notification:', lead.email);
  return true;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      companyName,
      email,
      phone,
      industry,
      companySize,
      painPoints,
      budget,
      timeline,
      message,
      leadSource = 'website',
    } = body;

    // Validate required fields
    if (!email || !companyName) {
      return NextResponse.json(
        { error: 'Email and company name are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Check for duplicate
    const { data: existing } = await getSupabase()
      .from('leads')
      .select('id, created_at')
      .eq('email', email.toLowerCase())
      .single();

    if (existing) {
      // Update existing lead instead of creating duplicate
      const { error: updateError } = await getSupabase()
        .from('leads')
        .update({
          company_name: companyName,
          phone,
          industry,
          company_size: companySize,
          pain_points: painPoints,
          budget,
          timeline,
          message,
          updated_at: new Date().toISOString(),
          notes: `Returning visitor. First contact: ${existing.created_at}`,
        })
        .eq('id', existing.id);

      if (updateError) throw updateError;

      return NextResponse.json({
        success: true,
        message: 'Thank you! We have updated your information.',
        leadId: existing.id,
        isReturning: true,
      });
    }

    // Create new lead
    const { data: lead, error: insertError } = await getSupabase()
      .from('leads')
      .insert({
        company_name: companyName,
        email: email.toLowerCase(),
        phone,
        industry,
        company_size: companySize,
        pain_points: painPoints,
        budget,
        timeline,
        message,
        lead_source: leadSource,
        status: 'new',
      })
      .select()
      .single();

    if (insertError) throw insertError;

    // Send notification email
    await sendNotificationEmail(lead);

    return NextResponse.json({
      success: true,
      message: 'Thank you! We will contact you shortly.',
      leadId: lead.id,
    });
  } catch (error) {
    console.error('Lead capture error:', error);
    return NextResponse.json(
      { error: 'Failed to submit. Please try again.' },
      { status: 500 }
    );
  }
}

// Get leads (admin only - needs auth middleware)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    let query = getSupabase()
      .from('leads')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (status) {
      query = query.eq('status', status);
    }

    const { data, error, count } = await query;

    if (error) throw error;

    return NextResponse.json({
      leads: data,
      total: count,
      limit,
      offset,
    });
  } catch (error) {
    console.error('Get leads error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch leads' },
      { status: 500 }
    );
  }
}
