import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const origin = requestUrl.origin;

  if (code) {
    const supabase = await createClient();
    const { data: { user }, error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error && user) {
      // Check if user is admin
      const { data: adminData } = await supabase
        .from('mv_admin_roles')
        .select('role')
        .eq('email', user.email)
        .eq('is_active', true)
        .maybeSingle();

      if (adminData) {
        return NextResponse.redirect(`${origin}/fr/admin`);
      }

      // Check user profile role
      const { data: profile } = await supabase
        .from('mv_profiles')
        .select('role')
        .eq('user_id', user.id)
        .maybeSingle();

      if (profile?.role === 'restaurant_owner') {
        return NextResponse.redirect(`${origin}/fr/dashboard/restaurant`);
      } else if (profile?.role === 'courier') {
        return NextResponse.redirect(`${origin}/fr/dashboard/courier`);
      }

      // Default: customer dashboard
      return NextResponse.redirect(`${origin}/fr/dashboard/customer`);
    }
  }

  // Auth error - redirect to login
  return NextResponse.redirect(`${origin}/fr/auth/login?error=auth`);
}
