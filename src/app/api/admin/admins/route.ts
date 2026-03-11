import { createServiceClient } from '@/lib/supabase-server';

interface CreateAdminBody {
  email: string;
  display_name: string;
  role: 'admin' | 'super_admin';
  status?: 'active' | 'inactive';
}

interface UpdateAdminBody {
  id: string;
  display_name?: string;
  role?: 'admin' | 'super_admin';
  status?: 'active' | 'inactive';
}

export async function GET(request: Request) {
  try {
    const supabase = createServiceClient();

    const { data: admins, error } = await supabase
      .from('mv_admin_roles')
      .select('id, email, display_name, role, status, created_at, last_login_at')
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    return Response.json({
      success: true,
      data: admins || [],
    });
  } catch (error) {
    console.error('Admins fetch error:', error);
    return Response.json(
      { error: 'Failed to fetch admin accounts' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const supabase = createServiceClient();
    const body: CreateAdminBody = await request.json();
    const { email, display_name, role, status = 'active' } = body;

    if (!email || !display_name || !role) {
      return Response.json(
        { error: 'Email, display name, and role are required' },
        { status: 400 }
      );
    }

    // Check if email already exists
    const { data: existing } = await supabase
      .from('mv_admin_roles')
      .select('id')
      .eq('email', email)
      .single();

    if (existing) {
      return Response.json(
        { error: 'Admin account with this email already exists' },
        { status: 400 }
      );
    }

    const { data: newAdmin, error } = await supabase
      .from('mv_admin_roles')
      .insert([
        {
          email,
          display_name,
          role,
          status,
          created_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) {
      throw error;
    }

    return Response.json(
      {
        success: true,
        data: newAdmin,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Admin creation error:', error);
    return Response.json(
      { error: 'Failed to create admin account' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const supabase = createServiceClient();
    const body: UpdateAdminBody = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return Response.json(
        { error: 'Admin ID is required' },
        { status: 400 }
      );
    }

    const { data: admin, error } = await supabase
      .from('mv_admin_roles')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return Response.json({
      success: true,
      data: admin,
    });
  } catch (error) {
    console.error('Admin update error:', error);
    return Response.json(
      { error: 'Failed to update admin account' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const supabase = createServiceClient();
    const { searchParams } = new URL(request.url);
    const adminId = searchParams.get('id');

    if (!adminId) {
      return Response.json(
        { error: 'Admin ID is required' },
        { status: 400 }
      );
    }

    // Check if current user is super_admin
    const currentAdminEmail = request.headers.get('x-admin-email');
    const { data: currentAdmin } = await supabase
      .from('mv_admin_roles')
      .select('role')
      .eq('email', currentAdminEmail || '')
      .single();

    if (currentAdmin?.role !== 'super_admin') {
      return Response.json(
        { error: 'Only super admins can delete admin accounts' },
        { status: 403 }
      );
    }

    // Check if admin being deleted is super_admin
    const { data: adminToDelete } = await supabase
      .from('mv_admin_roles')
      .select('role')
      .eq('id', adminId)
      .single();

    if (adminToDelete?.role === 'super_admin') {
      return Response.json(
        { error: 'Cannot delete super admin accounts' },
        { status: 403 }
      );
    }

    // Perform the delete
    const { error } = await supabase
      .from('mv_admin_roles')
      .delete()
      .eq('id', adminId);

    if (error) {
      throw error;
    }

    return Response.json({
      success: true,
      message: 'Admin account deleted successfully',
    });
  } catch (error) {
    console.error('Admin delete error:', error);
    return Response.json(
      { error: 'Failed to delete admin account' },
      { status: 500 }
    );
  }
}
