import { SupabaseClient } from '@supabase/supabase-js';

const election_year = 'election_year';

export default class ElectionYear {
  supabase;

  constructor(s: SupabaseClient) {
    this.supabase = s;
  }

  getElectionYear = async (year: string) => {
    return this.supabase
      .from(election_year)
      .select('*')
      .eq('year', year)
      .single();
  };
}
