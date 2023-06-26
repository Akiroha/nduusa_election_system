import { SupabaseClient } from '@supabase/supabase-js';

export default class Organization {
  supabase;

  constructor(s: SupabaseClient) {
    this.supabase = s;
  }

  getOrganization = async () => {
    return this.supabase.from('organization').select('*').single();
  };
}
