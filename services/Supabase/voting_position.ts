import { SupabaseClient } from '@supabase/supabase-js';
const voting_position = 'voting_position';

export default class VotingPosition {
  supabase;

  constructor(s: SupabaseClient) {
    this.supabase = s;
  }

  upsertPosition = async (data: object) => {
    return this.supabase.from(voting_position).upsert(data);
  };

  getPositionsByYear = async (election_year: string) => {
    return this.supabase
      .from(voting_position)
      .select('*')
      .eq('election_year', election_year);
  };

  removePosition = async (id: string) => {
    return this.supabase.from(voting_position).delete().eq('id', id);
  };
}
