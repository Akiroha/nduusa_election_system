import { UserVoteType } from '@/types';
import { SupabaseClient } from '@supabase/supabase-js';

const user_vote = 'user_vote';

export default class UserVote {
  supabase;

  constructor(s: SupabaseClient) {
    this.supabase = s;
  }

  submitVotes = async (data: UserVoteType[]) => {
    return this.supabase.from(user_vote).insert(data);
  };
}
