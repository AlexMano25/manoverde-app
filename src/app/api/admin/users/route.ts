import { createServiceClient } from '@/lib/supabase-server';

const PAGE_SIZE = 10;

interface RequestBody {
  email?: string;
  name?: string;
  phone?: string;
  role?: 'customer' | 'restaurant_owner' | 'courier';
  city?: string;
  is_active?: boolean;
}

export async function GET(request: Request) {
  try {
    const supabase = createServiceClient();
    const { searchParams } = new URL(request.url);

    const page = parseInt(searchParams.get('page') || '1');
    const search = searchParams.get('search') || '';
    const role = searchParams.get('role') || '';

    let query = supabase
      .from('mv_profiles')
      .select('*', { count: 'exact' });

    // Apply filters
    if (search) {
      query = query.or(`full_name.ilike.%${search}%,email.ilike.%${search}%`);
    }

    if (role && role !== 'all') {
      query = query.eq('role', role);
    }

    // Apply pagination
    const offset = (page - 1) * PAGE_SIZE;
    query = query.range(offset, offset + PAGE_SIZE - 1);

    const { data: users, error, count } = await query;

    if (error) {
      throw error;
    }

    return Response.json({
      success: true,
      data: users || [],
      pagination: {
        page,
        pageSize: PAGE_SIZE,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / PAGE_SIZE),
      },
    });
  } catch (error) {
    console.error('Users fetch error:', error);
    return Response.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const supabase = createServiceClient();
    const body: RequestBody & { id: string } = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return Response.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    const { data: user, error } = await supabase
      .from('mv_profiles')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return Response.json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error('User update error:', error);
    return Response.json(
      { error: 'Failed to update user' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const supabase = createServiceClient();
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('id');

    if (!userId) {
      return Response.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    // Check admin role - only super_admin can delete
    const adminEmail = request.headers.get('x-admin-email');
    if (!adminEmail) {
      return Response.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { data: admin } = await supabase
      .from('mv_admin_roles')
      .select('role')
      .eq('email', adminEmail)
      .single();

    if (admin?.role !== 'super_admin') {
      return Response.json(
        { error: 'Only super admins can delete users' },
        { status: 403 }
      );
    }

    // Perform the delete
    const { error } = await supabase
      .from('mv_profiles')
      .delete()
      .eq('id', userId);

    if (error) {
      throw error;
    }

    return Response.json({
      success: true,
      message: 'User deleted successfully',
    });
  } catch (error) {
    console.error('User delete error:', error);
    return Response.json(
      { error: 'Failed to delete user' },
      { status: 500 }
    );
  }
}
