import { createClient } from '@supabase/supabase-js';
import User from './user';
import UserVote from './user_vote';
import VotingPosition from './voting_position';
import VotingPositionOption from './voting_position_option';
import ElectionYear from './election_year';

const supabase = createClient(
  process.env.NEXT_PUBLIC_supabase_URL!,
  process.env.NEXT_PUBLIC_supabase_PUBLIC_KEY!
);

export default class Supabase {
  getSupabase() {
    return supabase;
  }

  user = new User(supabase);

  user_vote = new UserVote(supabase);

  voting_position = new VotingPosition(supabase);

  voting_position_option = new VotingPositionOption(supabase);

  electiion_year = new ElectionYear(supabase);
}
