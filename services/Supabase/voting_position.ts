import { SupabaseClient } from '@supabase/supabase-js';

export default class VotingPosition {
  supabase;

  constructor(s: SupabaseClient) {
    this.supabase = s;
  }

  upsertVotingPosition = async (data: object) => {
    return this.supabase.from('voting_position').upsert(data);
  };
}
