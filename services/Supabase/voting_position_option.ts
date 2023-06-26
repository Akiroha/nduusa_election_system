import { SupabaseClient } from '@supabase/supabase-js';

export default class VotingPositionOption {
  supabase;

  constructor(s: SupabaseClient) {
    this.supabase = s;
  }

  upsertVotingPositionOption = async (data: object) => {
    return this.supabase.from('voting_position_option').upsert(data);
  };
}
