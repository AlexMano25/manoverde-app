import { createServiceClient } from '@/lib/supabase-server';

interface CreatePlanBody {
  name: string;
  slug: string;
  description: string;
  type: 'restaurant' | 'courier' | 'customer';
  monthly_price: number;
  yearly_price: number;
  commission_rate: number;
  features: string[];
  max_orders: number;
  sort_order: number;
  active: boolean;
}

interface UpdatePlanBody {
  id: string;
  name?: string;
  monthly_price?: number;
  yearly_price?: number;
  commission_rate?: number;
  features?: string[];
  max_orders?: number;
  active?: boolean;
}

export async function GET(request: Request) {
  try {
    const supabase = createServiceClient();

    const { data: plans, error } = await supabase
      .from('mv_pricing_plans')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error) {
      throw error;
    }

    return Response.json({
      success: true,
      data: plans || [],
    });
  } catch (error) {
    console.error('Plans fetch error:', error);
    return Response.json(
      { error: 'Failed to fetch pricing plans' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const supabase = createServiceClient();
    const body: CreatePlanBody = await request.json();

    const requiredFields = ['name', 'slug', 'type', 'commission_rate'];
    for (const field of requiredFields) {
      if (!(field in body)) {
        return Response.json(
          { error: `${field} is required` },
          { status: 400 }
        );
      }
    }

    const { data: newPlan, error } = await supabase
      .from('mv_pricing_plans')
      .insert([
        {
          ...body,
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
        data: newPlan,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Plan creation error:', error);
    return Response.json(
      { error: 'Failed to create pricing plan' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const supabase = createServiceClient();
    const body: UpdatePlanBody = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return Response.json(
        { error: 'Plan ID is required' },
        { status: 400 }
      );
    }

    const { data: plan, error } = await supabase
      .from('mv_pricing_plans')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return Response.json({
      success: true,
      data: plan,
    });
  } catch (error) {
    console.error('Plan update error:', error);
    return Response.json(
      { error: 'Failed to update pricing plan' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const supabase = createServiceClient();
    const { searchParams } = new URL(request.url);
    const planId = searchParams.get('id');

    if (!planId) {
      return Response.json(
        { error: 'Plan ID is required' },
        { status: 400 }
      );
    }

    // Check if current user is super_admin
    const adminEmail = request.headers.get('x-admin-email');
    const { data: admin } = await supabase
      .from('mv_admin_roles')
      .select('role')
      .eq('email', adminEmail || '')
      .single();

    if (admin?.role !== 'super_admin') {
      return Response.json(
        { error: 'Only super admins can delete plans' },
        { status: 403 }
      );
    }

    const { error } = await supabase
      .from('mv_pricing_plans')
      .delete()
      .eq('id', planId);

    if (error) {
      throw error;
    }

    return Response.json({
      success: true,
      message: 'Pricing plan deleted successfully',
    });
  } catch (error) {
    console.error('Plan delete error:', error);
    return Response.json(
      { error: 'Failed to delete pricing plan' },
      { status: 500 }
    );
  }
}
