export type { default as SnackType } from './snack';

// supabase
import { Database } from './supabase';
export type UserType = Database['public']['Tables']['user']['Update'];
export type OrgType = Database['public']['Tables']['organization']['Update'];
export type UserVoteType = Database['public']['Tables']['user_vote']['Update'];
export type VotingPositionType =
  Database['public']['Tables']['voting_position']['Update'];
export type VotingPositionOptionType =
  Database['public']['Tables']['voting_position_option']['Update'];
