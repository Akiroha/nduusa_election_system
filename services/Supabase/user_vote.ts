import { SupabaseClient } from '@supabase/supabase-js';

export default class UserVote {
  supabase;

  constructor(s: SupabaseClient) {
    this.supabase = s;
  }

  upsertUserVote = async (data: object) => {
    return this.supabase.from('user_vote').upsert(data);
  };
}
