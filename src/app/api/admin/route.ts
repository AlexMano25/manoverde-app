import { createServiceClient } from '@/lib/supabase-server';

export async function GET(request: Request) {
  try {
    const supabase = createServiceClient();

    // Get admin email from request headers
    const adminEmail = request.headers.get('x-admin-email');

    if (!adminEmail) {
      return Response.json(
        { error: 'Unauthorized: No admin email provided' },
        { status: 401 }
      );
    }

    // Fetch admin role info from mv_admin_roles table
    const { data: adminRole, error } = await supabase
      .from('mv_admin_roles')
      .select('id, email, display_name, role, status, created_at, last_login_at')
      .eq('email', adminEmail)
      .single();

    if (error || !adminRole) {
      return Response.json(
        { error: 'Unauthorized: Admin account not found' },
        { status: 403 }
      );
    }

    // Check if admin account is active
    if (adminRole.status !== 'active') {
      return Response.json(
        { error: 'Admin account is not active' },
        { status: 403 }
      );
    }

    return Response.json({
      success: true,
      admin: {
        id: adminRole.id,
        email: adminRole.email,
        name: adminRole.display_name,
        role: adminRole.role,
        status: adminRole.status,
        createdAt: adminRole.created_at,
        lastLogin: adminRole.last_login_at,
      },
    });
  } catch (error) {
    console.error('Admin verification error:', error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
