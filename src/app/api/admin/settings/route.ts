import { createServiceClient } from '@/lib/supabase-server';

interface UpdateSettingsBody {
  key: string;
  value: string | number | boolean;
}

export async function GET(request: Request) {
  try {
    const supabase = createServiceClient();

    const { data: settings, error } = await supabase
      .from('mv_platform_settings')
      .select('*');

    if (error) {
      throw error;
    }

    // Convert array of settings to object for easier access
    const settingsObject: Record<string, any> = {};
    settings?.forEach((setting: any) => {
      settingsObject[setting.key] = setting.value;
    });

    return Response.json({
      success: true,
      data: settingsObject,
      raw: settings || [],
    });
  } catch (error) {
    console.error('Settings fetch error:', error);
    return Response.json(
      { error: 'Failed to fetch platform settings' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const supabase = createServiceClient();
    const body = await request.json();

    // Check if current user is super_admin
    const adminEmail = request.headers.get('x-admin-email');
    const { data: admin } = await supabase
      .from('mv_admin_roles')
      .select('role')
      .eq('email', adminEmail || '')
      .single();

    if (admin?.role !== 'super_admin') {
      return Response.json(
        { error: 'Only super admins can update platform settings' },
        { status: 403 }
      );
    }

    // Update each setting
    const updatedSettings: any = {};

    for (const [key, value] of Object.entries(body)) {
      const { error: updateError } = await supabase
        .from('mv_platform_settings')
        .upsert(
          {
            key,
            value,
            updated_at: new Date().toISOString(),
          },
          { onConflict: 'key' }
        );

      if (updateError) {
        throw updateError;
      }

      updatedSettings[key] = value;
    }

    return Response.json({
      success: true,
      data: updatedSettings,
    });
  } catch (error) {
    console.error('Settings update error:', error);
    return Response.json(
      { error: 'Failed to update platform settings' },
      { status: 500 }
    );
  }
}
