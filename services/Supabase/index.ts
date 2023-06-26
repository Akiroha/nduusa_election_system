import { createClient } from '@supabase/supabase-js';
import User from './user';
import Organization from './organization';
import UserVote from './user_vote';
import VotingPosition from './voting_position';
import VotingPositionOption from './voting_position_option';

const supabase = createClient(
  process.env.supabase_URL!,
  process.env.supabase_PUBLIC_KEY!
);

export default class Supabase {
  getSupabase() {
    return supabase;
  }

  user = new User(supabase);

  organization = new Organization(supabase);

  user_vote = new UserVote(supabase);

  voting_position = new VotingPosition(supabase);

  voting_position_option = new VotingPositionOption(supabase);
}
