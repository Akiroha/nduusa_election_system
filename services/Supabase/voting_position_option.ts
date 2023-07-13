import { SupabaseClient } from '@supabase/supabase-js';

const voting_position_option = 'voting_position_option';

export default class VotingPositionOption {
  supabase;

  constructor(s: SupabaseClient) {
    this.supabase = s;
  }

  upsertVotingPositionOption = async (data: object) => {
    return this.supabase.from(voting_position_option).upsert(data).select();
  };

  getVPOsByVotingPosition = async (voting_position: string) => {
    return this.supabase
      .from(voting_position_option)
      .select('*')
      .eq('voting_position', voting_position);
  };

  removeVPO = async (id: string) => {
    return this.supabase.from(voting_position_option).delete().eq('id', id);
  };

  getVPOsAndTheirPositions = async (election_year: string) => {
    return this.supabase
      .from(voting_position_option)
      .select('id,name, voting_position!inner(id, title,election_year)')
      .eq('voting_position.election_year', election_year);
  };
}
